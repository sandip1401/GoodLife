import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets_frontend/assets";
import { toast } from "react-toastify";
import axios from "axios";

export const Appoinment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, token, getDoctorsData, backendUrl } =
    useContext(AppContext);
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const navigate = useNavigate();

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [filterDoc, setFilterDoc] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const fetchDocInfo = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/${docId}`);
      if (data.success) {
        setDocInfo(data.doctor);
      } else {
        toast.error("Doctor not found");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to load doctor");
    }
  };

  const getAvailableSlots = async () => {
    if (!docInfo || !docInfo.weeklyAvailability) return;

    setDocSlots([]);

    let today = new Date();
    let newDocSlots = [];

    for (let i = 0; i < 10; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      // Get full weekday name (Monday, Tuesday...)
      const currentDayName = currentDate.toLocaleDateString("en-US", {
        weekday: "long",
      });

      // Check if doctor works on this day
      const availabilityForDay = docInfo.weeklyAvailability.find(
        (item) => item.day === currentDayName,
      );

      if (!availabilityForDay) continue; // skip if not available

      // Convert 24hr string to hours & minutes
      const [startHour, startMinute] = availabilityForDay.startTime.split(":");
      const [endHour, endMinute] = availabilityForDay.endTime.split(":");

      let startTime = new Date(currentDate);
      startTime.setHours(parseInt(startHour), parseInt(startMinute), 0);

      let endTime = new Date(currentDate);
      endTime.setHours(parseInt(endHour), parseInt(endMinute), 0);

      let timeSlots = [];

      // If today → prevent past booking
      if (i === 0) {
        const now = new Date();
        if (startTime < now) {
          startTime = new Date(now);
          startTime.setMinutes(now.getMinutes() > 30 ? 45 : 30, 0, 0);
        }
      }

      while (startTime < endTime) {
        // Convert to 12 hour format for user
        let formattedTime = startTime.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });

        let day = startTime.getDate();
        let month = startTime.getMonth() + 1;
        let year = startTime.getFullYear();

        const slotDate = day + "_" + month + "_" + year;

        const isBooked =
          docInfo.slots_booked?.[slotDate]?.includes(formattedTime);

        timeSlots.push({
          datetime: new Date(startTime),
          time: formattedTime,
          isBooked,
        });

        // increment by 15 minutes
        startTime.setMinutes(startTime.getMinutes() + 15);
      }

      if (timeSlots.length > 0) {
        newDocSlots.push(timeSlots);
      }
    }

    setDocSlots(newDocSlots);
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Login to book appointment");
      return navigate("/login");
    }
    try {
      const date = docSlots[slotIndex][0].datetime;

      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      const slotDate = day + "_" + month + "_" + year;
      const { data } = await axios.post(
        backendUrl + "/api/user/book-appointment",
        { docId, slotDate, slotTime },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.message(error.message);
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [docId]);

  useEffect(() => {
    if (docInfo && doctors.length) {
      const related = doctors.filter(
        (doc) =>
          doc.speciality === docInfo.speciality && doc._id !== docInfo._id,
      );
      setFilterDoc(related);
    }
  }, [docInfo, doctors]);

  useEffect(() => {
    if (docInfo) {
      getAvailableSlots();
    }
  }, [docInfo]);

  useEffect(() => {
  }, [docSlots]);

  if (!doctors) {
    return <div>Loading doctors...</div>;
  }

  if (!docInfo) {
    return <div>Loading appointment...</div>;
  }

  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="bg-blue-600 flex justify-center w-full lg:w-1/3 rounded-md">
          <img
            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-full object-cover"
            src={docInfo.image}
            alt={docInfo.name}
          />
        </div>

        <div className="border border-gray-400 rounded-md w-full p-4 sm:p-6 lg:p-8">
          <p className="flex items-center gap-2 text-xl sm:text-2xl lg:text-3xl text-gray-800">
            {docInfo.name}{" "}
            <img className="h-4 w-4" src={assets.verified_icon} alt="" />{" "}
          </p>

          <div className="flex items-center gap-1 mt-2 text-gray-600">
            <p>{docInfo.degree}</p>
            <p>-</p>
            <p>{docInfo.speciality}</p>
            <button className="border border-gray-200 rounded-full text-xs px-2 py-0.5">
              {docInfo.experience}
            </button>
          </div>

          <div className="text-gray-800 text-sm mt-3">
            <p className="flex items-center gap-1 font-semibold">
              About{" "}
              <img className="h-3 w-3" src={assets.info_icon} alt="" />{" "}
            </p>
            <p className="text-gray-600 mt-1 max-w-[700px]">{docInfo.about}</p>
          </div>

          <div className="flex items-center gap-1.5 mt-4">
            <p className="text-gray-600">Appoinment Fee:</p>
            <span>
              {currencySymbol}
              {docInfo.fees}
            </span>
          </div>

          {/* Location Section */}
          {docInfo.address1 && (
            <div className="mt-2 text-base text-gray-700">
              {/* Desktop View (single line) */}
              <p className="hidden sm:block">
                <span className="font-medium text-gray-600">Location:</span>{" "}
                {docInfo.address1}
                {docInfo.address2 && (
                  <>
                    {" | "}
                    <a
                      href={docInfo.address2}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline font-medium"
                    >
                      View on Google Maps
                    </a>
                  </>
                )}
              </p>

              {/* Mobile View (two lines aligned properly) */}
              <div className="block sm:hidden grid grid-cols-[auto_1fr] gap-x-2">
                <span className="font-medium text-gray-600">Location:</span>
                <span>{docInfo.address1}</span>

                {docInfo.address2 && (
                  <>
                    <span></span>
                    <a
                      href={docInfo.address2}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline font-medium mt-1"
                    >
                      View on Google Maps
                    </a>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="md:ml-0 md:pl-0 lg:pl-80 mt-4 font-medium text-gray-700">
        <p>Booking slots</p>
        <div className="flex flex-nowrap justify-start gap-3 pt-2 w-full overflow-x-scroll whitespace-nowrap">
          {docSlots.length &&
            docSlots.map((item, index) => (
              <div
                key={index}
                onClick={() => setSlotIndex(index)}
                className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                  slotIndex === index
                    ? "bg-blue-500 text-white"
                    : "border border-gray-200"
                }`}
              >
                <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                <p>{item[0] && item[0].datetime.getDate()}</p>
              </div>
            ))}
        </div>

        <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
          {docSlots.length &&
            docSlots[slotIndex].map((item, index) => (
              <p
                key={index}
                onClick={() => {
                  if (!item.isBooked) {
                    setSlotTime(item.time);
                  }
                }}
                className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                  item.isBooked
                    ? "line-through text-gray-400 border border-gray-200 cursor-not-allowed bg-gray-100"
                    : item.time === slotTime
                      ? "bg-blue-500 text-white cursor-pointer"
                      : "text-gray-600 border border-gray-300 cursor-pointer hover:bg-blue-50"
                }`}
              >
                {item.time}
              </p>
            ))}
        </div>

        <button
          onClick={bookAppointment}
          className="cursor-pointer text-sm rounded-full font-light px-16 py-3 bg-blue-500 text-white mt-5"
        >
          Book an appointment
        </button>

{docInfo.managerContacts && docInfo.managerContacts.length > 0 && (
  <div className="mt-6 max-w-md bg-white border border-gray-200 rounded-2xl shadow-sm p-5">
    <p className="text-sm text-gray-500">Need Help?</p>
    <p className="text-lg font-semibold text-gray-800 mt-1">
      Doctor Manager Contact
    </p>

    <div className="mt-3 flex flex-col gap-2">
      {docInfo.managerContacts.map((number, index) => {
        // If user not logged in, hide last 5 digits
        const maskedNumber = number.slice(0, number.length - 4) + "****";

        return (
          <div key={index}>
            {token ? (
              // Logged in → show full number
              <a
                href={`tel:${number}`}
                className="text-blue-600 font-medium hover:text-blue-800 transition-colors duration-200"
              >
                📞 {number}
              </a>
            ) : (
              // Not logged in → show masked number
              <p className="text-gray-600 font-medium">
                📞 {maskedNumber}
              </p>
            )}
          </div>
        );
      })}

      {!token && (
        <p
          onClick={() => navigate("/login")}
          className="text-sm text-blue-600 cursor-pointer hover:underline mt-2"
        >
          Login to view doctor manager's number
        </p>
      )}
    </div>
  </div>
)}





      </div>

      <div className="mt-20">
        <h1 className="text-gray-800 text-center text-3xl">Related Doctors</h1>
        <p className="text-center text-gray-800 mt-3 text-sm">
          Simply browse through our extensive list of trusted doctors.
        </p>
        <div className="w-full grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-4 gap-y-7 mt-10">
          {filterDoc.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                navigate(`/appoinment/${item._id}`);
                window.scrollTo(0, 0);
              }}
              className="border border-blue-200 rounded-lg overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
            >
              <img className="bg-blue-50" src={item.image} alt="" />
              <div className="p-2">
                <div className="flex items-center gap-2 text-sm text-green-500 text-center font-normal">
                  <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                  <p>Available</p>
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
};

export default Appoinment;
