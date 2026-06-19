import sys
import os

sys.path.append(os.path.abspath(".."))

from Day09_RestApi.main import app
from fastapi.testclient import TestClient

client = TestClient(app)


def test_root_endpoint_success():
    response = client.get("/")

    assert response.status_code == 200
    assert response.json()["message"] == "API is running"


def test_get_projects_success():
    response = client.get("/projects")

    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_create_project_success():
    payload = {
        "id": 2,
        "name": "Test Project",
        "description": "Testing",
        "status": "Planned",
        "tasks": []
    }

    response = client.post("/projects", json=payload)

    assert response.status_code == 201
    assert response.json()["name"] == "Test Project"


def test_get_project_by_id_success():
    response = client.get("/projects/1")

    assert response.status_code == 200
    assert response.json()["id"] == 1


def test_get_project_not_found():
    response = client.get("/projects/999")

    assert response.status_code == 404


def test_update_status_success():
    response = client.patch(
        "/projects/1/status",
        json={"status": "Completed"}
    )

    assert response.status_code == 200
    assert response.json()["status"] == "Completed"


def test_update_status_not_found():
    response = client.patch(
        "/projects/999/status",
        json={"status": "Completed"}
    )

    assert response.status_code == 404


def test_create_project_invalid_input():
    payload = {
        "id": 3,
        "name": "Invalid Project"
    }

    response = client.post("/projects", json=payload)

    assert response.status_code == 422