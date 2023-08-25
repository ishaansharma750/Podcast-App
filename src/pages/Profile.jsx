import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAuth, signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import Header from "../components/common/header/Header";
import Button from "../components/common/button/Button";
import { toast } from "react-toastify";
import Loader from "../components/common/loader/Loader";
import { collection, onSnapshot, query } from "firebase/firestore";
import { setPodcasts } from "../slices/PodcastSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const podcasts = useSelector((state) => state.podcasts.podcasts);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const unSubscribe = onSnapshot(
      query(collection(db, "podcasts")),
      (querySnapshot) => {
        const podcastsData = [];
        querySnapshot.forEach((doc) => {
          podcastsData.push({ id: doc.id, ...doc.data() });
        });
        dispatch(setPodcasts(podcastsData));
      },
      (error) => {
        console.log("Error Fetching Podcasts :", error);
      }
    );

    return () => {
      unSubscribe();
    };
  }, [dispatch]);

  const user = useSelector((state) => state.user.user);
  console.log("my user", user);
  if (!user) {
    return <Loader />;
  }

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        toast.success("User Logged Out");
      })
      .catch((error) => {
        toast.error("error.message");
      });
  };
  console.log(podcasts);
  return (
    <div>
      <Header />
      <div className="info-bar">
        <div className="info-text">
          <h1 style={{ margin: "1rem 1.2rem", width: "100%" }}>
            Welcome - {user.name}
          </h1>
        </div>
        <Button text={"Logout"} onClick={handleLogout} />
      </div>
      <div className="input-wrapper" style={{ margin: "1rem", width: "auto" }}>
        <h1> Podcasts</h1>
      </div>

      <div className="card-container">
        {podcasts.length > 0 ? (
          <>
            {podcasts.map((item) => (
              <div key={item.id} className="card">
                <img
                  className="display-image"
                  src={item.displayImage}
                  alt="displayImage"
                />
              </div>
            ))}
          </>
        ) : (
          <p>
            {search ? "Podcasts Not Found" : "No Podcasts On the Platform"}{" "}
          </p>
        )}
      </div>
    </div>
  );
};

export default Profile;
