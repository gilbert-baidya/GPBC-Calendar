# GPBC Admin Panel Setup Guide

## Overview
The GPBC website now has an admin panel powered by Decap CMS (formerly Netlify CMS) that allows church volunteers to upload images and manage content without touching code.

## Access the Admin Panel
Once deployed on Netlify, access the admin panel at:
**https://gracepraise.netlify.app/admin**

## Setup Steps on Netlify

### 1. Enable Netlify Identity
1. Go to your Netlify dashboard
2. Select your site (gracepraise)
3. Go to **Site settings** → **Identity**
4. Click **Enable Identity**

### 2. Enable Git Gateway
1. In the Identity section, scroll down to **Services**
2. Click **Enable Git Gateway**
3. This allows the CMS to commit changes to your GitHub repository

### 3. Invite Users
1. Go to **Identity** tab
2. Click **Invite users**
3. Enter email addresses of church volunteers who should have access
4. They will receive an invitation email

### 4. Set Registration Preferences (Optional)
1. Under **Registration preferences**, you can choose:
   - **Invite only** (recommended) - Only invited users can access
   - **Open** - Anyone can register (not recommended for church sites)

## How Volunteers Use the Admin Panel

### First Time Access:
1. Volunteer receives invitation email
2. Clicks the link and sets their password
3. Goes to https://gracepraise.netlify.app/admin
4. Logs in with their email and password

### Uploading Images:
1. Click **Church Gallery** in the left sidebar
2. Click **New Image**
3. Fill in the details:
   - **Title**: Name of the image/event
   - **Description**: Optional description
   - **Upload Date**: Automatically filled
   - **Image**: Drag and drop or click to upload
   - **Category**: Select from dropdown (Worship Service, Special Events, etc.)
   - **Tags**: Add relevant tags (optional)
4. Click **Publish** or **Save as Draft**

### Adding Events:
1. Click **Events** in the sidebar
2. Click **New Event**
3. Fill in event details
4. Upload an event image (optional)
5. Publish

### Adding Testimonies:
1. Click **Testimonies**
2. Click **New Testimony**
3. Fill in details and upload photo
4. Publish

## Editorial Workflow
The CMS uses an editorial workflow:
- **Draft**: Work in progress, not published
- **In Review**: Ready for review
- **Ready**: Approved and will be published

When a user publishes content, it creates a pull request in GitHub. You can review and merge it to make it live.

## Folder Structure
```
GPBC-Calendar/
├── admin/
│   ├── index.html          # Admin panel page
│   └── config.yml          # CMS configuration
├── images/
│   └── uploads/            # Uploaded images stored here
├── content/
│   ├── events/            # Event content
│   └── testimonies/       # Testimony content
```

## Security
- Only invited users can access the admin panel
- All changes are tracked in Git
- You can review all changes before they go live
- Netlify Identity handles authentication securely

## Support
If volunteers have issues:
1. Check they received the invitation email
2. Verify they're using the correct email address
3. Try resetting their password in Netlify Identity dashboard
4. Check that Git Gateway is enabled

## Next Steps After Deployment
1. Deploy this code to Netlify
2. Enable Netlify Identity (Settings → Identity → Enable Identity)
3. Enable Git Gateway (Settings → Identity → Services → Enable Git Gateway)
4. Invite your first admin user
5. Test the admin panel at /admin
6. Invite church volunteers

## Features
✅ Drag and drop image uploads
✅ Image categorization
✅ Event management
✅ Testimony collection
✅ Editorial workflow
✅ User authentication
✅ Git-based version control
✅ No coding required for volunteers
