import React, { useEffect, useState } from "react";
import Header from "../components/common/header/Header";
import { auth, db } from "../firebase";
import { collection, onSnapshot, query } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { setPodcasts } from "../slices/PodcastSlice";
import { Link } from "react-router-dom";
import Input from "../components/common/input/input";

const Podcasts = () => {
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
  // console.log(podcasts);
  let filterPodcasts = podcasts.filter((item) =>item.title.trim().toLowerCase().includes(search.trim().toLowerCase()));

  return (
    <div>
      <Header />
      <div className="input-wrapper" style={{ margin: "3rem", width: "auto" }}>
        <h1>Discover Podcasts</h1>
        <Input
          state={search}
          setState={setSearch}
          placeholder="Search..."
          type="text"
        />
      </div>

      <div className="card-container">
        {filterPodcasts.length > 0 ? (
          <>
            {filterPodcasts.map((item) => (
              <Link key={item.id} to={`/podcast/${item.id}`}>
                <div className="card">
                  <img
                    className="display-image"
                    src={item.displayImage}
                    alt="displayImage"
                  />
                  <p className="title-card">{item.title}</p>
                  <p className="description-card">{item.description}</p>
                </div>
              </Link>
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

export default Podcasts;
