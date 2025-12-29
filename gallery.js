// Gallery JavaScript
let allPhotos = [];
let currentFilter = 'all';

// Load gallery photos from content/gallery folder
async function loadGalleryPhotos() {
    try {
        // For localhost development, we'll fetch the gallery markdown files
        const response = await fetch('/content/gallery/');
        const text = await response.text();
        
        // Parse directory listing to get .md files
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');
        const links = Array.from(doc.querySelectorAll('a')).filter(a => a.href.endsWith('.md'));
        
        // Fetch each markdown file
        for (const link of links) {
            const mdResponse = await fetch(link.href);
            const mdText = await mdResponse.text();
            
            // Parse frontmatter
            const photo = parseFrontmatter(mdText);
            if (photo) {
                allPhotos.push(photo);
            }
        }
        
        // Sort by date (newest first)
        allPhotos.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        displayPhotos();
    } catch (error) {
        console.error('Error loading gallery:', error);
        // If loading fails, show no photos message
        document.getElementById('noPhotos').style.display = 'block';
    }
}

// Parse markdown frontmatter
function parseFrontmatter(markdown) {
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---/;
    const match = markdown.match(frontmatterRegex);
    
    if (!match) return null;
    
    const frontmatter = match[1];
    const photo = {};
    
    // Parse YAML-like frontmatter
    const lines = frontmatter.split('\n');
    for (const line of lines) {
        const [key, ...valueParts] = line.split(':');
        if (key && valueParts.length > 0) {
            const value = valueParts.join(':').trim().replace(/^["']|["']$/g, '');
            photo[key.trim()] = value;
        }
    }
    
    return photo;
}

// Display photos in the gallery
function displayPhotos() {
    const grid = document.getElementById('galleryGrid');
    const noPhotos = document.getElementById('noPhotos');
    
    // Filter photos
    const filteredPhotos = currentFilter === 'all' 
        ? allPhotos 
        : allPhotos.filter(photo => photo.category === currentFilter);
    
    if (filteredPhotos.length === 0) {
        grid.style.display = 'none';
        noPhotos.style.display = 'block';
        return;
    }
    
    grid.style.display = 'grid';
    noPhotos.style.display = 'none';
    
    // Clear existing photos
    grid.innerHTML = '';
    
    // Add photos to grid
    filteredPhotos.forEach((photo, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.onclick = () => openLightbox(index, filteredPhotos);
        
        item.innerHTML = `
            <img src="${photo.image}" alt="${photo.title || 'Church photo'}" loading="lazy">
            <div class="gallery-item-info">
                <div class="gallery-item-title">${photo.title || 'Untitled'}</div>
                ${photo.description ? `<div class="gallery-item-description">${photo.description}</div>` : ''}
                <span class="gallery-item-category">${photo.category || 'Other'}</span>
            </div>
        `;
        
        grid.appendChild(item);
    });
}

// Filter button functionality
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active state
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Update filter and display
        currentFilter = btn.dataset.category;
        displayPhotos();
    });
});

// Lightbox functionality
function openLightbox(index, photos) {
    const photo = photos[index];
    const lightbox = document.getElementById('lightbox');
    
    document.getElementById('lightboxImg').src = photo.image;
    document.getElementById('lightboxTitle').textContent = photo.title || 'Untitled';
    document.getElementById('lightboxDescription').textContent = photo.description || '';
    document.getElementById('lightboxCategory').textContent = photo.category || 'Other';
    
    lightbox.classList.add('active');
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
}

// Close lightbox on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeLightbox();
    }
});

// Close lightbox when clicking outside the image
document.getElementById('lightbox').addEventListener('click', (e) => {
    if (e.target.id === 'lightbox') {
        closeLightbox();
    }
});

// Load photos when page loads
document.addEventListener('DOMContentLoaded', loadGalleryPhotos);
