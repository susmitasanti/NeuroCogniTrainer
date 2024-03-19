import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from '../api/axios';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register';

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();
    const navigate = useNavigate()


    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const url = 'http://localhost:3001/doctor/register'
            const response = await axios.post(url,
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            // TODO: remove console.logs before deployment
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response))
            setSuccess(true);
            //clear state and controlled inputs
            setUser('');
            setPwd('');
            setMatchPwd('');
            navigate('/login')

        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }

    return (
        // <>
        //     {success ? (
        //         <section>
        //             <h1>Success!</h1>
        //             <p>
        //                 <a href="#">Sign In</a>
        //             </p>
        //         </section>
        //     ) : (
        //         <section>
        //             <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        //             <h1>Register</h1>
        //             <form onSubmit={handleSubmit}>
        //                 <label htmlFor="username">
        //                     Username:
        //                     <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
        //                     <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />
        //                 </label>
        //                 <input
        //                     type="text"
        //                     id="username"
        //                     ref={userRef}
        //                     autoComplete="off"
        //                     onChange={(e) => setUser(e.target.value)}
        //                     value={user}
        //                     required
        //                     aria-invalid={validName ? "false" : "true"}
        //                     aria-describedby="uidnote"
        //                     onFocus={() => setUserFocus(true)}
        //                     onBlur={() => setUserFocus(false)}
        //                 />
        //                 <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
        //                     <FontAwesomeIcon icon={faInfoCircle} />
        //                     4 to 24 characters.<br />
        //                     Must begin with a letter.<br />
        //                     Letters, numbers, underscores, hyphens allowed.
        //                 </p>


        //                 <label htmlFor="password">
        //                     Password:
        //                     <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
        //                     <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
        //                 </label>
        //                 <input
        //                     type="password"
        //                     id="password"
        //                     onChange={(e) => setPwd(e.target.value)}
        //                     value={pwd}
        //                     required
        //                     aria-invalid={validPwd ? "false" : "true"}
        //                     aria-describedby="pwdnote"
        //                     onFocus={() => setPwdFocus(true)}
        //                     onBlur={() => setPwdFocus(false)}
        //                 />
        //                 <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
        //                     <FontAwesomeIcon icon={faInfoCircle} />
        //                     8 to 24 characters.<br />
        //                     Must include uppercase and lowercase letters, a number and a special character.<br />
        //                     Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
        //                 </p>


        //                 <label htmlFor="confirm_pwd">
        //                     Confirm Password:
        //                     <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
        //                     <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
        //                 </label>
        //                 <input
        //                     type="password"
        //                     id="confirm_pwd"
        //                     onChange={(e) => setMatchPwd(e.target.value)}
        //                     value={matchPwd}
        //                     required
        //                     aria-invalid={validMatch ? "false" : "true"}
        //                     aria-describedby="confirmnote"
        //                     onFocus={() => setMatchFocus(true)}
        //                     onBlur={() => setMatchFocus(false)}
        //                 />
        //                 <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
        //                     <FontAwesomeIcon icon={faInfoCircle} />
        //                     Must match the first password input field.
        //                 </p>

        //                 <button disabled={!validName || !validPwd || !validMatch ? true : false}>Sign Up</button>
        //             </form>
        //             <p>
        //                 Already registered?<br />
        //                 <span className="line">
        //                     <Link to="/">Sign In</Link>
        //                 </span>
        //             </p>
        //         </section>
        //     )}
        // </>
        <>
  {success ? (
    <section className="text-center">
      <h1 className="text-2xl font-bold text-green-600">Success!</h1>
      <p>
        <a href="#" className="text-blue-500 hover:underline">Sign In</a>
      </p>
    </section>
  ) : (
    <section className="p-4 max-w-md mx-auto">
      <p ref={errRef} className={`text-red-500 ${errMsg ? '' : 'hidden'}`} aria-live="assertive">{errMsg}</p>
      <h1 className="text-2xl font-bold text-center">Register</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username" className="block mt-4">
          Username:
          <FontAwesomeIcon icon={faCheck} className={`ml-2 text-green-500 ${validName ? '' : 'hidden'}`} />
          <FontAwesomeIcon icon={faTimes} className={`ml-2 text-red-500 ${validName || !user ? 'hidden' : ''}`} />
        </label>
        <input
          type="text"
          id="username"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setUser(e.target.value)}
          value={user}
          required
          aria-invalid={validName ? "false" : "true"}
          aria-describedby="uidnote"
          onFocus={() => setUserFocus(true)}
          onBlur={() => setUserFocus(false)}
          className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-400 focus:border-blue-400"
        />
        <p id="uidnote" className={`mt-1 text-sm text-gray-600 ${userFocus && user && !validName ? '' : 'hidden'}`}>
          <FontAwesomeIcon icon={faInfoCircle} className="text-blue-400 mr-1" />
          4 to 24 characters.<br />
          Must begin with a letter.<br />
          Letters, numbers, underscores, hyphens allowed.
        </p>

        <label htmlFor="password" className="block mt-4">
          Password:
          <FontAwesomeIcon icon={faCheck} className={`ml-2 text-green-500 ${validPwd ? '' : 'hidden'}`} />
          <FontAwesomeIcon icon={faTimes} className={`ml-2 text-red-500 ${validPwd || !pwd ? 'hidden' : ''}`} />
        </label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          required
          aria-invalid={validPwd ? "false" : "true"}
          aria-describedby="pwdnote"
          onFocus={() => setPwdFocus(true)}
          onBlur={() => setPwdFocus(false)}
          className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-400 focus:border-blue-400"
        />
        <p id="pwdnote" className={`mt-1 text-sm text-gray-600 ${pwdFocus && !validPwd ? '' : 'hidden'}`}>
          <FontAwesomeIcon icon={faInfoCircle} className="text-blue-400 mr-1" />
          8 to 24 characters.<br />
          Must include uppercase and lowercase letters, a number and a special character.<br />
          Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
        </p>

        <label htmlFor="confirm_pwd" className="block mt-4">
          Confirm Password:
          <FontAwesomeIcon icon={faCheck} className={`ml-2 text-green-500 ${validMatch && matchPwd ? '' : 'hidden'}`} />
          <FontAwesomeIcon icon={faTimes} className={`ml-2 text-red-500 ${validMatch || !matchPwd ? 'hidden' : ''}`} />
        </label>
        <input
          type="password"
          id="confirm_pwd"
          onChange={(e) => setMatchPwd(e.target.value)}
          value={matchPwd}
          required
          aria-invalid={validMatch ? "false" : "true"}
          aria-describedby="confirmnote"
          onFocus={() => setMatchFocus(true)}
          onBlur={() => setMatchFocus(false)}
          className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-400 focus:border-blue-400"
        />
        <p id="confirmnote" className={`mt-1 text-sm text-gray-600 ${matchFocus && !validMatch ? '' : 'hidden'}`}>
          <FontAwesomeIcon icon={faInfoCircle} className="text-blue-400 mr-1" />
          Must match the first password input field.
        </p>

        <button
          disabled={!validName || !validPwd || !validMatch}
          className="w-full mt-6 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400"
        >
          Sign Up
        </button>
      </form>
      <p className="mt-4 text-center">
        Already registered?<br />
        <span className="line">
          <Link to="/" className="text-blue-500 hover:underline">Sign In</Link>
        </span>
      </p>
    </section>
  )}
</>

    )
}

export default Register
