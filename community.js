document.getElementById('community-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const communityName = document.getElementById('community-name').value;
    localStorage.setItem('communityName', communityName);
    localStorage.setItem('communityAdmin', 'current_user'); // Replace 'current_user' with the current logged in user's username

    document.getElementById('community-name').disabled = true;
    alert(`Community "${communityName}" created successfully!`);

    updateCommunityUI();
});

document.getElementById('add-member-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const memberUsername = document.getElementById('member-username').value;
    let members = JSON.parse(localStorage.getItem('communityMembers')) || [];
    
    if (!members.includes(memberUsername)) {
        members.push(memberUsername);
        localStorage.setItem('communityMembers', JSON.stringify(members));
        alert(`Member "${memberUsername}" added successfully!`);
    } else {
        alert('This member is already in the community!');
    }

    updateMemberList();
});

function updateCommunityUI() {
    const communityName = localStorage.getItem('communityName');
    if (communityName) {
        document.getElementById('community-name').disabled = true;
    }
}

function updateMemberList() {
    const memberList = document.getElementById('member-list');
    memberList.innerHTML = '';
    let members = JSON.parse(localStorage.getItem('communityMembers')) || [];
    
    members.forEach(member => {
        const li = document.createElement('li');
        li.textContent = member;
        memberList.appendChild(li);
    });
}

// Initialize UI
updateCommunityUI();
updateMemberList();
