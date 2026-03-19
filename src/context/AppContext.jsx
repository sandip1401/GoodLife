import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

export const AppContext = createContext();
const AppContextProvider = (props) => {
  const currencySymbol = "₹";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [doctors, setDoctors] = useState([]);
  const [user, setUser] = useState(null);
  const [donors, setDonors] = useState([]);

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


  const updateAvailability = async (donorId, available) => {

  try {

    const { data } = await axios.put(
      backendUrl + "/api/user/update-availability",
      {
        donorId,
        available
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (data.success) {
      toast.success(data.message);

      // refresh donor list
      getDonors();

    } else {
      toast.error(data.message);
    }

  } catch (error) {

    console.log(error);
    toast.error("Failed to update availability");

  }

};

  const addDonor = async (donorData) => {

  try {

    const { data } = await axios.post(
      backendUrl + "/api/user/add-donor",
      donorData,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    if (data.success) {
      toast.success(data.message)
      return true
    } else {
      toast.error(data.message)
      return false
    }

  } catch (error) {
    console.log(error)
    toast.error("Failed to add donor")
    return false
  }

}


  const reportDonor = async (donorId, message) => {
  try {

    const { data } = await axios.post(
      backendUrl + "/api/user/report",
      {
        donorId,
        message
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (data.success) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }

  } catch (error) {
    console.log(error);
    toast.error("Report failed");
  }
};


const getDonors = async () => {

  try {

    const { data } = await axios.get(
      backendUrl + "/api/user/donor-list",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );


    if (data.success) {
      setDonors(data.donors);
    } else {
      toast.error(data.message);
    }

  } catch (error) {
    console.log(error);
    toast.error("Failed to load donors");
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

  const logoutUser = () => {
  localStorage.removeItem("token");
  setToken(false);
  setUser(null);
  setAppointments([]);
  toast.info("Session expired. Please login again.");
};

  useEffect(() => {
     if (token) {
        getUserProfile();
     }
  }, [token]);

 useEffect(() => {
  getDoctorsData();
}, []);

useEffect(() => {
  if(token){
    getDonors();
  }
}, [token]);

useEffect(() => {
  if (!token) return;

  try {
    const decoded = jwtDecode(token);

    const expiryTime = decoded.exp * 1000; // convert to ms
    const currentTime = Date.now();

    const timeout = expiryTime - currentTime;

    if (timeout <= 0) {
      logoutUser();
    } else {
      const timer = setTimeout(() => {
        logoutUser();
      }, timeout);

      return () => clearTimeout(timer);
    }
  } catch (error) {
    logoutUser();
  }
}, [token]);




  const value = {
    doctors,
    appointments,
    currencySymbol,
    getDoctorsData,
    token,
    donors,
    setToken,
    backendUrl,
    getUserAppointments,
    getUserProfile,
    user,
    setUser,
    reportDonor,
    addDonor,
    getDonors,
    updateAvailability
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
