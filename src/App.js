import React from 'react';
import { GlobalStyles } from './Styles/global';
import TypingBox from './Components/TypingBox';
import Footer from './Components/Footer';
import { ThemeProvider } from 'styled-components';
import { useTheme } from './Contexts/ThemeContext';
import Header from './Components/Header';
import { toast, ToastContainer } from 'react-toastify';
import Home from './Pages/Home';
import { Route, Routes } from 'react-router-dom';
import UserPage from './Pages/UserPage';
import LeaderPage from './Pages/LeaderPage';
import { TestModeContextProvider } from './Contexts/TestModeContext';
import { WordCountContextProvider } from './Contexts/WordCountContext';  // Import WordCount context

const App = () => {
  document.title = "Pro-To-Type";
  const { theme } = useTheme();
  return (
    <ThemeProvider theme={theme}>
      <TestModeContextProvider>  {/* Wrap with TestModeContextProvider */}
        <WordCountContextProvider>  {/* Wrap with WordCountContextProvider */}
          <ToastContainer />
          <GlobalStyles />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user" element={<UserPage />} />
            <Route path="/leaderboard" element={<LeaderPage />} />
          </Routes>
        </WordCountContextProvider>
      </TestModeContextProvider>
    </ThemeProvider>
  );
};

export default App;
