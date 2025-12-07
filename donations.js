// Donation System
// Handles all donation-related functionality

// Stripe Configuration
const STRIPE_PUBLISHABLE_KEY = 'pk_test_YOUR_STRIPE_KEY_HERE'; // Not needed for payment links
const STRIPE_PAYMENT_LINK = 'https://buy.stripe.com/test_fZu6oJ7PMb7794d6NsfEk00';

let selectedDonationAmount = 0;

function setupDonationModal() {
    const donationBtn = document.getElementById('donationBtn');
    const modal = document.getElementById('donationModal');
    const closeBtn = modal.querySelector('.close');
    
    // Open modal
    donationBtn.addEventListener('click', () => {
        modal.style.display = 'block';
        generateDonationQRCodes();
    });
    
    // Close modal
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    // Amount selection buttons
    const amountButtons = document.querySelectorAll('.donation-amount-btn');
    amountButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove selected class from all buttons
            amountButtons.forEach(b => {
                b.style.background = 'white';
                b.style.color = '#667eea';
            });
            
            // Add selected class to clicked button
            this.style.background = '#667eea';
            this.style.color = 'white';
            
            // Set selected amount
            selectedDonationAmount = parseInt(this.dataset.amount);
            
            // Clear custom amount
            document.getElementById('customAmount').value = '';
        });
    });
    
    // Custom amount input
    const customAmountInput = document.getElementById('customAmount');
    customAmountInput.addEventListener('input', function() {
        // Deselect preset amounts
        amountButtons.forEach(b => {
            b.style.background = 'white';
            b.style.color = '#667eea';
        });
        
        selectedDonationAmount = parseFloat(this.value) || 0;
    });
    
    // Stripe payment button
    const stripeBtn = document.getElementById('stripePaymentBtn');
    stripeBtn.addEventListener('click', handleStripePayment);
    
    // Apple/Google Pay button
    const appleGooglePayBtn = document.getElementById('appleGooglePayBtn');
    appleGooglePayBtn.addEventListener('click', handleDigitalWalletPayment);
}

function generateDonationQRCodes() {
    // Generate Zelle QR Code
    const zelleDiv = document.getElementById('zelleQR');
    if (zelleDiv && typeof QRCode !== 'undefined') {
        zelleDiv.innerHTML = '';
        new QRCode(zelleDiv, {
            text: 'gracepraisebangladeshichurch@gmail.com',
            width: 150,
            height: 150,
            colorDark: "#667eea",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
    }
    
    // Generate PayPal QR Code
    const paypalDiv = document.getElementById('paypalQR');
    if (paypalDiv && typeof QRCode !== 'undefined') {
        paypalDiv.innerHTML = '';
        new QRCode(paypalDiv, {
            text: 'https://www.paypal.com/paypalme/gpbchurch',
            width: 150,
            height: 150,
            colorDark: "#0070ba",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
    }
}

function handleStripePayment() {
    if (selectedDonationAmount <= 0) {
        alert('Please select or enter a donation amount');
        return;
    }
    
    // Open Stripe payment page with prefilled amount
    const paymentUrl = `${STRIPE_PAYMENT_LINK}?prefilled_amount=${selectedDonationAmount * 100}`;
    window.open(paymentUrl, '_blank');
}

function handleDigitalWalletPayment() {
    if (selectedDonationAmount <= 0) {
        alert('Please select or enter a donation amount');
        return;
    }
    
    // Check if Payment Request API is available
    if (!window.PaymentRequest) {
        alert('Digital wallet payments are not supported on this device/browser.\n\nPlease use:\n• PayPal\n• Zelle\n• Venmo\n• Cash App');
        return;
    }
    
    // For demonstration - in production you'd integrate with Stripe Payment Request API
    alert(`Digital Wallet Payment\n\nAmount: $${selectedDonationAmount}\n\nTo enable Apple Pay/Google Pay:\n1. Set up Stripe account\n2. Integrate Payment Request API\n\nFor now, please use other payment methods.`);
}

// Add hover effects for donation amount buttons
document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
        .donation-amount-btn:hover {
            background: #667eea !important;
            color: white !important;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
        }
    `;
    document.head.appendChild(style);
});
