import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

export default function Doctors() {
  const { speciality } = useParams();
  const navigate = useNavigate();

  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const { doctors, getDoctorsData } = useContext(AppContext);

  const applyFilter = () => {
    let filtered = doctors.filter((doc) => doc.available === true);

    if (speciality) {
      filtered = filtered.filter((doc) => doc.speciality === speciality);
    }
    setFilterDoc(filtered);
  };
  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  useEffect(() => {
    getDoctorsData();
  }, []);

  return (
    <div>
      <p className="text-gray-600 pb-5">
        Browse through the doctors specialist.
      </p>
      <div className="flex flex-col sm:flex-row gap-5 mt-1">
        <button
          className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? "bg-blue-500 text-white" : ""}`}
          onClick={() => setShowFilter((prev) => !prev)}
        >
          Filters
        </button>
        <div
          className={`flex flex-col text-gray-600 text-sm pr-5 gap-4 ${showFilter ? "flex" : "hidden sm:flex"}`}
        >
          <p
            onClick={() =>
              speciality === "General physician"
                ? navigate("/doctors")
                : navigate("/doctors/General physician")
            }
            className={`w-[83.5vw] whitespace-nowrap sm:w-auto pl-3 py-1.5 pr-16 border  border-gray-300 rounded-sm cursor-pointer ${speciality === "General physician" ? "bg-indigo-100 text-black" : ""}`}
          >
            General physician
          </p>
          <p
            onClick={() =>
              speciality === "Gynecologist"
                ? navigate("/doctors")
                : navigate("/doctors/Gynecologist")
            }
            className={`w-[83.5vw] whitespace-nowrap sm:w-auto pl-3 py-1.5 pr-16 border  border-gray-300 rounded-sm cursor-pointer ${speciality === "Gynecologist" ? "bg-indigo-100 text-black" : ""}`}
          >
            Gynecologist
          </p>
          <p
            onClick={() =>
              speciality === "Dermatologist"
                ? navigate("/doctors")
                : navigate("/doctors/Dermatologist")
            }
            className={`w-[83.5vw] whitespace-nowrap sm:w-auto pl-3 py-1.5 pr-16 border  border-gray-300 rounded-sm cursor-pointer ${speciality === "Dermatologist" ? "bg-indigo-100 text-black" : ""}`}
          >
            Dermatologist
          </p>
          <p
            onClick={() =>
              speciality === "Pediatricians"
                ? navigate("/doctors")
                : navigate("/doctors/Pediatricians")
            }
            className={`w-[83.5vw] whitespace-nowrap sm:w-auto pl-3 py-1.5 pr-16 border  border-gray-300 rounded-sm cursor-pointer ${speciality === "Pediatricians" ? "bg-indigo-100 text-black" : ""}`}
          >
            Pediatricians
          </p>
          <p
            onClick={() =>
              speciality === "Neurologist"
                ? navigate("/doctors")
                : navigate("/doctors/Neurologist")
            }
            className={`w-[83.5vw] whitespace-nowrap sm:w-auto pl-3 py-1.5 pr-16 border  border-gray-300 rounded-sm cursor-pointer ${speciality === "Neurologist" ? "bg-indigo-100 text-black" : ""}`}
          >
            Neurologist
          </p>
          <p
            onClick={() =>
              speciality === "Gastroenterologist"
                ? navigate("/doctors")
                : navigate("/doctors/Gastroenterologist")
            }
            className={`w-[83.5vw] whitespace-nowrap sm:w-auto pl-3 py-1.5 pr-16 border  border-gray-300 rounded-sm cursor-pointer ${speciality === "Gastroenterologist" ? "bg-indigo-100 text-black" : ""}`}
          >
            Gastroenterologist
          </p>
          <p
            onClick={() =>
              speciality === "Cardiologist"
                ? navigate("/doctors")
                : navigate("/doctors/Cardiologist")
            }
            className={`w-[83.5vw] whitespace-nowrap sm:w-auto pl-3 py-1.5 pr-16 border  border-gray-300 rounded-sm cursor-pointer ${speciality === "Cardiologist" ? "bg-indigo-100 text-black" : ""}`}
          >
            Cardiologist
          </p>
          
          
        </div>




        <div className="w-full grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 gap-4 gap-y-7">
          {filterDoc.map((item, index) => (
            <div
              key={item._id}
              onClick={() => navigate(`/appoinment/${item._id}`)}
              className="border border-blue-200 rounded-lg overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
            >
              <img className="bg-blue-50" src={item.image} alt="" />
              <div className="p-2">
                <div className="flex items-center gap-2 text-sm text-green-500 text-center font-normal">
                  <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                  <p>
                    Available on{" "}
                    {item.weeklyAvailability &&
                    item.weeklyAvailability.length > 0
                      ? item.weeklyAvailability
                          .map((av) => av.day.slice(0, 3))
                          .join(", ")
                      : "N/A"}
                  </p>
                </div>
                <p className="text-lg font-medium text-gray-900">{item.name}</p>
                <p className="text-sm text-gray-600">{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
