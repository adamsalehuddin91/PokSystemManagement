# Hero Comic RPG v2.0 – ENHANCED EDITION
**The Ultimate Browser-Based Action RPG Experience**

---

## 🎮 Overview
**Hero Comic RPG v2.0** is a **roguelite turn-based action RPG** that combines deep strategic combat with addictive progression loops. Built for web browsers using **React 19**, **Tailwind CSS 4**, **Framer Motion**, and **Supabase**.

### **Core Philosophy**
> "Easy to Learn, Impossible to Master" - A game that respects your time while rewarding mastery.

**Key Differentiators:**
- 🎯 **Class-Based Combat** - 5 unique playstyles with specializations
- 🔥 **Combo System** - Chain attacks for devastating effects
- 🎲 **Roguelite Elements** - Every run is different, meta-progression persists
- 💥 **Comic Book Action** - Screen shake, particles, POW!/BOOM! effects
- 🏆 **Competitive Features** - Leaderboards, daily challenges, cosmetics

---

## 🗺️ Game Flow (Enhanced)

```
Main Menu → Class Selection → World Map
  ↓
Stage Start → Random Event (20% chance)
  ↓
Cutscene Dialogue (comic panels)
  ↓
Combat Waves (2-3 waves) → Boss Fight (multi-phase)
  ↓
Loot & Rewards → Level Up → Random Event (30% chance)
  ↓
Stage Complete Banner → Next Stage Unlocked
  ↓
Stage 10 Complete → Hard Mode/New Game+ Unlocked
```

---

## ⚔️ ENHANCED COMBAT SYSTEM

### 🔥 Action Point (AP) System
**Replaces simple turn-based combat with strategic resource management:**

- **100 AP per turn** - Spend wisely!
- **Skills cost different AP:**
  - Light Attack: 25 AP (1x damage) - Can use 4x
  - Heavy Slash: 50 AP (2.5x damage) - Use 2x
  - Guard: 30 AP (block 50%, restore 20 MP)
  - Fireball: 80 AP (3x damage, costs 15 MP)
  - Ultimate Skill: 100 AP (class-specific)

**Strategic Depth:**
- Mix light attacks for consistent DPS
- Save AP for big finishers
- Guard to recover MP mid-battle
- Plan combos for maximum efficiency

### 💥 Combo System
**Chain attacks for exponential power:**

```typescript
// Combo Examples
Attack → Slash → Fireball = 3.5x damage + "COMBO!" banner
Guard → Counter = Auto-retaliate when hit
Light Attack x3 → Heavy Slash = "Execution Strike" (4x damage)
Fire → Ice → Lightning = "Elemental Storm" (5x + stun)
```

**Combo Meter:**
- Builds with consecutive attacks
- 3-hit: 1.5x damage
- 5-hit: 2x damage + screen shake
- 7-hit: 3x damage + "LEGEND!" comic panel
- Resets if you Guard or get hit

### 🌈 Elemental System
**Rock-Paper-Scissors with depth:**

```
Fire → Ice → Earth → Lightning → Water → Fire
```

**Mechanics:**
- Enemies show weakness icon (🔥❄️⚡💧🌿)
- Exploit weakness: 2x damage + "SUPER EFFECTIVE!" banner
- Wrong element: 0.5x damage + "RESISTED!" text
- Bosses can shift elements mid-fight

### 🎭 Stance System
**Adapt your playstyle mid-battle:**

| Stance | Effect | Use Case |
|--------|--------|----------|
| ⚔️ **Aggressive** | +30% ATK, -20% DEF | Boss in final phase, burst damage |
| 🛡️ **Defensive** | +40% DEF, heal 5 HP/turn | Low HP, need sustain |
| ⚖️ **Balanced** | Normal stats, +10% EXP | Default farming stance |
| 🔮 **Arcane** | +50% magic damage, 2x MP cost | Mage builds, boss weakness |

---

## 🧙 CHARACTER CLASSES

### Choose Your Hero (5 Classes):

#### ⚔️ **WARRIOR** - The Unkillable Tank
**Playstyle:** High HP, sustain through damage
**Unique Mechanic:** **Rage Bar**
- Gain rage when taking damage (10 rage per hit)
- At 100 rage: Unleash **Wrath** (5x damage AoE)
- Passive: 20% lifesteal on all attacks

**Skills:**
- **Shield Bash** (40 AP): Stun enemy for 1 turn
- **Berserker Strike** (60 AP): Damage scales with missing HP (up to 4x)
- **Last Stand** (100 AP): Survive lethal hit with 1 HP, gain 5 turns invulnerability

**Specializations (Level 10):**
- **Juggernaut**: +50% HP, immune to stun
- **Bladestorm**: Attacks hit all enemies for 70% damage

---

#### 🔮 **MAGE** - The Glass Cannon
**Playstyle:** High burst damage, low HP
**Unique Mechanic:** **Spell Slots**
- 3 spell slots per battle
- Cast powerful spells, then cooldown (3 turns to refill)
- Passive: Crits trigger free spell slot

**Skills:**
- **Fireball** (60 AP, 20 MP): 3x fire damage
- **Ice Lance** (40 AP, 15 MP): 2x damage + slow (enemy loses 30 AP next turn)
- **Meteor Strike** (100 AP, 40 MP): 6x damage AoE, uses all spell slots

**Specializations (Level 10):**
- **Pyromancer**: Fire spells burn enemies (10 damage/turn for 3 turns)
- **Archmage**: +1 spell slot, MP regen 10/turn

---

#### 🗡️ **ROGUE** - The Combo Assassin
**Playstyle:** High crit, combo-focused
**Unique Mechanic:** **Combo Points**
- Light attacks grant 1 combo point (max 5)
- Spend 5 points on **Finisher** moves
- Passive: 30% crit chance (50% from behind)

**Skills:**
- **Backstab** (30 AP): 2x damage + 1 combo point
- **Poison Blade** (50 AP): 1.5x damage + poison (20 damage/turn for 5 turns)
- **Execute** (5 combo points): Instant kill if enemy HP < 30%

**Specializations (Level 10):**
- **Assassin**: Finishers refund 50 AP
- **Duelist**: Parry mechanic - reflect 50% damage when attacked

---

#### 🛡️ **PALADIN** - The Holy Tank
**Playstyle:** Support tank, heal + damage hybrid
**Unique Mechanic:** **Holy Light**
- Attacks generate light energy (10 per hit)
- Spend light on heals or damage boosts
- Passive: Heal 5% HP when killing an enemy

**Skills:**
- **Holy Strike** (50 AP): 2x damage + heal 10% HP
- **Divine Shield** (30 AP, 30 light): Immune to damage for 1 turn
- **Judgment** (100 AP, 100 light): 5x damage + heal 30% HP

**Specializations (Level 10):**
- **Crusader**: Attacks heal nearby allies (multiplayer prep)
- **Templar**: Convert 50% damage taken into light energy

---

#### 🏹 **RANGER** - The Precision Striker
**Playstyle:** Multi-hit, positioning-based
**Unique Mechanic:** **Focus Stacks**
- Skip turn to gain 1 focus (max 3)
- Next attack: +100% damage per focus stack
- Passive: +20% damage to enemies above 70% HP

**Skills:**
- **Rapid Fire** (40 AP): Hit 3 times for 0.8x damage each (total 2.4x)
- **Aimed Shot** (60 AP, 1 focus): 4x damage, always crits
- **Arrow Storm** (100 AP, 3 focus): Hit all enemies for 3x damage each

**Specializations (Level 10):**
- **Sniper**: Focus gained 2x faster, max 5 stacks
- **Beastmaster**: Summon wolf companion (30% damage dealer)

---

## 🎲 ROGUELITE PROGRESSION

### 💎 Meta-Progression (Persists Across Runs)
**Earn Crystals from bosses, spend on permanent upgrades:**

| Upgrade | Cost | Effect |
|---------|------|--------|
| Starting Gold I-IV | 10/20/30/50 | Begin with 100/250/500/1000 gold |
| Starting Level I-III | 25/50/100 | Begin at level 1/3/5/10 |
| Extra Skill Slot | 50 | Equip 4 skills instead of 3 |
| Shop Discount | 30 | All items 20% cheaper |
| Boss Rush Mode | 100 | Skip to stage 5 |
| Lucky Loot | 40 | +20% rare drop chance |
| HP Boost I-III | 15/30/60 | +50/100/200 max HP |
| MP Boost I-III | 15/30/60 | +20/40/80 max MP |

**Total Crystals Needed for Full Upgrades:** 625
**Crystals per Boss:** 10-20 (scales with difficulty)

### 🎰 Random Events System
**Encounter between stages (20% before stage, 30% after stage):**

1. **🛒 Traveling Merchant**
   - Buy rare items at discount
   - Sell unwanted loot for gold
   - Sometimes offers "mystery box" (gamble gold for random reward)

2. **⛪ Ancient Shrine**
   - **Risk/Reward:** Sacrifice 30 HP → Gain +20% damage for rest of run
   - **Blessing:** Pay 100 gold → Heal to full + remove debuffs
   - **Curse:** Fail skill check → Lose 10% max HP permanently

3. **💎 Treasure Chest**
   - **Safe**: Pay 50 gold, guaranteed item
   - **Risky**: Free, 70% item / 30% trap (take 50 damage)
   - **Greedy**: Pay 200 gold, 50% legendary / 50% mimic fight

4. **🎭 Mysterious Stranger**
   - Offers choice between 2 boons:
     - "Increase ATK by 15%" OR "Increase DEF by 15%"
     - "Gain 200 gold" OR "Gain 1 free skill respec"
   - 10% chance of trickster curse (both effects reversed)

5. **⚗️ Alchemist Lab**
   - Combine 2 items → Create enhanced version
   - Recycle unwanted equipment → Get crafting materials
   - Buy potions in bulk (5 for price of 3)

### 🏆 Challenge Modifiers (Hard Mode++)
**Unlock after Stage 10, stack up to 3 modifiers:**

| Modifier | Effect | Reward Bonus |
|----------|--------|--------------|
| Glass Cannon | 2x damage dealt, 50% HP | +50% EXP, +30% gold |
| Speed Demon | 30 seconds per turn or lose 10 HP | +40% EXP, +drop rate |
| No Skills | Basic attacks only | +60% EXP, +crystals |
| Boss Rush | Fight 3 bosses per stage | +100% EXP, +legendary drop |
| Permadeath | One life, no continues | +200% all rewards |
| Cursed Run | Random debuff each stage | +80% EXP, +cosmetics |
| One-Hit Wonder | All enemies have 1 HP, you have 10 HP | +50% gold, bragging rights |

**Leaderboard Separate for Each Modifier Combo**

### 🔄 New Game+ Features
**Unlock after Stage 10 clear:**

- **NG+ Scaling:** Enemies scale to your level + 5
- **Nightmare Bosses:** New attack patterns and phases
- **Legendary Weapons:** Can only drop in NG+
- **Prestige System:** Reset level, keep upgrades, gain prestige points for cosmetics
- **Hard Mode Story:** New cutscenes and lore reveals
- **PvP Arena:** Unlocked at NG+ Stage 10

---

## 💥 VISUAL JUICE - FEEL EVERY ACTION

### Screen Effects
```jsx
// Critical Hit
<motion.div
  animate={{ x: [-10, 10, -5, 5, 0], scale: [1, 1.1, 1] }}
  transition={{ duration: 0.3 }}
>
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, y: -100 }}
    className="text-red-500 text-8xl font-black"
  >
    CRITICAL!
  </motion.div>
</motion.div>

// Combo Counter
<motion.div
  key={comboCount}
  initial={{ scale: 0.5, opacity: 0 }}
  animate={{ scale: 1.2, opacity: 1 }}
  className={`
    ${comboCount >= 7 ? "text-rainbow animate-pulse" : ""}
    ${comboCount >= 5 ? "text-gold text-6xl" : "text-yellow-400 text-4xl"}
  `}
>
  {comboCount}x COMBO!
</motion.div>

// Boss Phase Transition
<motion.div
  initial={{ scale: 0, rotate: -180 }}
  animate={{ scale: 1, rotate: 0 }}
  transition={{ type: "spring", damping: 10 }}
  className="bg-red-900 border-4 border-red-500 p-8"
>
  <h1 className="text-6xl font-black text-white comic-font">
    PHASE 2: ENRAGED!
  </h1>
</motion.div>
```

### Particle Systems
```typescript
// On-hit effects
const particleEffects = {
  physicalHit: "sparks (white/gray)",
  fireHit: "embers (orange/yellow)",
  iceHit: "frost shards (blue/white)",
  lightningHit: "electric arcs (cyan/yellow)",
  criticalHit: "explosion burst (red/orange)"
}

// Environmental particles per biome
const biomeParticles = {
  darkForest: "falling leaves, fireflies",
  frozenPeaks: "snow, ice crystals",
  volcanicCore: "embers, ash",
  deepSea: "bubbles, light rays"
}
```

### UI Enhancements
```jsx
// HP Bar with gradient + pulse on low health
<div className="relative w-full h-8 bg-gray-800 rounded-full overflow-hidden">
  <motion.div
    animate={{ width: `${(currentHP / maxHP) * 100}%` }}
    className={`
      h-full
      ${currentHP > 70 ? "bg-gradient-to-r from-green-500 to-green-300" : ""}
      ${currentHP <= 70 && currentHP > 30 ? "bg-gradient-to-r from-yellow-500 to-orange-400" : ""}
      ${currentHP <= 30 ? "bg-gradient-to-r from-red-600 to-red-400 animate-pulse" : ""}
    `}
  />
  <div className="absolute inset-0 flex items-center justify-center text-white font-bold">
    {currentHP} / {maxHP}
  </div>
</div>

// Skill cooldown wheel
<svg className="w-16 h-16 transform -rotate-90">
  <circle
    cx="32" cy="32" r="28"
    stroke="gray" strokeWidth="4" fill="none"
  />
  <motion.circle
    cx="32" cy="32" r="28"
    stroke="cyan" strokeWidth="4" fill="none"
    strokeDasharray={2 * Math.PI * 28}
    animate={{ strokeDashoffset: cooldownPercent * 2 * Math.PI * 28 }}
    className="transition-all duration-300"
  />
</svg>

// Damage numbers with trajectory
<AnimatePresence>
  {damageNumbers.map(dmg => (
    <motion.div
      key={dmg.id}
      initial={{ y: 0, opacity: 1, x: 0 }}
      animate={{
        y: -100,
        opacity: 0,
        x: Math.random() * 40 - 20 // Random horizontal drift
      }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className={`
        absolute font-black
        ${dmg.isCrit ? "text-red-500 text-7xl" : "text-white text-5xl"}
      `}
      style={{
        textShadow: "2px 2px 4px black, -2px -2px 4px black"
      }}
    >
      {dmg.value}
    </motion.div>
  ))}
</AnimatePresence>
```

### Comic Book Effects
```jsx
// Hit impact words
const comicWords = ["POW!", "SLASH!", "BOOM!", "CRACK!", "SMASH!", "ZAP!"]

<motion.div
  initial={{ scale: 0, rotate: -15 }}
  animate={{ scale: 1.5, rotate: 0 }}
  exit={{ scale: 0, opacity: 0 }}
  className="absolute text-9xl font-black text-yellow-400 comic-font"
  style={{
    textStroke: "4px black",
    WebkitTextStroke: "4px black",
    filter: "drop-shadow(4px 4px 0px black)"
  }}
>
  {randomComicWord}
</motion.div>

// Victory screen
<motion.div
  initial={{ scale: 0, rotate: 360 }}
  animate={{ scale: 1, rotate: 0 }}
  className="bg-gradient-to-br from-yellow-400 to-orange-500 border-8 border-black p-12"
>
  <h1 className="text-9xl font-black text-white comic-font animate-pulse">
    VICTORY!
  </h1>
  <motion.div
    animate={{ scale: [1, 1.1, 1] }}
    transition={{ repeat: Infinity, duration: 1 }}
    className="text-4xl text-black font-bold mt-4"
  >
    +{expGained} EXP | +{goldGained} GOLD
  </motion.div>
</motion.div>
```

---

## 🧠 ENEMY AI & BOSS MECHANICS

### Boss Behavior Patterns (Phase System)

#### **Stage 1: Wolf Lord**
```typescript
phases: {
  phase1: {
    hpRange: "100-60%",
    attacks: ["Bite (80 damage)", "Claw Slash (60 damage)"],
    pattern: "70% attack, 30% howl (+20% ATK buff, 2 turns)"
  },
  phase2: {
    hpRange: "60-30%",
    trigger: "Howls and summons 2 Forest Wolves (300 HP each)",
    behavior: "Focus heals self while wolves attack",
    note: "Kill wolves first or boss heals 10% HP/turn"
  },
  phase3: {
    hpRange: "30-0%",
    mode: "BERSERK",
    changes: "+50% speed (2 attacks per turn), +30% damage",
    newAttacks: ["Feral Lunge (150 damage + bleed)"],
    weakness: "Takes 2x damage from fire"
  }
}
```

#### **Stage 4: Frost Titan**
```typescript
phases: {
  phase1: {
    hpRange: "100-70%",
    attacks: ["Ice Punch (100 damage)", "Frost Breath (80 AoE)"],
    passive: "Ice Armor (every 3 turns, immune to damage for 1 turn)"
  },
  phase2: {
    hpRange: "70-40%",
    newAttack: "Frost Nova (50 AoE + reduce player AP by 50% for 2 turns)",
    mechanic: "If hit by fire damage, heals 20% HP",
    strategy: "Use physical/lightning attacks only"
  },
  phase3: {
    hpRange: "40-0%",
    ultimate: "Eternal Winter (room fills with ice)",
    effect: "Lose 30 HP/turn unless using fire skills",
    twist: "Now WEAK to fire (healing reversed to 2x damage)",
    finalAttack: "Avalanche (500 damage, must Guard or die)"
  }
}
```

#### **Stage 7: Reaper Knight**
```typescript
phases: {
  phase1: {
    hpRange: "100-75%",
    attacks: ["Death Slash (120 damage)", "Soul Drain (80 + heal 40)"],
    gimmick: "Invisible (50% dodge chance)"
  },
  phase2: {
    hpRange: "75-50%",
    summons: "4 Shadow Clones (1 HP each, but need to find real one)",
    mechanic: "Attacking wrong clone = counterattack (100 damage)",
    hint: "Real one has red eyes (eagle-eye test)"
  },
  phase3: {
    hpRange: "50-25%",
    mode: "Death Mark",
    effect: "Every 5 turns, instant-death unless you kill an enemy",
    adds: "Spawns Soul Eaters every 3 turns",
    strategy: "Kill adds fast to reset death timer"
  },
  finalPhase: {
    hpRange: "25-0%",
    desperation: "Removes armor, 2x damage taken BUT 3x damage dealt",
    attack: "Reaper's Judgment (300 damage, 2 turn charge)",
    counterplay: "Stun/interrupt the charge or use invulnerability skill"
  }
}
```

#### **Stage 10: Dark Emperor (FINAL BOSS)**
```typescript
phases: {
  phase1: {
    hpRange: "100-75%",
    attacks: ["Dark Beam (150 damage)", "Shadow Strike (100 + blind)"],
    throne: "Sits on throne, summons minions to attack",
    minions: ["Demon Guard x2 (500 HP, tank)", "Dark Mage x1 (300 HP, DPS)"],
    note: "Emperor is invulnerable until all minions dead"
  },
  phase2: {
    hpRange: "75-50%",
    stands: "Descends from throne, attacks directly",
    newAttacks: ["Chaos Blade (200 damage combo)", "Void Step (teleport + backstab)"],
    field: "Chaos Field active - all skills cost 2x MP",
    strategy: "Conserve MP, use basic attacks to build combos"
  },
  phase3: {
    hpRange: "50-25%",
    transformation: "Absorbs darkness, gains wings",
    flying: "Immune to physical damage (must use magic/ranged)",
    ultimate: "Meteor Swarm (8 meteors, 100 damage each, must dodge 4+)",
    mechanic: "After ultimate, crashes and vulnerable for 2 turns (3x damage window)"
  },
  finalPhase: {
    hpRange: "25-0%",
    mode: "ENRAGED - NO MORE TURNS",
    mechanic: "Real-time survival for 30 seconds",
    attacks: "Random barrage of all previous attacks",
    goal: "Survive without HP reaching 0",
    reward: "After 30 sec, Emperor exhausted - 1-hit kill opening",
    legendaryDrop: "Emperor's Crown (unlock NG+)"
  }
}
```

### Enemy Archetypes & AI Patterns

| Type | HP | Damage | AI Behavior | Priority |
|------|-----|---------|-------------|----------|
| **Swarm** | Low (100) | Low (30) | Attacks weakest target | Kill first (prevent overwhelm) |
| **Tank** | Very High (800) | Low (40) | Guards allies, taunts player | Ignore until last |
| **Caster** | Low (200) | Very High (150) | Stays back, casts spells | Kill immediately |
| **Support** | Medium (400) | None | Heals/buffs allies | Kill ASAP or lose war of attrition |
| **Elite** | High (600) | High (100) | Unique mechanics per enemy | Adapt to mechanics |
| **Boss** | Very High (2000+) | Very High (150+) | Multi-phase, pattern learning | Learn patterns, exploit phases |

---

## 🏆 SOCIAL & COMPETITIVE FEATURES

### Global Leaderboards
**Multiple categories to encourage different playstyles:**

```typescript
leaderboards: [
  {
    name: "Fastest Stage 10 Clear",
    metric: "Time (real-time, not turns)",
    reward: "Golden Speedster Title"
  },
  {
    name: "Highest Damage Combo",
    metric: "Single combo damage",
    reward: "Combo Master Frame"
  },
  {
    name: "Hitless Boss Kills",
    metric: "Number of bosses killed without taking damage",
    reward: "Untouchable Aura Effect"
  },
  {
    name: "Challenge Score",
    metric: "Total modifier points accumulated",
    reward: "Challenge Seeker Badge"
  },
  {
    name: "Total Crystals Earned",
    metric: "Lifetime crystal count",
    reward: "Crystal Baron Crown"
  },
  {
    name: "Class Mastery",
    metric: "Clears per class",
    reward: "Class-specific legendary skins"
  }
]
```

**Leaderboard UI:**
- Top 100 displayed
- Your rank highlighted (even if outside top 100)
- Filter by: Today, This Week, All Time
- Click player to view build/gear

### Daily/Weekly Challenges

**Daily Challenges (Reset every 24 hours):**
```typescript
dailyChallenges: [
  {
    name: "Glass Cannon Run",
    description: "Beat Stage 3 with Glass Cannon modifier",
    reward: "50 crystals + Chaos Shard (crafting material)"
  },
  {
    name: "Elemental Master",
    description: "Deal 10,000 elemental damage in any run",
    reward: "30 crystals + Elemental Orb (enchantment)"
  },
  {
    name: "Combo King",
    description: "Achieve a 10-hit combo",
    reward: "40 crystals + Combo Counter cosmetic"
  },
  {
    name: "Boss Slayer",
    description: "Kill 5 bosses (can repeat stages)",
    reward: "60 crystals + Boss Token (shop discount)"
  }
]
```

**Weekly Challenges (Reset every 7 days):**
```typescript
weeklyChallenges: [
  {
    name: "Pacifist Stage",
    description: "Beat Stage 1 using only Guard and item heals",
    reward: "150 crystals + Pacifist Title"
  },
  {
    name: "Genocide Route",
    description: "Kill 500 enemies this week",
    reward: "200 crystals + Death Counter UI"
  },
  {
    name: "Perfect Run",
    description: "Clear Stage 5 without using potions",
    reward: "180 crystals + Potion Saver Frame"
  },
  {
    name: "Class Rotation",
    description: "Clear Stage 3 with all 5 classes",
    reward: "250 crystals + Rainbow Portrait Border"
  }
]
```

### Cosmetic Unlocks

**Character Skins (Per Class):**
```typescript
skins: {
  warrior: ["Knight (default)", "Dark Knight (10 wins)", "Golden Paladin (50 wins)", "Demon Slayer (NG+)"],
  mage: ["Apprentice (default)", "Archmage (10 wins)", "Necromancer (50 wins)", "Astral Sage (NG+)"],
  rogue: ["Thief (default)", "Shadow Assassin (10 wins)", "Blood Hunter (50 wins)", "Phantom (NG+)"],
  paladin: ["Squire (default)", "Holy Crusader (10 wins)", "Templar (50 wins)", "Divine Champion (NG+)"],
  ranger: ["Hunter (default)", "Elven Archer (10 wins)", "Sniper (50 wins)", "Druid (NG+)"]
}
```

**Weapon Skins:**
```typescript
weaponSkins: [
  "Iron (default)",
  "Glowing Edge (5 boss kills)",
  "Legendary Aura (20 boss kills)",
  "Pixel Art Style (daily challenge reward)",
  "Cosmic Trail (weekly challenge reward)",
  "Elemental Infusion (match your element)"
]
```

**UI Cosmetics:**
```typescript
uiCosmetics: {
  portraitFrames: ["Bronze", "Silver", "Gold", "Diamond", "Cosmic"],
  victoryPoses: ["Default Stance", "Victory Sign", "Sword Plant", "Magic Cast"],
  battleEmotes: ["Taunt", "Confident", "Angry", "Focused"],
  comicPanelBorders: ["Classic Black", "Golden Shine", "Blood Red", "Ice Blue"],
  damageNumberStyles: ["Default", "Pixel", "Fire", "Neon"]
}
```

**Unlock Methods:**
- **Boss Kills:** Progressive unlocks (5, 10, 20, 50, 100 kills)
- **Leaderboard Ranks:** Top 100 get exclusive frames
- **Daily/Weekly Challenges:** Unique rewards
- **NG+ Completion:** Legendary tier cosmetics
- **Achievement Hunting:** Hidden achievements unlock secret skins

### Social Features

**Share System:**
```typescript
shareFeatures: {
  screenshotMode: "Hide UI, show character + victory screen",
  statsCard: "Generate shareable image with run stats",
  buildShare: "Copy code to share your build with others",
  replaySystem: "Save and share boss fight replays (GIF format)"
}
```

**Community Hub (Future v3.0):**
- Build database (search by class/stage/difficulty)
- Guild system (clan battles, shared progress)
- Custom challenges (create and share with community)
- Fan art gallery (submit and vote)

---

## 💾 ENHANCED DATA MODELS

### Player Table (Supabase)
```sql
CREATE TABLE players (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  username TEXT UNIQUE NOT NULL,

  -- Current Run Stats
  current_class TEXT NOT NULL,
  level INT DEFAULT 1,
  exp INT DEFAULT 0,
  hp INT DEFAULT 100,
  max_hp INT DEFAULT 100,
  mp INT DEFAULT 50,
  max_mp INT DEFAULT 50,
  gold INT DEFAULT 0,

  -- Progress
  current_stage INT DEFAULT 1,
  highest_stage_cleared INT DEFAULT 0,
  total_runs INT DEFAULT 0,
  total_wins INT DEFAULT 0,

  -- Meta Progression
  crystals INT DEFAULT 0,
  total_crystals_earned INT DEFAULT 0,

  -- Equipment (JSONB for flexibility)
  equipped_weapon JSONB DEFAULT '{"name": "Iron Sword", "attack": 10}'::jsonb,
  equipped_armor JSONB DEFAULT '{"name": "Cloth Armor", "defense": 5}'::jsonb,

  -- Class Progress (JSONB)
  class_stats JSONB DEFAULT '{
    "warrior": {"wins": 0, "best_time": null},
    "mage": {"wins": 0, "best_time": null},
    "rogue": {"wins": 0, "best_time": null},
    "paladin": {"wins": 0, "best_time": null},
    "ranger": {"wins": 0, "best_time": null}
  }'::jsonb,

  -- Settings
  settings JSONB DEFAULT '{
    "sfx_volume": 0.7,
    "bgm_volume": 0.5,
    "screen_shake": true,
    "damage_numbers": true
  }'::jsonb,

  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  last_played TIMESTAMP DEFAULT NOW()
);

-- Index for leaderboards
CREATE INDEX idx_players_highest_stage ON players(highest_stage_cleared DESC);
CREATE INDEX idx_players_crystals ON players(total_crystals_earned DESC);
```

### Inventory Table
```sql
CREATE TABLE inventory (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  player_id UUID REFERENCES players(id) ON DELETE CASCADE,

  -- Item Details
  item_id TEXT NOT NULL, -- Links to item database
  item_name TEXT NOT NULL,
  item_type TEXT NOT NULL, -- 'potion', 'material', 'weapon', 'armor'
  quantity INT DEFAULT 1,
  rarity TEXT DEFAULT 'common', -- 'common', 'rare', 'epic', 'legendary'

  -- Item Stats (JSONB for flexibility)
  stats JSONB,
  -- Example: {"attack": 50, "crit_chance": 0.15, "element": "fire"}

  -- Metadata
  acquired_at TIMESTAMP DEFAULT NOW(),
  is_equipped BOOLEAN DEFAULT FALSE
);

CREATE INDEX idx_inventory_player ON inventory(player_id);
```

### Stages Table (Pre-defined content)
```sql
CREATE TABLE stages (
  id INT PRIMARY KEY,
  name TEXT NOT NULL,
  biome TEXT NOT NULL,

  -- Wave Configuration (JSONB)
  waves JSONB NOT NULL,
  -- Example: [
  --   {"enemies": ["Forest Slime", "Wild Boar"], "count": 3},
  --   {"enemies": ["Wild Boar"], "count": 2},
  --   {"enemies": ["Wolf Lord"], "count": 1, "is_boss": true}
  -- ]

  -- Boss Details
  boss_name TEXT NOT NULL,
  boss_hp INT NOT NULL,
  boss_mechanics JSONB,

  -- Loot Tables (JSONB)
  loot_table JSONB,
  -- Example: {
  --   "common": ["Health Potion", "Iron Ore"],
  --   "rare": ["Fire Blade"],
  --   "boss_drop": ["Wolf Fang", "Wolf Pelt"]
  -- }

  -- Dialogue
  intro_dialogue TEXT,
  victory_dialogue TEXT,

  -- Requirements
  unlock_stage INT -- Previous stage required
);
```

### Leaderboards Table
```sql
CREATE TABLE leaderboards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  player_id UUID REFERENCES players(id) ON DELETE CASCADE,
  username TEXT NOT NULL,

  -- Category
  category TEXT NOT NULL, -- 'fastest_clear', 'highest_combo', etc.

  -- Score
  score FLOAT NOT NULL, -- Time in seconds, damage, etc.
  metadata JSONB, -- Additional context (class used, modifiers, etc.)

  -- Verification
  verified BOOLEAN DEFAULT FALSE, -- Anti-cheat flag
  replay_data JSONB, -- Save replay for verification

  -- Timestamps
  achieved_at TIMESTAMP DEFAULT NOW(),

  UNIQUE(player_id, category) -- One entry per player per category
);

CREATE INDEX idx_leaderboards_category_score ON leaderboards(category, score DESC);
```

### Achievements Table
```sql
CREATE TABLE achievements (
  id TEXT PRIMARY KEY, -- 'first_boss_kill', 'hitless_run', etc.
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT, -- URL to icon image
  reward JSONB, -- {"type": "cosmetic", "item_id": "golden_frame"}

  -- Criteria (JSONB for flexibility)
  criteria JSONB
  -- Example: {"type": "boss_kills", "count": 10}
);

CREATE TABLE player_achievements (
  player_id UUID REFERENCES players(id) ON DELETE CASCADE,
  achievement_id TEXT REFERENCES achievements(id),
  unlocked_at TIMESTAMP DEFAULT NOW(),

  PRIMARY KEY(player_id, achievement_id)
);
```

### Daily Challenges Table
```sql
CREATE TABLE daily_challenges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  date DATE NOT NULL UNIQUE,

  -- Challenge Configuration (JSONB array)
  challenges JSONB NOT NULL,
  -- Example: [
  --   {
  --     "id": "daily_1",
  --     "name": "Glass Cannon Run",
  --     "description": "...",
  --     "reward": {"crystals": 50, "item": "Chaos Shard"}
  --   }
  -- ]

  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE player_challenge_progress (
  player_id UUID REFERENCES players(id) ON DELETE CASCADE,
  challenge_id TEXT NOT NULL,
  challenge_date DATE NOT NULL,

  completed BOOLEAN DEFAULT FALSE,
  progress JSONB, -- Track incremental progress
  completed_at TIMESTAMP,

  PRIMARY KEY(player_id, challenge_id, challenge_date)
);
```

---

## ⚙️ QUALITY OF LIFE FEATURES

### 💾 Enhanced Save System
```typescript
autoSave: {
  triggers: [
    "onStageComplete",
    "onLevelUp",
    "beforeBossFight",
    "onEquipmentChange",
    "every 60 seconds during battle"
  ],
  cloudSync: "Real-time via Supabase",
  conflictResolution: "Server-side timestamp wins"
}

saveSlots: 3, // Try different builds simultaneously

quickSave: {
  hotkey: "F5",
  manualSave: "Pause menu → Save",
  autoLoad: "Resume last save on login"
}

// Save data includes:
saveData: {
  playerStats: {...},
  inventory: [...],
  progress: {...},
  metaUpgrades: {...},
  settings: {...},
  achievements: [...]
}
```

### 📱 Responsive Design
```typescript
// Breakpoints
breakpoints: {
  mobile: "< 640px",
  tablet: "640px - 1024px",
  desktop: "> 1024px"
}

// Mobile optimizations
mobile: {
  controls: "Touch-optimized buttons (larger tap targets)",
  layout: "Portrait: vertical UI, Landscape: horizontal combat",
  gestures: [
    "Swipe right: Light attack",
    "Swipe down: Guard",
    "Tap skill icons: Cast skill",
    "Hold skill: View description"
  ],
  performance: "Lower particle count, simplified animations"
}

// Tablet optimizations
tablet: {
  layout: "Hybrid UI with larger buttons",
  multitouch: "Two-finger swipe for combos"
}

// Desktop enhancements
desktop: {
  keyboard: {
    "1-4": "Use skills 1-4",
    "Q": "Light attack",
    "W": "Heavy attack",
    "E": "Guard",
    "R": "Use potion",
    "Space": "Confirm action",
    "ESC": "Pause menu"
  },
  mouse: "Hover tooltips, click to attack"
}
```

### ♿ Accessibility Features
```typescript
accessibility: {
  colorblind: {
    modes: ["Deuteranopia", "Protanopia", "Tritanopia"],
    implementation: "Damage numbers use shapes + colors (circle=physical, triangle=magic, etc.)"
  },

  speedSettings: {
    animationSpeed: [0.5, 1.0, 1.5, 2.0],
    textSpeed: ["Instant", "Fast", "Normal", "Slow"],
    skipCutscenes: true
  },

  autoBattle: {
    enabled: "For grinding easier stages",
    aiLogic: "Uses optimal skill rotation",
    stopCondition: "Low HP (< 30%) or boss fight"
  },

  textSize: ["Small", "Medium", "Large", "Extra Large"],

  reduceMotion: "Disable screen shake, reduce particle effects",

  screenReader: "ARIA labels on all UI elements"
}
```

### 🎵 Audio System
```typescript
audio: {
  bgm: {
    mainMenu: "Epic orchestral theme",
    worldMap: "Ambient adventure music",
    battle: "Stage-specific battle themes",
    bossFight: "Intense boss music with phase transitions",
    victory: "Triumphant fanfare"
  },

  sfx: {
    attacks: {
      lightAttack: "Whoosh + sword clang",
      heavyAttack: "Deep whoosh + impact",
      magicCast: "Magical charge + explosion",
      criticalHit: "Metallic ring + glass shatter"
    },

    ui: {
      buttonClick: "Soft click",
      menuOpen: "Swoosh",
      levelUp: "Power-up jingle",
      achievement: "Fanfare"
    },

    ambient: {
      darkForest: "Rustling leaves, distant howls",
      frozenPeaks: "Howling wind",
      volcanicCore: "Bubbling lava, rumbles",
      deepSea: "Underwater ambience"
    }
  },

  dynamicMusic: {
    combatIntensity: "Music tempo increases as boss HP decreases",
    phaseTransitions: "Musical sting on phase change",
    victorySlowdown: "Music slows down as enemy dies (cinematic effect)"
  },

  spatialAudio: {
    enabled: "Attacks from left/right have directional sound",
    headphoneMode: "Enhanced 3D audio for headphone users"
  }
}
```

---

## 🚀 DEVELOPMENT ROADMAP

### **Phase 1: Core Enhanced Gameplay (Weeks 1-3)**

**Week 1: Combat System 2.0**
- [ ] AP-based combat system
- [ ] Combo system + combo meter UI
- [ ] Elemental weakness system
- [ ] Stance system
- [ ] Enhanced damage calculation

**Week 2: Class System**
- [ ] 5 base classes with unique mechanics
- [ ] Class-specific skill trees
- [ ] Class specializations (unlock at level 10)
- [ ] Class selection UI
- [ ] Class stat balancing

**Week 3: Visual Juice**
- [ ] Screen shake on crits
- [ ] Particle effects (hit sparks, elemental effects)
- [ ] Comic book impact words (POW!, BOOM!)
- [ ] Animated damage numbers
- [ ] HP/MP bar gradients and animations
- [ ] Skill cooldown visual wheels

---

### **Phase 2: Roguelite Systems (Weeks 4-5)**

**Week 4: Meta-Progression**
- [ ] Crystal currency system
- [ ] Permanent upgrade shop
- [ ] Random event system (5 event types)
- [ ] Event UI with choice dialogs
- [ ] Save data for meta-progression

**Week 5: Challenge & Replayability**
- [ ] Challenge modifiers (7 types)
- [ ] New Game+ system
- [ ] Nightmare boss variants
- [ ] Prestige system
- [ ] Challenge leaderboards

---

### **Phase 3: Boss AI & Enemy Design (Weeks 6-7)**

**Week 6: Boss Mechanics**
- [ ] Multi-phase boss system
- [ ] 10 unique boss AIs (one per stage)
- [ ] Phase transition animations
- [ ] Boss-specific mechanics (summons, armor, etc.)
- [ ] Boss loot tables

**Week 7: Enemy AI**
- [ ] 5 enemy archetypes with distinct behaviors
- [ ] Enemy targeting logic (prioritize weakest, etc.)
- [ ] Elite enemy variants
- [ ] Enemy spawn system for waves
- [ ] Enemy stat scaling for NG+

---

### **Phase 4: Polish & UX (Weeks 8-9)**

**Week 8: Audio System**
- [ ] BGM for all stages and menus
- [ ] SFX for attacks, skills, UI
- [ ] Dynamic music system (intensity scaling)
- [ ] Spatial audio for directional attacks
- [ ] Audio settings (volume sliders, mute options)

**Week 9: Responsive & Accessibility**
- [ ] Mobile touch controls
- [ ] Tablet optimization
- [ ] Desktop keyboard shortcuts
- [ ] Colorblind modes
- [ ] Animation speed settings
- [ ] Auto-battle mode
- [ ] Text size options
- [ ] Reduce motion mode

---

### **Phase 5: Social & Competitive (Weeks 10-11)**

**Week 10: Leaderboards**
- [ ] 6 leaderboard categories
- [ ] Global ranking system
- [ ] Player profile pages
- [ ] Leaderboard UI with filters
- [ ] Anti-cheat validation

**Week 11: Challenges & Cosmetics**
- [ ] Daily challenge system (auto-generate)
- [ ] Weekly challenge system
- [ ] Achievement system (30+ achievements)
- [ ] Cosmetic unlock system
- [ ] Character skins (25+ skins)
- [ ] Weapon skins (6+ styles)
- [ ] UI cosmetics (frames, emotes, etc.)

---

### **Phase 6: Final Testing & Launch (Week 12)**

**Week 12: QA & Optimization**
- [ ] Bug fixing and QA testing
- [ ] Performance optimization (bundle size, loading times)
- [ ] Balance tuning (boss difficulty, skill damage, etc.)
- [ ] Tutorial system (first-time player experience)
- [ ] Documentation (help menu, controls guide)
- [ ] Beta testing with community
- [ ] Launch preparation (Vercel deployment, domain setup)

---

### **Post-Launch Roadmap (v3.0+)**

**v2.1 - Content Expansion (Month 2)**
- [ ] 5 new stages (Stage 11-15)
- [ ] 2 new classes (Druid, Berserker)
- [ ] 10 new achievements
- [ ] Seasonal events (Halloween, Christmas themes)

**v2.5 - Multiplayer Foundation (Month 3-4)**
- [ ] PvP Arena (1v1 battles)
- [ ] Co-op mode (2 players vs boss)
- [ ] Guild system (clan battles)
- [ ] Trading system (items between players)

**v3.0 - Full Multiplayer (Month 5-6)**
- [ ] 4-player raid bosses
- [ ] Guild wars
- [ ] World events (community goals)
- [ ] Player housing (customizable base)

---

## 💎 UNIQUE SELLING POINTS (USP)

### What Makes This Game Stand Out?

1. **"One More Run" Addiction Loop**
   - Roguelite meta-progression ensures every run feels rewarding
   - Random events + challenge modifiers = infinite variety
   - Short session times (15-30 min per run) perfect for web gaming

2. **Comic Book Immersion**
   - Not just a visual theme - mechanics match the energy
   - POW! BOOM! effects on every hit
   - Cutscenes feel like reading an interactive comic
   - Bold, high-contrast art style that pops

3. **Strategic Depth Without Complexity**
   - Easy to understand: Attack, Guard, Skills
   - Hard to master: Combo chains, elemental weaknesses, class builds
   - Every fight feels like a puzzle with multiple solutions

4. **Web-First Design Philosophy**
   - No download, play instantly in browser
   - Cloud saves - resume on any device
   - Optimized for both desktop and mobile
   - Fast loading times (< 3 seconds)

5. **Fair & Fun Monetization**
   - 100% gameplay free forever
   - Cosmetics-only purchases (optional)
   - No pay-to-win, no energy systems, no wait timers
   - Earn all cosmetics through gameplay (purchases = shortcuts)

6. **Competitive Yet Accessible**
   - Leaderboards for hardcore players
   - Auto-battle mode for casual grinders
   - Challenge modifiers let you choose your difficulty
   - Something for everyone (speedrunners, collectors, strategists)

7. **Living Game**
   - Daily challenges keep you coming back
   - Weekly content rotation
   - Regular updates (new classes, stages, events)
   - Community-driven features (polls, suggestions)

---

## 🎯 TARGET AUDIENCE

### Primary Audience
- **Age:** 18-35
- **Gaming Background:** Casual to mid-core gamers
- **Platform:** Desktop and mobile web browsers
- **Play Session:** 15-60 minutes
- **Interests:** Action RPGs, roguelikes, mobile games, anime/comics

### Player Personas

**1. The Speedrunner (20%)**
- Goals: Top leaderboard ranks, fastest clears
- Engagement: Challenge modifiers, difficult bosses
- Retention: Weekly competitions, new time-attack modes

**2. The Collector (30%)**
- Goals: Unlock all cosmetics, complete achievements
- Engagement: Daily challenges, rare drops
- Retention: Seasonal content, limited-time rewards

**3. The Strategist (25%)**
- Goals: Perfect builds, hitless runs
- Engagement: Class theory-crafting, boss mechanics
- Retention: New classes, complex boss fights

**4. The Casual Player (25%)**
- Goals: Relax, make progress at own pace
- Engagement: Story, auto-battle, easy mode
- Retention: Regular updates, low-pressure gameplay

---

## 💰 MONETIZATION STRATEGY (Optional)

**Model:** Free-to-Play + Cosmetic Microtransactions

### Free Forever
- All 10+ stages
- All 5+ classes
- All gameplay features
- All equipment (earnable)
- Cloud saves
- Leaderboards

### Optional Purchases
```typescript
cosmeticShop: {
  characterSkins: "$2.99 each or $9.99 for 5-pack",
  weaponSkins: "$1.99 each",
  uiThemes: "$0.99 each",
  premiumBundle: "$19.99 (all current cosmetics + future releases for 1 year)",

  // Support options
  tipJar: ["$1", "$5", "$10", "Custom"],
  removeAds: "$4.99 one-time (if ads implemented)"
}
```

**Ethical Approach:**
- ❌ No pay-to-win
- ❌ No loot boxes / gambling
- ❌ No energy systems
- ❌ No time-gated content (except daily challenges)
- ✅ All cosmetics earnable through gameplay
- ✅ Purchases = convenience/support, not power

**Revenue Projection (Conservative):**
- 10,000 MAU (Monthly Active Users)
- 2% conversion rate (200 paying users)
- $10 average purchase
- **Monthly Revenue:** $2,000
- **Yearly Revenue:** $24,000

---

## 📊 SUCCESS METRICS (KPIs)

### Player Engagement
- **DAU (Daily Active Users):** Target 1,000+ at launch
- **Session Length:** Average 25-35 minutes
- **Retention:** 40% Day 1, 20% Day 7, 10% Day 30
- **Sessions per User:** 3-5 per week

### Gameplay Metrics
- **Stage Completion Rate:** 60% reach Stage 5, 30% beat Stage 10
- **Average Run Duration:** 20-30 minutes
- **Boss Kill Rate:** 80% success after 3 attempts
- **Class Distribution:** < 30% any single class (good balance)

### Social Metrics
- **Leaderboard Participation:** 15% of players
- **Daily Challenge Completion:** 30% of daily players
- **Share Rate:** 5% of victories shared
- **Community Growth:** 100+ Discord members by Month 2

### Technical Metrics
- **Load Time:** < 3 seconds on average connection
- **FPS:** 60 FPS on desktop, 30+ on mobile
- **Crash Rate:** < 0.1%
- **Cloud Save Sync:** 99.9% success rate

---

## 🛠️ TECH STACK DETAILS

### Frontend
```typescript
framework: "React 19"
language: "TypeScript"
styling: "Tailwind CSS 4"
animation: "Framer Motion"
stateManagement: "Zustand (lightweight)"
routing: "React Router v6"
buildTool: "Vite (fast dev server + build)"
```

### Backend
```typescript
auth: "Supabase Auth (email, Google, GitHub)"
database: "Supabase PostgreSQL"
realtime: "Supabase Realtime (leaderboards, multiplayer prep)"
storage: "Supabase Storage (save data, replays)"
functions: "Supabase Edge Functions (anti-cheat, leaderboard validation)"
```

### Deployment
```typescript
hosting: "Vercel (edge network, auto-deploy)"
cdn: "Vercel Edge Network (global low-latency)"
domain: "herocomicRPG.com (or similar)"
ssl: "Auto HTTPS via Vercel"
```

### Analytics
```typescript
analytics: "Vercel Analytics + Supabase Analytics"
errorTracking: "Sentry (React error boundaries)"
performance: "Lighthouse CI (automated performance checks)"
```

### Development Tools
```typescript
versionControl: "Git + GitHub"
ci_cd: "GitHub Actions (automated tests + deploy)"
testing: "Vitest (unit tests), Playwright (E2E tests)"
linting: "ESLint + Prettier"
typeChecking: "TypeScript strict mode"
```

---

## 🎮 GAMEPLAY LOOP DIAGRAM

```
┌─────────────────────────────────────────────────┐
│              LOGIN / MAIN MENU                  │
│  • Continue Run                                 │
│  • New Game                                     │
│  • Leaderboards                                 │
│  • Challenges                                   │
│  • Settings                                     │
└────────────────┬────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────┐
│           CLASS SELECTION (New Game)            │
│  Choose: Warrior, Mage, Rogue, Paladin, Ranger │
└────────────────┬────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────┐
│               WORLD MAP                         │
│  • Select Stage (1-10)                          │
│  • View Progress                                │
│  • Shop (buy items)                             │
│  • Meta Upgrades (spend crystals)               │
└────────────────┬────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────┐
│        RANDOM EVENT (20% chance)                │
│  • Merchant / Shrine / Treasure / Stranger      │
└────────────────┬────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────┐
│          CUTSCENE (Comic Panels)                │
│  • Stage intro dialogue                         │
│  • Character portraits + text                   │
└────────────────┬────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────┐
│          COMBAT WAVE 1-3                        │
│  • Turn-based with AP system                    │
│  • Build combos, exploit weaknesses             │
│  • Use skills strategically                     │
└────────────────┬────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────┐
│             BOSS FIGHT                          │
│  • Multi-phase mechanics                        │
│  • Learn patterns, adapt strategy               │
│  • Epic victory or defeat                       │
└────────────────┬────────────────────────────────┘
                 │
         ┌───────┴────────┐
         │                │
         ▼                ▼
    ┌────────┐      ┌─────────┐
    │ DEFEAT │      │ VICTORY │
    └────┬───┘      └────┬────┘
         │                │
         │                ▼
         │      ┌─────────────────────┐
         │      │   LOOT & REWARDS    │
         │      │ • EXP, Gold, Items  │
         │      │ • Crystals (boss)   │
         │      │ • Level Up          │
         │      └────┬────────────────┘
         │           │
         │           ▼
         │   ┌────────────────────────┐
         │   │  RANDOM EVENT (30%)    │
         │   └────┬───────────────────┘
         │        │
         │        ▼
         │   ┌──────────────────────────┐
         │   │   STAGE COMPLETE!        │
         │   │ • Victory banner         │
         │   │ • Stats summary          │
         │   │ • Next stage unlocked    │
         │   └────┬─────────────────────┘
         │        │
         │        ▼
         │   ┌──────────────────────────┐
         │   │  Stage 10 Cleared?       │
         │   └──┬──────────────────┬────┘
         │      │ No               │ Yes
         │      ▼                  ▼
         │  ┌────────────┐   ┌──────────────────┐
         └─→│ WORLD MAP  │   │  UNLOCK NG+      │
            │ (continue) │   │ • Hard Mode      │
            └────────────┘   │ • Leaderboard    │
                             │ • New Content    │
                             └──────────────────┘
```

---

## 🎬 EXAMPLE PLAY SESSION

**Player: New user trying the game for the first time**

1. **00:00** - Lands on website, clicks "Play Now"
2. **00:03** - Loads instantly, sees main menu with epic BGM
3. **00:15** - Clicks "New Game" → Class selection screen
4. **00:45** - Reads class descriptions, chooses **Rogue** (loves combos)
5. **01:00** - World map appears, tutorial popup explains basics
6. **01:30** - Clicks Stage 1 → Comic panel cutscene plays
7. **02:00** - "The forest whispers... but the Wolf Lord roars louder!"
8. **02:15** - Battle starts, first wave: 2 Forest Slimes
9. **02:45** - Experiments with Light Attack → Backstab → "2x COMBO!"
10. **03:30** - Slimes defeated, second wave: 3 Wild Boars
11. **04:15** - Uses Poison Blade, watches boars take DOT damage
12. **05:00** - Wave clear, "BOSS APPROACHING" banner
13. **05:15** - Wolf Lord appears with dramatic entrance
14. **05:30** - Tries full combo rotation, builds to 5 combo points
15. **06:00** - Boss at 60% HP, summons 2 wolves
16. **06:30** - Strategic decision: Kill wolves first or focus boss?
17. **07:00** - Kills wolves, boss enters Phase 3 berserk mode
18. **07:30** - Boss attacks twice per turn, player on edge
19. **08:00** - Uses Execute finisher → "BOSS DEFEATED!" comic panel
20. **08:15** - Victory screen with loot animation
21. **08:30** - Levels up to 2, gains skill point, chooses upgrade
22. **08:45** - "Stage Complete!" banner with stats
23. **09:00** - Back to world map, Stage 2 now unlocked
24. **09:15** - Checks leaderboard, sees they're ranked 2,487th
25. **09:30** - Feels motivated to improve, clicks Stage 2...

**Session Result:**
- Duration: 9 minutes 30 seconds (perfect for web game)
- Hooked by combo system and boss mechanics
- Motivated by progression and leaderboards
- High likelihood to return tomorrow

---

## 🎨 VISUAL STYLE GUIDE

### Color Palette (Comic Book Theme)

**Primary Colors:**
```css
--primary-red: #E63946      /* Energy, danger, boss HP */
--primary-blue: #457B9D     /* Skills, MP, ice effects */
--primary-yellow: #F1C40F   /* Gold, crits, fire effects */
--primary-green: #2ECC71    /* HP, healing, success */
```

**Background Colors:**
```css
--bg-dark: #1A1A2E          /* Main dark background */
--bg-medium: #16213E        /* UI panels */
--bg-light: #0F3460         /* Hover states */
--bg-accent: #533483        /* Special highlights */
```

**Text Colors:**
```css
--text-primary: #FFFFFF     /* Main text */
--text-secondary: #B0B0B0   /* Secondary info */
--text-accent: #FFD700      /* Important text, damage numbers */
--text-shadow: #000000      /* Comic book text stroke */
```

**Rarity Colors:**
```css
--rarity-common: #9E9E9E    /* Gray */
--rarity-rare: #2196F3      /* Blue */
--rarity-epic: #9C27B0      /* Purple */
--rarity-legendary: #FF9800 /* Orange/Gold */
```

### Typography
```css
--font-main: 'Bangers', cursive;         /* Comic book headers */
--font-body: 'Roboto', sans-serif;       /* Readable body text */
--font-damage: 'Impact', sans-serif;     /* Damage numbers */

/* Example usage */
h1 {
  font-family: var(--font-main);
  font-size: 4rem;
  text-transform: uppercase;
  -webkit-text-stroke: 3px black;
  color: var(--primary-yellow);
}
```

### Animation Principles
- **Fast & Snappy:** 200-300ms for UI transitions
- **Impactful:** Screen shake 10-15px on crits
- **Juicy:** Particle effects on every hit
- **Readable:** Damage numbers linger 800ms before fading

### UI Components
```typescript
// Button style
button: {
  base: "px-6 py-3 font-bold uppercase rounded-lg border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
  primary: "bg-red-500 hover:bg-red-600 text-white",
  secondary: "bg-blue-500 hover:bg-blue-600 text-white",
  success: "bg-green-500 hover:bg-green-600 text-white"
}

// Panel style
panel: {
  base: "bg-gray-900 border-4 border-white rounded-lg p-6 shadow-xl",
  comic: "bg-yellow-400 border-8 border-black p-4 transform rotate-[-2deg]"
}

// HP Bar style
hpBar: {
  container: "relative w-full h-10 bg-gray-800 border-2 border-black rounded-full overflow-hidden",
  fill: "absolute top-0 left-0 h-full bg-gradient-to-r from-green-500 to-green-300 transition-all duration-500",
  text: "absolute inset-0 flex items-center justify-center text-white font-bold text-lg z-10"
}
```

---

## 📝 FINAL NOTES

### Why This Enhanced Version Is Better

**Original Version:**
- Basic 3-skill combat (repetitive)
- Linear progression (beat once, done)
- Minimal strategy (just attack)
- Simple animations (no juice)

**Enhanced v2.0:**
- ✅ **5 classes with unique mechanics** (5x build variety)
- ✅ **AP system + combos** (strategic depth)
- ✅ **Roguelite progression** (infinite replayability)
- ✅ **Multi-phase bosses** (memorable fights)
- ✅ **Visual juice** (satisfying every hit)
- ✅ **Competitive features** (leaderboards, challenges)
- ✅ **Social systems** (daily challenges, cosmetics)
- ✅ **Quality of life** (mobile support, accessibility)

### Development Time Comparison

| Task | Original Plan | Enhanced v2.0 | Why Worth It |
|------|---------------|---------------|--------------|
| Combat | 1 week | 3 weeks | +Strategic depth keeps players engaged longer |
| Progression | 2 days | 2 weeks | +Roguelite loop = infinite replayability |
| Bosses | 1 week | 2 weeks | +Memorable fights drive word-of-mouth |
| Polish | 3 days | 2 weeks | +Juice makes hits satisfying, crucial for retention |
| **Total** | **~4 weeks** | **~12 weeks** | **+3-5x player retention = worth the time** |

### Success Probability

**Original Version:**
- Completion rate: 50% (might get bored)
- Replay rate: 10% (beat once, move on)
- Share rate: 2% (not memorable enough)

**Enhanced v2.0:**
- Completion rate: 70% (addictive loop)
- Replay rate: 50% (roguelite variety)
- Share rate: 15% (memorable moments, leaderboards)

---

## 🚀 READY TO BUILD?

This enhanced design transforms Hero Comic RPG from a **simple turn-based game** into a **must-play web RPG** with:

- ⚔️ **Strategic combat** that rewards skill
- 🎲 **Roguelite progression** that keeps you coming back
- 💥 **Juicy feedback** that makes every hit satisfying
- 🏆 **Competitive features** that drive engagement
- 🎨 **Comic book immersion** that stands out

**Next Steps:**
1. Review this enhanced design
2. Approve or suggest modifications
3. Begin Phase 1 development (Combat System 2.0)
4. Iterate based on playtesting feedback
5. Launch and dominate the web RPG space! 🚀

---

**Document Version:** Hero Comic RPG v2.0 Enhanced Edition
**Author:** Tokwi AI (Enhanced by Adam's Vision)
**Last Updated:** 2025-01-11
**Status:** Ready for Development

💜 **Let's build the ultimate browser RPG together!** 🎮
