# GPBC Content Management Guide

## Overview

This website uses a **simple JSON-based content management system** that allows you to update key content without editing HTML files. This is safer, easier, and reduces the risk of breaking the website.

---

## How It Works

1. **content.json** - Stores all editable content (service times, messages, addresses)
2. **content-manager.js** - Automatically loads and applies content from JSON
3. **HTML files** - Contain fallback text in case JSON fails to load

**Safety First:** HTML always has backup text, so the site never breaks if JSON has issues.

---

## Updating Content

### Step 1: Open content.json

Navigate to your repository and open `content.json` file.

### Step 2: Edit the Values

Only change the **values** (text in quotes), not the structure:

```json
{
  "church": {
    "name": "Grace and Praise Bangladeshi Church",  ← Edit this
    "tagline": "✨ New tagline here! ✨"              ← Edit this
  }
}
```

### Step 3: Save and Commit

- Save the file
- Commit with message: "Update content: [what you changed]"
- Push to GitHub
- Wait 1-2 minutes for GitHub Pages to rebuild

### Step 4: Verify Changes

- Visit your website
- Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
- Check that changes appear correctly

---

## What Can You Edit?

### ✅ Church Information

```json
"church": {
  "name": "Grace and Praise Bangladeshi Church",
  "shortName": "GPBC",
  "tagline": "✨ Passion for God, Compassion for People! ✨",
  "address": {
    "fullAddress": "1325 Richardson Street, CA 92408"
  }
}
```

**Where it appears:**
- Homepage hero section
- Plan visit page
- Footer
- Meta tags

---

### ✅ Service Times

```json
"services": {
  "sunday": {
    "name": "Sunday Worship Service",
    "time": "5:00 PM",
    "duration": "90 minutes",
    "displayText": "Every Sunday at 5:00 PM"
  }
}
```

**Where it appears:**
- Homepage "Next Service" banner
- Plan visit page service info

---

### ✅ Welcome Messages

```json
"homepage": {
  "welcomeTitle": "Welcome Home",
  "welcomeSubtitle": "We are a vibrant community..."
}
```

**Where it appears:**
- Homepage welcome section

---

### ✅ Plan Visit Page Content

```json
"planVisit": {
  "heroSubtitle": "We're so glad you're thinking about visiting...",
  "videoCaption": "A short welcome from our church family.",
  "postVideoInvitation": "If you feel led, we would love to meet you..."
}
```

**Where it appears:**
- Plan visit page hero
- Video section
- Post-video invitation

---

### ✅ Footer Information

```json
"footer": {
  "copyright": "© 2025 Grace and Praise Bangladeshi Church. All rights reserved.",
  "email": "info@gracepraise.church"
}
```

**Where it appears:**
- Footer on all pages
- Contact links

---

### ✅ Statistics

```json
"stats": {
  "members": 500,
  "eventsPerYear": 52,
  "yearsServing": 15,
  "lovePercentage": 100
}
```

**Where it appears:**
- Homepage stats section

---

## Important Rules

### ✅ DO:
- Edit text values (content inside quotes)
- Update numbers for stats
- Change service times
- Update email addresses
- Add emojis 🎉 for visual appeal

### ❌ DON'T:
- Remove commas or brackets `{ } [ ]`
- Delete quote marks `" "`
- Change property names (`"church"` should stay `"church"`)
- Remove the `_comment` and `_instructions` fields (they're helpful!)
- Edit multiple things at once (make small, incremental changes)

---

## Common Tasks

### Change Service Time

1. Open `content.json`
2. Find `"services"` → `"sunday"` → `"time"`
3. Change value: `"5:00 PM"` → `"6:00 PM"`
4. Update `"displayText"` too: `"Every Sunday at 6:00 PM"`
5. Save and commit

### Update Welcome Message

1. Open `content.json`
2. Find `"homepage"` → `"welcomeSubtitle"`
3. Edit the text
4. Keep it under 200 characters for best display
5. Save and commit

### Change Church Address

1. Open `content.json`
2. Find `"church"` → `"address"` → `"fullAddress"`
3. Update the address
4. Also update `"mapsUrl"` with new Google Maps link
5. Save and commit

---

## Troubleshooting

### Changes Don't Appear

**Solution 1: Hard Refresh**
- Windows/Linux: `Ctrl + Shift + R`
- Mac: `Cmd + Shift + R`
- This clears the 5-minute cache

**Solution 2: Force Content Refresh**
- Open browser console (F12)
- Type: `GPBC.refreshContent()`
- Press Enter
- This reloads content immediately

**Solution 3: Check JSON Syntax**
- Use a JSON validator: https://jsonlint.com/
- Copy/paste your content.json
- Fix any errors shown
- Common errors: missing commas, extra commas, unmatched quotes

### Website Shows Old Content

**Cause:** Browser cache or GitHub Pages hasn't rebuilt yet

**Solution:**
1. Wait 2-3 minutes after pushing changes
2. Hard refresh your browser
3. Check GitHub Actions tab to see if build completed
4. Try incognito/private browsing mode

### JSON Validation Errors

**Error:** "Unexpected token"
- Missing or extra comma
- Unmatched quotes

**Error:** "Expected property name"
- Missing quote mark around property name

**Fix:** Use https://jsonlint.com/ to find and fix the error

---

## Bilingual Content

**Note:** The JSON file only updates **English content**. Bengali translations are still in HTML and need manual updates.

To update Bengali content:
1. Edit the HTML file directly
2. Look for `<span data-lang="bn">` tags
3. Update Bengali text inside
4. Keep English JSON and Bengali HTML in sync

---

## Safety Features

### Automatic Fallback
If `content.json` fails to load (syntax error, network issue, etc.):
- Website automatically uses HTML fallback text
- No broken pages or missing content
- Error logged to browser console for debugging

### Content Caching
- Content cached for 5 minutes in browser
- Reduces server requests
- Improves page load speed
- Can be cleared manually with `GPBC.refreshContent()`

### Data Validation
- Script checks if content exists before updating
- Original HTML text preserved as fallback
- Safe error handling prevents crashes

---

## Advanced: Manual Content Refresh

For immediate content updates during testing:

1. Open browser console (F12)
2. Run: `GPBC.refreshContent()`
3. Content reloads from JSON immediately

This bypasses the 5-minute cache.

---

## File Structure

```
gracepraise.church/
├── content.json          ← Edit this file to update content
├── content-manager.js    ← Don't edit (script that loads content)
├── index.html           ← Fallback text preserved here
├── plan-visit.html      ← Fallback text preserved here
└── CONTENT_MANAGEMENT.md ← This guide
```

---

## Best Practices

1. **Make small changes** - Update one thing at a time
2. **Test locally first** - If possible, test on local copy before pushing
3. **Keep backups** - Save a copy of working content.json before major changes
4. **Document changes** - Use clear commit messages
5. **Validate JSON** - Always check syntax before committing

---

## Getting Help

If content updates aren't working:

1. Check browser console for errors (F12)
2. Validate JSON syntax at https://jsonlint.com/
3. Review this guide for common mistakes
4. Check GitHub Actions for build errors
5. Restore previous version if needed

---

## Example: Complete Content Update

**Goal:** Update Sunday service time from 5:00 PM to 6:00 PM

**Steps:**

1. Open `content.json` in GitHub editor
2. Find the section:
   ```json
   "sunday": {
     "time": "5:00 PM",
     "displayText": "Every Sunday at 5:00 PM"
   }
   ```
3. Change to:
   ```json
   "sunday": {
     "time": "6:00 PM",
     "displayText": "Every Sunday at 6:00 PM"
   }
   ```
4. Commit with message: "Update service time to 6:00 PM"
5. Wait 2 minutes for GitHub Pages rebuild
6. Visit website and hard refresh
7. Verify time shows correctly on homepage and plan visit page

---

## Questions?

This content system is designed to be simple and safe. If you have questions or need help:

1. Review this guide
2. Check the browser console for error messages
3. Validate your JSON syntax
4. Restore to previous working version if needed

Remember: **The website always has fallback HTML content**, so even if JSON has issues, the site will continue working! 🎉
