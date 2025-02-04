import React, { useEffect } from "react";
import Graph from "./Graph";
import { auth, db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const Stats = ({
  wpm,
  accuracy,
  correctChars,
  incorrectChars,
  missedChars,
  extraChars,
  graphData,
}) => {
  let timeSet = new Set();

  const newGraph = graphData.filter((i) => {
    if (!timeSet.has(i[0])) {
      timeSet.add(i[0]);
      return i;
    }
  });

  const pushDataToDb = async () => {
    if (!auth.currentUser) {
      alert("Please login to save data");
      return;
    }
    try {
      const resultRef = collection(db, "Results");
      const { uid, email } = auth.currentUser; // Retrieve the email
      await addDoc(resultRef, {
        wpm: wpm,
        accuracy: accuracy,
        timestamp: new Date(),
        characters: `${correctChars}/${incorrectChars}/${extraChars}`,
        userId: uid,
        email: email, // Add the email to the Firestore document
      });
      toast.success("Data Stored", {
        theme: "dark",
      });
    } catch (err) {
      toast.warning("Log in to store the data", {
        theme: "dark",
      });
    }
  };
  

  useEffect(() => {
    pushDataToDb();
  }, [auth.currentUser]);

  return (
    <div className="stats-box">
      <div className="left-stats">
        <div className="stat-item">
          <div className="title">WPM</div>
          <div className="subtitle">{wpm}</div>
        </div>
        <div className="stat-item">
          <div className="title">Accuracy</div>
          <div className="subtitle">{accuracy}%</div>
        </div>
        <div className="stat-item">
          <div className="title">Characters</div>
          <div className="subtitle">
            {correctChars}/{incorrectChars}/{extraChars}
          </div>
        </div>
      </div>
      <div className="right-stats">
        <Graph graphData={newGraph} />
      </div>
    </div>
  );
};

export default Stats;
