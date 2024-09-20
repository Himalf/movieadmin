import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEmail, setSelectedEmail] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:4000/booking");
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast.error("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  // Function to format the date
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Group bookings by email, show_time, and show_date
  const groupedBookings = bookings.reduce((acc, booking) => {
    const { email, show_time, show_date, title, theater } = booking;
    if (!acc[email]) {
      acc[email] = [];
    }
    const bookingExists = acc[email].find(
      (b) =>
        b.show_time === show_time &&
        b.show_date === show_date &&
        b.title === title &&
        b.theater === theater
    );

    if (!bookingExists) {
      acc[email].push({
        ...booking,
        seat_numbers: [booking.seat_number],
      });
    } else {
      bookingExists.seat_numbers.push(booking.seat_number);
    }

    return acc;
  }, {});

  useEffect(() => {
    if (Object.keys(groupedBookings).length > 0 && !selectedEmail) {
      setSelectedEmail(Object.keys(groupedBookings)[0]);
    }
  }, [groupedBookings, selectedEmail]);

  const handleEmailClick = (email) => {
    setSelectedEmail(email);
  };

  const handlePrice = (seat_numbers, pricePerSeat) => {
    return seat_numbers.length * pricePerSeat;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">View Bookings</h1>
      <div className="flex space-x-6">
        {/* Email List */}
        <div className="w-1/4">
          <h2 className="text-lg font-semibold mb-4">Emails</h2>
          <ul className="space-y-2">
            {Object.keys(groupedBookings).map((email) => (
              <li key={email}>
                <button
                  onClick={() => handleEmailClick(email)}
                  className={`block w-full text-left p-2 rounded-md ${
                    selectedEmail === email
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  } transition duration-200`}
                >
                  {email}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Booking Details */}
        <div className="w-3/4">
          {selectedEmail ? (
            <table className="min-w-full bg-white border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4 border-b">Movie Title</th>
                  <th className="py-2 px-4 border-b">Theater/location</th>
                  <th className="py-2 px-4 border-b">Show Time</th>
                  <th className="py-2 px-4 border-b">Show Date</th>
                  <th className="py-2 px-4 border-b">Seat Numbers</th>
                  <th className="py-2 px-4 border-b">Booked Date</th>
                  <th className="py-2 px-4 border-b">Total Price</th>
                </tr>
              </thead>
              <tbody>
                {groupedBookings[selectedEmail].map((booking) => (
                  <tr
                    key={`${booking.show_time}-${booking.show_date}-${booking.title}-${booking.theater}`}
                  >
                    <td className="py-2 px-4 border-b">{booking.title}</td>
                    <td className="py-2 px-4 border-b">
                      {booking.theater_name} / {booking.theater_location}
                    </td>
                    <td className="py-2 px-4 border-b">{booking.show_time}</td>
                    <td className="py-2 px-4 border-b">{booking.show_date}</td>
                    <td className="py-2 px-4 border-b">
                      {booking.seat_numbers.join(", ")}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {formatDateTime(booking.booking_date)}
                    </td>
                    <td className="py-2 px-4 border-b">
                      ${handlePrice(booking.seat_numbers, 5)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Select an email to view bookings</p>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ViewBooking;
