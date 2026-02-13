import React, { useContext, useState } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const { backendUrl, token, setToken } = useContext(AppContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState(""); // ✅ added
  const [state, setState] = useState("Sign Up");
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (state === "Sign Up") {
        const { data } = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
          phone,
          address,
          gender,
          age, // ✅ added
        });

        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          navigate("/");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          navigate("/");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border border-zinc-200 rounded-xl text-zinc-600 text-sm shadow-xl">
        <p className="text-2xl font-semibold">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </p>

        <p>
          Please {state === "Sign Up" ? "Create Account" : "Login"} to book
          appointment
        </p>

        {/* ===== SIGN UP ONLY ===== */}
        {state === "Sign Up" && (
          <>
            <div className="w-full">
              <p>Full Name</p>
              <input
                type="text"
                className="border border-zinc-300 rounded w-full p-2 mt-1"
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
                required
              />
            </div>

            <div className="w-full">
              <p>Age</p>
              <input
                type="number"
                className="border border-zinc-300 rounded w-full p-2 mt-1"
                onChange={(e) => setAge(e.target.value)}
                disabled={loading}
                required // ✅ added
              />
            </div>

            <div className="w-full">
              <p>Phone</p>
              <input
                type="text"
                value={phone}
                className="border border-zinc-300 rounded w-full p-2 mt-1"
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "").slice(0, 10);
                  if (value.length <= 10) {
                    setPhone(value);
                  }
                }}
                disabled={loading}
                required
              />
            </div>

            <div className="w-full">
              <p>Address</p>
              <input
                type="text"
                className="border border-zinc-300 rounded w-full p-2 mt-1"
                onChange={(e) => setAddress(e.target.value)}
                disabled={loading}
                required
              />
            </div>

            <div className="w-full">
              <p>Gender</p>
              <select
                className="border border-zinc-300 rounded w-full p-2 mt-1"
                onChange={(e) => setGender(e.target.value)}
                disabled={loading}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </>
        )}

        {/* ===== COMMON ===== */}
        <div className="w-full">
          <p>Email</p>
          <input
            type="email"
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required
          />
        </div>

        <div className="w-full">
          <p>Password</p>
          <input
            type="password"
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            required
          />
        </div>

        <button
          type="submit"
          className={`py-3 w-full cursor-pointer text-white rounded mt-2 transition-all
          ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 active:scale-95"}`}
        >
          {loading
            ? state === "Sign Up"
              ? "Creating Account..."
              : "Login..."
            : state}
        </button>

        {state === "Sign Up" ? (
          <p>
            Already have an account?{" "}
            <span
              onClick={() => !loading && setState("Login")}
              className="text-blue-700 underline cursor-pointer"
            >
              Login here
            </span>
          </p>
        ) : (
          <p>
            Create a new account?{" "}
            <span
              onClick={() => !loading && setState("Sign Up")}
              className="text-blue-700 underline cursor-pointer"
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
}
