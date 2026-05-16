# Diagram Generator Runbook

**Trigger**: User mentions architecture, database, flow, system design, wireframe, user flow, or explicitly asks for a diagram
**Format**: Mermaid syntax + ASCII box-drawing (wireframes)

---

## Detection Rules

When the Adam talks about any of these topics, **automatically generate the relevant diagram** alongside your response:

| Adam talks about... | Generate |
|---------------------|----------|
| **architecture**, system design, components, how things connect | Architecture Diagram |
| **database**, tables, schema, ERD, relations, columns | ERD Diagram |
| **flow**, process, steps, workflow, user journey, sequence | Flowchart / Sequence Diagram |
| **API**, endpoints, request/response | API Flow Diagram |
| **deployment**, infrastructure, hosting, CI/CD | Deployment Diagram |
| **user flow**, page flow, navigation flow, screen flow | User Flow Diagram (per-page) |
| **wireframe**, layout, page layout, UI structure, screen design | ASCII Wireframe (per-page) |

---

## Diagram Templates

### 1. Architecture Diagram

When discussing system architecture or component relationships:

```markdown
```mermaid
graph TB
    subgraph Frontend
        UI[Next.js App]
        Pages[Pages/Routes]
    end

    subgraph Backend
        API[API Routes]
        Auth[Authentication]
    end

    subgraph Database
        DB[(Supabase/PostgreSQL)]
    end

    UI --> Pages
    Pages --> API
    API --> Auth
    API --> DB
```​
```

**Steps**:
1. Identify all major components/services in the project
2. Group them into logical layers (Frontend, Backend, DB, External)
3. Draw connections with labeled arrows showing data flow
4. Use `subgraph` for grouping related components

---

### 2. ERD (Entity Relationship Diagram)

When discussing database schema, tables, or relations:

```markdown
```mermaid
erDiagram
    CUSTOMERS {
        uuid id PK
        string name
        string phone
        string email
        timestamp created_at
    }
    SERVICES {
        uuid id PK
        string name
        decimal price
        int duration_minutes
    }
    APPOINTMENTS {
        uuid id PK
        uuid customer_id FK
        uuid staff_id FK
        date appointment_date
        time appointment_time
        string status
    }
    CUSTOMERS ||--o{ APPOINTMENTS : "books"
    STAFF ||--o{ APPOINTMENTS : "assigned to"
    APPOINTMENTS }o--|| SERVICES : "for"
```​
```

**Steps**:
1. Read the project's database schema (Supabase types, Prisma schema, or migration files)
2. List all tables with their columns and types
3. Mark PK (primary key) and FK (foreign key)
4. Draw relationships: `||--o{` (one-to-many), `||--||` (one-to-one), `}o--o{` (many-to-many)

---

### 3. Flowchart

When discussing processes, user flows, or step-by-step logic:

```markdown
```mermaid
flowchart TD
    A[Start] --> B{User Action}
    B -->|Login| C[Auth Check]
    B -->|Browse| D[View Products]
    C -->|Success| E[Dashboard]
    C -->|Fail| F[Error Message]
    F --> B
    D --> G[Add to Cart]
    G --> H[Checkout]
    H --> I{Payment}
    I -->|Success| J[Order Confirmed]
    I -->|Fail| K[Retry Payment]
    K --> H
```​
```

**Steps**:
1. Identify the start and end points
2. Map each decision point as `{diamond}`
3. Map each action as `[rectangle]`
4. Label all edges with conditions
5. Show error/retry paths

---

### 4. Sequence Diagram

When discussing API calls, request/response flows, or multi-system interactions:

```markdown
```mermaid
sequenceDiagram
    actor User
    participant Frontend
    participant API
    participant Database

    User->>Frontend: Click Action
    Frontend->>API: POST /api/endpoint
    API->>Database: Query data
    Database-->>API: Return results
    API-->>Frontend: JSON response
    Frontend-->>User: Update UI
```​
```

**Steps**:
1. Identify all participants (User, Frontend, API, DB, External services)
2. Draw messages in chronological order
3. Use `->>` for requests, `-->>` for responses
4. Add `Note over` for important context

---

### 5. Deployment / Infrastructure Diagram

When discussing hosting, CI/CD, or infrastructure:

```markdown
```mermaid
graph LR
    subgraph Developer
        Code[Local Dev]
    end

    subgraph GitHub
        Repo[Repository]
        Actions[GitHub Actions]
    end

    subgraph Production
        Vercel[Vercel Edge]
        Supa[(Supabase)]
    end

    Code -->|git push| Repo
    Repo -->|trigger| Actions
    Actions -->|deploy| Vercel
    Vercel -->|query| Supa
```​
```

---

### 6. User Flow Diagram (per-page)

**Triggers**: "user flow", "page flow", "navigation flow", "screen flow", "show user flow [project]"

Maps every page in the project with:
- Entry points per role (Admin / User / Guest)
- Navigation paths between pages
- State transitions (modals, tabs, conditional routes)
- Dead-ends and error states

**Format** — ASCII box-drawing flow (bukan Mermaid):

```
┌─────────────────────────────────────────────────────────────┐
│  USER FLOW — LorryTech OS                                   │
│  Role: Admin                                                │
└─────────────────────────────────────────────────────────────┘

                    ┌─────────────┐
                    │   /login    │  ◄── Entry point (Guest)
                    └──────┬──────┘
                           │
              ┌────────────┼────────────┐
              ▼            ▼            ▼
        [valid creds] [wrong pass] [forgot pw]
              │            │            │
              ▼            ▼            ▼
       ┌──────────┐  ┌──────────┐ ┌──────────────┐
       │/dashboard│  │ ❌ Error  │ │/forgot-pw    │
       └────┬─────┘  │ (retry)  │ └──────┬───────┘
            │        └──────────┘        │ email sent
            │                            ▼
            │                     ┌──────────────┐
            │                     │/reset-pw     │
            │                     └──────────────┘
            │
     ┌──────┴────────────┬──────────────┐
     ▼                   ▼              ▼
┌──────────┐       ┌──────────┐  ┌──────────┐
│ /trips   │       │/invoices │  │/customers│
└────┬─────┘       └────┬─────┘  └────┬─────┘
     │                  │              │
  [+ Buat]          [klik row]     [klik row]
     │                  │              │
     ▼                  ▼              ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ Modal:       │ │/invoices/[id]│ │/customers/[id]│
│ BuatTrip     │ │              │ │              │
│ [Submit]─────┼─► /trips       │ └──────────────┘
└──────────────┘ └──────────────┘
```

**Box/arrow legend**:
```
┌──────────┐  = Page / Screen
│  /route  │
└──────────┘

┌──────────────┐  = Modal / Drawer (overlay, bukan page baru)
│ Modal: Name  │
└──────────────┘

[ action ]    = User action / button click
◄──           = Entry point
──►           = Navigation direction
│ / ┌ ┐ └ ┘  = Flow lines
❌            = Error state
✅            = Success state
```

**Steps**:
1. Glob `**/page.tsx` atau routes folder — dapatkan semua pages
2. Read sidebar/nav component — dapatkan navigation structure
3. Read each page for modals, tabs, conditional redirects
4. Group by role: Guest → Admin / User / Public
5. Draw top-down: entry point → main pages → sub-pages → modals
6. Label setiap anak panah dengan user action yang trigger transition
7. Tunjuk error states dan empty states

**Rules**:
- Satu diagram untuk keseluruhan app — jangan split per module
- Setiap page mesti ada sekurang-kurang 1 entry dan 1 exit
- Modal/drawer = kotak berasingan tapi connected ke parent page
- Tab navigation = branch dari page yang sama, tunjuk sebagai `[Tab A] [Tab B]`
- Lebar max 70 chars per baris supaya tak wrap

---

### 7. ASCII Wireframe (per-page)

**Triggers**: "wireframe", "show layout", "wireframe [page name]", "layout [page]", "show wireframe [project]"

Generates ASCII box-drawing layout for each page, showing:
- Header / navbar structure
- Main content zones
- Sidebar (if any)
- Cards, tables, forms, modals
- CTA buttons placement
- Empty states

**Format** — ASCII box-drawing, satu wireframe per page:

```
PAGE: /dashboard
Role: Admin
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
┌─────────────────────────────────────────────────┐
│ [🏠 Logo]         Nav: Trips  Invois  Pelanggan │
│                              [🔔 3]  [Adam ▾]  │
├──────────┬──────────────────────────────────────┤
│          │  ┌─────────┐ ┌─────────┐ ┌────────┐ │
│ Sidebar  │  │ KPI: RM │ │KPI:Trip │ │KPI:Due │ │
│ ─────── │  └─────────┘ └─────────┘ └────────┘ │
│ Dashboard│  ┌─────────────────────────────────┐ │
│ Trips    │  │  Chart: Pendapatan 6 Bulan      │ │
│ Invois   │  └─────────────────────────────────┘ │
│ Pelanggan│  ┌─────────────────────────────────┐ │
│ Laporan  │  │  Table: Trip Terbaru            │ │
│          │  │  [No] [Pelanggan] [RM] [Status] │ │
│          │  └─────────────────────────────────┘ │
└──────────┴──────────────────────────────────────┘
```

**Steps**:
1. Read the page file to understand components rendered
2. Identify: navbar, sidebar, content sections, cards, tables, forms, modals, buttons
3. Draw top-down: header → sidebar+content → footer
4. Use box-drawing characters: `┌ ┐ └ ┘ │ ─ ├ ┤ ┬ ┴ ┼`
5. Use `[Label]` for interactive elements (buttons, inputs, dropdowns)
6. Use `(text)` for static labels/headings
7. Mark role at top: `Role: Admin / User / Guest / Public`
8. Show modal wireframe separately below the page wireframe if page has modals

**Box-drawing reference**:
```
Borders    : ┌─┐  └─┘  │  ├─  ─┤  ┬  ┴  ┼
Heavy line : ━━━  ┏━┓  ┗━┛
Section sep: ─────────────────────
Buttons    : [Simpan]  [Batal]  [+ Tambah]
Inputs     : [________________] (text input)
Dropdown   : [Pilih ▾]
Checkbox   : [✓] Label  [ ] Label
Badge/tag  : (🟢 Aktif)  (🔴 Tunggak)  (⚪ Draft)
Icon+text  : [🔔 3]  [👤 Adam]  [⚙ Settings]
```

**Output format** — untuk setiap project, generate wireframe dalam urutan navigation:
1. Login / Landing page (public)
2. Dashboard (main home selepas login)
3. Setiap module page (ikut sidebar order)
4. Detail pages (e.g. `/invoices/[id]`)
5. Modal wireframes (popup yang penting)
6. Settings page

---

## Behavior Rules

1. **Auto-detect**: When the conversation topic matches a trigger, include the diagram WITHOUT the user asking explicitly
2. **Project-aware**: Read the actual project files to generate accurate diagrams (don't use generic placeholders)
3. **Mermaid format**: Architecture/ERD/Flowchart/Sequence/Deployment = Mermaid syntax
4. **ASCII format**: Wireframes + User Flow Diagram = ASCII box-drawing (NOT Mermaid — tak render dalam Claude Code chat)
5. **Inline**: Place diagrams directly in response, not in a separate file (unless user asks to save)
6. **Save on request**: If user says "save diagram", write to `insights/diagrams/YYYY-MM-DD-description.md`
7. **Iterate**: If user says "update diagram" or points out issues, regenerate with corrections
8. **Per-page**: For wireframes + user flows, always do ALL pages in order — jangan skip mana-mana page
9. **Role-aware**: Tunjuk wireframe berbeza untuk role berbeza kalau layout lain (Admin vs User vs Guest)
10. **One page at a time**: Kalau project besar (>6 pages), tanya Adam "nak semua sekaligus atau satu-satu?"

## Reading Project Data for Accurate Diagrams

Before generating, gather real data:

```bash
# For Architecture: scan project structure
Glob pattern="**/page.tsx" or "**/route.ts"

# For ERD: read database schema
Read Supabase types file or Prisma schema
Grep pattern="CREATE TABLE" or "model " in migration/schema files

# For User Flow: scan all pages + nav
Glob pattern="**/page.tsx" — dapatkan semua routes
Read sidebar/nav component — dapatkan navigation structure
Read middleware.ts — dapatkan role-based redirects

# For Wireframe: read page + components
Read the specific page file
Read components used in that page
Grep pattern="modal|drawer|dialog" — identify popups

# For Deployment: check config
Read vercel.json, package.json, .github/workflows/
```

---

**Version**: v2.0
**Updated**: 2026-05-08
**Added in v2.0**: User Flow Diagram (per-page) + ASCII Wireframe (per-page)
**Triggers**: architecture, database, ERD, flow, flowchart, sequence, deployment, diagram, user flow, wireframe, layout, screen design, page layout
