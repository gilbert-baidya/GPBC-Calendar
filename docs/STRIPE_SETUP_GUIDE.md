# Setting Up Stripe for Card Payments

Your church donation page now supports all major payment methods! Here's how to enable each one:

## ✅ Already Working (No Setup Needed):
- PayPal
- Zelle  
- Venmo
- Cash App

## 🔧 To Enable Card Payments (Visa, Mastercard, Amex, Discover):

### Step 1: Create Stripe Account (FREE)

1. Go to https://stripe.com
2. Click **"Start now"** (free account)
3. Sign up with your church email
4. Verify your email

### Step 2: Create a Payment Link

1. Log into Stripe Dashboard
2. Click **"Payment Links"** in left menu
3. Click **"+ New"**
4. Configure:
   - **Name**: Church Donation
   - **Description**: Support Grace and Praise Bangladeshi Church
   - **Price**: Select **"Customer chooses price"**
   - **Currency**: USD
   - **Payment methods**: Enable all (Visa, Mastercard, Amex, Discover, Apple Pay, Google Pay)
5. Click **"Create link"**

### Step 3: Get Your Payment Link

1. Copy the payment link (looks like: `https://buy.stripe.com/xxxxx`)
2. Open `donations.js` file
3. Replace this line:
   ```javascript
   const STRIPE_PAYMENT_LINK = 'https://buy.stripe.com/YOUR_PAYMENT_LINK';
   ```
   With your actual link:
   ```javascript
   const STRIPE_PAYMENT_LINK = 'https://buy.stripe.com/test_xxxxx';
   ```

### Step 4: Enable Live Mode (For Real Payments)

**Test Mode** (Default):
- Uses test cards
- No real money charged
- Good for testing

**Live Mode** (For real donations):
1. In Stripe Dashboard, toggle from **Test** to **Live** (top right)
2. Complete business verification (IRS EIN, bank account, etc.)
3. Get new live payment link
4. Update `donations.js` with live link

### Step 5: Update the Code

In `donations.js`, find this function and uncomment the code:

```javascript
function handleStripePayment() {
    if (selectedDonationAmount <= 0) {
        alert('Please select or enter a donation amount');
        return;
    }
    
    // Remove the alert, uncomment these lines:
    const paymentUrl = `${STRIPE_PAYMENT_LINK}?prefilled_amount=${selectedDonationAmount * 100}`;
    window.open(paymentUrl, '_blank');
}
```

## 💰 Stripe Fees:

**Standard Processing:**
- 2.9% + $0.30 per transaction
- Example: $100 donation = $2.90 + $0.30 = $3.20 fee = **$96.80 to church**

**Nonprofit Discount Available:**
- Apply at: https://stripe.com/nonprofits
- Reduced to 2.2% + $0.30
- Must provide 501(c)(3) documentation

## 🆚 Alternative: Pushpay

If you prefer Pushpay (mentioned in your request):

1. Go to https://pushpay.com
2. Click **"Request a Demo"**
3. Fees: 2.9% + $0.30 (similar to Stripe)
4. Features:
   - Mobile app for donors
   - Recurring giving
   - Text-to-give
   - Church management tools

**However, Stripe is recommended because:**
- ✅ Free to start (no monthly fees)
- ✅ Easier integration (just a payment link)
- ✅ Works with your existing website
- ✅ No contract required
- ✅ Nonprofit discounts available

## 📱 Digital Wallets (Apple Pay / Google Pay)

These work automatically through Stripe! Once you set up Stripe:
- Apple Pay works on Safari/iPhone
- Google Pay works on Chrome/Android
- No extra setup needed

## 🔒 Security & Compliance

All payment methods are:
- **PCI Compliant** - Stripe handles all card data securely
- **SSL Encrypted** - Your GitHub Pages site uses HTTPS
- **No card data stored** - Everything processed by payment providers

## 📊 Tracking Donations

**With Stripe:**
1. Dashboard shows all transactions
2. Export reports for accounting
3. Send tax receipts to donors
4. See donation trends

**With Google Sheets:**
- You can add a "Donations" sheet
- Track donor names, amounts, dates
- Generate reports

## 🎯 Recommended Setup Priority:

1. **Start using now**: PayPal, Zelle, Venmo, Cash App (already working!)
2. **This week**: Set up Stripe test mode
3. **Next week**: Complete Stripe verification for live mode
4. **Future**: Consider Pushpay if you need advanced features

## 💡 Pro Tips:

- **Recurring Giving**: Enable in Stripe settings for monthly donors
- **Tax Receipts**: Set up automatic emails through Stripe
- **Goal Tracking**: Add a donation goal meter to your website
- **Thank You Page**: Redirect donors to a thank you page after payment

---

## Need Help?

The donation page is live with:
- ✅ 7 payment methods
- ✅ Amount selection ($25, $50, $100, $250, custom)
- ✅ Professional design
- ✅ Mobile-friendly
- ✅ QR codes for quick access

Just need to connect Stripe for card payments!
