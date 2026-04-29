# Hero Comic RPG – Full Project Brief

## 🎮 Overview
**Hero Comic RPG** is a turn-based, comic-style web RPG built using **React**, **Tailwind CSS**, and **Supabase**. The game focuses on fast-paced battles, animated transitions, and bold dialogue inspired by comic panels. Players progress through **10 stages**, each with 2–3 waves of enemies before facing a boss.

## 🗺️ Game Flow
1. **World Map** – Player selects the stage (1–10).
2. **Cutscene Dialogue** – Short comic-style story with transitions.
3. **Battle Waves** – 2–3 random enemies per stage, followed by the stage boss.
4. **Rewards & Loot** – Earn EXP, Gold, and Items.
5. **Stage Clear Transition** – Animated stage completion banner.
6. **Next Stage Unlock** – New map areas open progressively.

## 🧙 Storyline & Stages
Each stage introduces a new biome and enemies:

| Stage | Theme | Mid Enemies | Boss | Cutscene Dialogue |
|-------|--------|--------------|------|------------------|
| 1 | Dark Forest | Forest Slime, Wild Boar | **Wolf Lord** | “The forest whispers… but the Wolf Lord roars louder!” |
| 2 | Ancient Cave | Cave Spider, Crystal Golem | **Echo Wraith** | “Echoes of the past haunt these halls.” |
| 3 | Desert Wastes | Sand Worm, Cactus Beast | **Scorpion King** | “Heat and death—both sting the same.” |
| 4 | Frozen Peaks | Ice Bat, Frost Golem | **Frost Titan** | “Even your courage freezes here, warrior.” |
| 5 | Volcanic Core | Lava Slime, Magma Golem | **Flame Lord** | “Your courage burns bright… but I burn brighter!” |
| 6 | Deep Sea Abyss | Coral Serpent, Abyss Octopus | **Leviathan** | “Beneath the waves, no one can hear you scream.” |
| 7 | Shadow Realm | Dark Mage, Soul Eater | **Reaper Knight** | “Death walks beside you now.” |
| 8 | Tech Fortress | Metal Drone, Steel Golem | **Mecha Overlord** | “Behold, perfection made of gears and pain!” |
| 9 | Vampire Castle | Phantom Wolf, Doom Reaper | **Vampire Lord** | “You bleed. I feast. Simple.” |
| 10 | Hell Citadel | Demon Guard, Fallen Angel | **Dark Emperor** | “All roads lead to me, mortal. Let’s end this.” |

## ⚔️ Core Mechanics
### Combat
- **Turn-based system** with player and enemy alternating attacks.
- **HP/MP bars** dynamically update using animated transitions.
- **Skills**:
  - **Slash** – 1.5x damage.
  - **Guard** – Reduces next enemy attack by 50%.
  - **Fireball** – 2x magic damage, costs 15 MP.

### Enemy System
- Each stage has multiple **waves of enemies**.
- Boss appears in the final wave.
- Bosses may drop **rare loot** or **unlock new abilities**.

### Loot & Inventory
- Items: Potions, Elixirs.
- Materials: Iron Ore, Wolf Fang, Demon Horn.
- Weapons: Iron Sword, Fire Blade, Frost Hammer.

### Cutscenes & Transitions
- Between stages, short **comic-panel cutscenes** appear with character portraits and bold text.
- Example transition code:
  ```jsx
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-2xl font-bold">
    "Stage Cleared! Prepare for what’s next!"
  </motion.div>
  ```

## 🧩 Tech Stack
| Layer | Tool |
|--------|------|
| Frontend | React 19 + Tailwind CSS 4 |
| Animation | Framer Motion |
| Backend | Supabase (Auth + Database) |
| Data Storage | Supabase Tables & JSON saves |
| Styling | Pixel/Comic Hybrid UI |

## 💾 Data Models
**Player Table**
```sql
id UUID PRIMARY KEY,
name TEXT,
level INT,
exp INT,
hp INT,
mp INT,
gold INT,
weapon JSONB,
progress JSONB
```

**Inventory Table**
```sql
player_id UUID REFERENCES players(id),
item_name TEXT,
qty INT,
item_type TEXT
```

**Stages Table**
```sql
id INT PRIMARY KEY,
name TEXT,
biome TEXT,
waves JSONB,
boss TEXT
```

## 🌟 Features
- Supabase authentication and cloud save
- Multi-wave battles with animated logs
- Skill-based combat system
- HP/MP bars for both sides
- Comic-style dialogue and transitions
- 10 progressive stages with unique bosses
- Loot system and dynamic inventory

## 🚀 Upcoming Features
1. **Cinematic Cutscenes** – Character dialogue and hero emotions before each boss.
2. **Sound FX & BGM** – Battle sounds and ambient music per stage.
3. **Skill Tree System** – Unlock advanced skills using EXP.
4. **Equipment Upgrades** – Forge, enchant, and evolve weapons.
5. **Online Leaderboards** – Global ranking for completion speed and power.

## 🏁 Endgame Vision
At Stage 10, players defeat the **Dark Emperor** and unlock **Hard Mode**, featuring:
- Stronger versions of all bosses
- Unique drops for each
- Legendary weapon crafting

---

### 👨‍💻 Development Summary
- **Language**: TypeScript / JavaScript
- **Framework**: React 19
- **Backend**: Supabase
- **Animations**: Framer Motion
- **Styling**: Tailwind CSS (Pixel Comic Theme)
- **Deployment**: Vercel or Netlify

---

### 🎯 Project Goal
Create a **browser-based RPG** that feels like reading an interactive action comic. The player’s decisions, skill use, and battle strategies shape how they progress through a stylized adventure full of energy and speed.

---

### 📅 Version Roadmap
- **v1.0** – Core gameplay (battle, map, 10 stages)
- **v1.1** – Save/load via Supabase
- **v1.2** – Cutscenes & visual transitions
- **v2.0** – Full pixel art + soundtrack release
- **v3.0** – Online multiplayer arena

---

*Project maintained under the SwiftApps RPG initiative — a hybrid comic‑RPG experience built for browsers.*