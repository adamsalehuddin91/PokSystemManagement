# Stock Monitoring System
## Project Brief

---

## PROJECT OVERVIEW

**Project Name:** Bursa Malaysia Stock Monitoring System  
**Client:** IT Support / PowerApps Developer  
**Platform:** Web Application (React-based)  
**Development Tool:** Claude Code  
**Timeline:** 2-3 weeks (MVP)  
**Purpose:** Real-time monitoring system for Bursa Malaysia stocks with alerts, news integration, and daily trading checklists

---

## 1. Executive Summary

This document outlines the requirements for developing a comprehensive Stock Monitoring System for Bursa Malaysia trading. The system will provide real-time stock tracking, intelligent alerts, news integration, and structured daily trading routines to support informed investment decisions.

The system addresses the challenge of monitoring multiple data sources (Bursa Malaysia announcements, market news, price movements, volume changes) in a single, organized dashboard, with particular focus on the critical pre-market and market opening hours (8:00 AM - 9:30 AM).

---

## 2. Business Context

### 2.1 Target User Profile

- **Role:** IT Support professional and PowerApps developer
- **Trading Experience:** Intermediate, researching Microsoft Power Platform
- **Trading Style:** Intraday scalping focused on market open (9:00 AM - 11:00 AM)
- **Primary Interest:** Blue chip stocks on Bursa Malaysia
- **Key Challenge:** Managing multiple information sources during limited pre-market time (30 minutes)

### 2.2 Current Pain Points

- Fragmented information sources (Bursa website, news sites, broker platforms)
- Time-consuming manual checking of company announcements
- Risk of missing critical news during 8:00-8:30 AM preparation window
- Lack of systematic daily routine tracking
- Difficulty monitoring volume surges and price breakouts in real-time

---

## 3. Core System Requirements

### 3.1 Dashboard Module

#### Market Status Widget

- Live clock display (HH:MM:SS format, Malaysia timezone GMT+8)
- Market status indicator (Open/Closed) with color coding (green/red)
- Current date display (full format: Day, Date Month Year)
- Market hours reference: 9:00 AM - 5:00 PM

#### Market Summary Cards

- **KLCI Index:** Current value, change (points), percentage change
- **US Dow Jones:** Previous close value, change, percentage (affects opening sentiment)
- **US S&P 500:** Previous close value, change, percentage
- **Foreign Fund Flow:** Net buy/sell in RM millions, breakdown of buy vs sell

### 3.2 Watchlist Module

#### Stock Tracking Table

| Data Field | Description |
|------------|-------------|
| Stock Code/Name | Bursa code (e.g., 1155) and company name (e.g., MAYBANK) |
| Current Price | Latest traded price in RM (e.g., RM 9.85) |
| Change | Price change in RM and percentage (color-coded: green for positive, red for negative) |
| Volume | Trading volume in millions (e.g., 2.15M shares) |
| High/Low | Day's high and low prices |

#### Default Watchlist Stocks (Blue Chips)

- MAYBANK (1155)
- PUBLIC BANK (1295)
- TENAGA NASIONAL (5347)
- PETRONAS GAS (6033)
- IHH HEALTHCARE (5225)

### 3.3 Alert System Module

#### Alert Types and Triggers

| Alert Type | Trigger Condition | Severity Level |
|------------|-------------------|----------------|
| **Company Announcement** | Earnings reports, dividends, rights issues, material contracts | **HIGH** (Red) |
| **Price Breakout** | Price breaks above resistance or below support levels | **MEDIUM** (Orange) |
| **Volume Surge** | Volume exceeds 2x average daily volume | **MEDIUM** (Orange) |
| **Market News** | KLCI major movements, foreign flow changes, sector news | **LOW** (Blue) |

#### Alert Features

- Unread counter badge showing number of new alerts
- Mark as read functionality
- Timestamp for each alert (relative time: '30 min ago' or absolute time: '08:05 AM')
- Color-coded by severity (red border for high, yellow for medium, blue for low)
- Configurable alert settings (enable/disable by type)

### 3.4 News Feed Module

#### News Sources Integration

- **Bursa Malaysia:** Official company announcements
- **The Edge Markets:** Financial news and market analysis
- **Reuters/Global Sources:** International market impacts
- **The Star Business:** Local business developments

#### News Display Features

- Categorized by topic (Banking, Market, Energy, Tech, Global)
- Source attribution with timestamp
- Quick links to original articles (external link icon)
- Refresh button for manual update
- Quick access buttons to news websites (Bursa, Edge, Investing.com, TradingView)

### 3.5 Daily Checklist Module

The Daily Checklist provides a structured routine for stock trading preparation and execution, organized by time blocks:

#### Checklist Sections

**1. Morning Preparation (8:00 AM - 30 min before market)**

- Check Bursa Malaysia announcements
- Read top 3 The Edge Markets headlines
- Review US market close (Dow Jones, S&P 500 direction)
- Check KLCI sentiment and futures
- Review watchlist stocks (previous close, volume, gap potential)

**2. Pre-Market Window (8:30 AM - 30 min)**

- Open broker platform and login
- Monitor pre-open indicative prices
- Identify gap up/down stocks
- Prepare trade plan (entry levels, SL, TP)

**3. Market Open (9:00 AM - First 15 minutes)**

- **OBSERVE first 5 minutes** - Do not rush!
- Monitor opening direction and volatility
- Identify setup at 9:15 AM (gap & hold or gap & fill patterns)
- Execute entry if setup clear (proper SL/TP, max 1% risk)

**4. End of Day Review**

- Log trade results in journal (entry, exit, P/L)
- Screenshot charts for reference
- Review what worked and what didn't
- Prepare for tomorrow (update watchlist, check upcoming news)

#### Interactive Features

- Checkboxes for each item (track completion)
- Persistent state (checkboxes remain checked until manually reset)
- Color-coded time blocks for visual organization
- Important trading rules reminder section (red highlighted box)

---

## 4. Technical Specifications

### 4.1 Technology Stack

- **Frontend Framework:** React (JavaScript/JSX)
- **UI Components:** Lucide React icons library
- **Styling:** Tailwind CSS (utility-first)
- **State Management:** React Hooks (useState, useEffect)
- **Development Tool:** Claude Code (AI-assisted development)

### 4.2 Data Requirements

#### Phase 1 (MVP) - Simulated Data

Initial version will use static/simulated data for demonstration and testing:

- Hardcoded stock prices with random fluctuations
- Sample alerts with timestamp simulation
- Mock news feed with typical headlines
- System clock for market status calculation

#### Phase 2 (Future) - Live Data Integration

Future enhancement to connect with actual data sources:

- Bursa Malaysia API (if available) or web scraping
- Broker API integration (e.g., Rakuten Trade API)
- News RSS feeds (The Edge, Reuters)
- Real-time price feeds via WebSocket or polling

### 4.3 Responsive Design Requirements

- Desktop-first design (primary use case: monitoring on computer during trading hours)
- Mobile-responsive layout for checking on-the-go
- Tablet support for dual-screen setups

---

## 5. User Interface Design

### 5.1 Color Scheme

| Element | Color | Purpose |
|---------|-------|---------|
| Primary Blue | `#3B82F6` | Headers, active tabs, buttons |
| Success Green | `#10B981` | Positive price changes, market open status |
| Danger Red | `#EF4444` | Negative price changes, high alerts, market closed |
| Warning Orange | `#F59E0B` | Medium priority alerts |
| Neutral Gray | `#6B7280` | Text, borders, backgrounds |

### 5.2 Navigation Structure

Tab-based navigation with 5 main sections:

1. **Dashboard** - Overview and quick access
2. **Watchlist** - Detailed stock table
3. **Alerts** - Notification center (with unread badge)
4. **News** - News feed and quick links
5. **Daily Checklist** - Trading routine tracker

---

## 6. Development Phases & Timeline

### 6.1 Phase 1: MVP Development (Week 1-2)

#### Week 1: Core Structure

1. Setup React project with Tailwind CSS
2. Implement tab navigation system
3. Build Dashboard module with market status widget
4. Create Watchlist table with simulated data

#### Week 2: Features & Polish

1. Implement Alert system with mark-as-read functionality
2. Build News feed module
3. Create Daily Checklist with interactive checkboxes
4. Responsive design testing and refinements

### 6.2 Phase 2: Enhancement (Week 3+)

1. Integrate live data sources (broker API, Bursa feeds)
2. Add price alert configuration (custom price levels)
3. Implement data persistence (localStorage for settings)
4. Add charting capability (TradingView integration)
5. Email/push notification system

---

## 7. Success Criteria & Acceptance

### 7.1 Functional Requirements

- All 5 tabs (Dashboard, Watchlist, Alerts, News, Checklist) fully functional
- Market status updates correctly based on system time
- Alert system displays unread count and supports mark-as-read
- Checklist checkboxes maintain state during session
- All external links open in new tabs

### 7.2 Performance Requirements

- Page load time under 3 seconds
- Tab switching instantaneous (under 500ms)
- Responsive on desktop (1920x1080), laptop (1366x768), tablet (768x1024)

### 7.3 User Experience Requirements

- Color-coding intuitive and consistent throughout application
- Icons clearly represent their functions
- All critical information visible without scrolling on desktop
- System feels professional and suitable for financial trading context

---

## 8. Project Deliverables

### 8.1 Code Deliverables

1. Complete React application source code (.jsx files)
2. Package.json with all dependencies listed
3. Tailwind CSS configuration file
4. README.md with setup and run instructions

### 8.2 Documentation

1. User guide (how to use each module)
2. Technical documentation (component structure, data flow)
3. Future enhancement roadmap

### 8.3 Deployment

1. Hosted version (Vercel/Netlify deployment) for immediate testing
2. Local development environment setup instructions

---

## 9. Appendix

### 9.1 Reference Links

- Bursa Malaysia: www.bursamalaysia.com
- The Edge Markets: www.theedgemarkets.com
- Investing.com: www.investing.com
- TradingView: www.tradingview.com

### 9.2 Glossary

- **Bursa Malaysia:** Malaysia's stock exchange
- **KLCI:** Kuala Lumpur Composite Index (main market index)
- **Blue Chip:** Large, established, financially stable companies
- **Pre-Market:** Trading period before market officially opens (8:30-9:00 AM)
- **Gap Up/Down:** Opening price significantly different from previous close
- **Volume Surge:** Unusually high trading activity (2x+ average)

---

## IMPORTANT NOTES FOR DEVELOPMENT

### Critical Features to Implement First

1. **Tab Navigation System** - Foundation for all modules
2. **Market Status Widget** - Shows live clock and open/closed status
3. **Watchlist Table** - Core functionality for stock monitoring
4. **Alert System** - Critical for timely notifications

### Color Coding Standards

```javascript
// Use these exact Tailwind classes for consistency:
- Primary: bg-blue-600, text-blue-600, border-blue-600
- Success: bg-green-500, text-green-600, border-green-500
- Danger: bg-red-500, text-red-600, border-red-500
- Warning: bg-yellow-500, text-yellow-600, border-yellow-500
- Neutral: bg-gray-600, text-gray-600, border-gray-600
```

### Time-Based Logic

```javascript
// Market hours calculation (GMT+8)
const marketOpen = 9; // 9:00 AM
const marketClose = 17; // 5:00 PM

// Check if market is currently open
const hour = new Date().getHours();
const isOpen = hour >= marketOpen && hour < marketClose;
```

### Sample Data Structure

```javascript
// Stock object structure
{
  code: "1155",
  name: "MAYBANK",
  price: 9.85,
  change: 0.05,
  changePercent: 0.51,
  volume: 2150000,
  prevClose: 9.80,
  high: 9.92,
  low: 9.78
}

// Alert object structure
{
  id: 1,
  type: "announcement", // or "price", "volume", "news"
  stock: "MAYBANK",
  title: "Quarterly Earnings Report Q4 2024",
  time: "08:05 AM",
  severity: "high", // or "medium", "low"
  read: false
}
```

---

**END OF PROJECT BRIEF**

*This document serves as the complete specification for the Stock Monitoring System. All requirements, features, and technical details are outlined to enable efficient development with Claude Code.*