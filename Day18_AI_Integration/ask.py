import os
from typing import List, Dict

import anthropic



# Hardcoded Knowledge Base

DOCUMENTS: List[Dict[str, str]] = [
    {
        "title": "Python",
        "content": (
            "Python is a high-level programming language. "
            "It is widely used for machine learning, automation, "
            "web development, scripting, and data science."
        ),
    },
    {
        "title": "TypeScript",
        "content": (
            "TypeScript is a statically typed superset of JavaScript. "
            "It improves code quality through static typing and better tooling."
        ),
    },
    {
        "title": "Artificial Intelligence",
        "content": (
            "Artificial Intelligence enables computers to perform tasks "
            "that normally require human intelligence such as reasoning, "
            "learning, and decision making."
        ),
    },
    {
        "title": "Cloud Computing",
        "content": (
            "Cloud computing provides on-demand access to computing resources "
            "such as servers, databases, networking, and storage over the internet."
        ),
    },
    {
        "title": "Git",
        "content": (
            "Git is a distributed version control system used to track "
            "changes in source code and collaborate with other developers."
        ),
    },
]



# Document Search

def find_document(question: str) -> str:
    """
    Perform a simple keyword search over the hardcoded documents.
    Returns the content of the best matching document.
    """

    question = question.lower()

    best_score = -1
    best_document = DOCUMENTS[0]["content"]

    for document in DOCUMENTS:
        score = 0

        for word in question.split():
            if word in document["content"].lower():
                score += 1

        if score > best_score:
            best_score = score
            best_document = document["content"]

    return best_document



# Ask Claude

def ask(question: str, context: str) -> str:

    api_key = os.getenv("ANTHROPIC_API_KEY")

    if not api_key:
        raise EnvironmentError(
            "ANTHROPIC_API_KEY environment variable is not set."
        )

    client = anthropic.Anthropic(api_key=api_key)

    system_prompt = (
        "You are a helpful assistant.\n"
        "Answer ONLY using the provided context.\n"
        "If the answer cannot be found in the context, "
        'reply with "I do not know based on the provided context."'
    )

    response = client.messages.create(
        model="claude-3-haiku-20240307",
        max_tokens=300,
        system=system_prompt,
        messages=[
            {
                "role": "user",
                "content": (
                    f"Context:\n{context}\n\n"
                    f"Question:\n{question}"
                ),
            }
        ],
    )

    return response.content[0].text


# Main

def main() -> None:

    print("Simple RAG Demo using Anthropic Claude")

    question = input("Enter your question: ")

    context = find_document(question)

    print("\nRetrieved Context:\n")
    print(context)

    print("\nGenerating answer...\n")

    try:
        answer = ask(question, context)

        print("Claude Response:\n")
        print(answer)

    except Exception as error:
        print("\nError:")
        print(error)


if __name__ == "__main__":
    main()