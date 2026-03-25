import React, { useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";
import { assets } from "../assets/assets_frontend/assets";
import { useState } from "react";

const ClinicDoctors = () => {
  const { clinicId } = useParams();
  const navigate = useNavigate();

  const { clinicDoctors, getDoctorsByClinic, clinics } = useContext(AppContext);

  const [clinicInfo, setClinicInfo] = useState(null);

  useEffect(() => {
    if (clinicId) {
      getDoctorsByClinic(clinicId);

      const foundClinic = clinics.find((c) => c._id === clinicId);
      setClinicInfo(foundClinic);
    }
  }, [clinicId, clinics]);

  return (
    <div className="px-1 mt-3">
      {/* CLINIC IMAGE TOP */}
      {clinicInfo && (
        <div className="relative w-full lg:w-1/3 rounded-xl mb-4 overflow-hidden">
          <img
            className="w-full h-[220px] object-cover"
            src={clinicInfo.image}
            alt={clinicInfo.name}
          />

          <div className="absolute bottom-0 left-0 right-0 bg-red-600 text-white text-sm text-center py-1">
            {clinicInfo.offer}
          </div>
        </div>
      )}
      <p className="text-xl font-semibold mb-3 mt-6">
        Doctors Available in this Clinic
      </p>

      {/* DOCTOR LIST */}
      <div className="w-full grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 gap-4 gap-y-7 mt-3 sm:mt-0">
        {clinicDoctors?.map((item, index) => (
          <div
            key={item._id}
            onClick={() => navigate(`/appoinment/${item._id}`)}
            className="border border-blue-200 rounded-lg cursor-pointer 
                       hover:translate-y-[-5px] transition-all duration-500 
                       flex flex-col h-32 overflow-hidden"
          >
            {/* TOP SECTION */}
            <div className="flex items-center flex-1 overflow-hidden">
              {/* IMAGE */}
              <div className="w-1/4 h-full">
                <img
                  className="w-full h-full object-cover bg-blue-50"
                  src={item.image}
                  alt=""
                />
              </div>

              {/* DATA */}
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
                  <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                  <p>
                    Available on{" "}
                    {item.weeklyAvailability &&
                    item.weeklyAvailability.length > 0
                      ? item.weeklyAvailability
                          .slice(0, 3)
                          .map((av) => av.day.slice(0, 3))
                          .join(", ")
                      : "N/A"}
                  </p>
                </div>

                <p className="text-sm text-gray-600 font-medium">
                  {item.speciality}
                </p>

                <p className="text-sm text-gray-600 mb-1">
                  Fee:<span className="text-black"> ₹ {item.fees}</span>
                </p>
              </div>
            </div>

            {/* BOTTOM */}
            <div className="border-t border-blue-200 text-center text-[11.5px] text-gray-600 py-0.5 bg-blue-50 truncate px-2">
              <span className="truncate block">{item.achievement}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClinicDoctors;
