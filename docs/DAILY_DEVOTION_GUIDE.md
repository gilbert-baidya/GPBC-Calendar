# Daily Devotion Feature - Implementation Guide

## Overview

The Daily Devotion feature has been successfully added to the Grace and Praise Bangladeshi Church website. This guide explains how the feature works and how to integrate dynamic content.

---

## What Was Added

### 1. Navigation Updates
✅ **Header Navigation** - "Daily Devotion" menu item added to all pages
- Position: Between "Prayer" and "Give" menu items
- Link: `/daily-devotion.html`
- Active state highlighting when on the Daily Devotion page

✅ **Footer Quick Links** - "Daily Devotion" link added to all page footers
- Icon: 📖
- Maintains consistent styling with existing links

### 2. New Page Created

**File:** `daily-devotion.html`

**Features:**
- Clean, reverent design matching the church website aesthetic
- Mobile-responsive layout
- Fully accessible (keyboard navigation, screen reader friendly)
- Simple share buttons (Facebook, WhatsApp, Copy Link) below Scripture
- Previous/Next devotion navigation
- Graceful fallback message when content is unavailable

---

## Page Structure

The Daily Devotion page includes:

1. **Hero Section**
   - Page title: "Daily Devotion"
   - Subtitle: "A Daily Word from Scripture"
   - Date display

2. **Scripture Section** 📖
   - Bible reference (e.g., "John 3:16")
   - Bible verse text (formatted as blockquote)

3. **Reflection Section** 💭
   - Devotional message/meditation

4. **Prayer Section** 🙏
   - Closing prayer

5. **Share Section**
   - Social media sharing buttons
   - Copy link functionality

---

## Content Placeholders

The page uses the following placeholders that can be replaced with actual content:

```
{{devotion_date}}          → e.g., "Wednesday, January 1, 2026" (auto-generated)
{{bible_reference}}        → e.g., "Philippians 4:6-7"
{{bible_text}}             → Full Bible verse text
{{devotion_message}}       → Reflection/meditation text
{{devotion_prayer}}        → Closing prayer
{{devotion_image_url}}     → URL to daily devotion image
{{devotion_image_alt}}     → Alt text for the image (accessibility)
{{previous_devotion_url}}  → Link to previous day's devotion
{{next_devotion_url}}      → Link to next day's devotion
```

**Note:** Date is auto-generated via JavaScript. Images have a default fallback if not provided. Navigation buttons are disabled if URLs are not provided.

---

## How to Integrate Dynamic Content

### Option 1: Server-Side Template Rendering
Replace placeholders server-side before serving the page (PHP, Node.js, Python, etc.)

### Option 2: JavaScript API Call
The page includes a `loadDevotionContent()` function ready for backend integration:

```javascript
// Example: Backend sends JSON data
window.loadDevotionContent({
    date: 'Wednesday, January 1, 2026',
    bibleReference: 'Philippians 4:6-7',
    bibleText: 'Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.',
    message: 'Today we are reminded that worry and anxiety have no place in the life of a believer...',
    prayer: 'Heavenly Father, thank You for Your promise of peace that surpasses understanding...'
});
```

### Option 3: Static Content Management
Use a CMS (like Netlify CMS, already set up in `/admin/config.yml`) to manage devotional content.

### Option 4: Manual Daily Update
Simply edit the HTML file daily and replace the placeholder text with today's devotion.

---

## Fallback Behavior

When content is unavailable (placeholders not replaced), the page shows a graceful fallback message with Scripture and links to other church resources.

This ensures visitors never see technical errors or placeholder text.

---

## Social Sharing

### How It Works

Each share button creates a pre-formatted message including the Bible reference, devotion excerpt, and page URL.

**Format:**
```
Today's Devotion – [Bible Reference]

[First 100 characters of message]...

Read more: [Page URL]
```

**Platforms Supported:**
- ✅ WhatsApp (mobile + desktop)
- ✅ Facebook
- ✅ X (Twitter)
- ✅ Email
- ✅ Copy link to clipboard

### Share Tracking (Optional Enhancement)
To track shares, you can modify the share URLs to include UTM parameters:

```javascript
const pageUrl = encodeURIComponent(window.location.href + '?utm_source=social&utm_medium=share');
```

---

## SEO Optimization

The page includes:
- ✅ Proper meta tags (title, description)
- ✅ Open Graph tags (Facebook sharing)
- ✅ Twitter Card tags
- ✅ Canonical URL
- ✅ Semantic HTML structure
- ✅ Proper heading hierarchy (H1 → H2 → H3)

---

## Accessibility Features

- ✅ Keyboard navigable (Tab, Enter, Arrow keys)
- ✅ Screen reader friendly (aria-labels, semantic HTML)
- ✅ Focus indicators
- ✅ High contrast text
- ✅ Skip to main content link
- ✅ Proper button labels

---

## Mobile Responsive

The page automatically adapts to:
- 📱 Mobile phones (320px+)
- 📱 Tablets (768px+)
- 💻 Desktop (1024px+)

---

## Maintenance & Updates

### Daily Content Update Process

1. **Manual Method:**
   - Edit `daily-devotion.html`
   - Replace placeholders with today's content
   - Save and deploy

2. **Automated Method (Recommended):**
   - Set up a scheduled job (cron, GitHub Actions, Netlify Functions)
   - Fetch devotional content from a database or API
   - Replace placeholders programmatically
   - Deploy automatically

### Content Guidelines

**Bible Reference:**
- Format: Book Chapter:Verse (e.g., "John 3:16-17")
- Use standard Bible abbreviations

**Bible Text:**
- Include full verse(s)
- Specify translation if desired (e.g., NIV, ESV)

**Devotion Message:**
- Length: 200-500 words
- Tone: Pastoral, encouraging, Scripture-focused
- Structure: Context → Application → Encouragement

**Prayer:**
- Length: 50-150 words
- Address to "Heavenly Father" or "Lord"
- Close with "In Jesus' name, Amen"

---

## Testing Checklist

- ✅ Navigation links work from all pages
- ✅ Footer links work from all pages
- ✅ Page loads correctly on mobile
- ✅ Share buttons open correct platforms
- ✅ Copy link button works
- ✅ Active state shows on menu when on page
- ✅ Fallback message displays when content unavailable

---

## Future Enhancements (Optional)

1. **Archive/Calendar View**
   - Browse past devotions by date
   - Search devotions by topic or Bible book

2. **Email Subscription**
   - Daily devotion delivered via email
   - Subscribe form integration

3. **Audio Devotion**
   - Text-to-speech or recorded audio
   - Play button for listening

4. **Multiple Languages**
   - Bengali translation toggle
   - Support for bilingual content

5. **Comments/Reflections**
   - Allow members to share thoughts
   - Moderated discussion section

---

## Support & Questions

For technical support or questions about the Daily Devotion feature, contact your web developer or refer to the main `docs/` folder in the project.

---

**Built with ❤️ for God's glory**

*Grace and Praise Bangladeshi Church*
*1325 Richardson Street, San Bernardino, CA 92408*
