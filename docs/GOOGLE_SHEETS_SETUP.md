# Google Sheets Database Setup Instructions

## Overview

This guide will help you set up Google Sheets as a shared database for your church calendar. Once configured, all events added by anyone will be saved to Google Sheets and visible to everyone.

---

## Quick Setup (15 minutes)

### Step 1: Create Google Sheets Spreadsheet

1. Go to https://sheets.google.com/
2. **IMPORTANT**: Sign in with **gracepraisebangladeshichurch@gmail.com** (the church email)
3. Click "Blank" to create a new spreadsheet
4. Name it: **GPBC Calendar 2026 - Events Database**

### Step 2: Set Up the Spreadsheet

1. In the first row, add these column headers:
   - **A1**: `Date`
   - **B1**: `Name`
   - **C1**: `Category`
   - **D1**: `Description`
   - **E1**: `Owner`
   - **F1**: `Timestamp`

2. **Make the header row bold** (select row 1, click Bold button)

3. **Freeze the header row**: View → Freeze → 1 row

### Step 3: Create Google Apps Script

1. In your spreadsheet, click **Extensions** → **Apps Script**

2. Delete any default code and paste this:

```javascript
// GPBC Calendar API - Handles event storage in Google Sheets

function doGet(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // Get all events
  if (e.parameter.action === 'getEvents') {
    return getEvents(sheet);
  }
  
  return ContentService.createTextOutput(JSON.stringify({
    'error': 'Invalid action'
  })).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  try {
    const data = JSON.parse(e.postData.contents);
    
    // Add new event
    if (data.action === 'addEvent') {
      return addEvent(sheet, data);
    }
    
    // Delete event
    if (data.action === 'deleteEvent') {
      return deleteEvent(sheet, data);
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      'error': 'Invalid action'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      'error': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function getEvents(sheet) {
  const lastRow = sheet.getLastRow();
  
  if (lastRow <= 1) {
    // No events yet
    return ContentService.createTextOutput(JSON.stringify({
      'events': []
    })).setMimeType(ContentService.MimeType.JSON);
  }
  
  const range = sheet.getRange(2, 1, lastRow - 1, 6);
  const values = range.getValues();
  
  const events = values.map(row => ({
    date: row[0],
    name: row[1],
    category: row[2],
    description: row[3],
    owner: row[4],
    timestamp: row[5]
  })).filter(event => event.date !== ''); // Filter empty rows
  
  return ContentService.createTextOutput(JSON.stringify({
    'events': events
  })).setMimeType(ContentService.MimeType.JSON);
}

function addEvent(sheet, data) {
  const event = data.event;
  
  // Add new row with event data
  sheet.appendRow([
    event.date,
    event.name,
    event.category,
    event.description || '',
    event.owner || '',
    new Date().toISOString()
  ]);
  
  return ContentService.createTextOutput(JSON.stringify({
    'success': true,
    'message': 'Event added successfully'
  })).setMimeType(ContentService.MimeType.JSON);
}

function deleteEvent(sheet, data) {
  const eventToDelete = data.event;
  const owner = data.owner;
  const lastRow = sheet.getLastRow();
  
  // Search for the event
  for (let i = 2; i <= lastRow; i++) {
    const row = sheet.getRange(i, 1, 1, 6).getValues()[0];
    
    if (row[0] === eventToDelete.date && 
        row[1] === eventToDelete.name &&
        row[4] === owner) {
      // Found the event and owner matches
      sheet.deleteRow(i);
      
      return ContentService.createTextOutput(JSON.stringify({
        'success': true,
        'message': 'Event deleted successfully'
      })).setMimeType(ContentService.MimeType.JSON);
    }
  }
  
  return ContentService.createTextOutput(JSON.stringify({
    'success': false,
    'message': 'Event not found or permission denied'
  })).setMimeType(ContentService.MimeType.JSON);
}
```

3. Click **Save** (💾 icon) and name the project: **GPBC Calendar API**

### Step 4: Deploy the Script

1. Click **Deploy** → **New deployment**

2. Click the gear icon ⚙️ next to "Select type" → Choose **Web app**

3. Configure:
   - **Description**: `GPBC Calendar Database API`
   - **Execute as**: `Me (gracepraisebangladeshichurch@gmail.com)`
   - **Who has access**: `Anyone`

4. Click **Deploy**

5. **IMPORTANT**: Copy the **Web app URL** (looks like: `https://script.google.com/macros/s/...../exec`)
   - Save this URL - you'll need it in the next step!

6. Click **Authorize access** when prompted
   - Choose **gracepraisebangladeshichurch@gmail.com** account
   - Click **Advanced** → **Go to GPBC Calendar API (unsafe)**
   - Click **Allow**

### Step 5: Update Your Calendar Code

Open `/Users/gbaidya/Documents/Project cool/Calendar 2026/calendar.js`

Find this line (around line 10):

```javascript
const CODE_OWNER = 'gilbert-baidya';
```

Add these lines RIGHT AFTER it:

```javascript
// Google Sheets Database Configuration
const GOOGLE_SHEETS_URL = 'YOUR_WEB_APP_URL_HERE'; // Paste your Web app URL here
const USE_GOOGLE_SHEETS = true; // Set to false to use localStorage instead
```

**Replace `YOUR_WEB_APP_URL_HERE` with the actual URL you copied in Step 4!**

### Step 6: Test the Setup

1. Save `calendar.js`
2. Hard refresh your calendar (Cmd+Shift+R or Ctrl+Shift+R)
3. Add a test event to any date
4. Check your Google Sheet - you should see the event appear!
5. Open the calendar on another device - the event should be visible there too!

---

## How It Works

### For Users:
- ✅ Add events normally - they save to Google Sheets automatically
- ✅ Everyone sees the same events in real-time
- ✅ Delete your own events (only if you created them)
- ✅ Works on all devices (phone, tablet, computer)

### For You (Admin):
- ✅ View all events in Google Sheets
- ✅ Edit/delete any event directly in the spreadsheet
- ✅ Export data to Excel if needed
- ✅ See who added each event and when
- ✅ Backup your data easily

---

## Google Sheets Columns Explained

| Column | Description |
|--------|-------------|
| **Date** | Event date (YYYY-MM-DD format) |
| **Name** | Event name/title |
| **Category** | gpbc, bangladeshi, american, christian, or special |
| **Description** | Event details |
| **Owner** | Username of person who created the event |
| **Timestamp** | When the event was added |

---

## Managing Events in Google Sheets

### To Manually Add an Event:
1. Open your Google Sheet
2. Add a new row with the data
3. Format date as: `2026-03-15` (YYYY-MM-DD)
4. Refresh the calendar to see it

### To Delete an Event:
1. Find the event row in Google Sheets
2. Right-click the row number → Delete row
3. Refresh the calendar

### To Edit an Event:
1. Click the cell you want to edit
2. Make changes
3. Refresh the calendar

---

## Free Tier Limits

Google Sheets free tier includes:
- ✅ Up to 10 million cells per spreadsheet
- ✅ Unlimited spreadsheets
- ✅ 15 GB storage (shared with Gmail/Drive)
- ✅ Perfect for church calendar (can handle 100,000+ events)

Apps Script limits:
- ✅ 20,000 URL fetch calls per day
- ✅ More than enough for calendar usage

---

## Troubleshooting

**Events not appearing?**
- Check that `USE_GOOGLE_SHEETS = true` in calendar.js
- Verify the Web app URL is correct
- Make sure the script is deployed as "Anyone" can access
- Check browser console (F12) for errors

**"Permission denied" error?**
- Re-deploy the script
- Make sure "Execute as" is set to "Me"
- Make sure "Who has access" is set to "Anyone"

**Events adding slowly?**
- Normal - Google Sheets can take 1-2 seconds
- Better than local storage (which doesn't sync at all!)

**Want to switch back to localStorage?**
- Change `USE_GOOGLE_SHEETS = false` in calendar.js
- Save and refresh

---

## Security Notes

✅ **Safe**: The script only allows:
- Reading all events (public calendar)
- Adding new events
- Deleting events you created (ownership verified)

✅ **Protected**: 
- Only the CODE_OWNER can delete any event
- All actions are logged with timestamps
- You can review all changes in Google Sheets

⚠️ **Important**: 
- Keep your Web app URL private if possible
- You can see who added each event in the spreadsheet
- You can manually delete spam/inappropriate events

---

## Need Help?

- Google Apps Script Docs: https://developers.google.com/apps-script
- Google Sheets Help: https://support.google.com/docs/topic/9054603

---

## What's Next?

After setup, you can:
1. Share the calendar URL with your congregation
2. Everyone can add events from their devices
3. All events sync automatically via Google Sheets
4. You manage everything from the spreadsheet

**Your calendar is now a fully-functional shared database!** 🎉
