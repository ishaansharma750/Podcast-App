import React, { useEffect, useState } from "react";
import Header from "../components/common/header/Header";
import { useNavigate, useParams } from "react-router-dom";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { toast } from "react-toastify";
import Button from "../components/common/button/Button";
import EpisodeDetails from "../components/common/Podcsats/episodeDetail/EpisodeDetails";
import AudioPlayer from "../components/common/Podcsats/AudioPlayer/AudioPlayer";

const PodcastDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [podcast, setPodcast] = useState({});
  const [episodes, setEpisodes] = useState([]);
  const [playingFile,setPlayingFile] = useState("")
    // console.log(id);
  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id]);

  const getData = async () => {
    try {
      const docRef = doc(db, "podcasts", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setPodcast({ id: id, ...docSnap.data() });
      } else {
        // docSnap.data() will be undefined in this case

        console.log("No such document!");
        toast.error("No such document!");
        navigate("/podcast");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const unSubscribe = onSnapshot(
      query(collection(db, "podcasts", id, "episodes")),
      (querySnapshot) => {
        const episodesData = [];
        querySnapshot.forEach((doc) => {
          episodesData.push({ id: doc.id, ...doc.data() });
        });
        setEpisodes(episodesData);
      },
      (error) => {
        console.log("Error fetching Episodes", error);
      }
    );
    return () => {
      unSubscribe();
    };
  }, [id]);



 console.log("audio-image ", podcast.displayImage);
  return (
    <div>
      <Header />
      <div className="input-wrapper" style={{}}>
        {podcast.id && (
          <>
            <div
              style={{
                display: "flex",
                fiex_direction: "column",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}>
              <h1 className="podcast-title">{podcast.title}</h1>
              {podcast.createdBy == auth.currentUser.uid && (
                <Button
                  style={{
                    width: "200px !important",
                    margin: "0px",
                  }}
                  text={"Create Episode"}
                  onClick={() => navigate(`/podcast/${id}/create-episodes`)}
                />
              )}
            </div>
            <div className="banner-wrapper">
              <img src={podcast.bannerImage} />
            </div>
            <p className="podcast-description">{podcast.description}</p>

            {/* // Episodes list  */}
            <h1 className="podcast-title">Episodes</h1>
            {episodes.length > 0 ? (
              <ol style={{ width: "100%" }}>
                {episodes.map((item, index) => {
                  const playAudio = (file) => {
                    console.log("Playing audio: " + file);
                    // Implement audio playback logic here
                  };

                  return (
                    <EpisodeDetails
                      key={index}
                      index={index + 1}
                      title={item.title}
                      description={item.description}
                      audioFile={item.audioFile}
                      onClick={(file) => setPlayingFile(file)} // Modify this line
                    />
                  );
                })}
              </ol>
            ) : (
              <p> No Episodes</p>
            )}
          </>
        )}
      </div>
      {playingFile && (
        <AudioPlayer audioSrc={playingFile} image={podcast.displayImage} />
      )}
    </div>
  );
};

export default PodcastDetailPage;
