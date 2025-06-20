// import React, { useEffect, useState } from 'react';
// import './Questions.css';

// function Questions() {
//   const [answers, setAnswers] = useState([]);

//   useEffect(() => {
//     async function fetchAnswers() {
//       try {
//         const res = await fetch('http://localhost:8000/answers');
//         const data = await res.json();
//         const sorted = data.sort(
//           (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
//         );
//         setAnswers(sorted);
//       } catch (error) {
//         console.error('Error fetching answers:', error);
//       }
//     }

//     fetchAnswers();
//   }, []);

//   const handleDelete = async (_id) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this entry?");
//     if (!confirmDelete) return;

//     try {
//       const res = await fetch(`http://localhost:8000/delete/${_id}`, {
//         method: 'DELETE',
//       });

//       if (res.ok) {
//         // Remove item from local state
//         setAnswers((prev) => prev.filter((item) => item._id !== _id));
//       } else {
//         console.error('Failed to delete item');
//       }
//     } catch (error) {
//       console.error('Error deleting item:', error);
//     }
//   };

//   return (
//     <div className="questions-container">
//       <h2 className="questions-heading">Recent Questions</h2>
//       {answers.length === 0 ? (
//         <p className="loading-text">Loading or no questions available...</p>
//       ) : (
//         answers.map((item) => (
//           <div key={item._id} className="question-card">
//             <h3 className="question-title">{item.question}</h3>
//             <p className="question-answer">{item.answer}</p>
//             <div className="question-footer">
//               <span className="question-time">
//                 {new Date(item.timestamp).toLocaleString()}
//               </span>

//               <button
//   className="delete-button"
//   onClick={() => handleDelete(item._id)}
//   title="Delete"
// >
//   <i className="fas fa-trash-alt"></i>
// </button>
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

// export default Questions;

import React, { useEffect, useState } from "react";
import "./Questions.css";

function Questions({ refreshTrigger }) {
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    async function fetchAnswers() {
      try {
        const res = await fetch("http://localhost:8000/answers");
        const data = await res.json();
        const sorted = data.sort(
          (a, b) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
        setAnswers(sorted);
      } catch (error) {
        console.error("Error fetching answers:", error);
      }
    }

    fetchAnswers();
  }, [refreshTrigger]); // <--- this will re-fetch when trigger changes

  const handleDelete = async (_id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this entry?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:8000/delete/${_id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setAnswers((prev) => prev.filter((item) => item._id !== _id));
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div className="questions-container">
      <h2 className="questions-heading">Recent Questions</h2>
      {answers.length === 0 ? (
        <p className="loading-text">Loading or no questions available...</p>
      ) : (
        answers.map((item) => (
          <div key={item._id} className="question-card">
            <h3 className="question-title">{item.question}</h3>
            <p className="question-answer">{item.answer}</p>
            {/* <div className="question-time">{new Date(item.timestamp).toLocaleString()}</div> */}
            <div className="question-time">
              {new Date(item.timestamp).toLocaleString("en-KE", {
                timeZone: "Africa/Nairobi",
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true, // optional: use 12hr format with AM/PM
              })}
            </div>

            <button
              className="delete-button"
              onClick={() => handleDelete(item._id)}
            >
              <i className="fas fa-trash-alt"></i>
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Questions;
