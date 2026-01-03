# 📖 Daily Devotions Data Structure

This folder contains the organized monthly devotional content for 2026.

## 📁 Folder Structure

```
devotions-data/
├── 01-january.json      (31 devotions)
├── 02-february.json     (28 devotions)
├── 03-march.json        (31 devotions)
├── 04-april.json        (30 devotions)
├── 05-may.json          (31 devotions)
├── 06-june.json         (30 devotions)
├── 07-july.json         (31 devotions)
├── 08-august.json       (31 devotions)
├── 09-september.json    (30 devotions)
├── 10-october.json      (31 devotions)
├── 11-november.json     (30 devotions)
└── 12-december.json     (31 devotions)
```

**Total: 365 devotions for the complete year 2026**

## 📝 JSON Structure

Each monthly file contains an array of devotional objects:

```json
[
  {
    "date": "2026-MM-DD",
    "title": "English Title",
    "titleBn": "বাংলা শিরোনাম",
    "verse": "Bible Reference (e.g., John 3:16)",
    "verseText": "English verse text (NIV)",
    "verseTextBn": "বাংলা আয়াত (BBS William Carey)",
    "reflection": "English reflection (200-400 words)",
    "reflectionBn": "বাংলা প্রতিফলন (200-400 words)",
    "prayer": "English prayer (50-150 words)",
    "prayerBn": "বাংলা প্রার্থনা (50-150 words)"
  }
]
```

## 🔧 How to Use

### 1. Add Your Devotional Content

Edit each monthly JSON file and replace the placeholder with your actual devotional entries:

```bash
# Open a month file
open -a "Visual Studio Code" devotions-data/01-january.json

# Or use any text editor
```

**Important:**
- Each file must contain a valid JSON array `[...]`
- Each devotion object must have all 10 required fields
- Dates must be in `YYYY-MM-DD` format
- Ensure proper JSON syntax (commas between objects)

### 2. Build the Complete File

Once all monthly files are populated, run:

```bash
python3 build-complete-devotions.py
```

This will:
- ✅ Read all 12 monthly files
- ✅ Validate the count for each month
- ✅ Combine them into `devotions-2026.json`
- ✅ Report any issues

### 3. Test Locally

```bash
# Open in browser
open daily-devotion.html

# Check browser console (F12)
# Should see: "✓ Loaded 365 devotions for 2026"
```

### 4. Deploy

```bash
git add devotions-data/ devotions-2026.json
git commit -m "Add complete 365-day devotional content for 2026"
git push origin main
```

## ✅ Validation Checklist

Before building, ensure each monthly file:

- [ ] Is valid JSON (use https://jsonlint.com/)
- [ ] Contains the correct number of entries:
  - January: 31
  - February: 28
  - March: 31
  - April: 30
  - May: 31
  - June: 30
  - July: 31
  - August: 31
  - September: 30
  - October: 31
  - November: 30
  - December: 31
- [ ] Has dates in chronological order
- [ ] Has no missing required fields
- [ ] Has both English and Bengali translations
- [ ] Is saved as UTF-8 encoding

## 🎯 Benefits of This Structure

1. **Organized**: Easy to find and edit specific months
2. **Version Control**: Git tracks changes per month
3. **Collaborative**: Multiple people can work on different months
4. **Testable**: Build and test incrementally
5. **Maintainable**: Update individual months without touching others

## 📊 Progress Tracking

You can check progress by running:

```bash
python3 build-complete-devotions.py
```

It will show:
```
✓ 01-january.json       -  31 entries (expected 31)
✓ 02-february.json      -  28 entries (expected 28)
⚠ 03-march.json         -  15 entries (expected 31)  ← In progress
✗ 04-april.json         -   0 entries (expected 30)  ← Not started
```

## 🚨 Common Issues

### JSON Syntax Error
**Problem**: `JSON Error: Expecting ',' delimiter`  
**Solution**: Check for missing commas between objects or extra commas after the last object

### Wrong Date Format
**Problem**: Dates like `01-01-2026` instead of `2026-01-01`  
**Solution**: Always use `YYYY-MM-DD` format

### Bengali Text Issues
**Problem**: Bengali shows as boxes or gibberish  
**Solution**: Ensure file is saved as UTF-8 encoding

### Missing Fields
**Problem**: `KeyError: 'prayer'`  
**Solution**: Every devotion must have all 10 fields (date, title, titleBn, verse, verseText, verseTextBn, reflection, reflectionBn, prayer, prayerBn)

## 📞 Quick Commands

```bash
# List all files
ls -lh devotions-data/

# Check total size
du -sh devotions-data/

# Validate JSON syntax for a file
python3 -m json.tool devotions-data/01-january.json > /dev/null && echo "✓ Valid"

# Count entries in a file
python3 -c "import json; print(len(json.load(open('devotions-data/01-january.json'))))"

# Build complete file
python3 build-complete-devotions.py

# Test in browser
open daily-devotion.html
```

## 💡 Tips

1. **Work month by month**: Complete one month at a time
2. **Validate frequently**: Use jsonlint.com after each edit
3. **Test incrementally**: Build and test after adding each month
4. **Backup regularly**: Commit to git after completing each month
5. **Keep consistent**: Use the same format and style throughout

---

**Last Updated**: January 3, 2026  
**Status**: Structure created, ready for content
