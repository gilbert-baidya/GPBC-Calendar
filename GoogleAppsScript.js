// Complete Google Apps Script for Grace and Praise Bangladeshi Church Calendar
// This script handles all backend operations for the church calendar website

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
  
  const range = sheet.getRange(2, 1, lastRow - 1, 9); // 9 columns including imageUrl
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
    imageUrl: row[8] || '' // Image URL from Cloudinary
  })).filter(event => event.date !== ''); // Filter empty rows
  
  return createJsonResponse({ events: events });
}

function addEvent(sheet, data) {
  const event = data.event;
  
  // Add new row with event data including imageUrl
  sheet.appendRow([
    event.date,                                      // Column A: Date
    event.name,                                      // Column B: Name
    event.category,                                  // Column C: Category
    event.description || '',                         // Column D: Description
    event.addedBy || '',                            // Column E: Added By
    event.contact || '',                            // Column F: Contact
    event.owner || '',                              // Column G: Owner
    event.timestamp || new Date().toISOString(),    // Column H: Timestamp
    event.imageUrl || ''                            // Column I: Image URL
  ]);
  
  return createJsonResponse({ success: true, message: 'Event added successfully' });
}

function deleteEvent(sheet, data) {
  const eventToDelete = data.event;
  const owner = data.owner;
  const lastRow = sheet.getLastRow();
  
  // Search for the event
  for (let i = 2; i <= lastRow; i++) {
    const row = sheet.getRange(i, 1, 1, 9).getValues()[0]; // Read 9 columns
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
