import Anthropic from "@anthropic-ai/sdk";
import * as readline from "readline";

interface Document {
  title: string;
  content: string;
}

// Hardcoded Knowledge Base

const DOCUMENTS: Document[] = [
  {
    title: "Python",
    content:
      "Python is a high-level programming language. It is widely used for machine learning, automation, web development, scripting, and data science.",
  },
  {
    title: "TypeScript",
    content:
      "TypeScript is a statically typed superset of JavaScript. It improves code quality through static typing and better tooling.",
  },
  {
    title: "Artificial Intelligence",
    content:
      "Artificial Intelligence enables computers to perform tasks that normally require human intelligence such as reasoning, learning, and decision making.",
  },
  {
    title: "Cloud Computing",
    content:
      "Cloud computing provides on-demand access to computing resources such as servers, databases, networking, and storage over the internet.",
  },
  {
    title: "Git",
    content:
      "Git is a distributed version control system used to track changes in source code and collaborate with other developers.",
  },
];

// Document Search

function findDocument(question: string): string {
  const words = question.toLowerCase().split(" ");

  let bestScore = -1;

  let bestDocument = DOCUMENTS[0]!.content;

  for (const document of DOCUMENTS) {
    let score = 0;

    for (const word of words) {
      if (document.content.toLowerCase().includes(word)) {
        score++;
      }
    }

    if (score > bestScore) {
      bestScore = score;
      bestDocument = document.content;
    }
  }

  return bestDocument;
}

// Ask Claude

async function ask(question: string, context: string): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY environment variable is not set.");
  }

  const client = new Anthropic({
    apiKey: apiKey,
  });

  const systemPrompt =
    "You are a helpful assistant.\n" +
    "Answer ONLY using the provided context.\n" +
    'If the answer cannot be found in the context, reply with "I do not know based on the provided context."';

  const response = await client.messages.create({
    model: "claude-3-haiku-20240307",
    max_tokens: 300,
    system: systemPrompt,
    messages: [
      {
        role: "user",
        content: `Context:\n${context}\n\nQuestion:\n${question}`,
      },
    ],
  });

  return response.content
    .filter((item) => item.type === "text")
    .map((item) => item.text)
    .join("\n");
}

// Main

async function main(): Promise<void> {
  console.log("Simple RAG Demo using Anthropic Claude");

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("Enter your question: ", async (question: string) => {
    const context = findDocument(question);

    console.log("\nRetrieved Context:\n");
    console.log(context);

    console.log("\nGenerating answer...\n");

    try {
      const answer = await ask(question, context);

      console.log("Claude Response:\n");
      console.log(answer);
    } catch (error) {
      console.error("\nError:");
      console.error(error);
    } finally {
      rl.close();
    }
  });
}

main();
