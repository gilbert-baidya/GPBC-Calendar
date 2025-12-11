# GPBC Song Book - Google Sheets Setup Guide

## Step 1: Update Google Apps Script

1. Go to your Google Sheets document: https://script.google.com/home/projects/YOUR_PROJECT_ID
2. Open `Code.gs` (or your script file)
3. **Copy the entire content** from `GoogleAppsScript.js` in this folder
4. **Paste and replace** everything in your Google Apps Script editor
5. Click **Save** (💾 icon)

## Step 2: Deploy the Updated Script

1. Click **Deploy** → **New deployment**
2. Click the ⚙️ (settings) icon next to "Select type"
3. Choose **Web app**
4. Configure:
   - **Description**: "GPBC Calendar and Song Book API - v2" (or any description)
   - **Execute as**: Me
   - **Who has access**: Anyone
5. Click **Deploy**
6. Click **Authorize access** and grant permissions
7. **COPY THE WEB APP URL** - it looks like:
   ```
   https://script.google.com/macros/s/XXXXX.../exec
   ```

## Step 3: Update songbook.js Configuration

1. Open `songbook.js` in your project
2. Find this line at the top:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
   ```
3. Replace with your actual URL:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_ACTUAL_URL/exec';
   ```
4. Save the file

## Step 4: Verify Google Sheet Structure

After deploying, the script will automatically create a "Songs" sheet with these columns:

| ID | Title | Language | Category | Key | Tempo | Preview | Lyrics | Chords | Submitted By | Timestamp |
|----|-------|----------|----------|-----|-------|---------|--------|--------|--------------|-----------|

The script will also add 5 sample songs automatically!

## Step 5: Test the Song Book

1. Open your website: `about.html#songbook`
2. You should see 5 sample songs load
3. Try:
   - Searching for songs
   - Filtering by language (বাংলা, English, Bilingual)
   - Filtering by category (Worship, Praise, Christmas, etc.)
   - Clicking a song to view details with chords
   - Submitting a new song

## Sample Songs Included

1. **প্রভু যীশু আমার পরিত্রাতা** - Bangla Worship (Key: G)
2. **Amazing Grace** - English Worship (Key: G)
3. **তুমি মহান (You Are Great)** - Bilingual Praise (Key: D)
4. **How Great Thou Art** - English Worship (Key: C)
5. **আনন্দময় দিন** - Bangla Christmas (Key: G)

## Features

✅ **Automatic Song Loading** from Google Sheets
✅ **Real-time Search** by title or lyrics
✅ **Language Filters**: বাংলা, English, Bilingual
✅ **Category Filters**: Worship, Praise, Prayer, Christmas, Easter
✅ **Chord Display** for musicians
✅ **Print Songs** functionality
✅ **Submit New Songs** - saves directly to Google Sheets
✅ **Mobile Responsive** design

## Troubleshooting

### Songs not loading?
- Check if GOOGLE_SCRIPT_URL is correct in songbook.js
- Verify the script is deployed as "Anyone" can access
- Check browser console (F12) for errors

### Can't submit songs?
- Same as above - URL must be correct
- Check Google Sheets permissions

### Want to add more songs manually?
- Open your Google Sheets
- Go to "Songs" tab
- Add a new row with song details
- Refresh the website

## Need Help?

Contact: gracepraisebangladeshichurch@gmail.com

---
**Grace and Praise Bangladeshi Church** | 2026
