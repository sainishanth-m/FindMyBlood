# FindMyBlood - Components

This folder contains reusable HTML components for the FindMyBlood website.

## Available Components

| Component | File | Description |
|-----------|------|-------------|
| Navbar | `navbar.html` | Navigation bar with logo and menu links |
| Footer | `footer.html` | Page footer |
| Head | `head.html` | Common `<head>` content (meta, fonts, CSS) |
| Hero Section | `hero-section.html` | Main hero section with video |

## Usage

Since this is a static HTML website, these component files serve as **templates**. To use them:

1. Open the component file you need
2. Copy the HTML content
3. Paste it into your new page at the appropriate location

### Example: Creating a New Page

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Copy content from head.html, update the title -->
</head>
<body>
    <!-- Copy navbar.html content here -->
    
    <!-- Your page content here -->
    
    <!-- Copy footer.html content here -->
    
    <script src="../js/script.js"></script>
</body>
</html>
```

## Folder Structure

```
src/
├── components/
│   ├── navbar.html
│   ├── footer.html
│   ├── head.html
│   ├── hero-section.html
│   └── README.md
├── css/
├── js/
├── pages/
├── assets/
└── data/
```

## Notes

- Update relative paths (e.g., `../css/`, `../assets/`) based on your page location
- The navbar links use `index.html` as the home page reference
