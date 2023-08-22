import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import CreatePodcast from "./pages/CreatePodcast";
import Profile from "./pages/Profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { setUser } from "./slices/userSlice";
import { useDispatch } from "react-redux";
import PrivateRoutes from "./components/common/PrivateRoutes";
import Podcasts from "./pages/Podcasts";
import PodcastDetailPage from "./pages/PodcastDetailPage";
import CreateEpisode from "./pages/CreateEpisode";



const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const authUnsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const unSubscribeSnaopshot = onSnapshot(
          doc(db, "users", user.uid),
          (userDoc) => {
            if (userDoc.exists()) {
              const userData = userDoc.data();
              dispatch(
                setUser({
                  name: userData.name,
                  email: userData.email,
                  uid: user.uid,
                })
              );
            }
          },
          (error) => {
            console.log("Error Fetching uer data :", error);
          }
        );
        return () => {
          unSubscribeSnaopshot();
        };
      }
    });
  }, []);

  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<SignUpPage />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-podcast" element={<CreatePodcast />} />
          <Route path="/podcast" element={<Podcasts />} />
          <Route path="/podcast/:id" element={<PodcastDetailPage />} />
          <Route path="/podcast/:id/create-episodes" element={<CreateEpisode />}
          />
        </Route>
      </Routes>
    </div>
  );
};

export default App;

{
  /* <Route element={<PrivateRoutes />}>
            <Route path="/podcasts" element={<Podcasts />} />
            <Route path="/podcast/podcastId" element={<PodcastDetails />} />
            <Route path="/podcast/poadcastId/create-episode" element={<CreateEpisode />}/>
          </Route> */
  // import { doc, getDoc, setDoc } from "firebase/firestore";
}
