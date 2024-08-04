import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTable, useSortBy, usePagination } from "react-table";

// Function to parse seat number into row and column
const parseSeatNumber = (seatNumber) => {
  const row = seatNumber.match(/[A-Z]/)[0]; // Extract row letter
  const column = parseInt(seatNumber.match(/\d+/)[0], 10); // Extract column number
  return { row, column };
};

// Sorting function
const sortSeats = (seats) => {
  return seats.sort((a, b) => {
    const aParsed = parseSeatNumber(a.seat_number);
    const bParsed = parseSeatNumber(b.seat_number);

    // Compare rows first
    if (aParsed.row < bParsed.row) return -1;
    if (aParsed.row > bParsed.row) return 1;

    // Compare columns if rows are the same
    return aParsed.column - bParsed.column;
  });
};

const ViewSeat = () => {
  const [seats, setSeats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSeats();
  }, []);

  const fetchSeats = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:4000/seat");
      setSeats(sortSeats(response.data)); // Sort seats before setting state
    } catch (error) {
      console.error("Error fetching seats:", error);
      toast.error("Failed to fetch seats");
    } finally {
      setLoading(false);
    }
  };

  const columns = React.useMemo(
    () => [
      { Header: "Seat Number", accessor: "seat_number" },
      { Header: "Status", accessor: "status" },
      { Header: "Show Time", accessor: "show_time" },
      { Header: "Show Date", accessor: "show_date" },
      { Header: "Theater Name", accessor: "theater_name" },
    ],
    []
  );

  const data = React.useMemo(() => seats, [seats]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state: { sortBy },
    gotoPage,
    pageCount,
    canPreviousPage,
    canNextPage,
    pageOptions,
    previousPage,
    nextPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useSortBy,
    usePagination
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">View Seats</h1>
      <table
        {...getTableProps()}
        className="min-w-full bg-white border border-gray-300"
      >
        <thead className="bg-gray-100">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="py-2 px-4 border-b text-left cursor-pointer"
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} className="py-2 px-4 border-b">
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          {"<<"}
        </button>
        <button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          {"<"}
        </button>
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          {">"}
        </button>
        <button
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          {">>"}
        </button>
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
          className="border border-gray-300 rounded-md"
        >
          {[10, 20, 30, 40].map((size) => (
            <option key={size} value={size}>
              Show {size}
            </option>
          ))}
        </select>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ViewSeat;
