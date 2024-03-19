import { useRef, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";

import axios from "../api/axios";
const LOGIN_URL = "doctor/auth";

const Login = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [select, setSelect] = useState("doctor");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${select}/auth`,
        JSON.stringify({ user, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response));
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ user, pwd, roles, accessToken });
      setUser("");
      setPwd("");
      navigate(select === "doctor" ? "/doctor" : "/patient", { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }

    

  };

  function handleChange(event) {
    setSelect(event.target.value);
  }

  return (
    // <section>
    //     <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
    //     <h1>Sign In</h1>
    //     <form onSubmit={handleSubmit}>
    //         <label htmlFor="username">Username:</label>
    //         <input
    //             type="text"
    //             id="username"
    //             ref={userRef}
    //             autoComplete="off"
    //             onChange={(e) => setUser(e.target.value)}
    //             value={user}
    //             required
    //         />
    //         <label htmlFor='user'></label>
    //         <select id='user' name='user' value={select} onChange={handleChange}>
    //             <option value="doctor">Doctor</option>
    //             <option value="patient">Patient</option>
    //         </select>
    //         <label htmlFor="password">Password:</label>
    //         <input
    //             type="password"
    //             id="password"
    //             onChange={(e) => setPwd(e.target.value)}
    //             value={pwd}
    //             required
    //         />
    //         <button>Sign In</button>
    //     </form>
    //     <p>
    //         Need an Account?<br />
    //         <span className="line">
    //             <Link to="/register">Sign Up</Link>
    //         </span>
    //     </p>
    // </section>

    <section className="p-4 max-w-md mx-auto">
      <p
        ref={errRef}
        className={`${
          errMsg ? "bg-red-500 text-white p-2 rounded mb-2" : "offscreen"
        }`}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1 className="text-2xl font-bold mb-4 text-center">Sign In</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="username" className="block text-sm font-medium">
            Username:
          </label>
          <input
            type="text"
            id="username"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required
            className="w-full border rounded-md p-2"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="user" className="block text-sm font-medium">
            User Type:
          </label>
          <select
            id="user"
            name="user"
            value={select}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          >
            <option value="doctor">Doctor</option>
            <option value="patient">Patient</option>
          </select>
        </div>
        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium">
            Password:
          </label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
            className="w-full border rounded-md p-2"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Sign In
        </button>
      </form>
      <p className="mt-4 text-center">
        Need an Account?{" "}
        <span className="line">
          <Link to="/register" className="text-blue-500">
            Sign Up
          </Link>
        </span>
      </p>
    </section>
  );
};

export default Login;
