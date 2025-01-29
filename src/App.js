import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS
import { FaExchangeAlt, FaCopy, FaLightbulb, FaQuestionCircle, FaGithub, FaSpinner } from "react-icons/fa"; // Icons

function App() {
  const [input, setInput] = useState(""); // For main converter input
  const [output, setOutput] = useState(""); // For main converter output
  const [conversionType, setConversionType] = useState("binaryToDecimal"); // Conversion type
  const [history, setHistory] = useState([]); // Conversion history
  const [darkMode, setDarkMode] = useState(false); // Dark mode toggle
  const [quizMode, setQuizMode] = useState(false); // Quiz mode toggle
  const [quizQuestion, setQuizQuestion] = useState(""); // Quiz question
  const [quizAnswer, setQuizAnswer] = useState(""); // Quiz answer
  const [quizFeedback, setQuizFeedback] = useState(""); // Quiz feedback
  const [quizInput, setQuizInput] = useState(""); // Separate input for quiz mode
  const [isLoading, setIsLoading] = useState(false); // Loading state for quiz mode
  const [isSiteLoading, setIsSiteLoading] = useState(true); // Loading state for the entire site

  // Simulate site loading
  useEffect(() => {
    setTimeout(() => {
      setIsSiteLoading(false); // Stop loading after 2 seconds
    }, 2000);
  }, []);

  // Real-time conversion for main converter
  useEffect(() => {
    if (input === "") {
      setOutput("");
      return;
    }

    if (conversionType === "binaryToDecimal") {
      if (/^[01]+$/.test(input)) {
        setOutput(parseInt(input, 2).toString(10));
      } else {
        setOutput("Invalid binary input! Only 0s and 1s are allowed.");
      }
    } else if (conversionType === "decimalToBinary") {
      if (/^\d+$/.test(input)) {
        setOutput(Number(input).toString(2));
      } else {
        setOutput("Invalid decimal input! Only numbers are allowed.");
      }
    } else if (conversionType === "binaryToHexadecimal") {
      if (/^[01]+$/.test(input)) {
        setOutput(parseInt(input, 2).toString(16).toUpperCase());
      } else {
        setOutput("Invalid binary input! Only 0s and 1s are allowed.");
      }
    } else if (conversionType === "hexadecimalToBinary") {
      if (/^[0-9A-Fa-f]+$/.test(input)) {
        setOutput(parseInt(input, 16).toString(2));
      } else {
        setOutput("Invalid hexadecimal input! Only 0-9 and A-F are allowed.");
      }
    }
  }, [input, conversionType]);

  // Add conversion to history
  useEffect(() => {
    if (output && !output.includes("Invalid")) {
      setHistory((prevHistory) => [
        { input, output, conversionType },
        ...prevHistory.slice(0, 4), // Keep only the last 5 conversions
      ]);
    }
  }, [output]);

  // Copy to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    alert("Copied to clipboard!");
  };

  // Reset converter
  const resetConverter = () => {
    setInput("");
    setOutput("");
  };

  // Clear history
  const clearHistory = () => {
    setHistory([]);
  };

  // Generate quiz question
  const generateQuizQuestion = () => {
    setIsLoading(true);
    setTimeout(() => {
      const types = ["binaryToDecimal", "decimalToBinary", "binaryToHexadecimal", "hexadecimalToBinary"];
      const randomType = types[Math.floor(Math.random() * types.length)];

      let question, answer;
      if (randomType === "binaryToDecimal") {
        question = Math.floor(Math.random() * 100).toString(2);
        answer = parseInt(question, 2).toString(10);
      } else if (randomType === "decimalToBinary") {
        question = Math.floor(Math.random() * 100).toString(10);
        answer = Number(question).toString(2);
      } else if (randomType === "binaryToHexadecimal") {
        question = Math.floor(Math.random() * 100).toString(2);
        answer = parseInt(question, 2).toString(16).toUpperCase();
      } else if (randomType === "hexadecimalToBinary") {
        question = Math.floor(Math.random() * 100).toString(16).toUpperCase();
        answer = parseInt(question, 16).toString(2);
      }

      setQuizQuestion(`${question} (${randomType.replace(/([A-Z])/g, " $1").trim()})`);
      setQuizAnswer(answer);
      setQuizFeedback("");
      setQuizMode(true);
      setQuizInput("");
      setIsLoading(false);
    }, 1000); // Simulate a 1-second delay
  };

  // Check quiz answer
  const checkQuizAnswer = () => {
    if (quizInput === quizAnswer) {
      setQuizFeedback("Correct! 🎉");
    } else {
      setQuizFeedback(`Incorrect. The correct answer is ${quizAnswer}.`);
    }
  };

  // Loading animation for the site
  if (isSiteLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center min-vh-100"
        style={{
          background: "linear-gradient(135deg, #2d3436, #000000)",
          color: "#fff",
        }}
      >
        <div className="text-center">
          <h1>
            <FaSpinner className="spinner" size={40} />
          </h1>
          <h2>Loading Converter...</h2>
          <p style={{ color: "#6c5ce7" }}>101010... Binary Fun!</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={darkMode ? "bg-dark text-light min-vh-100 p-3" : "bg-light text-dark min-vh-100 p-3"}
      style={{
        background: darkMode
          ? "linear-gradient(135deg, #2d3436, #000000)"
          : "linear-gradient(135deg, #dfe6e9, #ffffff)",
      }}
    >
      <div className="container text-center">
        {/* Header */}
        <h1 className="heading mb-4" style={{ color: darkMode ? "#6c5ce7" : "#0984e3" }}>
          <FaExchangeAlt /> Numerical Systems Converter
        </h1>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="btn mb-4"
          style={{
            backgroundColor: darkMode ? "#6c5ce7" : "#0984e3",
            color: "#fff",
            border: "none",
          }}
        >
          {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </button>

        {/* Conversion Type Selector */}
        <select
          className="form-select mb-3"
          value={conversionType}
          onChange={(e) => setConversionType(e.target.value)}
          style={{
            backgroundColor: darkMode ? "#2d3436" : "#dfe6e9",
            color: darkMode ? "#fff" : "#000",
          }}
        >
          <option value="binaryToDecimal">Binary to Decimal</option>
          <option value="decimalToBinary">Decimal to Binary</option>
          <option value="binaryToHexadecimal">Binary to Hexadecimal</option>
          <option value="hexadecimalToBinary">Hexadecimal to Binary</option>
        </select>

        {/* Input Field for Main Converter */}
        <input
          type="text"
          placeholder={
            conversionType === "binaryToDecimal" || conversionType === "binaryToHexadecimal"
              ? "Enter a binary number"
              : conversionType === "decimalToBinary"
              ? "Enter a decimal number"
              : "Enter a hexadecimal number"
          }
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="form-control mb-3"
          style={{
            width: "300px",
            margin: "0 auto",
            backgroundColor: darkMode ? "#2d3436" : "#dfe6e9",
            color: darkMode ? "#fff" : "#000",
          }}
        />

        {/* Output Field for Main Converter */}
        {output && (
          <div className="result mb-4" style={{ color: darkMode ? "#00b894" : "#d63031", fontSize: "24px" }}>
            <strong>Result:</strong> {output}
            <button
              onClick={copyToClipboard}
              className="btn ms-2"
              style={{
                backgroundColor: darkMode ? "#6c5ce7" : "#0984e3",
                color: "#fff",
                border: "none",
              }}
            >
              <FaCopy /> Copy
            </button>
            <button
              onClick={resetConverter}
              className="btn ms-2"
              style={{
                backgroundColor: darkMode ? "#e84393" : "#e17055",
                color: "#fff",
                border: "none",
              }}
            >
              Reset
            </button>
          </div>
        )}

        {/* Quiz Mode */}
        <div className="mt-4">
          <button
            onClick={generateQuizQuestion}
            className="btn mb-3"
            style={{
              backgroundColor: darkMode ? "#e84393" : "#e17055",
              color: "#fff",
              border: "none",
            }}
          >
            <FaQuestionCircle /> Start Quiz Mode
          </button>
          {quizMode && (
            <div>
              {isLoading ? (
                <FaSpinner className="spinner" size={24} />
              ) : (
                <>
                  <p>
                    <strong>Quiz Question:</strong> Convert {quizQuestion}
                  </p>
                  <input
                    type="text"
                    placeholder="Your answer"
                    value={quizInput}
                    onChange={(e) => setQuizInput(e.target.value)}
                    className="form-control mb-3"
                    style={{
                      width: "300px",
                      margin: "0 auto",
                      backgroundColor: darkMode ? "#2d3436" : "#dfe6e9",
                      color: darkMode ? "#fff" : "#000",
                    }}
                  />
                  <button
                    onClick={checkQuizAnswer}
                    className="btn"
                    style={{
                      backgroundColor: darkMode ? "#00b894" : "#00cec9",
                      color: "#fff",
                      border: "none",
                    }}
                  >
                    Check Answer
                  </button>
                  {quizFeedback && <p className="mt-3">{quizFeedback}</p>}
                </>
              )}
            </div>
          )}
        </div>

        {/* History */}
        <div className="mt-4">
          <h3>Conversion History</h3>
          <button
            onClick={clearHistory}
            className="btn mb-3"
            style={{
              backgroundColor: darkMode ? "#e84393" : "#e17055",
              color: "#fff",
              border: "none",
            }}
          >
            Clear History
          </button>
          <ul className="list-unstyled">
            {history.map((item, index) => (
              <li key={index} className="mb-2">
                <span style={{ color: darkMode ? "#6c5ce7" : "#0984e3" }}>
                  {item.input} ({item.conversionType}) → {item.output}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Fun Fact Section */}
        <div className="mt-4">
          <h3 style={{ color: darkMode ? "#fdcb6e" : "#e17055" }}>
            <FaLightbulb /> Did You Know?
          </h3>
          <p>
            Binary is a base-2 numerical system used by computers to represent data. It only uses two digits: 0 and 1.
          </p>
        </div>

        {/* Footer */}
        <footer className="mt-1 p-1 text-center" style={{ backgroundColor: darkMode ? "#2d3436" : "#dfe6e9" }}>
          <p style={{ color: darkMode ? "#fff" : "#000" }}>Made with ☕ by Naveed</p>
        </footer>
      </div>
    </div>
  );
}

export default App;