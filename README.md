Steadfast - Men's Mental Health Content Hub

<div align="center">
A comprehensive web application designed to support men's mental health through curated content and interactive tools.

Features • Demo • Installation • Usage • Contributing

</div>

🌟 About Steadfast

Steadfast is a mental wellness platform specifically designed for men, providing access to curated videos, recommended reading, and interactive mental health games. Our mission is to break down barriers to mental health support and provide practical tools that fit into men's daily lives.

Important: This application is designed to support mental wellness, not replace professional help. If you're experiencing a mental health crisis, please contact a licensed professional or emergency services.

🚀 Features

📚 Recommended Books

· Evidence-Based Selection: Books chosen for their impact on men's mental health
· Beautiful Display: Book cover images with elegant card layouts
· Direct Links: Easy access to purchase or learn more about each book
· Categories: Masculinity, Vulnerability, Purpose, Trauma, Self-Acceptance

🎮 Interactive Mental Health Games

· 6 Fully Playable Games designed by mental health principles:

Game Purpose Key Features
Breathing Exercise Stress reduction 4-7-8 technique, visual guidance, progress tracking
Mood Tracker Emotional awareness Daily logging, pattern recognition, journaling
Gratitude Journal Positive mindset Three-thing practice, persistent storage, history
Mindfulness Bell Regular practice Customizable intervals, random prompts
Positive Affirmations Self-esteem building Customizable library, progress tracking
Stress Wave Visual stress release Interactive visualization, breathing sync


Live Demo: Coming Soon

🛠️ Installation

Prerequisites

· Modern web browser (Chrome, Firefox, Safari, Edge)
· Local web server (for video playback)
· Basic understanding of HTML/CSS/JavaScript

Quick Start

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/steadfast.git
   cd steadfast
   ```
2. Set up the project structure
   ```bash
   # Create necessary directories
   mkdir videos book-covers
   ```
3. Add your content
   · Place video files in /videos/
   · Add book cover images to /book-covers/
   · Update file paths in content.js
4. Run locally
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```
5. Open in browser
   ```
   http://localhost:8000/content.html
   ```

📁 Project Structure

```
steadfast/
├── 📄 content.html          # Main application file
├── 🎨 style.css             # Complete styling and responsive design
├── ⚡ content.js            # Game logic and interactive features
├── 📚 books-data.js         # Book recommendations and metadata
├── 🎥 videos/               # Local video storage
│   ├── depression-awareness.mp4
│   ├── anger-management.mp4
│   └── ...
├── 📖 book-covers/          # Book cover images
│   ├── mask-of-masculinity.jpg
│   ├── daring-greatly.jpg
│   └── ...
├── 📄 README.md            # Project documentation
└── 🖼️ screenshots/         # Application screenshots
```

💻 Usage

Adding Your Content

Videos:

1. Add MP4 files to /videos/ directory
2. Update the videos array in content.js:
   ```javascript
   {
       title: "Understanding Male Depression",
       duration: "18:42",
       category: "Depression",
       description: "Learn about depression signs in men...",
       placeholderText: "Depression Awareness",
       videoFile: "videos/depression-awareness.mp4"
   }
   ```

Books:

1. Add cover images to /book-covers/
2. Update the books array in content.js:
   ```javascript
   {
       title: "The Mask of Masculinity",
       author: "Lewis Howes",
       category: "Masculinity",
       description: "Break free from stereotypes...",
       coverImage: "book-covers/mask-of-masculinity.jpg",
       bookUrl: "https://amazon.com/dp/BOOK_ID"
   }
   ```

Customizing the Design

Modify CSS variables in style.css:

```css
:root {
    --primary: #1a365d;    /* Main brand color */
    --secondary: #2d3748;  /* Secondary color */
    --accent: #3182ce;     /* Accent color */
    --light: #f7fafc;      /* Light background */
    --dark: #2d3748;       /* Text color */
}
```

🔧 Technologies Used

· Frontend: HTML5, CSS3, JavaScript (ES6+)
· Storage: Browser LocalStorage
· Multimedia: HTML5 Video, Canvas API
· Design: CSS Grid, Flexbox, Responsive Design
· Icons: Emoji and Unicode Symbols

🌐 Browser Support

Browser Version Support
Chrome 60+ ✅ Full
Firefox 55+ ✅ Full
Safari 12+ ✅ Full
Edge 79+ ✅ Full
Mobile Browsers Recent ✅ Full

🚀 Deployment

Static Hosting (Recommended)

· Netlify: Drag and drop the folder
· Vercel: Connect your GitHub repository
· GitHub Pages: Enable in repository settings

Self-Hosting

```bash
# Using Apache
sudo cp -r steadfast /var/www/html/

# Using Nginx
sudo cp -r steadfast /usr/share/nginx/html/
```

🤝 Contributing

We welcome contributions to make Steadfast better! Here's how you can help:

Ways to Contribute

1. Add New Games: Create additional mental health exercises
2. Improve UI/UX: Enhance the user interface and experience
3. Add Content: Suggest new videos or books
4. Bug Fixes: Identify and fix issues
5. Documentation: Improve documentation and tutorials

Contribution Process

1. Fork the repository
2. Create a feature branch (git checkout -b feature/amazing-feature)
3. Commit your changes (git commit -m 'Add amazing feature')
4. Push to the branch (git push origin feature/amazing-feature)
5. Open a Pull Request

Development Guidelines

· Follow existing code style
· Test on multiple browsers
· Ensure mobile responsiveness
· Update documentation as needed

📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

🆘 Support

Technical Support

· Issues: GitHub Issues
· Email: edmonthird5@gmail.com
· Documentation: Wiki



🙏 Acknowledgments

· Mental health professionals who provided guidance on content selection
· Contributors and testers who helped refine the user experience
· The open-source community for invaluable tools and resources
· Men who shared their mental health journeys and needs

📊 Analytics (Optional)

To track usage (if desired), add Google Analytics or similar:

```html
<!-- Add to content.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

🔮 Roadmap

Version 1.1 (Next Release)

· User accounts and progress sync
· Additional mental health games
· Video upload interface
· Mobile app version

Future Features

· Community features
· Professional directory
· Multi-language support
· Advanced analytics
· API for content management

---

<div align="center">

Built with ❤️ for men's mental health

If this project helps you, please give it a ⭐!

Report Bug • Request Feature

</div>
