import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ViewUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:4000/register");
      setUsers(res.data);
      setFilteredUsers(res.data); // Initialize filteredUsers with all users
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle search input changes
  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    const filteredData = users.filter(
      (user) =>
        user.fullname.toLowerCase().includes(value) ||
        user.email.toLowerCase().includes(value) ||
        user.dateofbirth.includes(value) ||
        user.phoneno.toString().includes(value)
    );
    setFilteredUsers(filteredData); // Update the filtered users based on search term
  };
  const handleDelete = async (id) => {
    const res = await axios.delete(`http://localhost:4000/register/${id}`);
    if (res.status == 200 || res.status == 201) {
      fetchUsers();
      toast.success("User Removed successfully");
      console.log("User Data deleted successfully");
    }
  };

  return (
    <div className="container mx-auto mt-10 p-5 bg-gray-50 rounded-lg shadow-lg">
      <ToastContainer />
      <h2 className="text-2xl font-bold text-center mb-6">Users List</h2>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by name, email, phone, or DOB"
        value={searchTerm}
        onChange={handleSearch}
        className="w-full mb-6 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Table of Users */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-collapse">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                S.N.
              </th>
              <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Full Name
              </th>
              <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Date of Birth
              </th>
              <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Phone Number
              </th>
              <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, i) => (
                <tr key={i} className="bg-white hover:bg-gray-50">
                  <td className="px-6 py-4 border-b border-gray-200 text-sm">
                    {i + 1}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 text-sm text-justify">
                    {user.fullname}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 text-sm text-justify">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 text-sm text-justify">
                    {user.dateofbirth}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 text-sm text-justify">
                    {user.phoneno}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 text-lg text-red-400 cursor-pointer text-justify">
                    <div
                      onClick={() => {
                        handleDelete(user.userid);
                      }}
                    >
                      <MdDelete />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewUsers;
