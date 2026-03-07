# Company Directory - Hackathon Video Script

> **Target Duration:** 6-7 minutes (max 8 minutes)
> **Format:** Screen recording with narration (face cam optional)

---

## Segment 1: Introduction (0:00 - 0:45)

**Show:** Title slide or the web part in SharePoint

**Script:**
> "Hi, I'm João Mendes, and this is **Company Directory** — an AI-powered employee directory and organization chart built with SharePoint Framework 1.22.2.
>
> Every organization faces the same challenge: *How do you find the right person with the right skills, fast?* Traditional directories let you search by name — that's it. But what if you could just *ask a question* in natural language and get instant results?
>
> That's exactly what Company Directory does. Let me show you."

---

## Segment 2: Employee Directory — Grid & List Views (0:45 - 2:00)

**Show:** Navigate to the Company Directory web part on a SharePoint page

**Demo Steps:**
1. Show the **Grid View** — responsive card layout, scroll to show infinite scroll loading more users
2. Click a **PersonCard** — point out avatar, job title, department, office, guest badge
3. Open the **Actions menu** on a card — show Chat, Email, Call, Video options
4. Switch to **List View** — show the sortable/resizable data grid
5. Resize a column, sort by Department
6. Scroll down to trigger infinite scroll in list view

**Key points to mention:**
- "100 users per page, loaded seamlessly with infinite scroll"
- "Each card has one-click actions — Teams chat, email, or call"
- "Works in both Grid and List layouts"

---

## Segment 3: AI-Powered Natural Language Search (2:00 - 4:00)

> **This is the star of the demo — spend the most time here**

**Show:** Click on the AI Search input

**Demo Steps:**
1. Type: **"Find all engineers in Seattle"**
   - Show how the AI spinner appears
   - Highlight the generated filter description
   - Show the filtered results
2. Clear and type: **"People with React skills"**
   - Show how it searches the custom Schema Extension fields
   - Explain: "These skills are stored as Microsoft Graph Schema Extensions — custom data on user profiles"
3. Clear and type: **"Managers in the Marketing department"**
   - Show filtering by job title pattern AND department
4. Clear and type: **"Guest users"**
   - Show how it identifies external users

**Key points to mention:**
- "Azure OpenAI translates natural language into Microsoft Graph OData filters"
- "It understands custom schema extension properties — skills, projects"
- "No complex filter UI needed — just ask a question in plain English"
- "The AI returns both the filter AND a human-readable description of what it found"

---

## Segment 4: Organization Chart (4:00 - 5:30)

**Show:** Click the "Organization Chart" tab in the toolbar

**Demo Steps:**
1. Show the default view — your own manager chain, direct reports, and peers
2. Click on a **manager** in the chain — watch the chart re-center on that person
3. Use the **UserPicker** to search for a different employee
4. Show a user with many direct reports — demonstrate **lazy loading** (scroll to load more)
5. Click a **direct report** to navigate into their sub-tree

**Key points to mention:**
- "Full manager chain from the selected user up to the top"
- "Direct reports and peers loaded lazily for performance"
- "Click anyone to navigate — the chart is fully interactive"
- "All data cached in IndexedDB for 2 hours to reduce API calls"



---

## Segment 5: Technical Highlights & Multi-Host (6:30 - 7:15)

**Show:** Quick slide or split-screen of the code / architecture diagram

**Key points to mention:**
- "Built with SPFx 1.21.1, React 17, Fluent UI v9, TypeScript"
- "Jotai for atomic state management — lightweight and efficient"
- "IndexedDB caching with TTL — 2 hours for org data, 7 days for visual assignments"
- "Runs across SharePoint, Teams, Outlook, and Office"
- *(If possible, quickly show the web part in Teams)*

---

## Segment 6: Closing (7:15 - 7:45)

**Script:**
> "Company Directory brings AI-powered search to every organization's people directory. Instead of building complex filters, you just ask a question. Instead of browsing static lists, you explore an interactive org chart.
>
> It's built entirely on SharePoint Framework, Microsoft Graph, and Azure OpenAI — all the pieces of the modern Microsoft 365 platform working together.
>
> Thank you for watching!"

---

## Recording Tips

- **Resolution:** 1920x1080 minimum
- **Audio:** Use a good microphone, quiet room
- **Pre-populate data:** Make sure you have enough test users with diverse departments, locations, skills, and managers
- **Pre-test AI queries:** Verify the demo queries work before recording
- **Browser:** Use Edge or Chrome, zoom to 100-110% for readability
- **Speed:** Don't rush the AI search segment — let the viewer see the query and results
- **Clean environment:** Close notifications, use a clean browser profile

---

## Screenshot Checklist

Take these screenshots for the README and submission:

- [ ] Grid View with multiple employee cards
- [ ] List View with sortable columns
- [ ] AI Search with a query and results
- [ ] Organization Chart with full hierarchy
- [ ] Person Card with actions menu open
- [ ] Schema Manager drawer with skills/projects
- [ ] Web part running in Microsoft Teams (if possible)
