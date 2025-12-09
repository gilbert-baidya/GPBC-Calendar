// GPBC Song Book JavaScript
// Sample songs data - you can add more songs here
const songs = [
    {
        id: 1,
        title: "প্রভু যীশু আমার পরিত্রাতা (Prabhu Yeshu Amar Poritrata)",
        language: "bangla",
        category: "worship",
        key: "G",
        tempo: "Slow",
        preview: "প্রভু যীশু আমার পরিত্রাতা, তুমি আমার জীবন...",
        lyrics: `[Verse 1]
G           D
প্রভু যীশু আমার পরিত্রাতা
Em          C
তুমি আমার জীবন
G           D
তোমার প্রেমে আমি বাঁচি
Em      C       G
তুমি আমার সবকিছু

[Chorus]
C           G
আমি তোমাকে ভালোবাসি
D           Em
তুমি আমার প্রাণ
C           G
তোমার নামে আমি জয়ী
D           G
যীশু আমার ত্রাণ`,
        chords: ["G", "D", "Em", "C"],
        submittedBy: "GPBC Worship Team"
    },
    {
        id: 2,
        title: "Amazing Grace",
        language: "english",
        category: "worship",
        key: "G",
        tempo: "Slow",
        preview: "Amazing grace, how sweet the sound...",
        lyrics: `[Verse 1]
G           G7        C
Amazing grace, how sweet the sound
G              D
That saved a wretch like me
G           G7      C
I once was lost, but now I'm found
G       D       G
Was blind but now I see

[Verse 2]
G              G7         C
'Twas grace that taught my heart to fear
G              D
And grace my fears relieved
G           G7        C
How precious did that grace appear
G       D       G
The hour I first believed`,
        chords: ["G", "G7", "C", "D"],
        submittedBy: "GPBC Worship Team"
    },
    {
        id: 3,
        title: "তুমি মহান (Tumi Mahan - You Are Great)",
        language: "bilingual",
        category: "praise",
        key: "D",
        tempo: "Medium",
        preview: "তুমি মহান, You are great, O Lord...",
        lyrics: `[Verse 1]
D           A
তুমি মহান, তুমি মহান
Bm          G
You are great, O Lord
D           A
আমার ঈশ্বর, আমার রাজা
Bm      G       D
My God and my King

[Chorus]
G           D
Hallelujah, Hallelujah
A           Bm
তোমার মহিমা গাই
G           D
You are worthy, You are holy
A           D
Forever I will praise`,
        chords: ["D", "A", "Bm", "G"],
        submittedBy: "GPBC Worship Team"
    },
    {
        id: 4,
        title: "How Great Thou Art",
        language: "english",
        category: "worship",
        key: "C",
        tempo: "Slow",
        preview: "O Lord my God, when I in awesome wonder...",
        lyrics: `[Verse 1]
C                      F        C
O Lord my God, when I in awesome wonder
                         G
Consider all the worlds Thy hands have made
C                    F           C
I see the stars, I hear the rolling thunder
                  G              C
Thy power throughout the universe displayed

[Chorus]
C                  F           C
Then sings my soul, my Savior God to Thee
              Am         G
How great Thou art, how great Thou art
C                  F           C
Then sings my soul, my Savior God to Thee
              G              C
How great Thou art, how great Thou art`,
        chords: ["C", "F", "G", "Am"],
        submittedBy: "GPBC Worship Team"
    },
    {
        id: 5,
        title: "আনন্দময় দিন (Anandomoy Din - Joyful Day)",
        language: "bangla",
        category: "christmas",
        key: "G",
        tempo: "Fast",
        preview: "আনন্দময় দিন আজ, যীশু এলেন পৃথিবীতে...",
        lyrics: `[Verse 1]
G           D
আনন্দময় দিন আজ
Em          C
যীশু এলেন পৃথিবীতে
G           D
ত্রাণকর্তা এসেছেন
Em      C       G
আমাদের বাঁচাতে

[Chorus]
C           G
গ্লোরিয়া, গ্লোরিয়া
D           Em
স্বর্গে শান্তি এলো
C           G
হালেলুইয়া গাই
D           G
প্রভু জন্ম নিলো`,
        chords: ["G", "D", "Em", "C"],
        submittedBy: "GPBC Worship Team"
    }
];

let currentFilter = 'all';
let currentLanguage = 'all';
let searchTerm = '';

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    displaySongs();
    setupEventListeners();
});

function setupEventListeners() {
    // Search
    document.getElementById('searchSongs').addEventListener('input', (e) => {
        searchTerm = e.target.value.toLowerCase();
        displaySongs();
    });

    // Language filter
    document.getElementById('languageFilter').addEventListener('change', (e) => {
        currentLanguage = e.target.value;
        displaySongs();
    });

    // Category filters
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.dataset.category;
            displaySongs();
        });
    });

    // Modal close buttons
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });

    // Close modal on outside click
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });

    // Add song button
    document.getElementById('addSongBtn').addEventListener('click', () => {
        document.getElementById('addSongModal').style.display = 'block';
    });

    // Cancel add song
    document.getElementById('cancelAddSong').addEventListener('click', () => {
        document.getElementById('addSongModal').style.display = 'none';
        document.getElementById('addSongForm').reset();
    });

    // Submit song form
    document.getElementById('addSongForm').addEventListener('submit', handleSongSubmit);
}

function displaySongs() {
    const grid = document.getElementById('songsGrid');
    const filteredSongs = songs.filter(song => {
        const matchesCategory = currentFilter === 'all' || song.category === currentFilter;
        const matchesLanguage = currentLanguage === 'all' || song.language === currentLanguage;
        const matchesSearch = searchTerm === '' || 
            song.title.toLowerCase().includes(searchTerm) ||
            song.lyrics.toLowerCase().includes(searchTerm);
        
        return matchesCategory && matchesLanguage && matchesSearch;
    });

    if (filteredSongs.length === 0) {
        grid.innerHTML = '<p style="text-align: center; color: #666; grid-column: 1/-1; padding: 40px;">No songs found. Try different filters or add a new song!</p>';
        return;
    }

    grid.innerHTML = filteredSongs.map(song => `
        <div class="song-card" onclick="showSong(${song.id})">
            <h3>${song.title}</h3>
            <div class="song-info">
                ${song.key ? `<span class="song-tag key">Key: ${song.key}</span>` : ''}
                <span class="song-tag">${getCategoryIcon(song.category)} ${song.category}</span>
                <span class="song-tag">${getLanguageIcon(song.language)} ${getLanguageName(song.language)}</span>
            </div>
            <p class="song-preview">${song.preview}</p>
        </div>
    `).join('');
}

function showSong(songId) {
    const song = songs.find(s => s.id === songId);
    if (!song) return;

    const modal = document.getElementById('songModal');
    const details = document.getElementById('songDetails');

    details.innerHTML = `
        <h2>${song.title}</h2>
        <div class="song-meta">
            ${song.key ? `<div class="meta-item"><strong>Key:</strong> ${song.key}</div>` : ''}
            ${song.tempo ? `<div class="meta-item"><strong>Tempo:</strong> ${song.tempo}</div>` : ''}
            <div class="meta-item"><strong>Category:</strong> ${getCategoryIcon(song.category)} ${song.category}</div>
            <div class="meta-item"><strong>Language:</strong> ${getLanguageIcon(song.language)} ${getLanguageName(song.language)}</div>
        </div>

        ${song.chords && song.chords.length > 0 ? `
            <div class="chords-section">
                <h3>🎸 Chords Used</h3>
                <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                    ${song.chords.map(chord => `<span style="padding: 8px 15px; background: white; border-radius: 8px; font-weight: bold; color: #856404;">${chord}</span>`).join('')}
                </div>
            </div>
        ` : ''}

        <div class="lyrics-section">
            <h3>📝 Lyrics with Chords</h3>
            ${formatLyrics(song.lyrics)}
        </div>

        <div class="action-buttons">
            <button class="btn btn-primary" onclick="printSong(${song.id})">🖨️ Print</button>
            <button class="btn btn-secondary" onclick="downloadSong(${song.id})">📥 Download PDF</button>
        </div>

        <p style="margin-top: 20px; color: #666; font-size: 0.9em; text-align: center;">
            Submitted by: ${song.submittedBy}
        </p>
    `;

    modal.style.display = 'block';
}

function formatLyrics(lyrics) {
    const lines = lyrics.split('\n');
    let html = '';
    let currentVerse = '';

    lines.forEach(line => {
        if (line.startsWith('[')) {
            if (currentVerse) {
                html += '</div>';
            }
            currentVerse = line;
            html += `<div class="verse"><div class="verse-label">${line}</div>`;
        } else if (line.trim() && /^[A-G]/.test(line.trim()) && line.includes(' ')) {
            html += `<div class="chord-line">${line}</div>`;
        } else if (line.trim()) {
            html += `<div class="verse-text">${line}</div>`;
        }
    });

    if (currentVerse) {
        html += '</div>';
    }

    return html;
}

function getCategoryIcon(category) {
    const icons = {
        worship: '🙏',
        praise: '🎵',
        prayer: '📿',
        christmas: '🎄',
        easter: '✝️'
    };
    return icons[category] || '🎵';
}

function getLanguageIcon(language) {
    const icons = {
        bangla: '🇧🇩',
        english: '🇺🇸',
        bilingual: '🌐'
    };
    return icons[language] || '🌐';
}

function getLanguageName(language) {
    const names = {
        bangla: 'বাংলা',
        english: 'English',
        bilingual: 'Bilingual'
    };
    return names[language] || language;
}

function printSong(songId) {
    const song = songs.find(s => s.id === songId);
    if (!song) return;

    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.write(`
        <html>
        <head>
            <title>${song.title}</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                h1 { color: #667eea; }
                .chord-line { color: #dc3545; font-weight: bold; font-family: monospace; }
                .verse { margin-bottom: 20px; }
                .verse-label { font-weight: bold; margin-bottom: 10px; }
            </style>
        </head>
        <body>
            <h1>${song.title}</h1>
            <p><strong>Key:</strong> ${song.key || 'N/A'} | <strong>Tempo:</strong> ${song.tempo || 'N/A'}</p>
            <hr>
            ${formatLyrics(song.lyrics)}
            <hr>
            <p style="text-align: center; color: #666;">Grace and Praise Bangladeshi Church | GPBC Song Book</p>
        </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
}

function downloadSong(songId) {
    alert('PDF download feature coming soon! For now, use the Print button and save as PDF from your browser.');
}

function handleSongSubmit(e) {
    e.preventDefault();

    const newSong = {
        id: songs.length + 1,
        title: document.getElementById('songTitle').value,
        language: document.getElementById('songLanguage').value,
        category: document.getElementById('songCategory').value,
        key: document.getElementById('songKey').value || null,
        tempo: document.getElementById('songTempo').value || null,
        lyrics: document.getElementById('songLyrics').value,
        preview: document.getElementById('songLyrics').value.split('\n').find(l => l.trim() && !l.startsWith('[') && !/^[A-G]/.test(l)) || '',
        chords: extractChords(document.getElementById('songLyrics').value),
        submittedBy: document.getElementById('submitterName').value
    };

    songs.push(newSong);
    displaySongs();
    
    document.getElementById('addSongModal').style.display = 'none';
    document.getElementById('addSongForm').reset();
    
    alert('✅ Song submitted successfully! Thank you for contributing to the GPBC Song Book!');
}

function extractChords(lyrics) {
    const chordPattern = /\b[A-G][#b]?(m|maj|min|sus|dim|aug|add|[0-9])?\b/g;
    const matches = lyrics.match(chordPattern);
    return matches ? [...new Set(matches)] : [];
}
