export type ProjectStatus = "Planned" | "In Progress" | "Completed";

export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

export interface Project {
  id: number;
  name: string;
  description?: string;
  status: ProjectStatus;
  tasks: Task[];
}

const BASE_URL = "http://127.0.0.1:8000";

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return response.json();
}

export async function getProjects(): Promise<Project[]> {
  const response = await fetch(`${BASE_URL}/projects`);

  return handleResponse<Project[]>(response);
}

export async function createProject(data: Project): Promise<Project> {
  const response = await fetch(`${BASE_URL}/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return handleResponse<Project>(response);
}

export async function updateProjectStatus(
  id: number,
  status: ProjectStatus,
): Promise<Project> {
  const response = await fetch(`${BASE_URL}/projects/${id}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  return handleResponse<Project>(response);
}
