import React, { useState } from "react";
import Header from "../components/common/header/Header";
import SignUpForm from "../components/signUp/signUpForm/SignUpForm.jsx";
import LoginForm from "../components/signUp/loginForm/LoginForm";


const SignUpPage = () => {
  let [flag, setFlag] = useState(false);

  return (
    <div>
      <Header />
      <div className="input-wrapper">
        {!flag ? <h1>SignUp</h1> : <h1>Login</h1>}
        {!flag ? <SignUpForm /> : <LoginForm/>}
        {!flag ? (
          <p onClick={() => setFlag(!flag)}>Already have an Account? Login </p>
        ) : (
          <p onClick={() => setFlag(!flag)}>
            Don't have an Account? Click here to Signup
          </p>
        )}
      </div>
    </div>
  );
};

export default SignUpPage;
