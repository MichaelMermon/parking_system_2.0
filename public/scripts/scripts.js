// Update the base URL for API requests
const BASE_URL = '/api';

// Fetch slot status from the backend
function fetchSlotStatus() {
  fetch(`${BASE_URL}/slots`)
    .then((response) => response.json())
    .then((slots) => {
      slots.forEach((slot) => {
        updateSlotStatus(slot.slot_number, slot.status);
      });
    })
    .catch((error) => console.error('Error fetching slot status:', error));
}

// Send reservation data to the backend
function reserveSlot(slot, start, end, name, contact) {
  fetch(`${BASE_URL}/reserve`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ slot_number: slot, start, end, name, contact }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message) {
        alert('Reservation Successful!');
        updateSlotStatus(slot, false); // Mark the slot as occupied
      } else {
        alert('Reservation failed: ' + data.error);
      }
    })
    .catch((error) => console.error('Error reserving slot:', error));
}

// Fetch reservation for a contact
function fetchReservation(contact) {
  fetch(`${BASE_URL}/reservations?contact=${contact}`)
    .then((response) => response.json())
    .then((reservation) => {
      displayReservation(reservation);
    })
    .catch((error) => console.error('Error fetching reservation:', error));
}
