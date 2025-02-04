import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, query, where, getDocs, Timestamp } from "firebase/firestore";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { useTheme } from "../Contexts/ThemeContext";

const DailyLeaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const { theme } = useTheme();

  const fetchLeaderboardData = async () => {
    const resultsRef = collection(db, "Results");
    const yesterday = Timestamp.fromDate(new Date(Date.now() - 24 * 60 * 60 * 1000)); // 24 hours ago

    try {
      const q = query(resultsRef, where("timestamp", ">", yesterday));
      const snapshot = await getDocs(q);

      let data = [];
      snapshot.forEach((doc) => {
        const { email, wpm, accuracy, characters, timestamp } = doc.data();

        // Ensure email is not blank
        if (email && email.trim() !== "") {
          data.push({ email, wpm, accuracy, characters, timestamp });
        }
      });

      // Group by email and select highest WPM for each user
      const groupedData = data.reduce((acc, entry) => {
        if (!acc[entry.email] || acc[entry.email].wpm < entry.wpm) {
          acc[entry.email] = entry;
        }
        return acc;
      }, {});

      // Convert grouped data into an array and sort by WPM
      const sortedData = Object.values(groupedData).sort((a, b) => b.wpm - a.wpm);

      setLeaderboardData(sortedData.slice(0, 10)); // Show top 10
    } catch (error) {
      console.error("Error fetching leaderboard data:", error);
    }
  };

  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  return (
    <div className="w-full flex justify-center p-4">
      <TableContainer component={Paper} style={{ backgroundColor: theme.typeBoxTest, borderRadius: "10px", padding: "1rem" }}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: theme.textColor, opacity: 0.9 }}>
              <TableCell style={{ color: theme.background, fontWeight: "bold", textAlign: "center", fontSize: "1rem" }}>Rank</TableCell>
              <TableCell style={{ color: theme.background, fontWeight: "bold", textAlign: "center", fontSize: "1rem" }}>Email</TableCell>
              <TableCell style={{ color: theme.background, fontWeight: "bold", textAlign: "center", fontSize: "1rem" }}>WPM</TableCell>
              <TableCell style={{ color: theme.background, fontWeight: "bold", textAlign: "center", fontSize: "1rem" }}>Accuracy</TableCell>
              <TableCell style={{ color: theme.background, fontWeight: "bold", textAlign: "center", fontSize: "1rem" }}>Characters</TableCell>
              <TableCell style={{ color: theme.background, fontWeight: "bold", textAlign: "center", fontSize: "1rem" }}>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaderboardData.length > 0 ? (
              leaderboardData.map((entry, index) => (
                <TableRow
                  key={index}
                  style={{
                    backgroundColor: index % 2 === 0 ? theme.background : theme.typeBoxTest,
                    transition: "all 0.3s ease-in-out",
                  }}
                  className="hover:bg-opacity-70"
                >
                  <TableCell style={{ color: theme.textColor, textAlign: "center" }}>{index + 1}</TableCell>
                  <TableCell style={{ color: theme.textColor, textAlign: "center" }}>{entry.email}</TableCell>
                  <TableCell style={{ color: theme.textColor, textAlign: "center" }}>{entry.wpm}</TableCell>
                  <TableCell style={{ color: theme.textColor, textAlign: "center" }}>{entry.accuracy || "--"}%</TableCell>
                  <TableCell style={{ color: theme.textColor, textAlign: "center" }}>{entry.characters || "--"}</TableCell>
                  <TableCell style={{ color: theme.textColor, textAlign: "center" }}>
                    {entry.timestamp?.toDate().toLocaleString() || "--"}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} style={{ textAlign: "center", color: theme.textColor, fontSize: "1rem" }}>
                  No leaderboard data available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DailyLeaderboard;
