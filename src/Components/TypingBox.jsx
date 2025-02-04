import React, { createRef, useEffect, useMemo, useRef, useState } from "react";
import { generate } from "random-words";
import UpperMenu from "./UpperMenu";
import { useTestMode } from "../Contexts/TestModeContext";
import Stats from "./Stats";
import { useWordCount } from "../Contexts/WordCountContext";

const TypingBox = () => {
  const inputRef = useRef(null);
  const { testTime } = useTestMode();
  const { wordCount } = useWordCount();
  const [CountDown, setCountDown] = useState(testTime);
  const [wordsArray, setwordsArray] = useState(() => generate(wordCount));
  const [intervalId, setIntervalId] = useState(null);
  const [currWordIndex, setcurrWordIndex] = useState(0);
  const [currCharIndex, setcurrCharIndex] = useState(0);
  const [testStart, setTestStart] = useState(false);
  const [testEnd, setTestEnd] = useState(false);
  const [correctChars, setcorrectChars] = useState(0);
  const [incorrectChars, setincorrectChars] = useState(0);
  const [missedChars, setmissedChars] = useState(0);
  const [extraChars, setextraChars] = useState(0);
  const [correctWords, setCorrectWords] = useState(0);
  const [graphData, setGraphData] = useState([]);
  const [lastTabPress, setLastTabPress] = useState(0);

  const wordsSpanRef = useMemo(() => {
    return Array(wordsArray.length)
      .fill(0)
      .map((i) => createRef(null));
  }, [wordsArray]);

  const startTimer = () => {
    const intervalId = setInterval(timer, 1000);
    setIntervalId(intervalId);
    function timer() {
      setCountDown((latestCountDown) => {
        setcorrectChars((correctChars) => {
          setGraphData((graphData) => [
            ...graphData,
            [
              testTime - latestCountDown + 1,
              correctChars / 5 / ((testTime - latestCountDown + 1) / 60),
            ],
          ]);
          return correctChars;
        });
        if (latestCountDown === 1) {
          setTestEnd(true);
          clearInterval(intervalId);
          return 0;
        }
        return latestCountDown - 1;
      });
    }
  };

  const resetTest = () => {
    clearInterval(intervalId);
    setCountDown(testTime);
    setcurrCharIndex(0);
    setcurrWordIndex(0);
    setTestEnd(false);
    setTestStart(false);
    setcorrectChars(0);
    setincorrectChars(0);
    setmissedChars(0);
    setextraChars(0);
    setCorrectWords(0);
    setGraphData([]);
    setwordsArray(generate(wordCount));
    resetWordSpanRefClassname();
    focusInput();
  };

  const resetWordSpanRefClassname = () => {
    wordsSpanRef.forEach((ref) => {
      if (ref.current) {
        // Add null check here
        const childNodes = Array.from(ref.current.childNodes);
        childNodes.forEach((span) => {
          if (span.className.includes("extra")) {
            span.remove();
          }
          if (span.className) {
            span.className = "char";
          }
        });
      }
    });
  };

  const handleUserInput = (e) => {
    if (testEnd) {
      e.preventDefault();
      return;
    }

    const key = e.key;

    // Tab+Enter reset handler
    if (key === "Tab") {
      setLastTabPress(Date.now());
      e.preventDefault();
      return;
    }

    if (key === "Enter" && Date.now() - lastTabPress < 500) {
      resetTest();
      e.preventDefault();
      return;
    }

    if (!(/^[a-zA-Z]$/.test(key) || key === " " || key === "Backspace")) return;

    if (!testStart) {
      startTimer();
      setTestStart(true);
    }

    const allCurrChars = wordsSpanRef[currWordIndex].current.childNodes;
    if (e.key === " ") {
      let correctCharsInWord =
        wordsSpanRef[currCharIndex].current.querySelectorAll(".correct");
      if (correctCharsInWord.length === allCurrChars.length) {
        setCorrectWords(correctWords + 1);
      }
      if (allCurrChars.length <= currCharIndex) {
        allCurrChars[currCharIndex - 1].classList.remove("current-r");
      } else {
        setmissedChars(missedChars + (allCurrChars.length - currCharIndex));
        allCurrChars[currCharIndex].classList.remove("current");
      }
      wordsSpanRef[currWordIndex + 1].current.childNodes[0].className +=
        "current";
      setcurrWordIndex(currWordIndex + 1);
      setcurrCharIndex(0);
      return;
    }

    if (e.key === "Backspace") {
      if (currCharIndex !== 0) {
        if (allCurrChars.length === currCharIndex) {
          if (allCurrChars[currCharIndex - 1].className.includes("extra")) {
            allCurrChars[currCharIndex - 1].remove();
            allCurrChars[currCharIndex - 2].className += " current-r";
          } else {
            allCurrChars[currCharIndex - 1].className = "current";
          }
          setcurrCharIndex(currCharIndex - 1);
          return;
        }
        allCurrChars[currCharIndex].className = " extra";
        allCurrChars[currCharIndex - 1].className = "current";
        setcurrCharIndex(currCharIndex - 1);
      }
      return;
    }

    // Handle regular character input
    if (currCharIndex >= allCurrChars.length) {
      let newSpan = document.createElement("span");
      newSpan.innerText = e.key;
      newSpan.className = "incorrect extra current-r";
      allCurrChars[currCharIndex - 1].classList.remove("current-r");
      wordsSpanRef[currWordIndex].current.append(newSpan);
      setcurrCharIndex(currCharIndex + 1);
      setextraChars(extraChars + 1);
      return;
    }
    if (e.key === allCurrChars[currCharIndex].innerText) {
      allCurrChars[currCharIndex].className = "correct";
      setcorrectChars(correctChars + 1);
    } else {
      allCurrChars[currCharIndex].className = "incorrect";
      setincorrectChars(incorrectChars + 1);
    }
    if (currCharIndex + 1 === allCurrChars.length) {
      allCurrChars[currCharIndex].className += " current-r";
    } else {
      allCurrChars[currCharIndex + 1].className += " current";
    }
    setcurrCharIndex(currCharIndex + 1);
  };

  const calWPM = () =>
    Math.round(correctChars / 5 / ((testTime - CountDown) / 60)) || 0;
  const calAccuracy = () =>
    Math.round(
      (correctChars / (correctChars + incorrectChars + extraChars)) * 100
    ) || 0;

  const focusInput = () => inputRef.current.focus();

  useEffect(() => {
    if (testEnd) inputRef.current.blur();
  }, [testEnd]);

  useEffect(() => {
    resetTest();
  }, [testTime,wordCount]);

  useEffect(() => {
    wordsSpanRef[0].current.childNodes[0].className = " current";
    focusInput();
  }, []); // Add wordsArray as dependenc

  return (
    <div>
      <UpperMenu CountDown={CountDown} />
      {testEnd ? (
        <div>
          <Stats
            wpm={calWPM()}
            accuracy={calAccuracy()}
            correctChars={correctChars}
            incorrectChars={incorrectChars}
            missedChars={missedChars}
            extraChars={extraChars}
            graphData={graphData}
          />
          <button onClick={resetTest} className="reset-button">
            Reset Test
          </button>
        </div>
      ) : (
        <div className="type-box" onClick={focusInput}>
          <div
            className="words"
            style={{ overflowY: "auto", maxHeight: "60vh" }}
          >
            {wordsArray.map((word, index) => (
              <span className="word" key={index} ref={wordsSpanRef[index]}>
                {word.split("").map((char, charIndex) => (
                  <span key={charIndex}>{char}</span>
                ))}
              </span>
            ))}
          </div>
        </div>
      )}
      <input
        type="text"
        className="hidden-input"
        ref={inputRef}
        onKeyDown={handleUserInput}
      />
    </div>
  );
};

export default TypingBox;
