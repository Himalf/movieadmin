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

  // Group bookings by email and then by show time
  const groupedBookings = bookings.reduce((acc, booking) => {
    const { email, show_time } = booking;
    if (!acc[email]) {
      acc[email] = {};
    }
    if (!acc[email][show_time]) {
      acc[email][show_time] = {
        ...booking,
        seat_numbers: [],
      };
    }
    acc[email][show_time].seat_numbers.push(booking.seat_number);
    return acc;
  }, {});

  // Set default email to the first email in the list if none is selected
  useEffect(() => {
    if (Object.keys(groupedBookings).length > 0 && !selectedEmail) {
      setSelectedEmail(Object.keys(groupedBookings)[0]);
    }
  }, [groupedBookings, selectedEmail]);

  // Handle email click
  const handleEmailClick = (email) => {
    setSelectedEmail(email);
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
                  <th className="py-2 px-4 border-b">Show Time</th>
                  <th className="py-2 px-4 border-b">Show Date</th>
                  <th className="py-2 px-4 border-b">Seat Numbers</th>
                </tr>
              </thead>
              <tbody>
                {Object.values(groupedBookings[selectedEmail]).map(
                  (booking) => (
                    <tr key={`${booking.show_time}-${booking.show_date}`}>
                      <td className="py-2 px-4 border-b">{booking.title}</td>
                      <td className="py-2 px-4 border-b">
                        {booking.show_time}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {booking.show_date}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {booking.seat_numbers.join(", ")}
                      </td>
                    </tr>
                  )
                )}
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
