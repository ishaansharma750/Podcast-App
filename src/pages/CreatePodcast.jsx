import React from "react";
import Header from "../components/common/header/Header";
import CreatePodcastForm from "../components/StartAPodcast/CreatePodcastForm";

const CreatePodcast = () => {
  return (
    <div>
      <Header />
      <div className="input-wrapper">
        <h1>Create A Podcast</h1>
        <CreatePodcastForm/>
      </div>
    </div>
  );
};

export default CreatePodcast;
