import React from "react";
import { useNavigate } from "react-router-dom";

export default function Footer() {
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
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
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
        <p className="text-center p-4 text-[12px]">
          Copyright 2026 @ Doctor In City - All Right Reserved.{" "}
        </p>
      </div>
    </div>
  );
}
