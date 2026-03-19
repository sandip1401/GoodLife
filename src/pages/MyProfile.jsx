import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function MyProfile() {
const { user, donors,updateAvailability } = useContext(AppContext);

const donorInfo = donors?.find(
  (d) => d.userId?.toString() === user?._id?.toString()
);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] bg-blue-50">
        <p className="text-blue-500 text-lg font-medium animate-pulse">
          Loading your profile...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8 border border-blue-100">

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <img
            src={user.image}
            alt="Profile"
            className="w-16 h-16 rounded-full object-cover border-4 border-blue-100 shadow-md"
          />
          <div>
            <h2 className="text-2xl font-semibold text-blue-600">
              {user.name}
            </h2>
            <p className="text-gray-500">{user.email}</p>
          </div>
        </div>

        {/* Info Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

          <div className="bg-blue-50 p-4 rounded-xl">
            <p className="text-sm text-gray-500">Gender</p>
            <p className="text-blue-600 font-medium">
              {user.gender || "Not Selected"}
            </p>
          </div>

          <div className="bg-blue-50 p-4 rounded-xl">
            <p className="text-sm text-gray-500">Phone</p>
            <p className="text-blue-600 font-medium">
              {user.phone || "Not Provided"}
            </p>
          </div>

          <div className="bg-blue-50 p-4 rounded-xl">
            <p className="text-sm text-gray-500">Address</p>
            <p className="text-blue-600 font-medium">
              {user.address || "Not Provided"}
            </p>
          </div>

          <div className="bg-blue-50 p-4 rounded-xl">
            <p className="text-sm text-gray-500">Date of Birth</p>
            <p className="text-blue-600 font-medium">
              {user.dob || "Not Provided"}
            </p>
          </div>

        </div>

        {donorInfo && (
  <div className="mt-10 border-t pt-6">
    <h3 className="text-xl font-semibold text-red-500 mb-5">
      Blood Donor Profile
    </h3>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

      <div className="bg-red-50 p-4 rounded-xl">
        <p className="text-sm text-gray-500">Blood Group</p>
        <p className="text-red-600 font-medium">
          {donorInfo.bloodGroup}
        </p>
      </div>

      <div className="bg-red-50 p-4 rounded-xl">
        <p className="text-sm text-gray-500">City</p>
        <p className="text-red-600 font-medium">
          {donorInfo.location}
        </p>
      </div>

      <div className="bg-red-50 p-4 rounded-xl">
        <p className="text-sm text-gray-500">Phone</p>
        <p className="text-red-600 font-medium">
          {donorInfo.phone}
        </p>
      </div>

<div className="bg-red-50 p-4 rounded-xl flex items-center justify-between">

  <div>
    <p className="text-sm text-gray-500">Availability</p>
    <p className="mt-1 font-medium">
      {donorInfo.available ? "Available" : "Not Available"}
    </p>
  </div>

  <button
    onClick={() =>
      updateAvailability(donorInfo._id, !donorInfo.available)
    }
    className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
      donorInfo.available ? "bg-green-500" : "bg-red-500"
    }`}
  >
    <div
      className={`bg-white w-4 h-4 rounded-full shadow transform transition ${
        donorInfo.available ? "translate-x-6" : ""
      }`}
    ></div>
  </button>

</div>

    </div>
  </div>
)}

      </div>
    </div>
  );
}
