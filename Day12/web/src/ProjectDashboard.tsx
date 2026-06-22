import { useEffect, useReducer } from "react";

import { getProjects, createProject, updateProjectStatus } from "./projectApi.ts";

import type { Project } from "./projectApi.ts";

interface State {
  projects: Project[];
  loading: boolean;
  error: string | null;
}

type Action =
  | { type: "LOADING" }
  | { type: "SUCCESS"; payload: Project[] }
  | { type: "ERROR"; payload: string };

const initialState: State = {
  projects: [],
  loading: false,
  error: null,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        loading: true,
        error: null,
      };

    case "SUCCESS":
      return {
        projects: action.payload,
        loading: false,
        error: null,
      };

    case "ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}

export default function ProjectDashboard() {
  const [state, dispatch] = useReducer(reducer, initialState);

  async function loadProjects() {
    try {
      dispatch({ type: "LOADING" });

      const data = await getProjects();

      dispatch({
        type: "SUCCESS",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: (error as Error).message,
      });
    }
  }

  useEffect(() => {
    loadProjects();
  }, []);

  async function addProject() {
    try {
      await createProject({
        id: Date.now(),
        name: "New Frontend Project",
        description: "Created from React",
        status: "Planned",
        tasks: [],
      });

      loadProjects();
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: (error as Error).message,
      });
    }
  }

  async function markCompleted(id: number) {
    try {
      await updateProjectStatus(id, "Completed");

      loadProjects();
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: (error as Error).message,
      });
    }
  }

  if (state.loading) {
    return <h2>Loading...</h2>;
  }

  if (state.error) {
    return <h2>Error: {state.error}</h2>;
  }

  return (
    <div>
      <h1>Project Dashboard</h1>

      <button onClick={addProject}>Create Project</button>

      <ul>
        {state.projects.map((project) => (
          <li key={project.id}>
            <h3>{project.name}</h3>

            <p>{project.description}</p>

            <p>Status: {project.status}</p>

            <button onClick={() => markCompleted(project.id)}>
              Mark Completed
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
