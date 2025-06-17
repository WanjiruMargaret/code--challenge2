const guestList = document.querySelector('form');
const listInput = document.getElementById('name');
const listUl = document.getElementById('list');

let allGuests = [];

// Load guests from localStorage on page load
window.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('lists');
    if (saved) {
        allGuests = JSON.parse(saved);
        updateGuestList();
    }
});

guestList.addEventListener('submit', function(e) {
    e.preventDefault();
    addGuest();
});

function addGuest() {
    if (allGuests.length >= 10) {
        alert("Guest list limit reached (10 people). " + allGuests.length + " guests.");
        return;
    }
    const listText = listInput.value.trim();
    if (listText.length > 0) {
        allGuests.push({ name: listText, attending: false });
        updateGuestList();
        saveLists();
        listInput.value = "";
    }
}

function updateGuestList() {
    listUl.innerHTML = "";
    allGuests.forEach((guest, listIndex) => {
        const listGuest = createGuestList(guest, listIndex);
        listUl.append(listGuest);
    });
}

function createGuestList(guest, listIndex) {
    const listId = "list-" + listIndex;
    const listLI = document.createElement("li");
    listLI.className = "lists";
    listLI.innerHTML = `
      <label for="${listId}" class="list-text">
        ${guest.name} - <span class="rsvp-status">${guest.attending ? "Attending" : "Not Attending"}</span>
      </label>
      <button class="toggle-rsvp" data-index="${listIndex}">
        <span class="toggle-text">${guest.attending ? "Mark as Not Attending" : "Mark as Attending"}</span>
      </button>
      <button class="delete-button" data-index="${listIndex}">
        <span class="material-symbols-outlined">delete</span>                 
      </button>
    `;
    // RSVP toggle functionality
    listLI.querySelector('.toggle-rsvp').addEventListener('click', function() {
        allGuests[listIndex].attending = !allGuests[listIndex].attending;
        updateGuestList();
        saveLists();
    });
    // Delete functionality
    listLI.querySelector('.delete-button').addEventListener('click', function() {
        allGuests.splice(listIndex, 1);
        updateGuestList();
        saveLists();
    });
    return listLI;
}

function saveLists() {
    const listsJson = JSON.stringify(allGuests);
    localStorage.setItem("lists", listsJson);
}