import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function MyProfile() {
  const { user } = useContext(AppContext);

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

      </div>
    </div>
  );
}
