import React, { useState } from "react";
import Input from "../../common/input/input";
import Button from "../../common/button/Button";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db, storage } from "../../../firebase";
import { setDoc, doc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setUser } from "../../../slices/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FileInput from "../../common/fileInput/FileInput";

const SignUpForm = () => {
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [confirmPassword, setConfirmPassword] = useState("");
  let [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();


const displayImageHnadle = (file) => {
  setDisplayImage(file);
};

  const handleSignup = async () => {
    setLoading(true)
    if (password === confirmPassword && password.length >= 6) {
      try {
        console.log("hhhihi");
        // Creating user Account into Firebase
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        console.log(user);

        // Saving user in Firebase
        await setDoc(doc(db, "users", user.uid), {
          name: name,
          email: user.email,
          uid: user.uid,
        });
        // save the data in redux, call the redux action
        dispatch(
          setUser({
            name: name,
            email: user.email,
            uid: user.uid,
          })
        );
        setLoading(false)
        toast.success("User Have been Created");
        navigate("/profile");
      } catch (err) {
        setLoading(false);
        console.log(err);
        toast.error(err.message)
      }
    } else {
      if (password !== confirmPassword) {
        toast.error("Password is not Matching ");
        console.log("no");
      } else if (password.length < 6) {
        toast("Password Must be moe than 5 Character");
      }
      setLoading(false)
    }
  };

  return (
    <>
      <Input
        state={name}
        setState={setName}
        placeholder={"Full Name"}
        type={"text"}
        required={true}
      />
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
      <Input
        state={confirmPassword}
        setState={setConfirmPassword}
        placeholder={"Confirm Password"}
        type={"password"}
        required={true}
      />
      <FileInput
        accept={"image/*"}
        id={"display-image-input"}
        fileHandle={displayImageHnadle}
        text={"Profile Image"}
      />

      <Button
        text={loading ? "Loading..." : "Signup"}
        disabled={loading}
        onClick={handleSignup}
      />
    </>
  );
};

export default SignUpForm;
