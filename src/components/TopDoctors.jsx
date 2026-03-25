import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets_frontend/assets";

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  const specialityInBengali = {
    "General physician": " ( সাধারণ চিকিৎসক )",
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

  return (
    <div className="flex flex-col items-center gap-4 my-10 text-gray-900 mx-6">
      <h1 className="text-center font-semibold text-3xl">
        Top Doctors to Book
      </h1>
      <p className="text-center text-sm mb-4">
        Simply browse through our extensive list of trusted doctors.
      </p>

      <div className="w-full grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-x-8 gap-y-6">
        {doctors.slice(0, 10).map((item) => (
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

                <div className="flex items-center gap-1 text-sm text-green-500 leading-none my-0.5">
                  {" "}
                  <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                  <p>
                    Available on{" "}
                    {item.weeklyAvailability &&
                    item.weeklyAvailability.length > 0
                      ? item.weeklyAvailability[0].day.slice(0, 3)
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
            <div className="border-t border-blue-200 text-center text-[11px] text-gray-600 py-0.5 bg-blue-50 truncate px-2">
              <span className="truncate block">
                {item.achievement}
              </span>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          navigate("/doctors");
          scrollTo(0, 0);
        }}
        className="cursor-pointer text-gray-600 bg-blue-100 px-12 py-3 rounded-full mt-10 hover:scale-105 active:scale-95 transition duration-300"
      >
        more
      </button>
    </div>
  );
};

export default TopDoctors;
