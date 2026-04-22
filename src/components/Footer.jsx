import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const navigate = useNavigate();
  return (
    <div className="mt-5">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-8 text-sm mt-40">
        {/*left*/}
        <div>
          {/* LOGO */}
          <li
            onClick={() => {
              navigate("/");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="cursor-pointer flex items-center gap-0 -ml-2"
          >
            <img
              src="/logo.png"
              alt="Doctor InCity"
              className="w-14 -my-2 object-contain"
            />
            {/* <span className="text-4xl font-semibold bg-gradient-to-r from-[#0399ef] via-[#38bdf8] to-[#2dd4bf] bg-clip-text text-transparent"> */}

            <div className="flex flex-col leading-none -ml-2">
              <span className="text-4xl font-semibold bg-gradient-to-r from-[#0399ef] via-[#38bdf8] to-[#2dd4bf] bg-clip-text text-transparent">
                doctor
              </span>

              <span className="text-[11px] tracking-[5px] text-gray-500 -mt-1">
                — INCITY —
              </span>
            </div>
          </li>
          <p className="mt-3 w-full md:w-2/3 text-gray-500 leading-6">
            Doctor In City helps patients connect with trusted doctors
            effortlessly. Book appointments, manage your visits, and experience
            a smoother, safer, and smarter healthcare journey with our
            intelligent and easy-to-use platform.
            <br />
            <span>
              *The avatar image of the doctor is used for visual representation
              only and does not depict the doctor's actual appearance.
            </span>
          </p>
        </div>

        {/*center*/}
        <div>
          <h1 className="text-xl font-medium mb-5">COMPANY</h1>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li
              onClick={() => {
                navigate("/");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="cursor-pointer hover:text-blue-600 transition"
            >
              Home
            </li>
            <li
              onClick={() => {
                navigate("/about");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="cursor-pointer hover:text-blue-600 transition"
            >
              About Us
            </li>
            <li
              onClick={() => {
                setModalType("refund");
                setShowModal(true);
              }}
              className="cursor-pointer hover:text-blue-600 transition"
            >
              Refund policy
            </li>

            <li
              onClick={() => {
                setModalType("terms");
                setShowModal(true);
              }}
              className="cursor-pointer hover:text-blue-600 transition"
            >
              Terms & Conditions
            </li>
          </ul>
        </div>

        {/*right*/}
        <div>
          <h1 className="text-xl font-medium mb-5">GET IN TOUCH</h1>
          <p className="text-gray-600 mb-2">Doctor Registration Enquiries :-</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>+91 6296469437</li>
            <li>+91 9832292610</li>
            <li>doctorinmycity@gmail.com</li>
          </ul>
        </div>
      </div>

      {/*footer*/}
      <div className="text-gray-600">
        <hr />
        <p className="text-center p-4 text-[12px] truncate">
          Copyright 2026 @ Doctor In City - All Right Reserved.{" "}
        </p>
      </div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Background Blur */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          ></div>

          {/* Modal Box */}
          <div className="relative bg-white w-[90%] sm:w-[500px] max-h-[80vh] overflow-y-auto rounded-xl p-5 shadow-xl z-50">
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              ✕
            </button>

            {/* Title */}
            <h2 className="text-xl font-semibold mb-4">
              {modalType === "refund" ? "Refund Policy" : "Terms & Conditions"}
            </h2>

            {/* Content */}
            <div className="text-sm text-gray-600 space-y-2">
              {modalType === "refund" ? (
                <>
                  <p>
                    • No refund will be provided once the appointment is booked.
                  </p>
                  <p>
                    • If the doctor cancels the appointment, contact support.
                  </p>
                  <p>
                    • If payment is deducted but failed, refund within 5-7 days.
                  </p>
                  <p>• For issues, contact support team.</p>
                </>
              ) : (
                <>
                  <p>
                    • Patients must reach the clinic 15-20 minutes before the
                    appointment time.
                  </p>
                  <p>• Patients must carry previous medical reports.</p>
                  <p>• Report immediately if any staff behaves rudely.</p>
                  <p>
                    • Appointment timing may be delayed based on doctor
                    availability.
                  </p>
                  <p>• Provide correct details while booking.</p>
                  <p>• One appointment is valid for one patient only.</p>
                  <p>• No refund after successful booking.</p>
                  <p>• Platform only connects patients with doctors.</p>
                  <p>• Misuse may lead to account suspension.</p>
                  <p>• By booking, you agree to all terms.</p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
