import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import emailjs from "@emailjs/browser";
import { Helmet } from "react-helmet";
import { useEffect } from "react";

export default function Blood() {
  const navigate = useNavigate();
  const { city: urlCity } = useParams();

  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(urlCity || "");
  const [showForm, setShowForm] = useState(false);
  const [showOtpBox, setShowOtpBox] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [selectedReportDonor, setSelectedReportDonor] = useState(null);
  const [reportText, setReportText] = useState("");
  const [name, setName] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [otpTime, setOtpTime] = useState(null);

  const { reportDonor, addDonor, getDonors, donors } = useContext(AppContext);
  const locations = [...new Set(donors.map((d) => d.location.toLowerCase()))];

  const SERVICE_ID = import.meta.env.VITE_EMAIL_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_EMAIL_TEMPLATE_ID;
  const PUBLIC_KEY = import.meta.env.VITE_EMAIL_PUBLIC_KEY;

  const handleReportClick = (donor) => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login to report");
      navigate("/login");
      return;
    }

    setSelectedReportDonor(donor);
  };

  const sendOtp = () => {
    if (!email) {
      toast.error("Enter email first");
      return;
    }

    const otpCode = Math.floor(100000 + Math.random() * 900000);

    setGeneratedOtp(otpCode);
    setOtpTime(Date.now());

    const templateParams = {
      email: email,
      passcode: otpCode,
      time: "15 minutes",
    };

    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then(() => {
        toast.success("OTP sent to your email");
        setShowOtpBox(true);
      })
      .catch(() => {
        toast.error("Failed to send OTP");
      });
  };

  const verifyOtp = () => {
    if (Date.now() - otpTime > 5 * 60 * 1000) {
      toast.error("OTP expired");
      return;
    }
    if (otp === generatedOtp.toString()) {
      toast.success("Email verified successfully");
      setEmailVerified(true);
    } else {
      toast.error("Invalid OTP");
    }
  };

  const capitalize = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const submitDonor = async () => {
    if (!emailVerified) {
      toast.error("Please verify OTP first");
      return;
    }
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to report");
      navigate("/login");
      return;
    }

    if (!name || !bloodGroup || !city || !phone || !email) {
      toast.error("Please fill all fields");
      return;
    }
    const donorData = {
      name,
      bloodGroup,
      location: city.toLowerCase(),
      phone,
      email,
    };

    const success = await addDonor(donorData);

    if (success) {
      await getDonors();
      setShowForm(false);

      setName("");
      setBloodGroup("");
      setCity("");
      setPhone("");
      setEmail("");
      setOtp("");
      setShowOtpBox(false);
      setEmailVerified(false);
    }
  };

  useEffect(() => {
    if (!urlCity) {
      navigate("/blood-donor/rampurhat", { replace: true });
    } else {
      setSelectedLocation(urlCity.toLowerCase());
    }
  }, [urlCity, navigate]);

  const filteredDonors = donors.filter((donor) => {
    const groupMatch =
      selectedGroup === "" || donor.bloodGroup === selectedGroup;

    const locationMatch =
      selectedLocation === "" ||
      donor.location.toLowerCase() === selectedLocation.toLowerCase();

    return donor.available === true && groupMatch && locationMatch;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 relative">
      <Helmet>
        <title>
          Blood Donors in {selectedLocation || urlCity || "Rampurhat"} |
          DoctorInCity
        </title>

        <meta
          name="description"
          content={`Find blood donors in ${
            selectedLocation || "Rampurhat"
          }. Search by blood group and contact instantly in emergency.`}
        />

        {/* ✅ CANONICAL URL */}
        <link
          rel="canonical"
          href={`https://doctorincity.com/blood-donor/${selectedLocation || urlCity || "rampurhat"}`}
        />

        {/* ✅ STRUCTURED DATA */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalBusiness",
            name: "DoctorInCity",
            areaServed: selectedLocation || urlCity || "Rampurhat",
            serviceType: "Blood Donor Finder",
            url: `https://doctorincity.com/blood-donor/${selectedLocation || urlCity || "rampurhat"}`,
          })}
        </script>
      </Helmet>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-2">
          <h1 className="lg:text-3xl text-xl font-bold text-gray-800 mr-2">
            Blood Donors in{" "}
            <span className="text-green-500">
              {capitalize(selectedLocation || "Your City")}
            </span>
          </h1>

          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:shadow-md transition"
          >
            + Add as a Donor
          </button>
        </div>

        <p className="text-sm text-gray-500 mb-10 hidden sm:block">
          Find blood donors by group and city. Contact instantly during
          emergency.
        </p>

        {/* Filter Section */}
        <div className="bg-white p-4 rounded-xl shadow mb-6 flex flex-col md:flex-row gap-4">
          <select
            onChange={(e) => setSelectedGroup(e.target.value)}
            className="border rounded p-2 w-full md:w-1/2"
          >
            <option value="">Filter by Blood Group</option>
            <option value="A+">A+</option>
            <option value="B+">B+</option>
            <option value="O+">O+</option>
            <option value="AB+">AB+</option>
            <option value="A-">A-</option>
            <option value="B-">B-</option>
            <option value="O-">O-</option>
            <option value="AB-">AB-</option>
          </select>

          <select
            onChange={(e) => {
              const value = e.target.value.toLowerCase();
              setSelectedLocation(value);

              if (value) {
                navigate(`/blood-donor/${value}`);
              }
            }}
            className="border rounded p-2 w-full md:w-1/2"
          >
            <option value="">Filter by City</option>

            {locations.map((loc, index) => (
              <option key={index} value={loc}>
                {loc.toUpperCase()}
              </option>
            ))}
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
                    No blood donors found in this city. Try another blood group
                    or nearby location.
                  </td>
                </tr>
              ) : (
                filteredDonors.map((donor) => (
                  <tr key={donor._id} className="border-b hover:bg-gray-50">
                    <td className="p-4">{donor.name}</td>
                    <td className="p-4 text-center font-medium text-blue-500">
                      {donor.bloodGroup}
                    </td>
                    <td className="p-4 capitalize">{donor.location}</td>

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
                      <button
                        onClick={() => handleReportClick(donor)}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
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
            <p className="text-center text-gray-500">
              No blood donors found in this city.
            </p>
          ) : (
            filteredDonors.map((donor) => (
              <div key={donor._id} className="bg-white p-4 rounded-xl shadow">
                <p className="text-lg font-semibold text-gray-800">
                  {donor.name}
                </p>

                <p className="text-blue-500 font-medium">{donor.bloodGroup}</p>

                <p className="text-gray-600 text-sm">{donor.location.toUpperCase()}</p>

                {/* ✅ UPDATED PHONE FOR MOBILE */}
                <button
                  onClick={() => setSelectedDonor(donor)}
                  className="text-gray-600 text-sm mb-3"
                >
                  📞 {donor.phone}
                </button>

                <button
                  onClick={() => handleReportClick(donor)}
                  className="w-full bg-red-500 text-white py-2 rounded-lg"
                >
                  Report
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="hidden">
        Blood donors in rampurhat, bolpur, suri, sainthia. Find A+, B+, O+, AB
        blood donors easily.
      </div>

      {selectedReportDonor && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-md">
            <h2 className="text-lg font-semibold mb-3">
              Report {selectedReportDonor.name}
            </h2>

            <textarea
              value={reportText}
              onChange={(e) => setReportText(e.target.value)}
              placeholder="Write your report..."
              className="w-full border p-2 rounded mb-4"
              rows="4"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setSelectedReportDonor(null)}
                className="px-4 py-1 bg-gray-300 rounded"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  reportDonor(selectedReportDonor._id, reportText);

                  setReportText("");
                  setSelectedReportDonor(null);
                }}
                className="px-4 py-1 bg-red-500 text-white rounded"
              >
                Report
              </button>
            </div>
          </div>
        </div>
      )}

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
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border rounded w-full p-2 mb-3"
            />

            <select
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
              className="border rounded w-full p-2 mb-3"
            >
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>

            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="border rounded w-full p-2 mb-3"
            >
              <option value="">Select City</option>
              <option value="bolpur">BOLPUR</option>
              <option value="rampurhat">RAMPURHAT</option>
              <option value="sainthia">SAINTHIA</option>
              <option value="suri">SURI</option>
            </select>

            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
                onClick={sendOtp}
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
                  onClick={verifyOtp}
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

              <button
                onClick={submitDonor}
                className={`px-4 py-2 text-white rounded-lg ${
                  emailVerified
                    ? "bg-blue-500"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
