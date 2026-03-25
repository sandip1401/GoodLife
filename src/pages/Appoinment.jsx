import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets_frontend/assets";
import { toast } from "react-toastify";
import axios from "axios";

function getMonthlyWeekdayDates(year, month, dayOfWeek, positions) {
  const result = [];

  const firstDay = new Date(year, month, 1);
  const firstDayWeek = firstDay.getDay();

  const diff = (dayOfWeek - firstDayWeek + 7) % 7;
  const firstOccurrence = new Date(year, month, 1 + diff);

  const allDates = [];
  let current = new Date(firstOccurrence);

  while (current.getMonth() === month) {
    allDates.push(new Date(current));
    current.setDate(current.getDate() + 7);
  }

  positions.forEach((pos) => {
    if (pos === "last") {
      if (allDates.length > 0) {
        result.push(allDates[allDates.length - 1]);
      }
    } else {
      const map = {
        first: 0,
        second: 1,
        third: 2,
        fourth: 3,
        fifth: 4,
      };

      if (map[pos] !== undefined && allDates[map[pos]]) {
        result.push(allDates[map[pos]]);
      }
    }
  });

  return result;
}

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

    let maxDaysToCheck = 0;

    docInfo.weeklyAvailability.forEach((slot) => {
      if (slot.recurrenceType === "weekly") {
        maxDaysToCheck = Math.max(maxDaysToCheck, 8);
      }

      if (slot.recurrenceType === "monthly") {
        maxDaysToCheck = Math.max(maxDaysToCheck, 32);
      }

      if (slot.recurrenceType === "interval") {
        maxDaysToCheck = Math.max(maxDaysToCheck, 60);
      }
    });

    // fallback
    if (maxDaysToCheck === 0) {
      maxDaysToCheck = 30;
    }

    for (let i = 0; i < maxDaysToCheck; i++) {
      // check next 30 days
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      const currentDayName = currentDate.toLocaleDateString("en-US", {
        weekday: "long",
      });

      let matchedSlots = [];

      docInfo.weeklyAvailability.forEach((slot) => {
        const dayIndexMap = {
          Sunday: 0,
          Monday: 1,
          Tuesday: 2,
          Wednesday: 3,
          Thursday: 4,
          Friday: 5,
          Saturday: 6,
        };

        if (dayIndexMap[slot.day] !== currentDate.getDay()) return;

        // ================= WEEKLY =================
        if (slot.recurrenceType === "weekly") {
          matchedSlots.push(slot);
        }

        // ================= MONTHLY =================
        else if (slot.recurrenceType === "monthly") {
          const year = currentDate.getFullYear();
          const month = currentDate.getMonth();
          const dayOfWeek = currentDate.getDay();

          const dates = getMonthlyWeekdayDates(
            year,
            month,
            dayOfWeek,
            slot.weekPositions || [],
          );

          const isMatch = dates.some(
            (d) => d.getDate() === currentDate.getDate(),
          );

          if (isMatch) {
            matchedSlots.push(slot);
          }
        }

        // ================= INTERVAL =================
        else if (slot.recurrenceType === "interval") {
          const start = new Date(slot.startDate);
          const diffInMs = currentDate - start;

          const diffInWeeks = Math.floor(diffInMs / (7 * 24 * 60 * 60 * 1000));

          if (diffInWeeks >= 0 && diffInWeeks % slot.interval === 0) {
            matchedSlots.push(slot);
          }
        }
      });

      if (matchedSlots.length === 0) continue;

      let timeSlots = [];

      matchedSlots.forEach((availabilityForDay) => {
        const [startHour, startMinute] =
          availabilityForDay.startTime.split(":");

        const [endHour, endMinute] = availabilityForDay.endTime.split(":");

        let startTime = new Date(currentDate);
        startTime.setHours(parseInt(startHour), parseInt(startMinute), 0);

        let endTime = new Date(currentDate);
        endTime.setHours(parseInt(endHour), parseInt(endMinute), 0);

        while (startTime < endTime) {
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

          startTime.setMinutes(startTime.getMinutes() + 15);
        }
      });

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
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // use "smooth" if you want animation
    });
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

  useEffect(() => {}, [docSlots]);

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

        <div className="border border-gray-400 rounded-md w-full p-4 sm:p-6 lg:p-6">
          <p className="flex items-center gap-2 text-xl sm:text-2xl lg:text-3xl text-gray-800">
            {docInfo.name}{" "}
            <img className="h-4 w-4" src={assets.verified_icon} alt="" />{" "}
          </p>

          <div className="flex items-center gap-1 text-gray-600">
            <p>{docInfo.degree}</p>
            <p className="hidden sm:block">-</p>

            {/* Laptop */}
            <p className="hidden sm:block text-gray-600">
              {docInfo.speciality}
            </p>

            <button className="hidden sm:inline-block border border-gray-200 rounded-full text-xs px-2 py-0.5">
              {" "}
              {docInfo.experience}
            </button>
          </div>

          {/* Mobile */}
          <div className="sm:hidden mt-1 text-gray-600">
            {/* English + Button */}
            <div className="flex items-center gap-2">
              <p>{docInfo.speciality}</p>

              <button className="border border-gray-200 rounded-full text-xs px-2 py-0.5">
                {docInfo.experience}
              </button>
            </div>

            {/* Bengali below */}
            <p className="text-xs text-gray-500 mt-0.5">
              {specialityInBengali[docInfo.speciality] || ""}
            </p>
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

          <div className="flex items-center gap-1.5 mt-1">
            <p className="text-gray-600 font-medium">City & Pincode:</p>
            <span className="text-gray-600">{docInfo.city}</span>
          </div>

          {/* Location Section */}
          {docInfo.address1 && (
            <div className=" text-base text-gray-600">
              {/* Desktop View (single line) */}
              <p className="hidden sm:block">
                <span
                  className="font-medium
                 text-gray-600"
                >
                  Location:
                </span>{" "}
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
                const maskedNumber =
                  number.slice(0, number.length - 4) + "****";

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
        <div className="w-full grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 gap-4 gap-y-7 mt-10">
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

                  <div className="flex items-center gap-1 text-sm text-green-500 leading-none my-0.5">
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
                <span className="truncate block">
                  {item.achievement}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Appoinment;
