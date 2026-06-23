import json
import os
from typing import TypedDict, List


class Project(TypedDict):
    id: int
    name: str
    status: str


def read_projects(filename: str) -> List[Project]:
    with open(filename, "r") as file:
        return json.load(file)


def filter_active_projects(projects: List[Project]) -> List[Project]:
    active_projects = [
        project
        for project in projects
        if project["status"].lower() == "active"
    ]

    return sorted(active_projects, key=lambda p: p["name"])


def write_projects(filename: str, projects: List[Project]) -> None:
    with open(filename, "w") as file:
        json.dump(projects, file, indent=4)


def main() -> None:
    projects = read_projects("projects.json")

    filtered_projects = filter_active_projects(projects)

    print("Active Projects:")
    for project in filtered_projects:
        print(f"{project['id']} - {project['name']}")

    write_projects("filtered_projects.json", filtered_projects)


if __name__ == "__main__":
    main()