export interface Project {
  id: number;
  name: string;
  description: string;
  status: string;
  tasks: string[];
}

let projects: Project[] = [
  {
    id: 1,
    name: "Project Dashboard",
    description: "Day 11 Project",
    status: "In Progress",
    tasks: [],
  },
  {
    id: 2,
    name: "Shape Library",
    description: "Day 6 OOP Project",
    status: "Completed",
    tasks: [],
  },
];

export async function getProjects(): Promise<Project[]> {
  return projects;
}

export async function createProject(project: Project): Promise<void> {
  projects.push(project);
}

export async function updateProjectStatus(
  id: number,
  status: string,
): Promise<void> {
  projects = projects.map((project) =>
    project.id === id ? { ...project, status } : project,
  );
}
