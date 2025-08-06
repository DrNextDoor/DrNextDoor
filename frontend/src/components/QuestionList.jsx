import React, { useState, useEffect } from 'react';

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('https://dr-next-door.vercel.app/api/questions');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setQuestions(data);
        setLoading(false);
      } catch (e) {
        setError(e);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  if (loading) {
    return <div>Loading questions...</div>;
  }

  if (error) {
    return <div>Error loading questions: {error.message}</div>;
  }

  return (
    <div>
      <h2>Submitted Questions</h2>
      {questions.length === 0 ? (
        <p>No questions have been submitted yet.</p>
      ) : (
        <ul>
          {questions.map((question) => (
            <li key={question.id}>
              <strong>Question:</strong> {question.question}
              <br />
              <strong>Email:</strong> {question.email}
              <br />
              <small>Submitted at: {new Date(question.timestamp).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default QuestionList;