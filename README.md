# Academic Portfolio - Nicholas Tochukwu Odey

A clean, modern, and professional academic portfolio website built for Nicholas Tochukwu Odey, a doctoral candidate in Engineering Education at Florida International University. This site serves both as a professional homepage and a customized course portfolio for EGS 6055.

## Technology Stack

- **HTML5:** Semantic structure.
- **CSS3:** Vanilla CSS leveraging variables for the custom Deep Teal & Warm Gold color palette. Fully responsive (mobile, tablet, desktop).
- **JavaScript:** Vanilla JS for mobile navigation and IntersectionObserver-based smooth scroll-reveal animations. No heavy frameworks.
- **Fonts & Icons:** Google Fonts (`Inter`, `Playfair Display`) and Font Awesome (via CDN).

## File Structure

```text
/
├── index.html          # Main homepage (Bio, Research Interests, Projects)
├── egs6055.html        # Teaching Portfolio for EGS 6055
├── README.md           # This file
└── assets/
    ├── css/
    │   └── style.css   # Main stylesheet (variables, components, responsive rules)
    ├── js/
    │   └── main.js     # Scroll animations and navigation logic
    ├── images/         # Place your images here
    └── docs/           # Place your PDF documents here
```

## How to Customize & Add Assets

This site is built with placeholders ready for your actual content.

### 1. Profile Picture
Replace the placeholder image in the hero section of `index.html`.
*   Place your photo in the `assets/images/` folder.
*   Rename it to `profile.jpg` (or update the filename in `index.html`).
*   Ensure it is cropped to a square or a circle for best visual results. If no image is provided, an elegant initials avatar (`NTO`) will display automatically as a fallback.

### 2. Social Media Links
In the footer of both `index.html` and `egs6055.html`, you will find social media icons.
*   Find the `href="#"` attributes within the `<footer id="contact">` block.
*   Replace `#` with your actual URLs (e.g., your LinkedIn profile, Google Scholar link, ResearchGate link, GitHub, and `mailto:` link for your email).

### 3. PDF Documents (Teaching Portfolio)
The `egs6055.html` page has multiple download buttons expecting specific PDF files.
*   Place your PDFs in the `assets/docs/` folder.
*   Ensure the filenames match the placeholders linked in the HTML, or update the HTML to match your filenames.
Expected filenames based on placeholders:
    *   `theory_of_learning.pdf`
    *   `teaching_philosophy.pdf`
    *   `response_paper_1.pdf`
    *   `response_paper_2.pdf`
    *   `situational_factors.pdf`
    *   `lesson_plan.pdf`
    *   `teaching_demo_slides.pdf`
    *   `pre_class_reading.pdf`
    *   `exit_reflection.pdf`
    *   `combined_handout.pdf`

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
