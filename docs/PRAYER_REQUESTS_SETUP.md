# Adding Prayer Request Support to Google Apps Script

## Update Your Apps Script

Go to your Google Apps Script editor and add the following code:

### 1. Add Prayer Request Handler to doPost function

Find the `doPost` function and add this after the `deleteEvent` action:

```javascript
// Add prayer request
if (data.action === 'addPrayerRequest') {
  return addPrayerRequest(data);
}
```

### 2. Add the addPrayerRequest Function

Add this new function at the end of your script:

```javascript
function addPrayerRequest(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
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
    headerRange.setBackground('#6f42c1');
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
  
  return ContentService.createTextOutput(JSON.stringify({
    'success': true,
    'message': 'Prayer request added successfully'
  })).setMimeType(ContentService.MimeType.JSON);
}
```

### 3. Save and Deploy

1. Click **Save** (💾 icon)
2. Click **Deploy** → **Manage deployments**
3. Click the **pencil icon** ✏️ next to your active deployment
4. Change **Version** to **New version**
5. Click **Deploy**

### What This Does

- Creates a new sheet called "Prayer Requests" in your spreadsheet
- Saves all prayer requests with:
  - Timestamp
  - Name (or "Anonymous")
  - Categories (Finance, Health, Family, Confidential)
  - Prayer details (supports English and Bangla text)
  - Status (Active by default)

### Viewing Prayer Requests

Go to your Google Sheets spreadsheet and you'll see a new tab called "Prayer Requests" with all submitted prayers.

---

**After deploying, test the Prayer Request feature on your calendar!**
