document.getElementById('event-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const eventTitle = document.getElementById('event-title').value;
    const eventDate = document.getElementById('event-date').value;

    // Check if the current user is the admin
    const currentUser = 'current_user'; // Replace with the current logged in user's username
    const admin = localStorage.getItem('communityAdmin');

    if (currentUser !== admin) {
        alert('Only the community admin can add events.');
        return;
    }

    let events = JSON.parse(localStorage.getItem('communityEvents')) || [];
    events.push({ title: eventTitle, date: eventDate });
    localStorage.setItem('communityEvents', JSON.stringify(events));

    displayEvents();
});

function displayEvents() {
    const calendarDiv = document.getElementById('calendar');
    calendarDiv.innerHTML = '';

    // Create a simple calendar grid
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    daysOfWeek.forEach(day => {
        const dayDiv = document.createElement('div');
        dayDiv.textContent = day;
        dayDiv.style.fontWeight = 'bold';
        calendarDiv.appendChild(dayDiv);
    });

    const daysInMonth = 31; // Simplification, assume 31 days for now
    for (let i = 1; i <= daysInMonth; i++) {
        const dayDiv = document.createElement('div');
        dayDiv.textContent = i;
        calendarDiv.appendChild(dayDiv);
    }

    // Display events
    const events = JSON.parse(localStorage.getItem('communityEvents')) || [];
    events.forEach(event => {
        const eventDate = new Date(event.date);
        const eventDay = eventDate.getDate();

        const dayDivs = calendarDiv.getElementsByTagName('div');
        for (let i = 7; i < dayDivs.length; i++) { // Skipping first 7 divs (days of week)
            if (parseInt(dayDivs[i].textContent) === eventDay) {
                dayDivs[i].style.backgroundColor = '#ffcccb'; // Highlight event day
                dayDivs[i].textContent += `\n${event.title}`;
                break;
            }
        }
    });
}

// Initialize calendar display
displayEvents();


// Function to display events on the calendar
function displayEvents() {
    const calendarDiv = document.getElementById('calendar');
    calendarDiv.innerHTML = '';

    const daysOfWeek = [ 'Monday', 'Tuesday', 'Wedday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    daysOfWeek.forEach(day => {
        const dayDiv = document.createElement('div');
        dayDiv.textContent = day;
        dayDiv.style.fontWeight = 'bold';
        calendarDiv.appendChild(dayDiv);
    });

    const daysInMonth = 31; // Simplification, assume 31 days for now
    for (let i = 1; i <= daysInMonth; i++) {
        const dayDiv = document.createElement('div');
        dayDiv.textContent = i;
        calendarDiv.appendChild(dayDiv);
    }

    const events = JSON.parse(localStorage.getItem('communityEvents')) || [];
    events.forEach((event, index) => {
        const eventDate = new Date(event.date);
        const eventDay = eventDate.getDate();

        const dayDivs = calendarDiv.getElementsByTagName('div');
        for (let i = 7; i < dayDivs.length; i++) {  // Start from index 7 to skip days of the week
            if (parseInt(dayDivs[i].textContent) === eventDay) {
                const eventDiv = document.createElement('div');
                eventDiv.className = 'event';
                eventDiv.textContent = event.title;

                // Create a remove button
                const removeBtn = document.createElement('span');
                removeBtn.className = 'remove-event';
                removeBtn.textContent = 'x';
                removeBtn.addEventListener('click', function() {
                    removeEvent(index);
                });

                eventDiv.appendChild(removeBtn);
                dayDivs[i].appendChild(eventDiv);
                break;
            }
        }
    });
}

// Function to remove an event by index
function removeEvent(eventIndex) {
    let events = JSON.parse(localStorage.getItem('communityEvents')) || [];
    events.splice(eventIndex, 1);
    localStorage.setItem('communityEvents', JSON.stringify(events));
    displayEvents();  // Re-render the calendar with the updated events list
}

// Initialize calendar display
displayEvents();


