// Load church logo and branding from settings
async function loadChurchLogo() {
    try {
        const response = await fetch('/content/settings/logo.json');
        const settings = await response.json();
        
        // Update all logo elements
        const logoElements = document.querySelectorAll('.logo');
        logoElements.forEach(logo => {
            // Ensure the logo is a link to home
            if (!logo.hasAttribute('href')) {
                logo.setAttribute('href', 'index.html');
            }
            
            if (settings.logo && settings.logo.trim() !== '') {
                // Logo image exists - replace text with image
                logo.innerHTML = `<img src="${settings.logo}" alt="${settings.churchName}" style="height: 50px; width: auto; object-fit: contain;">`;
            } else {
                // No logo - use abbreviation text
                logo.textContent = settings.abbreviation || 'GPBC';
            }
        });
        
        // Update page title if needed
        if (settings.churchName) {
            // Only update if it contains the church name placeholder
            const titleElement = document.querySelector('title');
            if (titleElement && titleElement.textContent.includes('Grace and Praise Bangladeshi Church')) {
                titleElement.textContent = titleElement.textContent.replace(
                    'Grace and Praise Bangladeshi Church',
                    settings.churchName
                );
            }
        }
        
    } catch (error) {
        console.log('Logo settings not found or error loading:', error);
        // Keep default GPBC text if settings fail to load
    }
}

// Load logo when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadChurchLogo);
} else {
    loadChurchLogo();
}
