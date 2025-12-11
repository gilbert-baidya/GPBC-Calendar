/**
 * Mobile Menu JavaScript
 * Interactive mobile navigation for GPBC
 */

class MobileMenu {
    constructor() {
        this.init();
    }

    init() {
        this.createMobileMenu();
        this.setupEventListeners();
    }

    createMobileMenu() {
        // Create mobile menu button
        const menuBtn = document.createElement('button');
        menuBtn.className = 'mobile-menu-btn';
        menuBtn.innerHTML = '☰';
        menuBtn.setAttribute('aria-label', 'Open menu');
        
        const navContainer = document.querySelector('.nav-container');
        if (navContainer) {
            navContainer.appendChild(menuBtn);
        }

        // Create mobile menu overlay
        const overlay = document.createElement('div');
        overlay.className = 'mobile-menu-overlay';
        document.body.appendChild(overlay);

        // Create mobile menu
        const mobileMenu = document.createElement('div');
        mobileMenu.className = 'mobile-menu';
        mobileMenu.innerHTML = `
            <div class="mobile-menu-header">
                <div class="mobile-menu-logo">⛪ GPBC</div>
                <button class="mobile-menu-close" aria-label="Close menu">×</button>
            </div>
            <ul class="mobile-nav-links">
                <li><a href="index.html">🏠 Home</a></li>
                <li class="mobile-dropdown">
                    <a href="about.html">
                        ℹ️ About
                        <button class="mobile-dropdown-toggle">▼</button>
                    </a>
                    <div class="mobile-dropdown-content">
                        <a href="about.html#history">Our History</a>
                        <a href="about.html#mission">Our Mission</a>
                        <a href="about.html#leadership">Our Leadership</a>
                        <a href="about.html#beliefs">Our Beliefs</a>
                        <a href="about.html#values">Our Core Values</a>
                        <a href="about.html#position">Position Papers</a>
                        <a href="about.html#testimonies">Testimonies</a>
                        <a href="about.html#songbook">GPBC Song Book</a>
                    </div>
                </li>
                <li><a href="calendar.html">📅 Calendar</a></li>
                <li><a href="calendar.html#prayer">🙏 Prayer</a></li>
                <li><a href="give.html">💝 Give</a></li>
            </ul>
        `;
        document.body.appendChild(mobileMenu);

        this.menuBtn = menuBtn;
        this.overlay = overlay;
        this.mobileMenu = mobileMenu;
        this.closeBtn = mobileMenu.querySelector('.mobile-menu-close');
    }

    setupEventListeners() {
        // Open menu
        this.menuBtn.addEventListener('click', () => this.openMenu());

        // Close menu
        this.closeBtn.addEventListener('click', () => this.closeMenu());
        this.overlay.addEventListener('click', () => this.closeMenu());

        // Dropdown toggles
        const dropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const dropdown = toggle.closest('.mobile-dropdown');
                
                // Close other dropdowns
                document.querySelectorAll('.mobile-dropdown').forEach(d => {
                    if (d !== dropdown) {
                        d.classList.remove('active');
                    }
                });
                
                dropdown.classList.toggle('active');
            });
        });

        // Close menu when clicking nav links (including dropdown links)
        const navLinks = this.mobileMenu.querySelectorAll('.mobile-nav-links a');
        navLinks.forEach(link => {
            // Skip the main dropdown toggle link, but close on dropdown content links
            if (!link.querySelector('.mobile-dropdown-toggle')) {
                link.addEventListener('click', () => {
                    // Close all dropdowns first
                    document.querySelectorAll('.mobile-dropdown').forEach(d => {
                        d.classList.remove('active');
                    });
                    setTimeout(() => this.closeMenu(), 200);
                });
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.mobileMenu.classList.contains('active')) {
                this.closeMenu();
            }
        });
    }

    openMenu() {
        this.mobileMenu.classList.add('active');
        this.overlay.classList.add('active');
        document.body.classList.add('mobile-menu-open');
        this.menuBtn.innerHTML = '×';
    }

    closeMenu() {
        this.mobileMenu.classList.remove('active');
        this.overlay.classList.remove('active');
        document.body.classList.remove('mobile-menu-open');
        this.menuBtn.innerHTML = '☰';
        
        // Close all dropdowns when menu closes
        document.querySelectorAll('.mobile-dropdown').forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }
}

// Initialize mobile menu when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new MobileMenu();
});
