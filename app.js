import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [rooms, setRooms] = useState([]);
    const [tickets, setTickets] = useState([]);
    const [newTicket, setNewTicket] = useState('');
    const [bookingDetails, setBookingDetails] = useState({
        roomNumber: '',
        residentName: '',
        startDate: '',
        endDate: ''
    });

    useEffect(() => {
        // Fetch rooms and tickets
        // Sample fetch for tickets, you can create a similar fetch for rooms
        axios.get('http://localhost:5000/tickets')
            .then(response => setTickets(response.data));
    }, []);

    const handleBooking = () => {
        axios.post('http://localhost:5000/book-room', bookingDetails)
            .then(response => alert(response.data.message))
            .catch(error => alert(error.response.data.message));
    };

    const handleCreateTicket = () => {
        axios.post('http://localhost:5000/create-ticket', { issue: newTicket })
            .then(response => {
                setTickets([...tickets, response.data.ticket]);
                setNewTicket('');
            });
    };

    const handleResolveTicket = (id) => {
        axios.post(`http://localhost:5000/resolve-ticket/${id}`)
            .then(response => {
                setTickets(tickets.map(ticket => ticket._id === id ? { ...ticket, status: 'resolved' } : ticket));
            });
    };

    return (
        <div>
            <h1>Hostel Management System</h1>
            <div>
                <h2>Book a Room</h2>
                <input
                    type="text"
                    placeholder="Room Number"
                    value={bookingDetails.roomNumber}
                    onChange={e => setBookingDetails({ ...bookingDetails, roomNumber: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Resident Name"
                    value={bookingDetails.residentName}
                    onChange={e => setBookingDetails({ ...bookingDetails, residentName: e.target.value })}
                />
                <input
                    type="date"
                    placeholder="Start Date"
                    value={bookingDetails.startDate}
                    onChange={e => setBookingDetails({ ...bookingDetails, startDate: e.target.value })}
                />
                <input
                    type="date"
                    placeholder="End Date"
                    value={bookingDetails.endDate}
                    onChange={e => setBookingDetails({ ...bookingDetails, endDate: e.target.value })}
                />
                <button onClick={handleBooking}>Book Room</button>
            </div>
            <div>
                <h2>Create a Ticket</h2>
                <input
                    type="text"
                    placeholder="Describe your issue"
                    value={newTicket}
                    onChange={e => setNewTicket(e.target.value)}
                />
                <button onClick={handleCreateTicket}>Submit Ticket</button>
            </div>
            <div>
                <h2>Tickets</h2>
                <ul>
                    {tickets.map(ticket => (
                        <li key={ticket._id}>
                            {ticket.issue} - {ticket.status}
                            {ticket.status === 'open' && <button onClick={() => handleResolveTicket(ticket._id)}>Resolve</button>}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default App;
