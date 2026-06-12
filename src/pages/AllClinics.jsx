import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets_frontend/assets";
import { Helmet } from "react-helmet-async";
import { AiOutlineLoading3Quarters } from "react-icons/ai";


const AllClinics = () => {
  const { clinics, getAllClinics, clinicsLoading } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    getAllClinics();
  }, []);

  return (
    <div className="px-1 sm:px-5 mt-5">
      <Helmet>
        <title>Clinics in Rampurhat | Doctor In City</title>

        <meta
          name="description"
          content="Find clinics in Rampurhat with available doctors and easy appointment booking. Search trusted clinics, specialists, and blood donor services in your city."
        />
        <meta
          name="keywords"
          content="clinics in Rampurhat, Rampurhat clinic list, doctor clinic Rampurhat, book clinic appointment, blood donor Rampurhat"
        />
        <meta property="og:title" content="Clinics in Rampurhat | Doctor In City" />
        <meta
          property="og:description"
          content="Search clinics in Rampurhat with available doctors and convenient appointment booking. Doctor In City helps patients find trusted medical clinics quickly."
        />
        <meta property="og:url" content="https://www.doctorincity.com/clinics" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.doctorincity.com/logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Clinics in Rampurhat | Doctor In City" />
        <meta name="twitter:description" content="Search clinics in Rampurhat with available doctors and convenient appointment booking. Doctor In City helps patients find trusted medical clinics quickly." />
        <meta name="twitter:image" content="https://www.doctorincity.com/logo.png" />

        <link rel="canonical" href="https://www.doctorincity.com/clinics" />
      </Helmet>
      <p className="text-xl font-semibold mb-3">All Clinics</p>

      {clinicsLoading && (
        <div className="mb-6 text-center">
          <AiOutlineLoading3Quarters className="text-4xl mx-auto animate-spin text-blue-600" />
          <p className="text-zinc-500 mt-2">Loading clinics...</p>
        </div>
      )}

      <div className="w-full grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 gap-4 gap-y-6">
        {clinics.map((clinic) => (
          <div
            key={clinic._id}
            onClick={() => navigate(`/clinic/${clinic._id}`)}
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
                  src={clinic.image}
                  alt=""
                />
              </div>

              {/* DATA */}
              <div className="w-3/4 p-3 flex flex-col justify-center">
                <p className="flex items-center gap-1 text-lg font-medium text-gray-900 truncate">
                                  <span className="truncate">{clinic.name}</span>
                                  <img
                                    className="w-3 h-3"
                                    src={assets.verified_icon}
                                    alt="verified"
                                  />
                                </p>

                <p className="text-sm text-gray-600 truncate">
                  {clinic.address}
                </p>

                <p className="text-sm text-gray-600">
                  {clinic.city}, {clinic.pincode}
                </p>

                <p className="text-sm text-green-500 font-medium flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-smoothBlink"></span>
                  Available Doctors:{" "}
                  <span className="text-blue-600">{clinic.doctorCount}</span>
                </p>
              </div>
            </div>

            {/* BOTTOM */}
            <div className="border-t border-blue-200 text-center text-[12px] text-gray-600 py-0.5 bg-blue-50 truncate px-2">
              <span className="text-red-500">* </span>{clinic.offer}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllClinics;
