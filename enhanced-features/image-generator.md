# Image Generator Protocol

**Trigger**: `"generate images for [project]"`, `"generate images"`, `"buat gambar"`

---

## Purpose

After a project is complete, Tokwi scans all image slots and generates
**ready-to-use prompts** for Adam to paste into **Midjourney / ChatGPT / DALL-E**.

Adam generates the images externally → saves to `/public/images/` → done.

---

## Steps

### 1. Scan project for image slots
Read all `.tsx` / `.jsx` files in the project.
Find every image that is:
- Generic Unsplash (not specifically chosen)
- `placehold.co`
- Empty / placeholder
- Emoji being used as image substitute

For each image, note:
- What section/component it's in
- Dimensions (w × h)
- What the image is supposed to represent

### 2. Generate prompt list

Output a clean prompt sheet. Format:

```
═══════════════════════════════════════
🖼️  IMAGE PROMPTS — [Project Name]
Generated: [date]
Paste each prompt into Midjourney / ChatGPT / DALL-E
═══════════════════════════════════════

[1] hero-banner.jpg (1200 × 600)
Section: Landing page hero
Prompt:
"[description], professional photography, high quality, --ar 2:1"

[2] menu-pizza.jpg (800 × 600)
Section: Menu section
Prompt:
"[description], food photography, dark background, studio lighting, 8k, --ar 4:3"

...
```

### 3. Prompt formula by image type

| Type | Prompt Style |
|---|---|
| Hero/banner | `"[subject] lifestyle, [mood], professional photography, wide shot, --ar 2:1"` |
| Food/menu | `"[dish], food photography, dark moody background, studio lighting, 8k, --ar 4:3"` |
| Product | `"[product], product photography, white background, clean minimal, --ar 1:1"` |
| Kids activity | `"children [activity], bright colorful, happy, professional photography, --ar 4:3"` |
| Service/business | `"[service] professional setting, modern, clean, warm lighting, --ar 3:2"` |
| Team/people | `"[description], professional portrait, warm natural lighting, --ar 3:2"` |
| Background/texture | `"[description], abstract, high resolution, --ar 16:9"` |

### 4. Output — ChatGPT Batch Format (default)

By default, output a **single copy-paste block** for ChatGPT.
Adam pastes once → ChatGPT generates all images dalam satu conversation.

```
Generate [N] images for my [project type] website.
Generate them one by one:

1. [Short label] — [prompt description]
2. [Short label] — [prompt description]
...
```

**Midjourney** — output individual prompts (one per `/imagine`).
Ask Adam which tool before outputting if not specified.

### 5. After Adam generates images

Adam saves images to: `public/images/[project-name]/`
Naming convention: `[section]-[description].jpg`
Examples: `hero-banner.jpg`, `program-art-class.jpg`, `product-slime-kit.jpg`

Then Adam says **"images ready"** → Tokwi updates all src in code:
```tsx
// Before:
src="https://images.unsplash.com/photo-xxx..."
// After:
src="/images/messymates/hero-banner.jpg"
```

Also add to `next.config.ts` if needed — no remotePatterns needed for local images.

### 6. Confirm
```
✅ [X] prompts generated for [project]
📋 Copy the batch prompt → paste into ChatGPT
📁 Save images → public/images/[project]/ with correct filenames
💬 Say "images ready" bila dah save — I'll update all src in code.
```

---

## Supported Tools

| Tool | Workflow | Notes |
|---|---|---|
| **ChatGPT (DALL-E)** | Paste batch prompt sekali | Paling senang, generate semua dalam satu go |
| **Midjourney** | `/imagine` satu-satu | Kualiti terbaik, ada `--ar` aspect ratio control |
| **Adobe Firefly** | Paste satu-satu | Good for lifestyle/people shots |
| **Leonardo.ai** | Paste satu-satu | Free tier available |

---
**Version**: v1.2 | **Updated**: 2026-05-19
