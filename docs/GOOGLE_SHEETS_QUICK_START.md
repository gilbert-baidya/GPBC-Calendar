# 🎉 Google Sheets Database - Quick Reference

## What Changed?

Your calendar now supports **shared database** functionality! Events can be saved to Google Sheets so everyone sees the same calendar.

---

## Files Added/Modified

### New Files:
1. **googlesheets.js** - Handles syncing with Google Sheets
2. **GOOGLE_SHEETS_SETUP.md** - Complete setup instructions

### Modified Files:
1. **calendar.js** - Added Google Sheets integration
2. **index.html** - Added googlesheets.js script
3. **README.md** - Updated with new features

---

## How to Enable

### Step 1: Follow the Setup Guide
Open `GOOGLE_SHEETS_SETUP.md` and follow all 6 steps (takes ~15 minutes)

### Step 2: Key Configuration
In `calendar.js`, you'll need to update line 12:

```javascript
const GOOGLE_SHEETS_URL = 'YOUR_WEB_APP_URL_HERE';
```

Replace with your actual Google Apps Script Web app URL (from Step 4 of setup guide)

### Step 3: Test
1. Save the file
2. Refresh calendar (Cmd+Shift+R)
3. Add a test event
4. Check Google Sheets - event should appear!
5. Open calendar on another device - event should be there!

---

## What Users See

### Before Google Sheets:
- ❌ Events only on their device
- ❌ Can't see events others added
- ❌ No backup

### After Google Sheets:
- ✅ Everyone sees the same events
- ✅ Works on all devices (phone, tablet, computer)
- ✅ Automatic cloud backup
- ✅ You can manage events in Google Sheets directly

---

## Admin Benefits

### View All Events:
Open your Google Sheet to see:
- All events ever added
- Who added each event
- When they were added
- Full event details

### Manage Manually:
- Edit event details directly in spreadsheet
- Delete spam/unwanted events
- Export to Excel for reports
- Share spreadsheet with church leadership

### No Coding Required:
- Everything managed through Google Sheets interface
- No technical knowledge needed
- Familiar spreadsheet format

---

## Fallback System

The calendar is smart:
1. **Tries Google Sheets first** - If configured and working
2. **Falls back to localStorage** - If Google Sheets unavailable
3. **Always works** - Even if setup incomplete

---

## Cost

**100% FREE** ✅
- Google Sheets is free
- Apps Script is free
- No credit card required
- No usage limits for church use

---

## Support

If you need help:
1. Read `GOOGLE_SHEETS_SETUP.md` carefully
2. Check troubleshooting section
3. Verify your Web app URL is correct
4. Make sure script is deployed as "Anyone" can access

---

## Toggle On/Off

Don't want to use Google Sheets? No problem!

In `calendar.js` line 13, change:
```javascript
const USE_GOOGLE_SHEETS = false;  // Back to localStorage
```

---

## Next Steps

1. ✅ Read GOOGLE_SHEETS_SETUP.md
2. ✅ Create Google Sheet
3. ✅ Deploy Apps Script
4. ✅ Update calendar.js with your URL
5. ✅ Test on multiple devices
6. ✅ Share calendar with congregation!

**Your calendar is now a shared, cloud-based church management tool!** 🎉
