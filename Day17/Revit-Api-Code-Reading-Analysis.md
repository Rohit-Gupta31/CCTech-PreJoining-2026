# Revit API Code Reading Analysis

## 1. What element types does the sample create?

The `CreateBeamsColumnsBraces` sample creates the following structural elements:

- Structural Beams
- Structural Columns
- Structural Braces

These elements are created using the Revit API by placing family instances with the appropriate structural type.

---

## 2. What transaction name is used?

The sample creates a transaction before modifying the Revit model.

Example:

```cSharp
Transaction transaction = new Transaction(document, "Create Beams, Columns and Braces");
```

Transaction Name:

**"Create Beams, Columns and Braces"**

The transaction is started using:

```csharp
transaction.Start();
```

and completed using:

```csharp
transaction.Commit();
```

---

## 3. What would happen if `Commit()` is missing?

If `Commit()` is not called:

- The transaction is not finalized.
- All changes made during the transaction are discarded.
- Newly created beams, columns, and braces will not appear in the Revit model.
- Revit rolls back the transaction when it ends.

---

## 4. Which Revit built-in categories are involved?

The sample primarily works with the following built-in categories:

- BuiltInCategory.OST_StructuralFraming (Beams and Braces)
- BuiltInCategory.OST_StructuralColumns (Columns)

These categories are commonly accessed using `FilteredElementCollector`.

---

# Parallel Web Plan using Autodesk Platform Services (APS)

To expose the same structural model data through a REST API using APS, the workflow would be:

1. Authenticate using `getAccessToken()`.
2. Upload the Revit model using `uploadModel()`.
3. Translate the uploaded model using `translateModel()`.
4. Poll the translation status using `pollManifest()`.
5. Obtain a Viewer token using `getViewerToken()`.
6. Load the translated model in the APS Viewer.
7. Read beam and column information from the viewer model and expose it through REST API endpoints.

Workflow:

```
getAccessToken() -> uploadModel() -> translateModel() -> pollManifest() ->
getViewerToken() -> APS Viewerv -> REST API (Beams & Columns)
```
