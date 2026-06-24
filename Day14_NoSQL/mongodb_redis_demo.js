
// Embedded document design: tasks are stored inside the project document
// because tasks belong to a single project and are usually read together.

const { MongoClient, ObjectId } = require("mongodb");
const redis = require("redis");

const MONGO_URI = "mongodb://localhost:27017";
const DB_NAME = "companyDB";

const mongoClient = new MongoClient(MONGO_URI);

const redisClient = redis.createClient();

async function connect() {
    await mongoClient.connect();
    await redisClient.connect();
}

function getProjectsCollection() {
    return mongoClient.db(DB_NAME).collection("projects");
}

/*
Document Schema Example

{
    _id: ObjectId(),
    name: "Website Redesign",
    status: "Active",
    createdAt: ISODate(),
    tasks: [
        {
            title: "Create UI",
            completed: false,
            assignedTo: "Rohit"
        },
        {
            title: "Backend API",
            completed: true,
            assignedTo: "Amit"
        }
    ]
}
*/

// Find required project
async function findActiveProjectsWithPendingTasks() {
    const projects = getProjectsCollection();

    const result = await projects.find({
        status: "Active",
        tasks: {
            $elemMatch: {
                completed: false
            }
        }
    }).toArray();

    console.log("Active projects with pending tasks:");
    console.log(result);
}

// Aggregation pipeline:
// Group projects by status
// Count total projects, total tasks, and completed tasks
async function projectStatusSummary() {
    const projects = getProjectsCollection();

    const pipeline = [
        {
            $unwind: "$tasks"
        },
        {
            $group: {
                _id: "$status",
                projectCount: { $addToSet: "$_id" },
                totalTasks: { $sum: 1 },
                completedTasks: {
                    $sum: {
                        $cond: ["$tasks.completed", 1, 0]
                    }
                }
            }
        },
        {
            $project: {
                _id: 0,
                status: "$_id",
                totalProjects: { $size: "$projectCount" },
                totalTasks: 1,
                completedTasks: 1
            }
        }
    ];

    const result = await projects.aggregate(pipeline).toArray();

    console.log("Project Status Summary:");
    console.log(result);
}

// Redis cache wrapper
// Checks Redis first
// Falls back to MongoDB
// Stores result for 5 minutes
async function getProject(id) {
    const cacheKey = `project:${id}`;

    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
        console.log("Returned from Redis Cache");
        return JSON.parse(cachedData);
    }

    console.log("Returned from MongoDB");

    const project = await getProjectsCollection().findOne({
        _id: new ObjectId(id)
    });

    if (project) {
        await redisClient.setEx(
            cacheKey,
            300, // TTL = 5 minutes
            JSON.stringify(project)
        );
    }

    return project;
}

async function main() {
    try {
        await connect();

        await findActiveProjectsWithPendingTasks();

        await projectStatusSummary();

        // Example:
        // const project = await getProject("YOUR_PROJECT_ID");
        // console.log(project);

    } catch (error) {
        console.error(error);
    } finally {
        await mongoClient.close();
        await redisClient.quit();
    }
}

main();