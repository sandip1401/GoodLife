import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();
const AppContextProvider = (props) => {
  const currencySymbol = "₹";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [doctors, setDoctors] = useState([]);
  const [user, setUser] = useState(null);

  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : false
  );
  const [appointments, setAppointments] = useState([]);

  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/list");
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(error.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/user/my-appointments`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.success) {
        setAppointments(data.appointments);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch appointments");
    }
  };


   const getUserProfile = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/user/my-profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );


      if (data.success) {
        setUser(data.user);
      }

    } catch (error) {
      console.log(error);
      toast.error("Failed to load profile");
    }
  };

  useEffect(() => {
     if (token) {
        getUserProfile();
     }
  }, [token]);

 useEffect(() => {
  getDoctorsData();
}, []);


  const value = {
    doctors,
    appointments,
    currencySymbol,
    getDoctorsData,
    token,
    setToken,
    backendUrl,
    getUserAppointments,
    getUserProfile,
    user,
    setUser
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
