# 📅 Grace and Praise Bangladeshi Church - Calendar 2026

A beautiful, feature-rich interactive calendar application designed for **Grace and Praise Bangladeshi Church** (1325 Richardson Street, CA 92408). Track multi-cultural events, church services, member birthdays, anniversaries, and automatically share with your congregation!

![Calendar Preview](https://img.shields.io/badge/Status-Active-success) ![License](https://img.shields.io/badge/License-MIT-blue) ![Version](https://img.shields.io/badge/Version-3.0-brightgreen)

## ✨ Key Features

### 🎯 Multi-Cultural Event Tracking
- **🇧🇩 Bangladeshi Events**: Independence Day, Victory Day, Pohela Boishakh, International Mother Language Day, and more
- **🇺🇸 American Holidays**: Independence Day, Thanksgiving, Memorial Day, Labor Day, and all major US holidays
- **✝️ Christian Observances**: Easter, Christmas, Advent, Lent, Palm Sunday, Good Friday, and all major holy days
- **❤️ Special Days**: Valentine's Day, Mother's Day, Father's Day, Earth Day, Halloween, New Year's Eve
- **⛪ GPBC Events**: Custom church events, birthdays, and anniversaries

### ⛪ Church-Specific Features
- **Weekly Services**: Automatically shows GPBC Bangla Church Service every Sunday at 5:00 PM
- **Holy Communion**: First Sunday of each month marked as Holy Communion Service
- **Member Registration**: QR code system for members to register birthdays and anniversaries
- **🎂 Birthday Tracking**: Automatically adds member birthdays to calendar
- **💒 Anniversary Tracking**: Track and celebrate wedding anniversaries
- **Sunday Wishes**: See upcoming birthdays/anniversaries to celebrate during services

### 🗄️ **NEW: Shared Database with Google Sheets**
- **☁️ Cloud Sync**: Events saved to Google Sheets - everyone sees the same calendar!
- **📱 Multi-Device**: Add events from any device - phone, tablet, computer
- **🔄 Real-Time Updates**: Calendar syncs automatically across all users
- **📊 Admin Dashboard**: View and manage all events in Google Sheets
- **💾 Easy Backup**: Export your entire calendar database anytime
- **🔒 Secure**: Owner verification for event deletion

### 🖼️ Advanced Sharing & Export
- **📸 Mobile-Optimized Images**: Download calendar as vertical JPG (perfect for Instagram Stories, YouTube Shorts, Facebook Reels)
- **📤 Smart Sharing**: Share formatted event list with church name and address
- **🖨️ Print-Ready**: Professional print layout with calendar grid and complete event list
- **📱 Social Media Ready**: 9:16 vertical format (1080px) optimized for phone viewing

### 📝 Interactive Calendar Management
- **Click to Add Events**: Click any date to add custom GPBC events
- **Edit & Delete**: Remove GPBC events you've created
- **Event Details**: Click events to see full descriptions and details
- **Color-Coded Categories**: Easy visual identification with emoji and color coding
- **Filter by Category**: Toggle event types on/off instantly

### 🔔 Smart Reminder System
- **2-Month Advance Reminders**: See events coming up in the next 60 days
- **Urgent Alerts**: Highlights events within 30 days
- **Daily Checks**: Automatic reminder notifications
- **Browser Notifications**: Optional push notifications
- **Export to Calendar**: Download .ics file for Google Calendar, Outlook, etc.

### 💝 Donation Integration
- **Bible Verse**: 2 Corinthians 9:7 for spiritual context
- **Zelle & PayPal**: QR codes for easy mobile donations
- **Mobile Optimized**: Scrollable modal for small screens
- **Direct Links**: One-tap access to payment platforms

### 🎨 Beautiful User Experience
- Gorgeous gradient design with smooth animations
- Fully responsive - works on desktop, tablet, and mobile
- Today's date highlighted automatically
- Month-by-month navigation
- Events sidebar with complete monthly overview
- Professional church branding

## 🚀 Quick Start

### Installation
1. Download or clone this repository
2. Open `index.html` in any modern web browser
3. No installation or server required!

### Optional: Enable Google Sheets Database (Recommended)
**To allow all users to share the same calendar:**
1. Follow the step-by-step guide in `GOOGLE_SHEETS_SETUP.md`
2. Takes ~15 minutes to set up
3. Free forever with Google Sheets
4. Events sync across all devices automatically!

### File Structure
```
Calendar 2026/
├── index.html                    # Main application structure
├── styles.css                    # Responsive styling and print layouts
├── events.js                     # Events database and recurring services
├── googlesheets.js               # Google Sheets integration (NEW!)
├── calendar.js                   # Calendar logic, navigation, and interactions
├── reminders.js                  # Reminder system and notifications
├── members.js                    # Member registration and birthday tracking
├── README.md                     # Documentation (this file)
├── GOOGLE_SHEETS_SETUP.md        # Step-by-step Google Sheets guide (NEW!)
├── EMAIL_SETUP_INSTRUCTIONS.md   # EmailJS notification setup
└── GITHUB_DESCRIPTION.md         # Repository setup guide
```
├── members.js          # Member registration and birthday tracking
└── README.md          # Documentation (this file)
```

## 📖 How to Use

### Basic Navigation
1. **Browse Months**: Click "Previous" / "Next" buttons to navigate
2. **View Events**: Click any event marker to see full details
3. **Filter Categories**: Use checkboxes to show/hide event types
4. **Check Reminders**: Click "🔔 View Reminders" for upcoming events

### Adding Church Events
1. **Click any date** on the calendar (non-grayed dates)
2. Enter event name and optional description
3. Click "Add Event" - it appears immediately!
4. Events are saved automatically to your browser

### Member Registration
1. Click **"👥 Member Registration"** button
2. **Option A**: Scan QR code with phone → Fill form
3. **Option B**: Click "Fill Form Directly" on desktop
4. Enter name, birthday (month/day), and optional anniversary
5. Birthdays and anniversaries automatically appear on calendar!

### Sharing Calendar
- **📤 Share Events**: Share formatted text list via WhatsApp, email, SMS
- **📸 Download as Image**: Get mobile-optimized vertical image for social media
- **🖨️ Print**: Print current month with full event details

### Managing Events
- **View**: Click any GPBC event to see details
- **Delete**: Click event → Click "Delete Event" button → Confirm

## 🎯 Pre-Loaded Events (2026)

### Bangladeshi Events (7)
International Mother Language Day, Bangabandhu's Birthday, Independence Day, Pohela Boishakh, May Day, National Mourning Day, Victory Day

### American Events (9)
New Year's Day, MLK Day, Presidents' Day, Memorial Day, Independence Day, Labor Day, Columbus Day, Veterans Day, Thanksgiving

### Christian Events (13)
Epiphany, Ash Wednesday, Palm Sunday, Maundy Thursday, Good Friday, Easter Sunday, Easter Monday, Ascension Day, Pentecost, First Sunday of Advent, Christmas Eve, Christmas Day, Boxing Day

### Special Days (7)
Valentine's Day, International Women's Day, Earth Day, Mother's Day, Father's Day, Halloween, New Year's Eve

### GPBC Recurring Events (52)
- **Every Sunday**: GPBC Bangla Church Service at 5:00 PM
- **First Sunday Each Month**: Holy Communion Service at 5:00 PM

## 🎨 Customization

### Adding Your Own Events
Edit `events.js` to add permanent events:
```javascript
{ 
    date: '2026-MM-DD', 
    name: 'Event Name', 
    category: 'gpbc', 
    description: 'Event description' 
}
```

### Changing Colors
Edit `styles.css` or `events.js` category colors:
```javascript
const categoryColors = {
    bangladeshi: '#006A4E',
    american: '#B22234',
    christian: '#663399',
    special: '#FF1493',
    gpbc: '#FF8C00'
};
```

### Modifying Church Information
Update church name and address in `index.html` header section.

## 🔧 Technical Specifications

- **Framework**: Pure JavaScript (Vanilla JS) - No dependencies!
- **Storage**: LocalStorage for member data and custom events
- **Libraries Used**: 
  - QRCode.js (for member registration QR codes)
  - html2canvas (for image export)
- **Browser Support**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile**: Fully responsive, works on all devices
- **Print**: Optimized CSS for professional printing
- **Size**: Lightweight (~50KB total)

## 📱 Social Media Formats

The "Download as Image" feature creates:
- **Dimensions**: 1080px width (9:16 ratio)
- **Format**: High-quality JPG (95% quality)
- **Perfect for**: Instagram Stories, YouTube Shorts, Facebook Reels, WhatsApp Status
- **Includes**: Header, calendar grid, and event list

## 🔒 Privacy & Data

- All data stored locally in browser (LocalStorage)
- No server or external database required
- No data sent to third parties
- Member information stays on your device
- Can be used completely offline after first load

## 🎁 Use Cases

✅ Church event management and announcements  
✅ Member birthday and anniversary celebrations  
✅ Multi-cultural community event tracking  
✅ Sunday service planning and coordination  
✅ Social media content creation  
✅ Congregation communication via QR codes  
✅ Print calendars for church bulletin boards  
✅ Mobile-friendly event sharing  

## 📄 License

MIT License - Free to use, modify, and distribute for personal or commercial purposes.

## 🙏 Credits

Created with ❤️ for **Grace and Praise Bangladeshi Church**  
1325 Richardson Street, CA 92408

---

## 🆘 Support & Contact

For questions, suggestions, or issues, please contact the church administration.

**Built for Community • Powered by Faith • Designed with Love**

---

### 🌟 Star this repository if you find it useful!

**Made with 💜 for the GPBC Community | Version 2.0 | December 2025**
