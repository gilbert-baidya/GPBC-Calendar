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
const ss = SpreadsheetApp.getActiveSpreadsheet();

function doGet(e) {
  return createJsonResponse({ message: 'Use POST requests for this API' });
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    switch(data.action) {
      case 'getEvents':
        return createJsonResponse({ events: getEvents() });
        
      case 'addEvent':
        const success = addEvent(data.event);
        return createJsonResponse({ success: success });
        
      case 'deleteEvent':
        const deleted = deleteEvent(data.event);
        return createJsonResponse({ success: deleted });
        
      case 'addPrayerRequest':
        const prayerAdded = addPrayerRequest(data.request);
        return createJsonResponse({ success: prayerAdded });
        
      default:
        return createJsonResponse({ error: 'Unknown action' });
    }
  } catch (error) {
    return createJsonResponse({ error: error.toString() });
  }
}

function getEvents() {
  const sheet = ss.getSheetByName('Events') || ss.getSheets()[0];
  const data = sheet.getDataRange().getValues();
  const events = [];
  
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    if (row[0] && row[1]) {
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
        imageUrl: row[8] || ''
      });
    }
  }
  
  return events;
}

function addEvent(eventData) {
  const sheet = ss.getSheetByName('Events') || ss.getSheets()[0];
  let dateObj = new Date(eventData.date);
  
  sheet.appendRow([
    dateObj,
    eventData.name,
    eventData.category || 'gpbc',
    eventData.description || '',
    eventData.addedBy || '',
    eventData.contact || '',
    eventData.owner || '',
    eventData.timestamp || new Date().toISOString(),
    eventData.imageUrl || ''
  ]);
  
  return true;
}

function deleteEvent(eventData) {
  const sheet = ss.getSheetByName('Events') || ss.getSheets()[0];
  const data = sheet.getDataRange().getValues();
  
  let dateToDelete = '';
  if (eventData.date instanceof Date) {
    const year = eventData.date.getFullYear();
    const month = String(eventData.date.getMonth() + 1).padStart(2, '0');
    const day = String(eventData.date.getDate()).padStart(2, '0');
    dateToDelete = `${year}-${month}-${day}`;
  } else {
    dateToDelete = eventData.date;
  }
  
  for (let i = data.length - 1; i >= 1; i--) {
    const row = data[i];
    let rowDateString = '';
    
    if (row[0] instanceof Date) {
      const year = row[0].getFullYear();
      const month = String(row[0].getMonth() + 1).padStart(2, '0');
      const day = String(row[0].getDate()).padStart(2, '0');
      rowDateString = `${year}-${month}-${day}`;
    } else {
      rowDateString = row[0];
    }
    
    if (rowDateString === dateToDelete && 
        row[1] === eventData.name && 
        row[6] === eventData.owner) {
      sheet.deleteRow(i + 1);
      return true;
    }
  }
  
  return false;
}

function addPrayerRequest(requestData) {
  const sheet = ss.getSheetByName('Prayer Requests');
  if (!sheet) {
    return false;
  }
  
  sheet.appendRow([
    new Date().toISOString(),
    requestData.name || 'Anonymous',
    requestData.isAnonymous || false,
    requestData.categories || '',
    requestData.prayerDetails || '',
    requestData.status || 'New'
  ]);
  
  return true;
}

function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
```

---

## That's it!

Once you update the Apps Script and redeploy, your calendar will support event images stored in Cloudinary! 📸
