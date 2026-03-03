import React, { useState } from "react";

export default function Blood() {
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showOtpBox, setShowOtpBox] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  // ✅ NEW STATE FOR CALL MODAL
  const [selectedDonor, setSelectedDonor] = useState(null);

  const donors = [
    {
      id: 1,
      name: "Rahul Sharma",
      bloodGroup: "A+",
      location: "Delhi",
      phone: "9876543210",
    },
    {
      id: 2,
      name: "Priya Patel",
      bloodGroup: "B+",
      location: "Mumbai",
      phone: "9123456780",
    },
    {
      id: 3,
      name: "Aman Verma",
      bloodGroup: "O+",
      location: "Delhi",
      phone: "9988776655",
    },
    {
      id: 4,
      name: "Sneha Reddy",
      bloodGroup: "AB+",
      location: "Hyderabad",
      phone: "9012345678",
    },
    {
      id: 5,
      name: "Aman Verma",
      bloodGroup: "O+",
      location: "Delhi",
      phone: "9988776655",
    },
    {
      id: 6,
      name: "Rahul Sharma",
      bloodGroup: "A+",
      location: "Delhi",
      phone: "9876543210",
    },
    {
      id: 7,
      name: "Priya Patel",
      bloodGroup: "B+",
      location: "Mumbai",
      phone: "9123456780",
    },
    {
      id: 8,
      name: "Aman Verma",
      bloodGroup: "O+",
      location: "Delhi",
      phone: "9988776655",
    },
    {
      id: 9,
      name: "Sneha Reddy",
      bloodGroup: "AB+",
      location: "Hyderabad",
      phone: "9012345678",
    },
    {
      id: 10,
      name: "Aman Verma",
      bloodGroup: "O+",
      location: "Delhi",
      phone: "9988776655",
    },
  ];

  const filteredDonors = donors.filter(
    (donor) =>
      (selectedGroup === "" || donor.bloodGroup === selectedGroup) &&
      (selectedLocation === "" || donor.location === selectedLocation),
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Blood Donors</h1>

          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:shadow-md transition"
          >
            + Add as a Donor
          </button>
        </div>

        {/* Filter Section */}
        <div className="bg-white p-4 rounded-xl shadow mb-6 flex flex-col md:flex-row gap-4">
          <select
            onChange={(e) => setSelectedGroup(e.target.value)}
            className="border rounded p-2 w-full md:w-1/2"
          >
            <option value="">Filter by Blood Group</option>
            <option>A+</option>
            <option>B+</option>
            <option>O+</option>
            <option>AB+</option>
          </select>

          <select
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="border rounded p-2 w-full md:w-1/2"
          >
            <option value="">Filter by Location</option>
            <option>Delhi</option>
            <option>Mumbai</option>
            <option>Hyderabad</option>
          </select>
        </div>

        {/* ===== DESKTOP TABLE ===== */}
        <div className="hidden md:block bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4 text-center">Blood Group</th>
                <th className="p-4">Location</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredDonors.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-6 text-center text-gray-500">
                    No donors found.
                  </td>
                </tr>
              ) : (
                filteredDonors.map((donor) => (
                  <tr key={donor.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">{donor.name}</td>
                    <td className="p-4 text-center font-medium text-blue-500">
                      {donor.bloodGroup}
                    </td>
                    <td className="p-4">{donor.location}</td>

                    {/* ✅ UPDATED PHONE SECTION */}
                    <td className="p-4">
                      <button
                        onClick={() => setSelectedDonor(donor)}
                        className="text-gray-600 text-center hover:text-blue-500"
                      >
                        📞 {donor.phone}
                      </button>
                    </td>

                    <td className="p-4">
                      <button className="bg-red-500 text-white px-3 py-1 rounded">
                        Report
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ===== MOBILE VIEW ===== */}
        <div className="md:hidden space-y-4">
          {filteredDonors.length === 0 ? (
            <p className="text-center text-gray-500">No donors found.</p>
          ) : (
            filteredDonors.map((donor) => (
              <div key={donor.id} className="bg-white p-4 rounded-xl shadow">
                <p className="text-lg font-semibold text-gray-800">
                  {donor.name}
                </p>

                <p className="text-blue-500 font-medium">{donor.bloodGroup}</p>

                <p className="text-gray-600 text-sm">{donor.location}</p>

                {/* ✅ UPDATED PHONE FOR MOBILE */}
                <button
                  onClick={() => setSelectedDonor(donor)}
                  className="text-gray-600 text-sm mb-3"
                >
                  📞 {donor.phone}
                </button>

                <button className="w-full bg-red-500 text-white py-2 rounded-lg">
                  Report
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ===== CALL CONFIRMATION MODAL ===== */}
      {selectedDonor && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl w-[85%] max-w-xs shadow-xl text-center">
            {" "}
            <h2 className="text-lg font-semibold mb-2">
              Call {selectedDonor.name}?
            </h2>
            <p className="text-gray-600 mb-8">📞 {selectedDonor.phone}</p>
            <div className="flex justify-center gap-4">
              {/* Cancel on Left */}
              <button
                onClick={() => setSelectedDonor(null)}
                className="px-5 py-2 bg-red-500 text-white rounded-xl
               shadow-md
               transition-all duration-150 ease-out
               active:scale-95 active:shadow-sm"
              >
                Cancel
              </button>

              {/* Call on Right */}
              <a
                href={`tel:${selectedDonor.phone}`}
                className="px-5 py-2 bg-green-500 text-white rounded-xl
               shadow-md
               transition-all duration-150
               active:scale-95 active:shadow-sm"
              >
                Call
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ===== ADD DONOR MODAL ===== */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-[90%] max-w-md shadow-xl">
            <h2 className="text-xl font-semibold mb-4">Add as a Donor</h2>

            <input
              type="text"
              placeholder="Full Name"
              className="border rounded w-full p-2 mb-3"
            />

            <select className="border rounded w-full p-2 mb-3">
              <option>Blood Group</option>
              <option>A+</option>
              <option>B+</option>
              <option>AB+</option>
              <option>O+</option>
              <option>A-</option>
              <option>B-</option>
              <option>AB-</option>
              <option>O-</option>
            </select>

            <input
              type="text"
              placeholder="City"
              className="border rounded w-full p-2 mb-3"
            />

            <input
              type="text"
              placeholder="Phone Number"
              className="border rounded w-full p-2 mb-3"
            />

            <div className="flex w-full mb-3">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 min-w-0 px-3 py-2 border border-gray-300 border-r-0 rounded-l outline-none"
              />

              <button
                type="button"
                onClick={() => {
                  if (email.trim() !== "") {
                    setShowOtpBox(true);
                  }
                }}
                className="shrink-0 px-3 sm:px-4 py-2 bg-green-500 text-white border border-green-500 rounded-r transition-all duration-200"
              >
                Validate
              </button>
            </div>

            {showOtpBox && (
              <div className="flex w-full mb-3">
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="flex-1 min-w-0 px-3 py-2 border border-gray-300 border-r-0 rounded-l outline-none"
                />

                <button
                  type="button"
                  onClick={() => {
                    console.log("OTP Verified:", otp);
                  }}
                  className="shrink-0 px-3 sm:px-4 py-2 bg-green-500 text-white border border-green-500 rounded-r hover:bg-green-600 transition-all duration-200"
                >
                  Verify OTP
                </button>
              </div>
            )}

            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowForm(false);
                  setShowOtpBox(false);
                  setEmail("");
                  setOtp("");
                }}
                className="px-4 py-2 border rounded-lg hover:bg-red-500 hover:text-white"
              >
                Cancel
              </button>

              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
