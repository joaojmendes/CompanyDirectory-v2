# Company Directory — Hackathon Demo Video Script

> **Target Duration:** 3–4 minutes  
> **Format:** Screen recording with voiceover  
> **Tool:** QuickTime (`Cmd+Shift+5`) or OBS + your mic  
> **Resolution:** 1920x1080, browser zoom 110%

---

## Before You Record

1. Open Edge/Chrome with a clean profile (no bookmarks bar, no notifications)
2. Navigate to `https://spteckm365dev.sharepoint.com/SitePages/Company-Directory.aspx`
3. Make sure the web part is fully loaded with users visible
4. Pre-test these AI queries to confirm they return results:
   - "Find all engineers in Porto"
   - "Managers in the Marketing department"
   - "Guest users"
5. Close all other tabs, silence notifications

---

## Segment 1: Hook + Grid View (0:00 – 0:40)

**On screen:** Grid View loaded with employee cards

**Say:**
> "This is Company Directory — an AI-powered people directory built with SharePoint Framework 1.22.2, Fluent UI v9, and Azure OpenAI.
>
> You're looking at the employee directory in Grid View. Each card shows the person's name, job title, department, and office location — all pulled live from Microsoft Graph.
>
> Cards load automatically as you scroll — 100 at a time with infinite scroll."

**Do:**
- Slowly scroll down to trigger infinite scroll (show the progress bar loading)
- Pause to let the viewer see cards populating

---

## Segment 2: Card Actions + List View (0:40 – 1:15)

**Say:**
> "Every card has a quick actions menu."

**Do:**
- Click the three-dot menu on a card
- Point to: "Start a chat, send an email, make a call, start a video call — all integrated with Microsoft Teams."
- Close the menu

**Say:**
> "You can also switch to a List View for a denser, data-grid experience."

**Do:**
- Click the List icon (top right, next to search)
- Show the list with columns: Name, Email, Department, Mobile, Office, User Type
- Scroll down briefly to show infinite scroll works here too

---

## Segment 3: AI-Powered Search — THE STAR (1:15 – 2:30)

> **This is the most important segment. Go slow. Let the viewer read the query and results.**

**Say:**
> "Now the feature that sets this apart — AI-powered natural language search."

**Do:**
- Click on the search bar (pill-shaped, with AI icon)

**Say:**
> "Instead of building filters, you just type a question in plain English. Azure OpenAI translates it into a Microsoft Graph OData query behind the scenes."

**Demo Query 1:**
- Type: **"Find all engineers in Porto"**
- Wait for results to appear
- Say: *"The AI understood 'engineers' maps to the job title field and 'Porto' maps to the office location. No filter dropdowns needed."*

**Demo Query 2:**
- Clear the search, type: **"Managers in the Marketing department"**
- Wait for results
- Say: *"It combines job title pattern matching with department filtering — something that would normally require a multi-field form."*

**Demo Query 3:**
- Clear the search, type: **"Guest users"**
- Wait for results
- Say: *"It even identifies external users by their user type. Any question you can think of, just ask."*

---

## Segment 4: Organization Chart (2:30 – 3:20)

**Do:**
- Click the **"Org. Chart"** tab

**Say:**
> "The second major feature is the interactive organization chart."

**Do:**
- Show the default view: President at the top, direct reports below
- Say: *"It starts from the top of the organization. Each person shows their direct report count."*

**Do:**
- Click on a manager card (e.g., Lucas Gallagher) to drill in
- Say: *"Click anyone to drill into their team. The chart re-centers and loads their direct reports."*

**Do:**
- Use the **UserPicker** (search box, top right) — type a name and select
- Say: *"Or search for anyone in the organization and jump directly to their position in the hierarchy."*

**Do:**
- Click the "Directory" tab to go back
- Say: *"All organization data is cached in IndexedDB to keep navigation fast and reduce API calls."*

---

## Segment 5: Closing (3:20 – 3:45)

**Say:**
> "Company Directory is built entirely on the Microsoft 365 platform — SharePoint Framework 1.22.2 with the new Heft toolchain, React 17, Fluent UI v9, Jotai for state management, and Azure OpenAI for the intelligence layer.
>
> It runs across SharePoint, Microsoft Teams, Outlook, and Office — adapting its theme to each host.
>
> Instead of building complex filters, just ask a question. Instead of browsing static lists, explore an interactive org chart.
>
> Thank you for watching."

---

## Timing Summary

| Segment | Duration | Content |
|---|---|---|
| 1. Hook + Grid | 40s | Grid view, infinite scroll |
| 2. Actions + List | 35s | Card menu, list view toggle |
| 3. AI Search | 75s | 3 natural language queries |
| 4. Org Chart | 50s | Drill-down, search, caching |
| 5. Closing | 25s | Tech stack, multi-host, sign-off |
| **Total** | **~3:45** | |

---

## Pro Tips for Recording

- **Pace:** Speak slightly slower than normal. Screen recordings feel faster to viewers.
- **Mouse movement:** Move your cursor deliberately. Don't dart around — guide the viewer's eye.
- **Pause after each AI query:** Give 2-3 seconds for results to populate before speaking about them.
- **If you make a mistake:** Just pause, then re-say the line. You can trim it in iMovie later.
- **Ending:** Hold the final frame for 3 seconds before stopping the recording.

---

## Screenshot Checklist (for README / submission)

- [ ] Grid View with multiple employee cards
- [ ] List View with sortable columns
- [ ] AI Search with query and filtered results
- [ ] Organization Chart — top-level with direct report counts
- [ ] Organization Chart — drilled into a manager's team
- [ ] Person Card with actions menu open
- [ ] Web part running in Microsoft Teams (if possible)
