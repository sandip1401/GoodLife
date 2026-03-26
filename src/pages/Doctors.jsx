import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets_frontend/assets";
import { Helmet } from "react-helmet-async";

export default function Doctors() {
  const { speciality } = useParams();
  const navigate = useNavigate();

  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const { doctors, getDoctorsData } = useContext(AppContext);

  const specialityInBengali = {
    "General physician": "( সাধারণ চিকিৎসক )",
    Gynecologist: "( স্ত্রীরোগ বিশেষজ্ঞ )",
    Dermatologist: "( ত্বক বিশেষজ্ঞ )",
    Pediatricians: "( শিশু বিশেষজ্ঞ )",
    Neurologist: "( স্নায়ু বিশেষজ্ঞ )",
    Neuropsychiatrist: "( স্নায়ু ও মনোরোগ বিশেষজ্ঞ )",
    Dentist: "( দন্ত বিশেষজ্ঞ )",
    Gastroenterologist: "( পাকস্থলী ও হজম বিশেষজ্ঞ )",
    Cardiologist: "( হৃদরোগ বিশেষজ্ঞ )",
    Nephrologist: "( কিডনি রোগ বিশেষজ্ঞ )",
    "ENT Specialist": "( নাক, কান, গলা বিশেষজ্ঞ )",
    Homoeopath: "( হোমিওপ্যাথি বিশেষজ্ঞ )",
    Physiotherapist: "( ফিজিওথেরাপিস্ট )",
    "Diabetes & Thyroid Specialist": "( সুগার ও থাইরয়েড রোগ বিশেষজ্ঞ )",
    Orthopedic: "( মেরুদণ্ড ও হাড় রোগ বিশেষজ্ঞ )",
    Ophthalmologist: "( চক্ষু রোগ বিশেষজ্ঞ )",
  };

  const applyFilter = () => {
    let filtered = doctors.filter((doc) => doc.available === true);

    if (speciality) {
      filtered = filtered.filter((doc) => doc.speciality === speciality);
    }
    setFilterDoc(filtered);
  };

  const handleSpecialityClick = (value) => {
    if (speciality === value) {
      navigate("/doctors");
    } else {
      navigate(`/doctors/${value}`);
    }

    setShowFilter(false); // close overlay
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  useEffect(() => {
    getDoctorsData();
  }, []);

  return (
    <div className="relative">
      <Helmet>
  <title>
    {speciality
      ? `${speciality} Doctors in ${city || "Rampurhat"} | Doctor In City`
      : `Best Doctors in ${city || "Rampurhat"} | Doctor In City`}
  </title>

  <meta
    name="description"
    content={`Find verified ${
      speciality ? speciality : ""
    } doctors in ${city || "Rampurhat"} with Doctor In City. Book appointments online easily.`}
  />

  <link
    rel="canonical"
    href={`https://www.doctorincity.com/doctors/${city || ""}${
      speciality ? "/" + speciality : ""
    }`}
  />
</Helmet>

      {/* ===== Mobile Fixed Header Only ===== */}
      <div className="sm:hidden fixed top-16 left-0 w-full bg-white z-40">
        <div className="mx-6 py-3">
          <p className="text-gray-600 pb-3">
            Browse through the doctors specialist.
          </p>

          <button
            className={`w-full py-1 px-3 border rounded text-sm transition-all ${
              showFilter ? "text-white" : ""
            }`}
            onClick={() => setShowFilter((prev) => !prev)}
          >
            Filters
          </button>
        </div>
      </div>

      {/* ===== Original Desktop / Tablet Layout (UNCHANGED) ===== */}
      <div className="hidden sm:block">
        <p className="text-gray-600 pb-5">
          Browse through the doctors specialist.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-start gap-5 mt-1">
        {/* Mobile button hidden here because it's in fixed header */}
        <button
          className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${
            showFilter ? "bg-blue-500 text-white" : ""
          }`}
          onClick={() => setShowFilter((prev) => !prev)}
        >
          Filters
        </button>

        {/* ===== Mobile Filter Overlay ===== */}
        {showFilter && (
          <div className="fixed inset-0 z-50 sm:hidden">
            {/* Blur Background */}
            <div
              className="absolute inset-0 bg-black/30 backdrop-blur-sm"
              onClick={() => setShowFilter(false)}
            ></div>

            {/* Filter Panel */}
            <div className="absolute top-24 left-4 right-4 bg-white rounded-xl p-4 shadow-xl">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-lg">Filters</h2>
                <button
                  onClick={() => setShowFilter(false)}
                  className="text-gray-500"
                >
                  ✕
                </button>
              </div>

              <div className="flex flex-col gap-4 text-sm text-gray-600 max-h-96 overflow-y-auto">
                {/* ===== KEEP ALL YOUR <p> SPECIALITY ITEMS HERE ===== */}
                <p
                  onClick={() => {
                    if (speciality === "All") {
                      navigate("/doctors");
                    } else {
                      navigate("/doctors");
                    }

                    setShowFilter(false); // 👈 CLOSE OVERLAY
                  }}
                  className={`w-full sm:w-auto pl-3 py-1.5 pr-16 border  border-gray-300 rounded-sm cursor-pointer ${speciality === "All" ? "bg-indigo-100 text-black" : ""}`}
                >
                  All Doctors
                  <span className="ml-1 text-xs text-gray-600">
                    ( সমস্ত চিকিৎসক )
                  </span>
                </p>
                <p
                  onClick={() => handleSpecialityClick("General physician")}
                  className={`w-full whitespace-nowrap sm:w-auto pl-3 py-1.5 pr-16 border  border-gray-300 rounded-sm cursor-pointer ${speciality === "General physician" ? "bg-indigo-100 text-black" : ""}`}
                >
                  General physician
                  <span className="ml-1 text-xs text-gray-500 break-words">
                    {specialityInBengali["General physician"]}
                  </span>
                </p>
                <p
                  onClick={() => handleSpecialityClick("Gynecologist")}
                  className={`w-full whitespace-nowrap sm:w-auto pl-3 py-1.5 pr-16 border  border-gray-300 rounded-sm cursor-pointer ${speciality === "Gynecologist" ? "bg-indigo-100 text-black" : ""}`}
                >
                  Gynecologist
                  <span className="ml-1 text-xs text-gray-500 break-words">
                    {specialityInBengali["Gynecologist"]}
                  </span>
                </p>
                <p
                  onClick={() => handleSpecialityClick("Dermatologist")}
                  className={`w-full whitespace-nowrap sm:w-auto pl-3 py-1.5 pr-16 border  border-gray-300 rounded-sm cursor-pointer ${speciality === "Dermatologist" ? "bg-indigo-100 text-black" : ""}`}
                >
                  Dermatologist
                  <span className="ml-1 text-xs text-gray-500 break-words">
                    {specialityInBengali["Dermatologist"]}
                  </span>
                </p>
                <p
                  onClick={() => handleSpecialityClick("Pediatricians")}
                  className={`w-full whitespace-nowrap sm:w-auto pl-3 py-1.5 pr-16 border  border-gray-300 rounded-sm cursor-pointer ${speciality === "Pediatricians" ? "bg-indigo-100 text-black" : ""}`}
                >
                  Pediatricians
                  <span className="ml-1 text-xs text-gray-500 break-words">
                    {specialityInBengali["Pediatricians"]}
                  </span>
                </p>
                <p
                  onClick={() => handleSpecialityClick("Neurologist")}
                  className={`w-full whitespace-nowrap sm:w-auto pl-3 py-1.5 pr-16 border  border-gray-300 rounded-sm cursor-pointer ${speciality === "Neurologist" ? "bg-indigo-100 text-black" : ""}`}
                >
                  Neurologist
                  <span className="ml-1 text-xs text-gray-500 break-words">
                    {specialityInBengali["Neurologist"]}
                  </span>
                </p>
                <p
                  onClick={() => handleSpecialityClick("Neuropsychiatrist")}
                  className={`w-full whitespace-nowrap sm:w-auto pl-3 py-1.5 pr-16 border  border-gray-300 rounded-sm cursor-pointer ${speciality === "Neuropsychiatrist" ? "bg-indigo-100 text-black" : ""}`}
                >
                  Neuropsychiatrist
                  <span className="ml-1 text-xs text-gray-500 break-words">
                    {specialityInBengali["Neuropsychiatrist"]}
                  </span>
                </p>
                <p
                  onClick={() => handleSpecialityClick("Dentist")}
                  className={`w-full whitespace-nowrap sm:w-auto pl-3 py-1.5 pr-16 border  border-gray-300 rounded-sm cursor-pointer ${speciality === "Dentist" ? "bg-indigo-100 text-black" : ""}`}
                >
                  Dentist
                  <span className="ml-1 text-xs text-gray-500 break-words">
                    {specialityInBengali["Dentist"]}
                  </span>
                </p>
                <p
                  onClick={() => handleSpecialityClick("Gastroenterologist")}
                  className={`w-full sm:w-auto pl-3 py-1.5 pr-16 border  border-gray-300 rounded-sm cursor-pointer ${speciality === "Gastroenterologist" ? "bg-indigo-100 text-black" : ""}`}
                >
                  Gastroenterologist
                  <span className="block text-xs text-gray-500">
                    {specialityInBengali["Gastroenterologist"]}
                  </span>
                </p>
                <p
                  onClick={() => handleSpecialityClick("Cardiologist")}
                  className={`w-full whitespace-nowrap sm:w-auto pl-3 py-1.5 pr-16 border  border-gray-300 rounded-sm cursor-pointer ${speciality === "Cardiologist" ? "bg-indigo-100 text-black" : ""}`}
                >
                  Cardiologist
                  <span className="ml-1 text-xs text-gray-500 break-words">
                    {specialityInBengali["Cardiologist"]}
                  </span>
                </p>
                <p
                  onClick={() => handleSpecialityClick("Nephrologist")}
                  className={`w-full whitespace-nowrap sm:w-auto pl-3 py-1.5 pr-16 border  border-gray-300 rounded-sm cursor-pointer ${speciality === "Nephrologist" ? "bg-indigo-100 text-black" : ""}`}
                >
                  Nephrologist
                  <span className="ml-1 text-xs text-gray-500 break-words">
                    {specialityInBengali["Nephrologist"]}
                  </span>
                </p>
                <p
                  onClick={() => handleSpecialityClick("ENT Specialist")}
                  className={`w-full whitespace-nowrap sm:w-auto pl-3 py-1.5 pr-16 border  border-gray-300 rounded-sm cursor-pointer ${speciality === "ENT Specialist" ? "bg-indigo-100 text-black" : ""}`}
                >
                  ENT Specialist
                  <span className="ml-1 text-xs text-gray-500 break-words">
                    {specialityInBengali["ENT Specialist"]}
                  </span>
                </p>
                <p
                  onClick={() => handleSpecialityClick("Physiotherapist")}
                  className={`w-full whitespace-nowrap sm:w-auto pl-3 py-1.5 pr-16 border  border-gray-300 rounded-sm cursor-pointer ${speciality === "Physiotherapist" ? "bg-indigo-100 text-black" : ""}`}
                >
                  Physiotherapist
                  <span className="ml-1 text-xs text-gray-500 break-words">
                    {specialityInBengali["Physiotherapist"]}
                  </span>
                </p>
                <p
                  onClick={() =>
                    handleSpecialityClick("Diabetes & Thyroid Specialist")
                  }
                  className={`w-full  sm:w-auto pl-3 py-1.5 pr-16 border  border-gray-300 rounded-sm cursor-pointer ${speciality === "Diabetes & Thyroid Specialist" ? "bg-indigo-100 text-black" : ""}`}
                >
                  Diabetes & Thyroid Specialist
                  <span className="block text-xs text-gray-500 ">
                    {specialityInBengali["Diabetes & Thyroid Specialist"]}
                  </span>
                </p>
                <p
                  onClick={() => handleSpecialityClick("Orthopedic")}
                  className={`w-full whitespace-nowrap sm:w-auto pl-3 py-1.5 pr-16 border  border-gray-300 rounded-sm cursor-pointer ${speciality === "Orthopedic" ? "bg-indigo-100 text-black" : ""}`}
                >
                  Orthopedic
                  <span className="ml-1 text-xs text-gray-500 break-words">
                    {specialityInBengali["Orthopedic"]}
                  </span>
                </p>
                <p
                  onClick={() => handleSpecialityClick("Ophthalmologist")}
                  className={`w-full whitespace-nowrap sm:w-auto pl-3 py-1.5 pr-16 border  border-gray-300 rounded-sm cursor-pointer ${speciality === "Ophthalmologist" ? "bg-indigo-100 text-black" : ""}`}
                >
                  Ophthalmologist
                  <span className="ml-1 text-xs text-gray-500 break-words">
                    {specialityInBengali["Ophthalmologist"]}
                  </span>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ===== Desktop Sidebar ===== */}
        <div className="hidden sm:flex flex-col text-gray-600 text-sm pr-5 gap-4">
          <p
            onClick={() =>
              speciality === "General physician"
                ? navigate("/doctors")
                : navigate("/doctors/General physician")
            }
            className={`w-56 whitespace-nowrap pl-3 py-1.5 pr-16 border  border-gray-300 rounded-sm cursor-pointer ${speciality === "General physician" ? "bg-indigo-100 text-black" : ""}`}
          >
            General physician
          </p>
          <p
            onClick={() =>
              speciality === "Gynecologist"
                ? navigate("/doctors")
                : navigate("/doctors/Gynecologist")
            }
            className={`w-56 whitespace-nowrap pl-3 py-1.5 pr-16 border  border-gray-300 rounded-sm cursor-pointer ${speciality === "Gynecologist" ? "bg-indigo-100 text-black" : ""}`}
          >
            Gynecologist
          </p>
          <p
            onClick={() =>
              speciality === "Dermatologist"
                ? navigate("/doctors")
                : navigate("/doctors/Dermatologist")
            }
            className={`w-full whitespace-nowrap pl-3 py-1.5 pr-16 border  border-gray-300 rounded-sm cursor-pointer ${speciality === "Dermatologist" ? "bg-indigo-100 text-black" : ""}`}
          >
            Dermatologist
          </p>
          <p
            onClick={() =>
              speciality === "Pediatricians"
                ? navigate("/doctors")
                : navigate("/doctors/Pediatricians")
            }
            className={`w-56 whitespace-nowrap pl-3 py-1.5 pr-16 border  border-gray-300 rounded-sm cursor-pointer ${speciality === "Pediatricians" ? "bg-indigo-100 text-black" : ""}`}
          >
            Pediatricians
          </p>
          <p
            onClick={() =>
              speciality === "Neurologist"
                ? navigate("/doctors")
                : navigate("/doctors/Neurologist")
            }
            className={`w-56 whitespace-nowrap pl-3 py-1.5 pr-16 border  border-gray-300 rounded-sm cursor-pointer ${speciality === "Neurologist" ? "bg-indigo-100 text-black" : ""}`}
          >
            Neurologist
          </p>
          <p
            onClick={() =>
              speciality === "Neuropsychiatrist"
                ? navigate("/doctors")
                : navigate("/doctors/Neuropsychiatrist")
            }
            className={`w-56 whitespace-nowrap pl-3 py-1.5 pr-16 border  border-gray-300 rounded-sm cursor-pointer ${speciality === "Neuropsychiatrist" ? "bg-indigo-100 text-black" : ""}`}
          >
            Neuropsychiatrist
          </p>
          <p
            onClick={() =>
              speciality === "Dentist"
                ? navigate("/doctors")
                : navigate("/doctors/Dentist")
            }
            className={`w-56 whitespace-nowrap pl-3 py-1.5 pr-16 border  border-gray-300 rounded-sm cursor-pointer ${speciality === "Dentist" ? "bg-indigo-100 text-black" : ""}`}
          >
            Dentist
          </p>
          <p
            onClick={() =>
              speciality === "Gastroenterologist"
                ? navigate("/doctors")
                : navigate("/doctors/Gastroenterologist")
            }
            className={`w-56 whitespace-nowrap pl-3 py-1.5 pr-16 border  border-gray-300 rounded-sm cursor-pointer ${speciality === "Gastroenterologist" ? "bg-indigo-100 text-black" : ""}`}
          >
            Gastroenterologist
          </p>
          <p
            onClick={() =>
              speciality === "Cardiologist"
                ? navigate("/doctors")
                : navigate("/doctors/Cardiologist")
            }
            className={`w-56 whitespace-nowrap pl-3 py-1.5 pr-16 border  border-gray-300 rounded-sm cursor-pointer ${speciality === "Cardiologist" ? "bg-indigo-100 text-black" : ""}`}
          >
            Cardiologist
          </p>
          <p
            onClick={() => handleSpecialityClick("Nephrologist")}
            className={`w-56  whitespace-nowrap pl-3 py-1.5 pr-16 border  border-gray-300 rounded-sm cursor-pointer ${speciality === "Nephrologist" ? "bg-indigo-100 text-black" : ""}`}
          >
            Nephrologist
          </p>
          <p
            onClick={() => handleSpecialityClick("ENT Specialist")}
            className={`w-56 whitespace-nowrap pl-3 py-1.5 pr-16 border  border-gray-300 rounded-sm cursor-pointer ${speciality === "ENT Specialist" ? "bg-indigo-100 text-black" : ""}`}
          >
            ENT Specialist
          </p>
          <p
            onClick={() => handleSpecialityClick("Physiotherapist")}
            className={`w-56 whitespace-nowrap pl-3 py-1.5 pr-16 border  border-gray-300 rounded-sm cursor-pointer ${speciality === "Physiotherapist" ? "bg-indigo-100 text-black" : ""}`}
          >
            Physiotherapist
          </p>
          <p
            onClick={() =>
              handleSpecialityClick("Diabetes & Thyroid Specialist")
            }
            className={`w-56 pl-3 py-1.5 pr-16 border  border-gray-300 rounded-sm cursor-pointer ${speciality === "Diabetes & Thyroid Specialist" ? "bg-indigo-100 text-black" : ""}`}
          >
            Diabetes & Thyroid
          </p>
          <p
            onClick={() => handleSpecialityClick("Orthopedic")}
            className={`w-56 whitespace-nowrap pl-3 py-1.5 pr-16 border  border-gray-300 rounded-sm cursor-pointer ${speciality === "Orthopedic" ? "bg-indigo-100 text-black" : ""}`}
          >
            Orthopedic
          </p>
          <p
            onClick={() => handleSpecialityClick("Ophthalmologist")}
            className={`w-56 whitespace-nowrap pl-3 py-1.5 pr-16 border  border-gray-300 rounded-sm cursor-pointer ${speciality === "Ophthalmologist" ? "bg-indigo-100 text-black" : ""}`}
          >
            Ophthalmologist
          </p>
        </div>

        <div className="w-full grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 gap-4 gap-y-7 mt-6 sm:mt-0">
          {filterDoc.map((item, index) => (
            <div
              key={item._id}
              onClick={() => navigate(`/appoinment/${item._id}`)}
              className="border border-blue-200 rounded-lg cursor-pointer 
                         hover:translate-y-[-5px] transition-all duration-500 
                         flex flex-col h-32 overflow-hidden"
            >
              {/* TOP SECTION (Image + Data) */}
              <div className="flex items-center flex-1 overflow-hidden">
                {/* LEFT IMAGE */}
                <div className="w-1/4 h-full">
                  <img
                    className="w-full h-full object-cover bg-blue-50"
                    src={item.image}
                    alt=""
                  />
                </div>

                {/* RIGHT DATA */}
                <div className="w-3/4 p-3 flex flex-col justify-center">
                  <p className="flex items-center gap-1 text-lg font-medium text-gray-900 truncate">
                    <span className="truncate">{item.name}</span>
                    <img
                      className="w-3 h-3"
                      src={assets.verified_icon}
                      alt="verified"
                    />
                  </p>

                  <div className="flex items-center gap-1 text-sm text-green-500 leading-none mb-0.5">
                    {" "}
                    <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                    <p>
                      Available on{" "}
                      {item.weeklyAvailability &&
                      item.weeklyAvailability.length > 0
                        ? item.weeklyAvailability
                            .slice(0, 3) // take maximum 3 days
                            .map((av) => av.day.slice(0, 3)) // take first 3 letters
                            .join(", ")
                        : "N/A"}
                    </p>
                  </div>

                  <p className="text-sm text-gray-600 font-medium">
                    {item.speciality}
                  </p>

                  <p className="text-xs text-gray-500">
                    {specialityInBengali[item.speciality] || ""}
                  </p>

                  <p className="text-sm text-gray-600 mb-1">
                    Fee:<span className="text-black"> ₹ {item.fees}</span>
                  </p>
                </div>
              </div>

              {/* BOTTOM FULL WIDTH SECTION */}
              <div className="border-t border-blue-200 text-center text-[11.5px] text-gray-600 py-0.5 bg-blue-50 truncate px-2">
                <span className="truncate block">{item.achievement}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
