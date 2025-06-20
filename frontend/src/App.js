
// import React, { useState } from "react";
// import Questions from "./Questions";

// function App() {
//   const [question, setQuestion] = useState("");
//   const [response, setResponse] = useState("");
//   const [refreshCount, setRefreshCount] = useState(0); // <--- added

//   const handleSend = async () => {
//     const res = await fetch("http://localhost:8000/ask", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ question }),
//     });
//     const data = await res.json();
//     setResponse(data.response);
//     setQuestion(""); // optional: clear input
//     setRefreshCount((prev) => prev + 1); // trigger refresh of Questions
//   };

//   return (
//     <div style={{ display: "flex", padding: "2rem" }}>
//       <div style={{ width: "30%" }}>
//         <h1>Tally Assistant – Demo</h1>

//         <div style={{ display: "flex", marginBottom: "1rem" }}>
//           <input
//             value={question}
//             onChange={(e) => setQuestion(e.target.value)}
//             placeholder="Ask something..."
//             style={{
//               flex: 1,
//               padding: "0.5rem",
//               fontSize: "16px",
//               border: "1px solid #ccc",
//               borderTopLeftRadius: "4px",
//               borderBottomLeftRadius: "4px",
//               borderRight: "none",
//             }}
//           />
//           <button
//             onClick={handleSend}
//             style={{
//               padding: "0.5rem 1rem",
//               fontSize: "16px",
//               backgroundColor: "#00ff1a",
//               color: "white",
//               border: "1px solid #00ff1a",
//               borderTopRightRadius: "4px",
//               borderBottomRightRadius: "4px",
//               cursor: "pointer",
//             }}
//           >
//             Send
//           </button>
//         </div>

        
//         {response && (
//           <p>
//             <strong>Response:</strong> {response}
//           </p>
//         )}
//       </div>

//       <div style={{ width: "70%" }}>
//         <Questions refreshTrigger={refreshCount} />
//       </div>
//     </div>
//   );
// }

// export default App;


import React, { useState } from "react";
import Questions from "./Questions";

function App() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [refreshCount, setRefreshCount] = useState(0);
  const [loading, setLoading] = useState(false); // <-- loading state
  const [error, setError] = useState("");        // <-- error state

  const handleSend = async () => {
    // Reset previous states
    setResponse("");
    setError("");

    // Check if input is empty
    if (question.trim() === "") {
      setError("Please enter a question before sending.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      const data = await res.json();
      setResponse(data.response);
      setRefreshCount((prev) => prev + 1);
      setQuestion(""); // clear input
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div style={{ display: "flex", padding: "2rem" }}>
      <div style={{ width: "30%" }}>
        <h1>Tally Assistant – Demo</h1>

        <div style={{ display: "flex", marginBottom: "1rem" }}>
          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask something..."
            style={{
              flex: 1,
              padding: "0.5rem",
              fontSize: "16px",
              border: "1px solid #ccc",
              borderTopLeftRadius: "4px",
              borderBottomLeftRadius: "4px",
              borderRight: "none",
            }}
          />
          <button
            onClick={handleSend}
            style={{
              padding: "0.5rem 1rem",
              fontSize: "16px",
              backgroundColor: "#00ff1a",
              color: "white",
              border: "1px solid #00ff1a",
              borderTopRightRadius: "4px",
              borderBottomRightRadius: "4px",
              cursor: "pointer",
            }}
          >
            Send
          </button>
        </div>

        {/* Error message */}
        {error && (
          <p style={{ color: "red", marginBottom: "0.5rem" }}>{error}</p>
        )}

        {/* Loading text */}
        {loading && (
          <p style={{ color: "#888" }}>
            <strong>Thinking...</strong>
          </p>
        )}

        {/* Response message */}
        {!loading && response && (
          <p>
            <strong>Response:</strong> {response}
          </p>
        )}
      </div>

      <div style={{ width: "70%" }}>
        <Questions refreshTrigger={refreshCount} />
      </div>
    </div>
  );
}

export default App;
