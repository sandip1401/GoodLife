// import React, { useContext, useState } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import { assets } from "../assets/assets_frontend/assets";
// import { AppContext } from "../context/AppContext";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const {token,setToken}=useContext(AppContext)
//   const [showMenu, setShowMenu] = useState(false)
//   const [showProfileMenu, setShowProfileMenu] = useState(false);


  
//   const logout=()=>{
//     setToken(false)
//     localStorage.removeItem('token')
//     setShowProfileMenu(false)
//   }
//   return (
//     <div className="fixed top-0 left-0 w-full z-50 bg-white text-sm">
//       <div className="mx-7 sm:mx-[10%] py-3 border-b border-b-gray-300">
//       <ul className="flex items-center justify-between mt-2 font-medium">
//         <div className="font-bold text-3xl text-blue-700">GoodLife</div>
//         <div className="hidden md:flex items-center justify-center gap-5">
//           <NavLink to="/">
//             <li>HOME</li>
//             <hr className="border-none outline-none h-0.5 bg-blue-500 w-3/5 m-auto hidden" />
//           </NavLink>
//           <NavLink to="/doctors">
//             <li>ALL DOCTORS</li>
//             <hr className="border-none outline-none h-0.5 bg-blue-500 w-3/5 m-auto hidden" />
//           </NavLink>
//           <NavLink to="/about">
//             <li>ABOUT</li>
//             <hr className="border-none outline-none h-0.5 bg-blue-500 w-3/5 m-auto hidden" />
//           </NavLink>
//           <NavLink to="/contact">
//             <li>CONTACT</li>
//             <hr className="border-none outline-none h-0.5 bg-blue-500 w-3/5 m-auto hidden" />
//           </NavLink>
//         </div>

//         <div className="flex items-center gap-3">
//           {token ? (
//             <>
//               {/* PROFILE BUTTON */}
//               <div
//                 className="flex items-center gap-2 cursor-pointer"
//                 onClick={() => setShowProfileMenu((prev) => !prev)}
//               >
//                 <img className="w-8 rounded-full" src={assets.profile_pic} alt="" />
//                 <img className="w-2.5" src={assets.dropdown_icon} alt="" />
//               </div>

//               {/* PROFILE DROPDOWN */}
//               {showProfileMenu && (
//                 <div className="absolute right-6 md:right-20 lg:right-38 top-18 z-20 min-w-48 bg-stone-100 rounded flex flex-col gap-2 p-4 text-base text-gray-600">
//                   <p
//                     onClick={() => {
//                       navigate("/my-profile");
//                       setShowProfileMenu(false);
//                     }}
//                     className="hover:text-black cursor-pointer"
//                   >
//                     My Profile
//                   </p>

//                   <p
//                     onClick={() => {
//                       navigate("/my-appointments");
//                       setShowProfileMenu(false);
//                     }}
//                     className="hover:text-black cursor-pointer"
//                   >
//                     My Appointments
//                   </p>

//                   <p
//                     onClick={logout}
//                     className="hover:text-black cursor-pointer"
//                   >
//                     Logout
//                   </p>
//                 </div>
//               )}
//             </>
//           ) : (
//             <button onClick={()=>navigate('/login')} className="bg-blue-600 text-white px-8 py-3 rounded-full font-light cursor-pointer">
//               Create account
//             </button>
//           )}
//           <img onClick={()=>setShowMenu(true)} className="w-6 md:hidden" src={assets.menu_icon} alt="" />
//           <div className={`${showMenu?'fixed w-full':'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all `}>
//             <div className="flex items-center justify-between px-5 py-6">
//               <div className="font-bold text-3xl text-blue-700">GoodLife</div>
//               <img className="w-7" onClick={()=>setShowMenu(false)} src={assets.cross_icon} alt="" />
//             </div>
//             <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
//               <NavLink  onClick={()=>setShowMenu(false)} to='/'><p className={'px-4 py-2 rounded inline-block'}>Home</p></NavLink>
//               <NavLink  onClick={()=>setShowMenu(false)} to='/doctors'><p className={'px-4 py-2 rounded inline-block'}>ALL DOCTORS</p></NavLink>
//               <NavLink  onClick={()=>setShowMenu(false)} to='/about'><p className={'px-4 py-2 rounded inline-block'}>ABOUT</p></NavLink>
//               <NavLink  onClick={()=>setShowMenu(false)} to='/contact'><p className={'px-4 py-2 rounded inline-block'}>CONTACT</p></NavLink>
//             </ul>
//           </div>
//         </div>
//       </ul>
//       </div>

//     </div>
//   );
// };

// export default Navbar;


import React, { useContext, useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { assets } from "../assets/assets_frontend/assets";
import { AppContext } from "../context/AppContext";

/* ---------- FUZZY SEARCH (SAME AS BEFORE) ---------- */
const normalize = (text = "") =>
  text.toLowerCase().replace(/[^a-z]/g, "");

const isFuzzyMatch = (source, query) => {
  source = normalize(source);
  query = normalize(query);
  if (!query) return true;
  if (source.includes(query)) return true;

  let j = 0;
  for (let i = 0; i < source.length && j < query.length; i++) {
    if (source[i] === query[j]) j++;
  }
  return j >= query.length - 1;
};

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken, doctors } = useContext(AppContext);

  const [showMenu, setShowMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");

  const searchRef = useRef(null);

  /* ---- CLOSE SEARCH (DESKTOP + MOBILE) ---- */
  useEffect(() => {
    const close = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearch(false);
      }
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("touchstart", close);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("touchstart", close);
    };
  }, []);

  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
    setShowProfileMenu(false);
  };

  const filteredDoctors = doctors.filter(
    (d) => isFuzzyMatch(d.name, query) || isFuzzyMatch(d.speciality, query)
  );

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white text-sm">
      <div className="mx-7 sm:mx-[10%] py-4 border-b border-b-gray-300">
        <ul className="flex items-center justify-between font-medium">

          {/* LOGO */}
          <div
            onClick={() => navigate("/")}
            className="font-bold text-3xl text-blue-700 cursor-pointer"
          >
            Good<span className="text-green-500">Life</span>
          </div>

          {/* DESKTOP NAV WITH BLUE UNDERLINE */}
          <div className="hidden md:flex items-center gap-5">
            {[
              { path: "/", label: "HOME" },
              { path: "/doctors", label: "ALL DOCTORS" },
              { path: "/about", label: "ABOUT" },
              { path: "/contact", label: "CONTACT" },
            ].map((item) => (
              <NavLink key={item.path} to={item.path} className="relative">
                {({ isActive }) => (
                  <>
                    <li>{item.label}</li>
                    {isActive && (
                      <hr className="border-none outline-none h-0.5 bg-blue-500 w-3/5 m-auto" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* RIGHT SECTION */}
          <div className="flex items-center gap-3 relative">

            {/* SEARCH ICON */}
            <IoIosSearch
              className="text-2xl cursor-pointer mr-3"
              onClick={() => setShowSearch((p) => !p)}
            />

            {/* SEARCH BOX */}
            {showSearch && (
              <div
                ref={searchRef}
                className="absolute right-0 top-10 w-72 bg-white border rounded shadow-lg p-3 z-50"
              >
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search doctor or speciality"
                  className="w-full border px-3 py-2 rounded outline-none"
                />

                <div className="max-h-60 overflow-y-auto mt-2">
                  {filteredDoctors.length ? (
                    filteredDoctors.map((doc) => (
                      <div
                        key={doc._id}
                        onClick={() => {
                          navigate(`/appoinment/${doc._id}`);
                          setShowSearch(false);
                          setQuery("");
                        }}
                        className="p-2 hover:bg-gray-100 cursor-pointer rounded"
                      >
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-xs text-gray-500">
                          {doc.speciality}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-500 text-sm py-2">
                      No result found
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* PROFILE (ORIGINAL CSS RESTORED) */}
            {token ? (
              <>
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => setShowProfileMenu((p) => !p)}
                >
                  <img className="w-8 rounded-full" src={assets.profile_pic} />
                  <img className="w-2.5" src={assets.dropdown_icon} />
                </div>

                {showProfileMenu && (
                  <div className="absolute right-6 md:right-20 lg:right-38 top-14 z-20 min-w-48 bg-stone-100 rounded flex flex-col gap-2 p-4 text-base text-gray-600">
                    <p
                      onClick={() => {
                        navigate("/my-profile");
                        setShowProfileMenu(false);
                      }}
                      className="hover:text-black cursor-pointer"
                    >
                      My Profile
                    </p>
                    <p
                      onClick={() => {
                        navigate("/my-appointments");
                        setShowProfileMenu(false);
                      }}
                      className="hover:text-black cursor-pointer"
                    >
                      My Appointments
                    </p>
                    <p
                      onClick={logout}
                      className="hover:text-black cursor-pointer"
                    >
                      Logout
                    </p>
                  </div>
                )}
              </>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="bg-blue-600 text-white px-8 py-3 rounded-full font-light"
              >
                Create account
              </button>
            )}

            {/* MOBILE 3-DOT / MENU (RESTORED) */}
            <img
              onClick={() => setShowMenu(true)}
              className="w-6 md:hidden"
              src={assets.menu_icon}
              alt=""
            />
          </div>
        </ul>
      </div>

      {/* MOBILE MENU (ORIGINAL BLUE PADDED SECTION) */}
      <div
        className={`${
          showMenu ? "fixed w-full" : "h-0 w-0"
        } md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}
      >
        <div className="flex items-center justify-between px-5 py-6">
          <div className="font-bold text-3xl text-blue-700">GoodLife</div>
          <img
            className="w-7"
            onClick={() => setShowMenu(false)}
            src={assets.cross_icon}
          />
        </div>

        <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
          <NavLink onClick={() => setShowMenu(false)} to="/">
            <p className="px-4 py-2 rounded inline-block">HOME</p>
          </NavLink>
          <NavLink onClick={() => setShowMenu(false)} to="/doctors">
            <p className="px-4 py-2 rounded inline-block">ALL DOCTORS</p>
          </NavLink>
          <NavLink onClick={() => setShowMenu(false)} to="/about">
            <p className="px-4 py-2 rounded inline-block">ABOUT</p>
          </NavLink>
          <NavLink onClick={() => setShowMenu(false)} to="/contact">
            <p className="px-4 py-2 rounded inline-block">CONTACT</p>
          </NavLink>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;




