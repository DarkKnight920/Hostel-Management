const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/hostelManagement', { useNewUrlParser: true, useUnifiedTopology: true });

const RoomSchema = new mongoose.Schema({
    roomNumber: String,
    isBooked: Boolean,
    bookingDetails: {
        residentName: String,
        startDate: Date,
        endDate: Date
    }
});

const TicketSchema = new mongoose.Schema({
    issue: String,
    status: { type: String, default: 'open' },
    createdAt: { type: Date, default: Date.now }
});

const Room = mongoose.model('Room', RoomSchema);
const Ticket = mongoose.model('Ticket', TicketSchema);

// Room Booking API
app.post('/book-room', async (req, res) => {
    const { roomNumber, residentName, startDate, endDate } = req.body;
    const room = await Room.findOne({ roomNumber });

    if (room && !room.isBooked) {
        room.isBooked = true;
        room.bookingDetails = { residentName, startDate, endDate };
        await room.save();
        res.json({ message: 'Room booked successfully!' });
    } else {
        res.status(400).json({ message: 'Room already booked or not available' });
    }
});

// Ticketing API
app.post('/create-ticket', async (req, res) => {
    const { issue } = req.body;
    const ticket = new Ticket({ issue });
    await ticket.save();
    res.json({ message: 'Ticket created successfully!', ticket });
});

// Get all tickets
app.get('/tickets', async (req, res) => {
    const tickets = await Ticket.find();
    res.json(tickets);
});

// Resolve a ticket
app.post('/resolve-ticket/:id', async (req, res) => {
    const { id } = req.params;
    const ticket = await Ticket.findById(id);
    if (ticket) {
        ticket.status = 'resolved';
        await ticket.save();
        res.json({ message: 'Ticket resolved successfully!' });
    } else {
        res.status(404).json({ message: 'Ticket not found' });
    }
});

app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});
