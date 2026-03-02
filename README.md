# Company Directory - AI-Powered Employee Directory & Organization Chart

> **SharePoint Hackathon 2026 Submission** | Categories: *Most Innovative SharePoint Experience with SPFx* & *Best Use of SharePoint in AI Agents*

![SPFx Version](https://img.shields.io/badge/SPFx-1.22.2-green.svg)
![Node.js](https://img.shields.io/badge/Node.js->=22.14.0-green.svg)
![React](https://img.shields.io/badge/React-17.0.1-blue.svg)
![Fluent UI](https://img.shields.io/badge/Fluent%20UI-v9-blue.svg)
![AI Powered](https://img.shields.io/badge/AI-Azure%20OpenAI-purple.svg)
![Heft](https://img.shields.io/badge/Toolchain-Heft-orange.svg)

## Demo Video

> _[Link to hackathon submission video - max 8 minutes]_

<!-- Replace with your YouTube/OneDrive link -->

## Summary

**Company Directory** is a modern, AI-powered SharePoint Framework (SPFx) web part that transforms how organizations discover and connect with their people. It combines a **rich Employee Directory** (grid & list views with infinite scroll) with an **interactive Organization Chart**, all driven by **natural language AI search** powered by Azure OpenAI.

Instead of browsing static lists or manually constructing complex filters, users simply type questions like *"Find me all developers in Porto with React skills"* and the AI translates that into precise Microsoft Graph OData queries — making the entire company directory instantly searchable through conversation.

![Company Directory Overview](docs/images/company-directory-overview.png)

## Problem Statement

In large organizations, finding the right person with the right skills is a daily challenge:

- **Traditional directories** are static, unsearchable beyond basic name lookups
- **Organization hierarchies** are buried in HR systems and hard to navigate
- **Custom user attributes** (skills, projects) are disconnected from the directory
- **Users waste time** clicking through filters instead of asking natural questions

## Solution

Company Directory solves this by combining:

1. **AI-Powered Natural Language Search** — Ask questions in plain English; Azure OpenAI translates them to Graph API queries
2. **Interactive Organization Chart** — Navigate the full management chain with lazy-loaded hierarchy
3. **Rich Employee Cards** — One-click actions: Teams Chat, Email, Phone Call, Video Call
4. **Multi-host support** — Works in SharePoint, Microsoft Teams, Outlook, and Office

## Used SharePoint Framework Version

![version](https://img.shields.io/badge/SPFx-1.21.1-green.svg)

## Applies to

- [SharePoint Framework](https://aka.ms/spfx) v1.22.2
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Microsoft Graph API](https://docs.microsoft.com/en-us/graph/overview) (User.Read.All)
- [Azure OpenAI Service](https://learn.microsoft.com/en-us/azure/ai-services/openai/)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/o365devprogram)

## Prerequisites

- Node.js >= 22.14.0
- Microsoft 365 tenant with Graph API permissions (`User.Read.All`)
- Azure OpenAI endpoint for AI search functionality (optional — directory works without AI)
- SPFx v1.22.2 development environment

## Solution

| Solution           | Author(s)                                                   |
| ------------------ | ----------------------------------------------------------- |
| Company Directory  | João Mendes ([@joaojmendes](https://github.com/joaojmendes)), SPTECK |

## Version history

| Version | Date             | Comments                                         |
| ------- | ---------------- | ------------------------------------------------ |
| 1.0     | March 2, 2026    | SharePoint Hackathon 2026 submission              |

---

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    SharePoint / Teams / Outlook / Office         │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │              CompanyDirectory WebPart (SPFx 1.21.1)       │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │  FluentProvider (v9) + Jotai State + ErrorBoundary  │  │  │
│  │  │  ┌──────────────────┬──────────────────────────┐    │  │  │
│  │  │  │  Employee View   │  Organization Chart      │    │  │  │
│  │  │  │  ┌────────────┐  │  ┌────────────────────┐  │    │  │  │
│  │  │  │  │ AI Search  │  │  │ Manager Chain      │  │    │  │  │
│  │  │  │  │ Control    │  │  │ Selected User      │  │    │  │  │
│  │  │  │  ├────────────┤  │  │ Direct Reports     │  │    │  │  │
│  │  │  │  │ Grid View  │  │  │ Peers              │  │    │  │  │
│  │  │  │  │ List View  │  │  └────────────────────┘  │    │  │  │
│  │  │  │  └────────────┘  │                          │    │  │  │
│  │  │  └──────────────────┴──────────────────────────┘    │  │  │
│  │  └─────────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────┬────────────────────────┬──────────────────────┘
                  │                        │
                  ▼                        ▼
        ┌─────────────────┐     ┌────────────────────┐
        │ Microsoft Graph │     │  Azure OpenAI      │
        │ API             │     │  (AI Assistant)     │
        │ - Users         │     │  - NLP to OData    │
        │ - Photos        │     │  - Filter Query    │
        │ - Manager chain │     │    Generation      │
        │ - Direct Reports│     │                    │
        └─────────────────┘     └────────────────────┘
```

### Technology Stack

| Layer            | Technology                                                        |
| ---------------- | ----------------------------------------------------------------- |
| **Framework**    | SharePoint Framework (SPFx) 1.22.2                               |
| **UI Library**   | Fluent UI React v9 (`@fluentui/react-components`)                |
| **State Mgmt**   | Jotai (atomic state management)                                  |
| **Styling**      | Emotion CSS-in-JS (`@emotion/css`)                               |
| **API Layer**    | Microsoft Graph API v3 (MSGraphClientV3)                         |
| **AI**           | Azure OpenAI via Azure Function proxy                            |
| **Auth**         | AAD Token Provider (SPFx built-in)                               |
| **Caching**      | IndexedDB with TTL (2h org data, 7d color assignments)           |
| **Build**        | Heft (Rush Stack) + Webpack                                      |
| **TypeScript**   | TypeScript 5.8                                                    |

### Component Architecture

```
CompanyDirectoryWebPart (SPFx Entry Point)
  └── CompanyDirectory (Theme + Providers)
        └── CompanyDirectoryControl (Layout Controller)
              ├── ButtonToolBar (Directory / Org Chart toggle)
              │
              ├── [Tab: Employee Directory]
              │   └── EmployeesView
              │         ├── AISearchControl (NLP search input)
              │         ├── GridButtons (Grid/List toggle)
              │         ├── GridView (Card grid + infinite scroll)
              │         │     └── PersonCard (per user)
              │         └── ListView (Data table + infinite scroll)
              │               └── PersonCard (inline actions)
              │
              └── [Tab: Organization Chart]
                  └── OrganizationChart
                        ├── UserPicker (search & select user)
                        ├── RenderManagers (manager chain)
                        ├── RenderSelectedUser (focused user)
                        ├── RenderDirectReports (lazy-loaded grid)
                        └── RenderPeers (colleagues grid)
```

---

## Features

### 1. AI-Powered Natural Language Search

The crown jewel of Company Directory. Users type natural language queries and Azure OpenAI translates them into Microsoft Graph OData filter expressions in real-time.

**How it works:**
- User types: *"Find all developers in Porto with React skills"*
- `AISearchControl` sends the query to Azure OpenAI with a rich system prompt
- AI returns: `{ "filter": "$filter=...", "description": "developers in Porto with React skills" }`  
- The filter is applied to Microsoft Graph Users API
- Results stream into the Grid/List view with a friendly description

**Example queries:**
| Natural Language | Generated Filter |
|---|---|
| *"engineers in Seattle"* | `$filter=city eq 'Seattle' and startsWith(jobTitle,'Engineer')` |
| *"people with TypeScript skills"* | `$filter=extinwbntrw_spUserProfile/skillsline1 eq 'TypeScript' or ...` |
| *"all managers"* | `$filter=endsWith(jobTitle,'Manager')` |
| *"João from IT department"* | `$filter=startsWith(givenName,'João') and department eq 'IT'` |

### 2. Interactive Organization Chart

- Full **manager chain** visualization from selected user up to the CEO
- **Direct reports** grid with lazy loading and infinite scroll
- **Peers** section showing colleagues under the same manager
- **Click-to-navigate**: Click any person to re-center the org chart on them
- **UserPicker** with Graph-backed search to jump to any employee
- Color-coded manager borders with persistent color assignments (cached 7 days)

### 3. Rich Employee Directory

**Two Layouts:**
- **Grid View**: Responsive card grid (`repeat(auto-fill, minmax(260px, 1fr))`) with PersonCards
- **List View**: Sortable/resizable data table with column customization

**Infinite Scroll**: Seamless pagination loading 100 users per page with scroll protection and debouncing.

### 4. Person Card with Quick Actions

Each person card features:
- **Avatar** with live photo from Microsoft 365
- **Key info**: Name, job title, department, office location
- **Guest badge**: Visual indicator for external users
- **One-click actions** via context menu:
  - Teams Chat (deep link)
  - Send Email (mailto)
  - Phone Call (Teams calling or tel: protocol)
  - Video Call (Teams video)
  - LinkedIn profile lookup

### 5. Multi-Host Support

Runs natively in:
- SharePoint Online pages
- Microsoft Teams (tab)
- Outlook
- Office

Automatic theme detection and adaptation (light, dark, high contrast).

### 6. Performance & Caching

- **IndexedDB caching** with configurable TTL (2h for org data, 7h for color assignments)
- **Lazy loading** for organization chart nodes
- **Infinite scroll** with debounced handlers (200ms) and scroll protection (300ms cooldown)
- **Non-blocking photo fetches** — photos load independently of profile data
- **Skeleton loading states** — shimmer animations while data loads

---

## Minimal Path to Awesome

1. Clone this repository
   ```bash
   git clone https://github.com/joaojmendes/CompanyDirectory.git
   cd CompanyDirectory
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Serve locally
   ```bash
   npm run start
   ```
4. Build for production
   ```bash
   npm run build:prod
   ```
5. Deploy the `.sppkg` from `sharepoint/solution/` to your SharePoint App Catalog
7. Approve the Graph API permissions (`User.Read.All`) in SharePoint Admin Center

---

## API Permissions Required

| Permission                    | Type        | Purpose                                    |
| ----------------------------- | ----------- | ------------------------------------------ |
| `User.Read.All`              | Delegated   | Read user profiles, photos, org hierarchy |

---

## Hackathon Categories

### Category: Most Innovative SharePoint Experience with SPFx

This solution demonstrates advanced SPFx capabilities:

- **AI Integration**: Azure OpenAI converts natural language to Graph API filters — going far beyond out-of-the-box search
- **Modern Architecture**: Jotai atomic state management, Emotion CSS-in-JS, Fluent UI v9, custom React hooks
- **Performance Engineering**: IndexedDB caching, lazy loading, infinite scroll, skeleton states, debounced handlers
- **Multi-host**: Runs across SharePoint, Teams, Outlook, and Office with theme adaptation
- **Rich UX**: Org chart navigation, person cards with quick actions, grid/list toggling, responsive design

### Category: Best Use of SharePoint in AI Agents

This solution turns SharePoint into an AI-powered knowledge experience:

- **Azure OpenAI as the brain**: Translates human questions into precise Microsoft Graph queries
- **SharePoint as the grounding layer**: All user data lives in Microsoft 365 / Microsoft Graph, governed by SharePoint/Entra ID policies
- **Smart retrieval**: The AI maps natural language to OData filters for precise results
- **Interactive knowledge experience**: Users discover colleagues, expertise, and organizational structure through conversation

---

## Judging Criteria Alignment

| Criteria (from Official Rules) | Weight | How Company Directory Addresses It |
|---|---|---|
| **Innovation** | 20% | AI-powered NLP search over Microsoft Graph; natural language to OData translation |
| **Real-World Impact** | 20% | Solves the universal problem of finding the right person with the right skills in large orgs; saves time vs. manual filtering |
| **Technical Usability & Solution Quality** | 20% | Production-grade code with TypeScript, error boundaries, logging, caching, skeleton states, responsive design, multi-host |
| **Alignment with Hackathon Category** | 40% | SPFx web part integrating AI (Azure OpenAI) with Microsoft Graph and rich UX beyond OOB |

---

## Project Structure

```
src/
├── index.ts                          # Entry exports
├── atoms/
│   └── appGlobalState.ts             # Jotai atom for global state
├── components/
│   ├── AISearchControl/              # AI-powered NLP search input
│   ├── CompanyDirectory/             # Root component + layout
│   ├── EmployeesView/                # Directory view container
│   ├── GridView/                     # Card grid with infinite scroll
│   ├── ListView/                     # Data table with infinite scroll
│   ├── OrganizationChart/            # Org chart view
│   ├── PersonCard/                   # Reusable person card + actions
│   ├── GridButtons/                  # Grid/List layout toggle
│   ├── RenderManagers/               # Manager chain renderer
│   ├── RenderSelectedUser/           # Focused user renderer
│   ├── RenderDirectReports/          # Direct reports grid
│   ├── RenderPeers/                  # Peers grid
│   ├── RenderNoUsers/                # Empty state
│   ├── RenderAttribute/              # Reusable attribute display
│   ├── UserPicker/                   # People picker with Graph search
│   └── toolbar/                      # Generic overflow toolbar
├── constants/
│   ├── constants.ts                  # API endpoints, page size, sortable fields
│   ├── EAppHostName.ts               # Host environment enum
│   ├── ECardActions.ts               # Card action types
│   └── EMessageTypes.ts              # Message types enum
├── hooks/
│   ├── useAccessToken.ts             # AAD token provider
│   ├── useAzureOpenAI.ts             # Azure OpenAI API integration
│   ├── useCacheManager.ts            # IndexedDB cache management
│   ├── useCardActions.ts             # Teams chat/email/call/video actions
│   ├── useGraphAPIs.ts               # Microsoft Graph API operations
│   ├── useOrganizationChartData.ts   # Org chart data management
│   └── useUtils.ts                   # AI response parser, colors, utilities
├── models/
│   ├── IAppGlobalState.ts            # Global state interface
│   └── IUserData.ts                  # User, Manager, DirectReport, OrgNode types
├── openAI/
│   └── instructions.ts               # AI system prompt for NLP-to-OData
└── webparts/
    └── companyDirectory/
        └── CompanyDirectoryWebPart.ts # SPFx web part entry point
```

---

## References

- [SharePoint Framework](https://aka.ms/spfx) — SPFx documentation
- [Microsoft Graph API](https://docs.microsoft.com/en-us/graph/overview) — Graph API reference
- [Azure OpenAI Service](https://learn.microsoft.com/en-us/azure/ai-services/openai/) — AI service
- [Fluent UI React v9](https://react.fluentui.dev/) — UI component library
- [Jotai](https://jotai.org/) — Atomic state management
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) — Community guidance
- [SharePoint Hackathon 2026](https://github.com/SharePoint/sharepoint-hackathon) — Official hackathon repository

---

## Disclaimer

**THIS CODE IS PROVIDED _AS IS_ WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**
