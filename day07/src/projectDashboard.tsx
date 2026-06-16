import React, { useMemo, useState } from "react";

export interface Project {
  id: number;
  name: string;
  status: string;
}

interface ProjectDashboardProps {
  projects: Project[];
  onStatusChange: (id: number, status: string) => void;
}

//  Custom Hook Returns projects filtered by status.
function useProjectFilter(projects: Project[], status: string): Project[] {
  return useMemo(() => {
    if (status === "All") {
      return projects;
    }

    return projects.filter((project) => project.status === status);
  }, [projects, status]);
}

const ProjectDashboard: React.FC<ProjectDashboardProps> = ({
  projects,
  onStatusChange,
}) => {
  const [selectedStatus, setSelectedStatus] = useState<string>("All");

  const filteredProjects = useProjectFilter(projects, selectedStatus);

  const handleToggleStatus = (project: Project) => {
    const newStatus = project.status === "Active" ? "Completed" : "Active";

    onStatusChange(project.id, newStatus);
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "700px",
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2>Project Dashboard</h2>

      <div style={{ marginBottom: "16px" }}>
        <label htmlFor="status-filter">Filter by Status:</label>

        <select
          id="status-filter"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          style={{
            marginLeft: "10px",
            padding: "6px",
          }}
        >
          <option value="All">All</option>
          <option value="Active">Active</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {filteredProjects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        <ul
          style={{
            listStyle: "none",
            padding: 0,
          }}
        >
          {filteredProjects.map((project) => (
            <li
              key={project.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                marginBottom: "10px",
              }}
            >
              <div>
                <h3
                  style={{
                    margin: "0 0 6px 0",
                  }}
                >
                  {project.name}
                </h3>

                <span
                  style={{
                    padding: "4px 10px",
                    borderRadius: "12px",
                    backgroundColor:
                      project.status === "Active" ? "#d1fae5" : "#dbeafe",
                  }}
                >
                  {project.status}
                </span>
              </div>

              <button
                onClick={() => handleToggleStatus(project)}
                style={{
                  padding: "8px 12px",
                  cursor: "pointer",
                }}
              >
                Toggle Status
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProjectDashboard;
