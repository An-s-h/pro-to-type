import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebaseConfig';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { CircularProgress } from '@mui/material';
import TableUserData from '../Components/TableUserData';
import Graph from '../Components/Graph';
import CalendarActivity from '../Components/CalendarActivity';
import UserInfo from '../Components/UserInfo';
import { ArrowBack } from '@mui/icons-material';
import DailyLeaderboard from '../Components/DailyLeaderboard';

const UserPage = () => {
  const [data, setData] = useState([]);
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const [graphData, setGraphData] = useState([]);
  const [timestamps, setTimestamps] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  const fetchUserData = async () => {
    if (!user) return;

    try {
      const resultRef = collection(db, 'Results');
      const q = query(resultRef, where('userId', '==', user.uid), orderBy('timestamp', 'desc'));
      const querySnapshot = await getDocs(q);
      const userData = querySnapshot.docs.map((doc) => doc.data());

      const graphData = userData.map((i) => [
        i.timestamp.toDate().toLocaleString().split(',')[0],
        i.wpm,
      ]);

      setData(userData);
      setGraphData(graphData);
      setTimestamps(userData.map((i) => i.timestamp));
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    if (!loading) {
      if (user) {
        fetchUserData();
      } else {
        navigate('/');
      }
    }
  }, [loading]);

  if (loading || dataLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <CircularProgress size={80} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center p-6">
      {/* Header Section */}
      <div className="w-full max-w-4xl mb-8 flex items-center">
        <ArrowBack className="cursor-pointer text-3xl" onClick={() => navigate('/')} />
        <h1 className="text-3xl font-bold ml-4">Track Your Stats</h1>
      </div>

      {/* User Info and Calendar Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-4xl gap-8">
        <div className="flex justify-center items-center border border-black rounded-lg p-6 border-opacity-20">
          <UserInfo totalTestsTaken={data.length} />
        </div>
        <div className="flex justify-center items-center border border-black rounded-lg p-6 border-opacity-20">
          <CalendarActivity timestamps={timestamps} />
        </div>
      </div>
      {/* Graph Section */}
      <div className="mt-12 w-full max-w-4xl">
        <Graph graphData={graphData} type="data" />
      </div>

      {/* Table Section */}
      <div className="mt-12 w-full max-w-4xl flex justify-center">
        <TableUserData data={data} />
      </div>
    </div>
  );
};

export default UserPage;
