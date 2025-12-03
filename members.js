// Member Registration System

// Initialize member registration when page loads
document.addEventListener('DOMContentLoaded', function() {
    setupMemberRegistration();
    loadMembersToCalendar();
});

function setupMemberRegistration() {
    // Member registration button
    document.getElementById('specialDaysRegistrationBtn').addEventListener('click', showMemberRegistrationModal);
    
    // Show registration form button
    document.getElementById('showRegistrationForm').addEventListener('click', () => {
        document.getElementById('memberRegistrationModal').style.display = 'none';
        document.getElementById('registrationFormModal').style.display = 'block';
    });
    
    // Cancel registration
    document.getElementById('cancelRegistration').addEventListener('click', () => {
        document.getElementById('registrationFormModal').style.display = 'none';
    });
    
    // Member registration form submission
    document.getElementById('memberRegistrationForm').addEventListener('submit', (e) => {
        e.preventDefault();
        submitMemberRegistration();
    });
    
    // Anniversary checkbox toggle
    document.getElementById('hasAnniversary').addEventListener('change', (e) => {
        document.getElementById('anniversarySection').style.display = e.target.checked ? 'block' : 'none';
    });
    
    // Populate day dropdowns (1-31)
    populateDayDropdown('birthDay');
    populateDayDropdown('anniversaryDay');
}

function populateDayDropdown(id) {
    const select = document.getElementById(id);
    for (let i = 1; i <= 31; i++) {
        const option = document.createElement('option');
        option.value = String(i).padStart(2, '0');
        option.textContent = i;
        select.appendChild(option);
    }
}

function showMemberRegistrationModal() {
    const modal = document.getElementById('memberRegistrationModal');
    
    // Generate QR code for the registration form
    const qrcodeDiv = document.getElementById('qrcode');
    qrcodeDiv.innerHTML = ''; // Clear previous QR code
    
    const currentUrl = window.location.href;
    const registrationUrl = currentUrl.split('?')[0] + '?register=true';
    
    new QRCode(qrcodeDiv, {
        text: registrationUrl,
        width: 200,
        height: 200,
        colorDark: '#667eea',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
    });
    
    // Load and display members
    displayMembers();
    
    modal.style.display = 'block';
}

function submitMemberRegistration() {
    const name = document.getElementById('memberName').value.trim();
    const birthMonth = document.getElementById('birthMonth').value;
    const birthDay = document.getElementById('birthDay').value;
    const hasAnniversary = document.getElementById('hasAnniversary').checked;
    const anniversaryMonth = document.getElementById('anniversaryMonth').value;
    const anniversaryDay = document.getElementById('anniversaryDay').value;
    
    if (!name || !birthMonth || !birthDay) {
        alert('Please fill in all required fields (Name and Birthday)');
        return;
    }
    
    const member = {
        name: name,
        birthday: `${birthMonth}-${birthDay}`,
        anniversary: hasAnniversary && anniversaryMonth && anniversaryDay ? `${anniversaryMonth}-${anniversaryDay}` : null,
        registeredDate: new Date().toISOString()
    };
    
    // Save to localStorage
    const members = getMembers();
    members.push(member);
    localStorage.setItem('gpbcMembers', JSON.stringify(members));
    
    // Add to calendar for 2026
    addMemberToCalendar(member);
    
    // Close modal and show success
    document.getElementById('registrationFormModal').style.display = 'none';
    document.getElementById('memberRegistrationForm').reset();
    document.getElementById('anniversarySection').style.display = 'none';
    
    alert(`✓ Thank you ${name}! Your information has been registered.\nWe'll celebrate your special days at our Sunday services!`);
    
    // Refresh calendar
    if (typeof renderCalendar === 'function') {
        renderCalendar();
        renderMonthEvents();
    }
}

function getMembers() {
    const saved = localStorage.getItem('gpbcMembers');
    return saved ? JSON.parse(saved) : [];
}

function addMemberToCalendar(member) {
    const year = 2026;
    
    // Add birthday
    const [birthMonth, birthDay] = member.birthday.split('-');
    const birthdayDate = `${year}-${birthMonth}-${birthDay}`;
    events.push({
        date: birthdayDate,
        name: `🎂 ${member.name}'s Birthday`,
        category: 'gpbc',
        description: `Birthday celebration for ${member.name}`
    });
    
    // Add anniversary if exists
    if (member.anniversary) {
        const [annMonth, annDay] = member.anniversary.split('-');
        const anniversaryDate = `${year}-${annMonth}-${annDay}`;
        events.push({
            date: anniversaryDate,
            name: `💒 ${member.name}'s Anniversary`,
            category: 'gpbc',
            description: `Wedding anniversary celebration for ${member.name}`
        });
    }
    
    saveCustomEvents();
}

function loadMembersToCalendar() {
    const members = getMembers();
    members.forEach(member => {
        addMemberToCalendar(member);
    });
}

function displayMembers() {
    const members = getMembers();
    const membersList = document.getElementById('membersList');
    
    if (members.length === 0) {
        membersList.innerHTML = '<p style="color: #666; text-align: center; padding: 20px;">No special days registered yet</p>';
        return;
    }
    
    membersList.innerHTML = '';
    members.forEach((member, index) => {
        const memberDiv = document.createElement('div');
        memberDiv.style.cssText = 'background: #f8f9fa; padding: 15px; margin-bottom: 10px; border-radius: 8px; border-left: 4px solid #FF8C00;';
        
        const [birthMonth, birthDay] = member.birthday.split('-');
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const birthdayText = `${monthNames[parseInt(birthMonth) - 1]} ${parseInt(birthDay)}`;
        
        let html = `
            <div style="font-weight: bold; margin-bottom: 5px;">${member.name}</div>
            <div style="font-size: 0.9em; color: #666;">🎂 Birthday: ${birthdayText}</div>
        `;
        
        if (member.anniversary) {
            const [annMonth, annDay] = member.anniversary.split('-');
            const anniversaryText = `${monthNames[parseInt(annMonth) - 1]} ${parseInt(annDay)}`;
            html += `<div style="font-size: 0.9em; color: #666;">💒 Anniversary: ${anniversaryText}</div>`;
        }
        
        memberDiv.innerHTML = html;
        membersList.appendChild(memberDiv);
    });
}

// Check if URL has register parameter and show form
if (window.location.search.includes('register=true')) {
    setTimeout(() => {
        document.getElementById('registrationFormModal').style.display = 'block';
    }, 500);
}
