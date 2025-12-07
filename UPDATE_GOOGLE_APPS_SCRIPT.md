# Update Google Apps Script for Image Support

## Instructions

You need to update your Google Apps Script to support the new Image URL column.

### Step 1: Open Apps Script Editor

1. Go to your Google Sheet: https://docs.google.com/spreadsheets/
2. Find your "Grace and Praise Church Calendar" spreadsheet
3. Click **Extensions** → **Apps Script**

### Step 2: Add Image URL Column to Events Sheet

1. In your Google Sheet, go to the **"Events"** sheet
2. Add a new column header in **Column I**: `Image URL`
3. Your columns should now be:
   - A: Date
   - B: Name
   - C: Category
   - D: Description
   - E: Added By
   - F: Contact
   - G: Owner
   - H: Timestamp
   - I: Image URL (NEW)

### Step 3: Update Apps Script Code

Replace the **`getEvents()`** function with this updated version:

```javascript
function getEvents() {
  const sheet = ss.getSheetByName('Events') || ss.getSheets()[0];
  const data = sheet.getDataRange().getValues();
  const events = [];
  
  // Skip header row
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    if (row[0] && row[1]) { // Check if date and name exist
      // Convert date to YYYY-MM-DD format
      let dateString = '';
      if (row[0] instanceof Date) {
        const year = row[0].getFullYear();
        const month = String(row[0].getMonth() + 1).padStart(2, '0');
        const day = String(row[0].getDate()).padStart(2, '0');
        dateString = `${year}-${month}-${day}`;
      } else {
        dateString = row[0];
      }
      
      events.push({
        date: dateString,
        name: row[1],
        category: row[2] || 'gpbc',
        description: row[3] || '',
        addedBy: row[4] || '',
        contact: row[5] || '',
        owner: row[6] || '',
        timestamp: row[7] || '',
        imageUrl: row[8] || ''  // NEW: Image URL column
      });
    }
  }
  
  return events;
}
```

Replace the **`addEvent(eventData)`** function with this updated version:

```javascript
function addEvent(eventData) {
  const sheet = ss.getSheetByName('Events') || ss.getSheets()[0];
  
  // Convert date string to Date object for Google Sheets
  let dateObj = new Date(eventData.date);
  
  sheet.appendRow([
    dateObj,                      // A: Date
    eventData.name,               // B: Name
    eventData.category || 'gpbc', // C: Category
    eventData.description || '',  // D: Description
    eventData.addedBy || '',      // E: Added By
    eventData.contact || '',      // F: Contact
    eventData.owner || '',        // G: Owner
    eventData.timestamp || new Date().toISOString(), // H: Timestamp
    eventData.imageUrl || ''      // I: Image URL (NEW)
  ]);
  
  return true;
}
```

### Step 4: Save and Deploy

1. Click **Save** (💾 icon)
2. Click **Deploy** → **Manage deployments**
3. Click the **Edit** (✏️) icon next to your active deployment
4. Under **Version**, select **New version**
5. Add description: "Added image URL support"
6. Click **Deploy**
7. Click **Done**

### Step 5: Test

1. Go back to your website
2. Add a new event with an image
3. Check that the image displays on the calendar

---

## Complete Updated Apps Script Code

If you want to replace the entire script, here's the complete code:

```javascript
function doGet(e) {
  // Handle direct browser access - default to getEvents
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const eventsSheet = ss.getSheetByName('Events') || ss.getSheets()[0];
  
  // If there's an action parameter, use it
  if (e.parameter && e.parameter.action) {
    return doPost(e);
  }
  
  // Default: return events for browser access
  return getEvents(eventsSheet);
}

function doPost(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const eventsSheet = ss.getSheetByName('Events') || ss.getSheets()[0];
  
  let data;
  try {
    // Try to parse POST data
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else if (e.parameter) {
      data = e.parameter;
    } else {
      return createJsonResponse({ error: 'No data received' });
    }
  } catch (error) {
    return createJsonResponse({ error: 'Parse error: ' + error.toString() });
  }
  
  try {
    // Get all events
    if (data.action === 'getEvents') {
      return getEvents(eventsSheet);
    }
    
    // Add new event
    if (data.action === 'addEvent') {
      return addEvent(eventsSheet, data);
    }
    
    // Delete event
    if (data.action === 'deleteEvent') {
      return deleteEvent(eventsSheet, data);
    }
    
    // Add prayer request
    if (data.action === 'addPrayerRequest') {
      return addPrayerRequest(ss, data);
    }
    
    return createJsonResponse({ 
      error: 'Unknown action: ' + data.action,
      receivedData: data
    });
    
  } catch (error) {
    return createJsonResponse({ error: 'Execution error: ' + error.toString() });
  }
}

function getEvents(sheet) {
  const lastRow = sheet.getLastRow();
  
  if (lastRow <= 1) {
    // No events yet
    return createJsonResponse({ events: [] });
  }
  
  const range = sheet.getRange(2, 1, lastRow - 1, 9); // Changed to 9 columns to include imageUrl
  const values = range.getValues();
  
  const events = values.map(row => ({
    date: typeof row[0] === 'object' ? Utilities.formatDate(row[0], Session.getScriptTimeZone(), 'yyyy-MM-dd') : row[0],
    name: row[1],
    category: row[2],
    description: row[3] || '',
    addedBy: row[4] || '',
    contact: row[5] || '',
    owner: row[6] || '',
    timestamp: row[7] || '',
    imageUrl: row[8] || '' // NEW: Image URL column
  })).filter(event => event.date !== ''); // Filter empty rows
  
  return createJsonResponse({ events: events });
}

function addEvent(sheet, data) {
  const event = data.event;
  
  // Add new row with event data including imageUrl
  sheet.appendRow([
    event.date,
    event.name,
    event.category,
    event.description || '',
    event.addedBy || '',
    event.contact || '',
    event.owner || '',
    event.timestamp || new Date().toISOString(),
    event.imageUrl || '' // NEW: Image URL column
  ]);
  
  return createJsonResponse({ success: true, message: 'Event added successfully' });
}

function deleteEvent(sheet, data) {
  const eventToDelete = data.event;
  const owner = data.owner;
  const lastRow = sheet.getLastRow();
  
  // Search for the event
  for (let i = 2; i <= lastRow; i++) {
    const row = sheet.getRange(i, 1, 1, 9).getValues()[0]; // Changed to 9 columns
    const rowDate = typeof row[0] === 'object' ? Utilities.formatDate(row[0], Session.getScriptTimeZone(), 'yyyy-MM-dd') : row[0];
    
    if (rowDate === eventToDelete.date && 
        row[1] === eventToDelete.name &&
        row[6] === owner) {
      // Found the event and owner matches
      sheet.deleteRow(i);
      
      return createJsonResponse({ success: true, message: 'Event deleted successfully' });
    }
  }
  
  return createJsonResponse({ success: false, message: 'Event not found or permission denied' });
}

function addPrayerRequest(ss, data) {
  // Get or create Prayer Requests sheet
  let prayerSheet = ss.getSheetByName('Prayer Requests');
  if (!prayerSheet) {
    prayerSheet = ss.insertSheet('Prayer Requests');
    // Add headers
    prayerSheet.appendRow([
      'Timestamp',
      'Name',
      'Is Anonymous',
      'Categories',
      'Prayer Details',
      'Status'
    ]);
    // Format header row
    const headerRange = prayerSheet.getRange(1, 1, 1, 6);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#9b59b6');
    headerRange.setFontColor('white');
  }
  
  const prayer = data.prayer;
  const timestamp = new Date().toLocaleString();
  
  prayerSheet.appendRow([
    timestamp,
    prayer.name,
    prayer.isAnonymous ? 'Yes' : 'No',
    prayer.categories,
    prayer.details,
    prayer.status || 'Active'
  ]);
  
  return createJsonResponse({ success: true, message: 'Prayer request added successfully' });
}

function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
```

---

## That's it!

Once you update the Apps Script and redeploy, your calendar will support event images stored in Cloudinary! 📸
