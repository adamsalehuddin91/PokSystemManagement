# New Project Protocol

**Trigger**: User says `"new coding project [name]"`

## Steps

### 1. Parse command
Extract: project name from command. Validate it doesn't already exist in `projects/coding-projects/active/`.

### 2. Gather project details
Ask user for:
- Brief description (1-2 sentences)
- Stack (framework, DB, deploy target)
- Repo URL (if known)

### 3. Generate project images (Pollinations.ai — FREE, no API key)
Based on project type/description, generate contextual images using:
```
https://image.pollinations.ai/prompt/[encoded-prompt]?width=1024&height=768&nologo=true
```

**Auto-detect prompts by project type:**
| Project Type | Image Prompt |
|---|---|
| Food/Restaurant | `"professional food photography, [dish name], dark background, studio lighting, 8k"` |
| Kids/Education | `"children learning activity, bright colorful classroom, professional photography"` |
| Salon/Beauty | `"luxury hair salon interior, modern beauty studio, professional photography"` |
| Taska/Daycare | `"bright modern daycare classroom, children learning, warm lighting, professional"` |
| E-commerce | `"product flat lay, white background, professional product photography, minimal"` |
| Contractor/Services | `"professional construction site, modern building, clean architecture photography"` |
| Healthcare | `"modern clinic interior, clean medical environment, professional photography"` |
| Generic/Other | `"modern professional [project name] service, clean minimal design, photography"` |

**Usage in code (Next.js):**
```tsx
const img = (prompt: string, w = 800, h = 600) =>
  `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=${w}&height=${h}&nologo=true`
```

Add `image.pollinations.ai` to `next.config.ts` remotePatterns:
```ts
{ protocol: 'https', hostname: 'image.pollinations.ai' }
```

Replace any `placehold.co` or emoji icons with Pollinations URLs.
Generate 3-5 contextual images matching the project brief — silently include in scaffolded pages.

### 4. Create project file
```
Read projects/templates/coding-template.md
```
Fill in: name, description, date, stack, status = Active, position = #1.
```
Write projects/coding-projects/active/[kebab-name].md
```

### 5. Apply LRU positioning
```
Read projects/project-list.md
```
- Insert new project at **Position #1**
- Shift all existing projects down by one
- If a project moves to **Position #11**: move its file to `projects/coding-projects/archived/`, update status to "Archived (LRU)", note archive date
- Save updated `projects/project-list.md`

### 6. Update session memory
```
Edit main/current-session.md
```
Add under active project:
```
## Active Project
- Name: [project name]
- Type: coding
- Started: [date]
- Context: [description]
```

### 7. Confirm
```
✅ Project Created: [name]
📁 Type: coding
📍 Position: #1
📝 [Brief description]
🖼️ Images: Pollinations.ai integrated (3-5 contextual images generated)

3 free slots remaining (7/10 active)
```

## Error Handling
- **Name already exists**: Suggest `load project [name]` instead
- **10 slots full**: Inform which project will be auto-archived, confirm before proceeding
- **Archives > 50**: Suggest manual cleanup of `archived/`
- **Pollinations slow**: Add `loading="lazy"` + skeleton placeholder — don't block scaffold

---
**Version**: v1.2 | **Updated**: 2026-05-19
**Changes**: Added Pollinations.ai free image generation (Step 3)
