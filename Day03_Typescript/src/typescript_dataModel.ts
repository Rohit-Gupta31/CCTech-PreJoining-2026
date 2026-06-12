// Project Interface
interface Project {
    id: number;
    name: string;
    status: 'active' | 'archived';
    createdAt: Date;
}

// Task Interface
interface Task {
    id: number;
    projectId: number;
    title: string;
    completed: boolean;
}

// Generic Function: Filter by Status
function filterByStatus<T extends { status: string }>(
    items: T[],
    status: string
): T[] {
    return items.filter(item => item.status === status);
}

// Group Tasks by Project
function groupTasksByProject(tasks: Task[]): Map<number, Task[]> {
    const groupedTasks: Map<number, Task[]> = new Map();

    for (const task of tasks) {
        if (!groupedTasks.has(task.projectId)) {
            groupedTasks.set(task.projectId, []);
        }

        groupedTasks.get(task.projectId)!.push(task);
    }

    return groupedTasks;
}

// Sample Data
const projects: Project[] = [
    {
        id: 1,
        name: "Website Redesign",
        status: "active",
        createdAt: new Date("2026-06-10")
    },
    {
        id: 2,
        name: "Mobile App",
        status: "archived",
        createdAt: new Date("2026-05-01")
    }
];

const tasks: Task[] = [
    {
        id: 1,
        projectId: 1,
        title: "Create UI",
        completed: false
    },
    {
        id: 2,
        projectId: 1,
        title: "Implement API",
        completed: true
    },
    {
        id: 3,
        projectId: 2,
        title: "Testing",
        completed: false
    }
];

// Usage Examples
const activeProjects: Project[] = filterByStatus(projects, "active");
console.log("Active Projects:", activeProjects);

const groupedTasks: Map<number, Task[]> = groupTasksByProject(tasks);
console.log("Grouped Tasks:", groupedTasks);