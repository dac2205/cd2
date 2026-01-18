# Brand File Structure Standard

Every brand in `data/brands/{slug}` must adhere to the following file structure to ensure consistency across the application.

## Required Files

| File | Format | Purpose |
| :--- | :--- | :--- |
| `meta.json` | JSON | Basic metadata (id, name, owner). |
| `introduction.md` | Markdown | General introduction to the brand. |
| `audience.md` | Markdown | Unstructured/readable description of the target audience. |
| `audience.json` | JSON | **Structured** audience segments for UI rendering. |
| `jtbd.md` | Markdown | Unstructured/readable Jobs To Be Done analysis. |
| `jtbd.json` | JSON | **Structured** JTBD data (functional, emotional, social, other). |
| `insights.md` | Markdown | Unstructured/readable core insights. |
| `insights.json` | JSON | **Structured** insights list for the explorer UI. |
| `quiz.json` | JSON | Brand decoding quiz questions. |

## File Details

### 1. meta.json
```json
{
    "id": "string",
    "name": "string",
    "owner": "string"
}
```

### 2. audience.json
Must be an array of segments.
```json
[
    {
        "id": "string",
        "title": "string",
        "isPrimary": boolean,
        "description": "markdown string",
        "painPoints": ["string"]
    }
]
```

### 3. jtbd.json
Must contain 4 keys.
```json
{
    "functional": [{ "id": "string", "title": "string", "description": "string" }],
    "emotional": [],
    "social": [],
    "other": []
}
```

### 4. insights.json
Array of insight objects.
```json
[
    {
        "id": "string",
        "title": "string",
        "tension": "string",
        "belief": "string",
        "core": "string",
        "hooks": ["string"],
        "angle": "string",
        "reframe": "string",
        "promise": "string",
        "rtb": "string",
        "mechanism": "string"
    }
]
```

### 5. quiz.json
Array of questions.
```json
[
    {
        "id": "string",
        "question": "string",
        "options": ["string"],
        "correctAnswer": number, // 0-based index
        "explanation": "string"
    }
]
```
