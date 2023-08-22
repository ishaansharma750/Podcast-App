import React, { useState } from "react";
import Input from "../../common/input/input";
import Button from "../../common/button/Button";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth, db, storage } from "../../../firebase";
import { setUser } from "../../../slices/userSlice";
import { toast } from "react-toastify";

const LoginForm = () => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    if(email && password){
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
  
        const user = userCredential.user;
  
        const userDoc = await getDoc(doc(db, "users", user.uid));
        const userData = userDoc.data();
        // console.log("data", userData);
  
        dispatch(
          setUser({
            name: userData.name,
            email: user.email,
            uid: user.uid,
          })
        );
        toast.success("Login Sucessfully");
        setLoading(false);
        navigate("/profile");
      } catch (error) {
        setLoading(false);
        console.log("error is this :", error);
        toast.error(error.message);
      }
    }
    else{
      toast.error("Make sure email and password are not empty")
      setLoading(false);
    }
  };

  return (
    <>
      <Input
        state={email}
        setState={setEmail}
        placeholder={"Email"}
        type={"email"}
        required={true}
      />
      <Input
        state={password}
        setState={setPassword}
        placeholder={"Password"}
        type={"password"}
        required={true}
      />
      <Button text={loading ? "Login..." : "Login"} disabled={loading} onClick={handleLogin} />
    </>
  );
};

export default LoginForm;
