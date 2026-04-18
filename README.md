# Academic Portfolio - Nicholas Tochukwu Odey

Academic website for Nicholas Tochukwu Odey, a doctoral student in Engineering Education at Florida International University. This site serves both as a professional homepage and a customized course portfolio for my class.

## Technology Stack

- **HTML5:** Semantic structure.
- **CSS3:** Vanilla CSS leveraging variables for the custom Deep Teal & Warm Gold color palette. Fully responsive (mobile, tablet, desktop).
- **JavaScript:** Vanilla JS for mobile navigation, IntersectionObserver-based smooth scroll-reveal animations, and gamification logic (XP tracking, HUD, modals).
- **Fonts & Icons:** Google Fonts (`Inter`, `Playfair Display`) and Font Awesome (via CDN).

## File Structure

```text
/
├── index.html          # Main homepage (Bio, Research Interests, Digital Logic Sandbox)
├── egs6055.html        # Teaching Portfolio for EGS 6055
├── README.md           # This file
└── assets/
    ├── css/
    │   └── style.css   # Main stylesheet (variables, components, responsive rules)
    ├── js/
    │   ├── main.js     # Scroll animations and navigation logic
    │   └── game.js     # XP system, modal popups, and Logic Sandbox functionality
    ├── images/         # Place your images here
    └── docs/           # Deprecated: Documents are now linked directly via Google Drive URLs
```

## How to Customize & Add Assets

This site is built with placeholders ready for your actual content.

### 1. Profile Picture
Replace the placeholder image in the hero section of `index.html`.
*   Place your photo in the `assets/images/` folder.
*   Rename it to `profile.jpg` (or update the filename in `index.html`).
*   Ensure it is cropped to a square or a circle for best visual results. If no image is provided, an elegant initials avatar (`NTO`) will display automatically as a fallback.

### 2. Social Media Links
The social media icons in the footers of both `index.html` and `egs6055.html` have been pre-populated with your live URLs (LinkedIn, Google Scholar, ResearchGate, GitHub, and Email). If you ever need to change them, modify the corresponding `href` attributes in the `<footer id="contact">` block.

### 3. Adding Documents (Teaching Portfolio)
Instead of serving local files from the `assets/docs` folder, all document buttons and embeds are now driven by **Google Drive** links.
*   When uploading new documents, upload them to Google Drive and copy the "Share" link.
*   Find the relevant download button in `egs6055.html` and paste your Google Drive URL into the `href` attribute.
*   For the **Teaching Demonstration Slides**, the slide deck is natively embedded via an `iframe`. To update it, swap the Google Drive File ID inside the `iframe`'s `src` attribute.

### 4. Gamification & Digital Sandbox
The site features an interactive XP tracker and a Digital Logic Sandbox.
*   Users gain XP by clicking on interactive tags and submitting forms.
*   The Digital Logic Sandbox allows visitors to construct a 3-gate circuit using AND, OR, and XOR logic gates, actively demonstrating STEM concepts.

## Local Development

Since this relies strictly on Vanilla HTML/CSS/JS, no build step is required.
1. Simply double-click on `index.html` to open it in your default web browser.
2. For editing, use any text editor or IDE (Visual Studio Code, Sublime Text, WebStorm). Use an extension like *Live Server* for a smoother development experience.

## Deployment

Because this is a static site without backend requirements, it can be hosted on a variety of free platforms:
*   **GitHub Pages:** Push this repository to GitHub and enable GitHub Pages in the repository settings.
*   **Netlify / Vercel:** Drag and drop this folder into their deploy interface or link it to your GitHub repository for automatic CD/CI.

## Design Identity

*   **Primary:** `#0A5E6D` (Deep Teal)
*   **Accent:** `#E8A838` (Warm Gold)
*   **Dark:** `#0D2B2E` (Dark Teal)
*   **Light:** `#E8F4F5` (Light Ice)

*Learning is an act of becoming.*
