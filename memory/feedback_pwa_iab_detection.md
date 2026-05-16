---
name: PWA IAB Detection — Auto-implement for Facebook-shared projects
description: Any PWA project with a shareable Facebook link must include Facebook In-App Browser detection (overlay + sticky banner)
type: feedback
originSessionId: e5c5fe6b-bea0-472f-bc20-ae18c95e7a69
---
For any PWA project where Adam shares a link on Facebook, automatically implement IAB detection without being asked.

**Pattern to implement (Option A + C):**
- `BrowserGate.jsx` — controller component with 3 states: overlay → banner → hidden
- `IABOverlay` — full-screen block, platform-specific steps (iOS: Safari, Android: Chrome), animated arrow, URL copy hint, soft dismiss "Teruskan tanpa install"
- `IABBanner` — sticky orange bar at top, dismissible, shows after overlay is dismissed
- localStorage key `iab_overlay_dismissed` — tracks if user already saw overlay
- Mount `<BrowserGate />` in GuestLayout (login/register) AND main Dashboard/app page
- Covers: FBAN, FBAV, FB_IAB, Instagram, Messenger, TikTok, Twitter IAB + Android generic WebView

**Reference implementation:** SwiftMoney `resources/js/Components/BrowserGate.jsx` (commit f0220f9)
**Preview tool:** `preview-iab-overlay.html` + `capture-iab-mockup.cjs` — reusable pattern

**Why:** Users clicking Facebook links land in Facebook IAB, which blocks PWA install prompt and service worker. Without this, PWA install is impossible from Facebook traffic.

**How to apply:** When starting or deploying any PWA project that Adam says will be shared on Facebook — add BrowserGate before first deploy, no need to ask.
