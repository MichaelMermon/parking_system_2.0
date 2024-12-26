const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// In-memory storage for slots and reservations
let slots = [
  { slot_number: 1, status: true },
  { slot_number: 2, status: true },
  { slot_number: 3, status: true },
  { slot_number: 4, status: true },
  { slot_number: 5, status: true },
  { slot_number: 6, status: true },
];

let reservations = [];

// Function to check expired reservations
function checkExpiredReservations() {
  const currentTime = new Date();

  reservations = reservations.filter((reservation) => {
    if (new Date(reservation.end) <= currentTime) {
      // Mark the slot as available
      slots.find((slot) => slot.slot_number === reservation.slot_number).status = true;
      return false; // Remove expired reservation
    }
    return true;
  });
}

// Check expired reservations every 60 seconds
setInterval(checkExpiredReservations, 60 * 1000);

// API to fetch the parking slot status
app.get('/api/slots', (req, res) => {
  res.json(slots);
});

// API to reserve a parking slot
app.post('/api/reserve', (req, res) => {
  const { slot_number, start, end, name, contact } = req.body;

  if (!slot_number || !start || !end || !name || !contact) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const slot = slots.find((s) => s.slot_number === slot_number);

  if (!slot || !slot.status) {
    return res.status(400).json({ error: 'Slot is not available' });
  }

  slot.status = false;
  reservations.push({ slot_number, start, end, name, contact });
  res.status(201).json({ message: 'Reservation successful' });
});

// API to fetch reservations by contact
app.get('/api/reservations', (req, res) => {
  const { contact } = req.query;

  if (!contact) {
    return res.status(400).json({ error: 'Contact is required' });
  }

  const reservation = reservations.find((r) => r.contact === contact);

  if (!reservation) {
    return res.status(404).json({ message: 'No reservations found' });
  }

  res.json(reservation);
});

module.exports = app;
