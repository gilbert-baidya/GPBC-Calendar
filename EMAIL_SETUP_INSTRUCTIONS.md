# Email Notification Setup Instructions

To receive email notifications when people add events to the calendar, you need to set up EmailJS (a free service).

## Step 1: Create EmailJS Account

1. Go to https://www.emailjs.com/
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Connect Your Gmail Account

1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Select "Gmail"
4. Follow the instructions to connect your Gmail account (gracepraisebangladeshichurch@gmail.com)
5. Copy your **Service ID** (you'll need this later)

## Step 3: Create Email Template

1. Go to "Email Templates" in the EmailJS dashboard
2. Click "Create New Template"
3. Use this template:

**Template Name:** Event Notification

**Subject:** New Event Added to GPBC Calendar

**Body:**
```
Hello,

A new event has been added to the Grace and Praise Bangladeshi Church Calendar:

Event Name: {{event_name}}
Event Date: {{event_date}}
Description: {{event_description}}
Added By: {{added_by}}
Added On: {{timestamp}}

This is an automated notification from the GPBC Calendar system.

God Bless,
GPBC Calendar System
```

**To Email:** {{to_email}}
**Reply To:** {{to_email}}

4. Click "Save"
5. Copy your **Template ID**

## Step 4: Get Your Public Key

1. Go to "Account" in EmailJS dashboard
2. Find your **Public Key** (also called User ID)
3. Copy it

## Step 5: Update Calendar Code

Open `calendar.js` and replace these placeholders:

**Line 3:** Replace `YOUR_PUBLIC_KEY` with your actual Public Key
```javascript
emailjs.init('YOUR_PUBLIC_KEY_HERE');
```

**Line 577:** Replace `YOUR_SERVICE_ID` and `YOUR_TEMPLATE_ID`
```javascript
emailjs.send('YOUR_SERVICE_ID_HERE', 'YOUR_TEMPLATE_ID_HERE', templateParams)
```

## Step 6: Set Up CC to gilbert.baidya@gmail.com

In your EmailJS template settings:
1. Go to "Settings" tab
2. Add "Bcc Recipients" field
3. Enter: gilbert.baidya@gmail.com

OR modify the template to include:
**Cc:** gilbert.baidya@gmail.com

## Email Notification Features

✅ Automatic emails when someone adds an event
✅ To: gracepraisebangladeshichurch@gmail.com
✅ CC: gilbert.baidya@gmail.com
✅ Includes event name, date, description
✅ Shows who added the event and when

## Free Tier Limits

EmailJS free tier allows:
- 200 emails per month
- Perfect for church calendar notifications

## Testing

1. After setup, add a test event to the calendar
2. Check your email (gracepraisebangladeshichurch@gmail.com)
3. Verify CC to gilbert.baidya@gmail.com
4. You should receive the notification within 1-2 minutes

## Troubleshooting

**No emails received?**
- Check EmailJS dashboard for error logs
- Verify your Public Key, Service ID, and Template ID are correct
- Make sure your Gmail account is properly connected
- Check spam folder

**Need help?**
- EmailJS documentation: https://www.emailjs.com/docs/
- Support: https://www.emailjs.com/support/

---

## Donation QR Codes

The donation modal includes:
- ✅ Zelle QR code (links to gracepraisebangladeshichurch@gmail.com)
- ✅ PayPal QR code (links to PayPal.me page)
- ✅ Bible verse: 2 Corinthians 9:7
- ✅ Beautiful UI with church branding

**Note:** Update the PayPal link in the code to your actual PayPal.me URL if you have one.
