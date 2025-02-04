import React from 'react';
import { useTestMode } from '../Contexts/TestModeContext';
import { useWordCount } from '../Contexts/WordCountContext';

const UpperMenu = ({ CountDown }) => {
  const { setTestTime } = useTestMode(); // Correct destructuring
  const {setWordCount} =useWordCount();
  const updateTime = (e) => {
    setTestTime(Number(e.target.id));
  };
  const updateWord=(e)=>{
    setWordCount(Number(e.target.id))
  }

  return (
    <div className="upper-menu">
      <div className="Counter">{CountDown}</div>
      <div className="modes">
        <div className="time-mode" id={15} onClick={updateTime}>
          15s
        </div>
        <div className="time-mode" id={30} onClick={updateTime}>
          30s
        </div>
        <div className="time-mode" id={60} onClick={updateTime}>
          60s
        </div>
      </div>
    </div>
  );
};

export default UpperMenu;
