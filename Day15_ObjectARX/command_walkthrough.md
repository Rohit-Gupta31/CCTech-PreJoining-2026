# ObjectARX Command Walkthrough

## Objective

This document explains how an ObjectARX command named **DRAWBOX** would be implemented in AutoCAD. The command asks the user to select two opposite corners of a rectangle and creates the rectangle in Model Space.This document focuses on the design, workflow, and pseudo-code instead of executable code.

---

# AutoCAD Object Model

ObjectARX uses a hierarchical database structure.

```
AcDbDatabase
    └── AcDbBlockTable
            └── AcDbBlockTableRecord (Model Space)
                    └── Entities
```

- **AcDbDatabase** represents the current drawing database.
- **AcDbBlockTable** stores all drawing blocks.
- **AcDbBlockTableRecord** represents a specific block such as Model Space.
- **Entities** (Line, Circle, Polyline, etc.) are stored inside Model Space.

To add a new rectangle, the command creates a new entity and appends it to the Model Space block record.

---

# AcDbObjectId

Every AutoCAD object has a unique identifier called **AcDbObjectId**.

Instead of storing pointers to objects permanently, ObjectARX stores object IDs. Whenever an object is needed, the ID is resolved back to the actual object.

Benefits:

- Unique identification of every object
- Safe object access
- Easy retrieval from the drawing database

---

# Read and Write Modes

Objects can be opened in different modes.

### Read Mode

Used when only viewing object data.

Example:
- Reading coordinates
- Reading layer information

### Write Mode

Used when modifying an object.

Example:
- Changing geometry
- Adding new entities
- Editing properties

Opening an object in the correct mode improves safety and performance.

---

# Transactions

ObjectARX uses transactions to safely modify the drawing database.

Typical workflow:

1. Start transaction
2. Open required objects
3. Create new entity
4. Append entity to Model Space
5. Commit transaction

If an error occurs, or the user cancels the command, the transaction is aborted and all changes are discarded.

Benefits:

- Prevents partial updates
- Maintains database consistency
- Simplifies rollback

---

# AcDbObjectPointer

AcDbObjectPointer is a smart pointer used in ObjectARX.

Instead of manually opening and closing database objects, it automatically manages object lifetime using the RAII (Resource Acquisition Is Initialization) pattern.

Advantages:

- Automatic cleanup
- Less chance of memory leaks
- Cleaner code
- Safer object handling

---

# DRAWBOX Command Workflow

The command performs the following steps:

1. User types **DRAWBOX** in AutoCAD.
2. AutoCAD executes the registered command.
3. Prompt the user to select the first corner using **acedGetPoint()**.
4. Prompt the user to select the opposite corner using **acedGetPoint()**.
5. Calculate the remaining two rectangle corners.
6. Start a database transaction.
7. Open Model Space for writing.
8. Create an AcDbPolyline representing the rectangle.
9. Add the four vertices.
10. Close the polyline.
11. Append the polyline to Model Space.
12. Commit the transaction.
13. Clean up opened objects.

---

# Rectangle Creation

Suppose the user selects two opposite corners.

```
P1 ---------------- P2
|                    |
|                    |
|                    |
P4 ---------------- P3
```

The command calculates:

- P1 (First corner)
- P2
- P3
- P4

These four points become the vertices of an **AcDbPolyline**.

The polyline is marked as closed so AutoCAD automatically joins the last point back to the first.

---

# Command Registration

During application initialization, the DRAWBOX command is registered with AutoCAD.

After registration, the user can simply type:

```
DRAWBOX
```

AutoCAD then calls the corresponding command function.

---

# User Input using acedGetPoint()

The command collects two points from the user.

```
Prompt:
Select first corner -> User selects Point 1

Prompt:
Select opposite corner -> User selects Point 2
```

The function **acedGetPoint()** returns the selected coordinates.

If the user presses **Esc**, the function returns a cancel status.

---

# Pseudo-Code

```
Register DRAWBOX command

When DRAWBOX executes

    Ask user for first corner

    If user cancels
        Exit command

    Ask user for second corner

    If user cancels
        Exit command

    Calculate remaining rectangle corners

    Start transaction

    Open Model Space for Write

    Create AcDbPolyline

    Add four rectangle vertices

    Close the polyline

    Append polyline to Model Space

    Commit transaction

    Close all opened objects
```

---

# What Happens if the User Presses Esc?

If the user presses **Esc** while selecting points:

- acedGetPoint() returns a cancel status.
- The command immediately stops execution.
- Any active transaction is aborted.
- No rectangle is created.
- Opened objects are cleaned up.
- The drawing database remains unchanged.

This prevents incomplete or invalid changes from being saved.

---

# Summary

This walkthrough demonstrates how an ObjectARX command interacts with the AutoCAD database. The command is registered, accepts user input through **acedGetPoint()**, creates a rectangle using **AcDbPolyline**, stores it inside **Model Space**, and safely manages database modifications using transactions. Object IDs uniquely identify drawing objects, while AcDbObjectPointer simplifies resource management through automatic cleanup.