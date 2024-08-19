import { jsPDF } from "jspdf";

const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Hostel Booking Confirmation", 10, 10);
    doc.text(`Room: ${bookingDetails.roomNumber}`, 10, 20);
    doc.text(`Resident: ${bookingDetails.residentName}`, 10, 30);
    doc.text(`Dates: ${bookingDetails.startDate} to ${bookingDetails.endDate}`, 10, 40);
    doc.save("booking-confirmation.pdf");
};

// Add this to your booking form
<button onClick={handleDownloadPDF}>Download PDF</button>

useEffect(() => {
    const savedBooking = JSON.parse(localStorage.getItem('bookingDetails'));
    if (savedBooking) {
        setBookingDetails(savedBooking);
    }
}, []);

useEffect(() => {
    localStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));
}, [bookingDetails]);

