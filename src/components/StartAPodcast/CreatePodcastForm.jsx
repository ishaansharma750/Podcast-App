import React, { useState } from "react";
import Input from "../common/input/input";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Button from "../common/button/Button";
import { toast } from "react-toastify";
import FileInput from "../common/fileInput/FileInput";
import { auth, db, storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";

const CreatePodcastForm = () => {
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [displayImage, setDisplayImage] = useState("");
  let [bannerImage, setBannerImage] = useState("");

  let [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (title && description && displayImage && bannerImage) {
      setLoading(true);
      try {
        const bannerImageRef = ref(
          storage,
          `podcast/${auth.currentUser.uid}/${Date.now()}`
        );
        await uploadBytes(bannerImageRef, bannerImage);

        const bannerImageUrl = await getDownloadURL(bannerImageRef);
        // console.log("your image ", podcstData);

        const displayImageRef = ref(
          storage,
          `podcast/${auth.currentUser.uid}/${Date.now()}`
        );
        await uploadBytes(displayImageRef, displayImage);

        const displayImageUrl = await getDownloadURL(displayImageRef);

        const podcstData = {
          title,
          description,
          bannerImage: bannerImageUrl,
          displayImage: displayImageUrl,
          createdBy: auth.currentUser.uid,
        };
        const docRef = await addDoc(collection(db, "podcasts"), podcstData);

        setTitle("");
        setDescription("");
        setBannerImage(null);
        setDisplayImage(null);
        setLoading(false);
        toast.success("Podcast Succesfully Created");
      } catch (error) {
        setLoading(false);
        toast.error(error.message);
      }
    } else {
      toast.error("Please Enter All Values");
      setLoading(false);
    }
  };

  const bannerImageHnadle = (file) => {
    setBannerImage(file);
  };
  const displayImageHnadle = (file) => {
    setDisplayImage(file);
  };

  return (
    <>
      <Input
        state={title}
        setState={setTitle}
        placeholder={"Title "}
        type={"text"}
        required={true}
      />
      <Input
        state={description}
        setState={setDescription}
        placeholder={"Description"}
        type={"email"}
        required={true}
      />
      <FileInput
        accept={"image/*"}
        id={"banner-image-input"}
        fileHandle={bannerImageHnadle}
        text={"Banner Image Upload"}
      />
      <FileInput
        accept={"image/*"}
        id={"display-image-input"}
        fileHandle={displayImageHnadle}
        text={"Display Image Upload"}
      />
      <Button
        text={loading ? "Loading..." : "Create Podcast"}
        disabled={loading}
        onClick={handleSubmit}
      />
    </>
  );
};

export default CreatePodcastForm;
