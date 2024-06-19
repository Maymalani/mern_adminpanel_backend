import React, { useState } from 'react'
import { useAuth } from '../auth/Store';
import { Modal } from 'react-bootstrap';
import MultiStep from 'react-multistep';

const Login = () => {

  const inputObj = {
    email: "",
    password: ""
  };

  const [inputData, setinputData] = useState(inputObj);
  const [inputError, setInputError] = useState('');
  const [show, setShow] = useState(false);
  const { storeTokenInLs, api } = useAuth();
  const [email, setEmail] = useState("");
  const [emailInputError, setEmailInputError] = useState("");
  const [emailDisabled, setEmailDisabled] = useState(false);
  const [otpDisabled, setOtpDisabled] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [password, setPassword] = useState("");
  const [updatePswEmail, setUpdatePswEmail] = useState("");
  const [otpSuccessText, setOtpSuccessText] = useState("");
  const [otpVerifyText,setOtpVerifyText] = useState("");

  const StepOne = () => {
    return (
      <div>
        <div className="form-group my-3">
          <label htmlFor="email" className='mb-2'>Email</label>
          <input type="text" className="form-control" disabled={emailDisabled} name='email' id="email" required autoFocus value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <span className='mb-3 text-red-500' style={{ display: emailInputError.length > 0 ? "block" : "none" }}>{emailInputError}</span>
        <div className="flex justify-center mb-3">
          <button className={`px-3 py-2 rounded-md text-white bg-purple-500 w-6`} disabled={emailDisabled} onClick={handleSendOTP}>Send OTP</button>
        </div>
        <span className='text-green-500'>{otpSuccessText}</span>
      </div>
    )
  }

  const StepTwo = () => {
    return (
      <div>
        <div className="form-group my-3">
          <label htmlFor="otp" className='mb-2'>Enter OTP Here</label>
          <input type="text" className="form-control" name='otp' id="otp" disabled={otpDisabled} required autoFocus value={otp} onChange={(e) => setOtp(e.target.value)} />
        </div>
        <span className='mb-3 text-red-500' style={{ display: otpError.length > 0 ? "block" : "none" }}>{otpError}</span>
        <div className="flex justify-center mb-3">
          <button className={`px-3 py-2 rounded-md text-white bg-purple-500 w-6`} disabled={otpDisabled} onClick={verifyOTP}>Verify OTP</button>
        </div>
        <span className='text-green-500'>{otpVerifyText}</span>
      </div>
    )
  }

  const StepThree = () => {
    return (
      <div>
        <div className="form-group my-3">
          <label htmlFor="password" className='mb-2'>Password</label>
          <input type="text" className="form-control" name='password' id="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <span className='my-3 text-red-500' style={{ display: passwordError.length > 0 ? "block" : "none" }}>{passwordError}</span>
        <div className="flex justify-center mb-3">
          <button className={`px-3 py-2 rounded-md text-white bg-purple-500 w-6`} onClick={changePassword}>Change Password</button>
        </div>
      </div>
    )
  }

  const inputHandle = (e) => {
    // const { name, value } = e.target;
    setinputData({
      ...inputData, [e.target.name]: e.target.value
    });
  };

  const steps = [
    { title: 'Enter Email', component: <StepOne /> },
    { title: 'Verify OTP', component: <StepTwo /> },
    { title: 'Set Password', component: <StepThree /> }
  ]

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${api}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(inputData)
      });

      const data = await response.json();

      if (response.ok) {
        storeTokenInLs(data.token)
        setinputData(inputObj);
      } else {
        setInputError(data.extraDetails ? data.extraDetails : data.message)
      }
    } catch (error) {
      console.log("LOgin Error " + error);
    }
  }

  const handleSendOTP = async () => {
    try {
      const response = await fetch(`${api}/sendOTP/${email}`, {
        method: "GET"
      });

      var data = await response.json();

      if (response.ok) {
        setEmailDisabled(true);
        setOtpSuccessText("OTP Sent Successfully ! Please Click On Verify OTP In Top To Verify OTP");
      } else {
        setEmailInputError(data.extraDetails ? data.extraDetails : data.message)
      }
    } catch (error) {
      console.log("Error In Send OTP : ", error);
    }
  }

  const verifyOTP = async () => {
    try {
      const response = await fetch(`${api}/verifyOTP/${otp}`, {
        method: "GET"
      });

      var data = await response.json();
      if (response.ok) {
        setOtpDisabled(true);
        setOtpVerifyText("OTP Verified Successfully ! Please Click On Set password In Top To Change Password")
        setUpdatePswEmail(email);
      } else {
        setOtpError(data.extraDetails ? data.extraDetails : data.message)
      }
    } catch (error) {
      console.log("Error Verifing OTP");
    }
  }

  const changePassword = async () => {
    try {
      if (password !== "") {
        if (updatePswEmail) {
          const response = await fetch(`${api}/updatePassword/${updatePswEmail}/${password}`, {
            method: "POST"
          });
          console.log(response);
          if (response.ok) {
            alert("password Changed Successfully");
            setShow(false)
          }
        } else {
          alert("Please Enter Valid OTP")
        }
      } else {
        setPasswordError("Password Can't be empty");
      }
    } catch (error) {
      console.log("Error from changing password");
    }
  }

  return (
    <>
      <section className='h-screen w-screen grid place-items-center'>
        <form className="flex flex-col col-10 col-sm-8 col-md-6 col-lg-4 px-3 sm:px-5 mx-auto shadow-lg lg:px-10 rounded-2xl" onSubmit={handleSubmit}>
          <h1 className='text-center text-2xl font-bold text-purple-500 py-3'>Login</h1>
          <label htmlFor='email'>Email</label>
          <input
            className="border-[1px] p-2 rounded-md border-gray-300 outline-none mb-3"
            type="email"
            id='email'
            name='email'
            required
            value={inputData.email}
            onChange={inputHandle}
          />
          <label htmlFor='password'>Password</label>
          <input
            className='border-[1px] p-2 rounded-md border-gray-300 outline-none mb-3'
            type="password"
            id='password'
            name='password'
            value={inputData.password}
            onChange={inputHandle}
          />
          <span className='mb-3 text-red-500' style={{ display: inputError.length > 0 ? "block" : "none" }}>{inputError}</span>
          <p className="text-blue-500 text-xs text-right mb-3 cursor-pointer" onClick={() => setShow(true)}>Forgot Password ?</p>
          <input type="submit" value="Login Now" className="mx-auto w-1/2 mb-3 bg-purple-500 text-white rounded-md py-2 " />
        </form>
      </section>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Forgot Password ?</Modal.Title>
        </Modal.Header>
        <Modal.Body className="flex justify-center">
          <MultiStep showNavigation={false} activeStep={0} steps={steps} className="mx-auto w-full"></MultiStep>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Login
