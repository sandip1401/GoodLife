import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { CiLocationOn } from "react-icons/ci";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function MyAppoinment() {
  const { appointments, getUserAppointments,backendUrl,token } = useContext(AppContext);

  const navigate=useNavigate()
  const handleDoctorClick = (docId) => {
  const doctorId =
    typeof docId === "object" ? docId._id : docId;

  navigate(`/appoinment/${doctorId}`);
};


  const formatDateTime = (timestamp) => {
  const d = new Date(timestamp);

  const date = d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const time = d.toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return `${date} | ${time}`;
};


const formatSlotDate=(slotDate)=>{
  if(!slotDate){
    return "";
  }
  const [day,month,year]=slotDate.split("_");
  const date=new Date(year,month-1,day);

  return date.toLocaleDateString("en-IN",{
    day:"2-digit",
    month:"long",
    year:"numeric",
  })
}

  useEffect(() => {
    getUserAppointments();
  }, []);

  // ✅ Prevent crash while data is loading
  if (!appointments || appointments.length === 0) {
    return (
      <p className="mt-10 text-center text-zinc-500">No appointments found</p>
    );
  }

  const cancelAppointment=async(appointmentId)=>{
    try{
      const {data}=await axios.post(backendUrl+'/api/user/cancel-appointment',{appointmentId},{headers:{Authorization:`Bearer ${token}`}})
      if(data.success){
        toast.success(data.message);
        getUserAppointments();
      }
      else{
        toast.error(data.message)
      }
    }
    catch(error){
      toast.error(error.message)
    }
  }


  const payNow=async(appointmentId)=>{
    const res=await axios.post(backendUrl+'/api/user/payment/create-order',{ appointmentId },{
      headers: {
        Authorization: `Bearer ${token}` // ✅ IMPORTANT
      }
    })

    const {order,key}=res.data
    const options={
      key,
      amount:order.amount,
      currency:"INR",
      name:"Doctor Appointment",
      description:"Appointment Payment",
      order_id:order.id,

      handler: async function(res){
        console.log("RAZORPAY RESPONSE 👉", res);
        await axios.post(backendUrl+'/api/user/payment/create-order',{
          razorpay_order_id:res.razorpay_order_id,
          razorpay_payment_id:res.razorpay_payment_id,
          razorpay_signature:res.razorpay_signature,
          appointmentId:appointments._id
        },
        {headers: {
        Authorization: `Bearer ${token}` // ✅ IMPORTANT
      }},
      );

      toast.success("Payment Successful")
      getUserAppointments();
      }
      
    }
    const rzp=new window.Razorpay(options);
    rzp.open();
  }

  return (
    <div className="mt-10 sm:px-0">
      <div>
        <p className="text-zinc-600 border-b-2 border-zinc-300 py-2 text-base sm:text-lg">
          My Appoinments
        </p>
        <div className="">
          {appointments.map((item) => {
            return (
              <div
                key={item._id}
                className="mt-2 border-b border-zinc-300 py-2 flex flex-col items-center text-center md:text-left md:items-start md:flex-row gap-4"
              >
                <div className="flex justify-center w-full md:w-auto cursor-pointer">
                  <img onClick={() => handleDoctorClick(item.docId)}
                    className="w-32 bg-indigo-100"
                    src={item.docData?.image}
                    alt=""
                  />
                </div>
                <div className="text-zinc-600 text-[14px] sm:text-[15px]">
                  <p className="font-semibold text-zinc-900">
                    {item.docData.name}
                  </p>
                  <p className="text-[13px] sm:text-[14px]">{item.docData.speciality}</p>
                  <p className="text-[13px] mt-1 mb-">
                    <span className="font-semibold">Date & Time:</span>{" "}
                    {formatSlotDate(item.slotDate)} | {item.slotTime}
                  </p>
                  <p className="text-[13px] sm:text-[14px] mb-1">
                    <span className="font-semibold">Address:</span>{" "}
                    {item.docData.address1}
                  </p>
                  <a
                    href={item.docData?.address2}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 bg-blue-500 text-white px-5 py-1.5 rounded-full hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  >
                    Location <CiLocationOn />
                  </a>{" "}
                </div>
                <div className="flex flex-col gap-2 w-full items-center md:w-auto md:items-end md:ml-auto md:mt-auto ">
                  {!item.cancelled && <button onClick={()=>payNow(item._id)} className="min-w-[170px] border border-blue-500 bg-blue-500 text-white rounded px-10 cursor-pointer py-1 hover:scale-105 active:scale-95 transition-all">
                    Pay Online
                  </button>}
                  {!item.cancelled && <button onClick={()=>cancelAppointment(item._id)} className="min-w-[170px] border border-zinc-300 text-zinc-600 rounded px-3 cursor-pointer py-1 hover:scale-105 hover:bg-red-500 hover:text-white active:scale-100 transition-all">
                    Cancel appoinment
                  </button>}
                  {item.cancelled && <button className="sm:min-w-48 py-1 px-3 border border-red-500 rounded text-red-500">Appointment cancelled</button>}
                  <p className="text-[10px] text-right">{formatDateTime(item.date)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
