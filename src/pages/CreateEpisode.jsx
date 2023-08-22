import React, { useState } from "react";
import Header from "../components/common/header/Header";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import Input from "../components/common/input/input";
import { toast } from "react-toastify";
import Button from "../components/common/button/Button";
import FileInput from "../components/common/fileInput/FileInput";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

const CreateEpisode = () => {
  const { id } = useParams();
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [audioFile, setAudioFile] = useState();

  let [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const audioFileHnadle = (file) => {
    setAudioFile(file);
  };

  const handleAudioSubmit = async () => {
    console.log("i")
    setLoading(true);
    if ((title, description, id, audioFile)) {
      try {
        const audioRef = ref(
          storage,
          `podcast-episodes/${auth.currentUser.uid}/${Date.now()}`
        );
        await uploadBytes(audioRef, audioFile);

        const audioUrl = await getDownloadURL(audioRef);

        const episodeData = {
          title,
          description,
          audioFile: audioUrl,
        };
        await addDoc(collection(db, "podcasts", id, "episodes"), episodeData);
        toast.success("Episode Created Sucussfully");
        setLoading(false);
        navigate(`/podcast/${id}`);
        setTitle("");
        setDescription("");
        setAudioFile(null);
      } catch (error) {
        setLoading(false);
        toast.error(error.message);
      }
    } else {
      toast.error("All Fields are Mandatory");
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="input-wrapper" style={{ margin: "3rem", width: "auto" }}>
        <h1>Create An Episode</h1>

        <Input
          state={title}
          setState={setTitle}
          placeholder={"Title"}
          type={"text"}
          required={true}
        />
        <Input
          state={description}
          setState={setDescription}
          placeholder={"Description"}
          type={"text"}
          required={true}
        />
        <FileInput
          accept={"audio/*"}
          id={"audio-file-input"}
          fileHandle={audioFileHnadle}
          text={"Upload audio"}
        />
        <Button
          text={loading ? "Loading..." : "Create Episode"}
          disabled={loading}
          onClick={handleAudioSubmit}
        />
      </div>
    </div>
  );
};

export default CreateEpisode;
