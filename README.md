# KidsInAITech — Web Application Development I

A multi-page, responsive student-project prototype based on the KidsInAITech nonprofit scenario and your group's Milestone I presentation.

## Files

- `index.html` — home, program previews, mission, family/supporter tabs, FAQs
- `programs.html` — four proposed program concepts; category filters and a demo interest dialog
- `about.html` — mission, purpose, accessibility and learning approach
- `get-involved.html` — volunteer and community-support information
- `contact.html` — a functioning *front-end-only* inquiry-draft form
- `styles.css` — sitewide responsive design
- `script.js` — mobile menu, interactive content, program filters, modal, and draft-copy forms
- `assets/` — original SVG illustrations (not copied from another nonprofit)

## How to preview

Open `index.html` in a web browser. All links use relative paths, so the project also works at the `/KidsInAITech/` repository path on GitHub Pages.

For a local server (optional):

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Publish to the existing GitHub repository

1. Open your `henoktilahun2007/KidsInAITech` repository on GitHub.
2. Upload the **contents** of this folder to the **root** of the repo (not an extra nested `KidsInAITech-Website` folder). Replace the existing placeholder `index.html`.
3. Commit the changes. In **Settings → Pages**, choose **Deploy from a branch**, `main`, `/ (root)`, and save if not already enabled.
4. After publishing, open: `https://henoktilahun2007.github.io/KidsInAITech/`.

### Critical project limitation

This is a *classroom website prototype*. It does **not** accept real payments, process registration, send contact inquiries, or save personal information to a server. On the Programs page, the demo interest form creates a message that can be copied. On the Contact page, the form does the same. No claims of operational camp schedules, availability, pricing, impact numbers, or verified partners are made. Replace these with confirmed facts and an approved backend only if your instructor explicitly requires them.

## Presentation walkthrough

Open the website and show, in order:

1. The homepage and immediate access to **Programs**, **Our mission**, and **Get involved**.
2. **Programs**, showing filters for workshops, camps, and after-school offerings.
3. Click **I'm interested** to demonstrate the prototype form (and explain it is *not* a live registration service).
4. Navigate to **Get involved** to show volunteer and supporter routes.
5. Narrow the browser window to demonstrate a mobile-friendly menu.

## What you can say about the design

- Modern, colorful visual identity based on a child-friendly education setting.
- Clear navigation for the distinct audiences of parents, volunteers, and potential donors.
- Site structure and program cards respond to the problem of relying on flyers, school partnerships and local events to communicate the mission.
- Accessibility features include semantic page sections, heading hierarchy, visible keyboard focus, form labels, responsive design, keyboard-accessible disclosure/interaction, and reduced-motion support.
- Future work: verified program descriptions, real registration integration, secure donation provider, privacy notice, actual organizational contact details, and usability testing.

This class website is not affiliated with the separate nonprofit **Kids In Tech** (`kidsintech.org`) used as a design reference in the slides. The illustrations in this folder are original SVGs. Fonts use Google Fonts online where available and fall back to system fonts offline.
