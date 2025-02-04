import { createContext, useContext, useState } from "react";

const WordCountContext = createContext();

export const WordCountContextProvider = ({ children }) => {
  const [wordCount, setWordCount] = useState(30); // Default is 10 words

  const values = {
    wordCount,
    setWordCount
  };

  return (
    <WordCountContext.Provider value={values}>
      {children}
    </WordCountContext.Provider>
  );
};

export const useWordCount = () => useContext(WordCountContext);
