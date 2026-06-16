import { useState } from "react";
import ProjectDashboard, { type Project } from "./projectDashboard";

function App() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      name: "E-Commerce Website",
      status: "Active",
    },
    {
      id: 2,
      name: "Portfolio Website",
      status: "Completed",
    },
    {
      id: 3,
      name: "Task Manager",
      status: "Active",
    },
  ]);

  const handleStatusChange = (id: number, status: string) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === id ? { ...project, status } : project,
      ),
    );
  };

  return (
    <ProjectDashboard projects={projects} onStatusChange={handleStatusChange} />
  );
}

export default App;
