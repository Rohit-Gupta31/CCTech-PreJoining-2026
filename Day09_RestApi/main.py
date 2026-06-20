from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Literal

app = FastAPI(title="Projects API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Schemas

class Task(BaseModel):
    id: int
    title: str
    completed: bool = False


class Project(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    status: Literal["Planned", "In Progress", "Completed"]
    tasks: List[Task] = []


class ErrorResponse(BaseModel):
    code: int
    message: str


class StatusUpdate(BaseModel):
    status: Literal["Planned", "In Progress", "Completed"]


# In-memory storage

projects: List[Project] = [
    Project(
        id=1,
        name="Website Redesign",
        description="Redesign the company website",
        status="Planned",
        tasks=[]
    )
]

# check
@app.get("/")
def root():
    return {"message": "API is running"}

# GET /projects

@app.get("/projects", response_model=List[Project])
def get_projects():
    return projects


# POST /projects

@app.post("/projects", response_model=Project, status_code=201)
def create_project(project: Project):
    projects.append(project)
    return project


# GET /projects/{id}

@app.get(
    "/projects/{id}",
    response_model=Project,
    responses={404: {"model": ErrorResponse}}
)
def get_project(id: int):

    for project in projects:
        if project.id == id:
            return project

    raise HTTPException(
        status_code=404,
        detail={
            "code": 404,
            "message": "Project not found"
        }
    )


# PATCH /projects/{id}/status

@app.patch(
    "/projects/{id}/status",
    response_model=Project,
    responses={404: {"model": ErrorResponse}}
)
def update_project_status(id: int, status_update: StatusUpdate):

    for project in projects:
        if project.id == id:
            project.status = status_update.status
            return project

    raise HTTPException(
        status_code=404,
        detail={
            "code": 404,
            "message": "Project not found"
        }
    )