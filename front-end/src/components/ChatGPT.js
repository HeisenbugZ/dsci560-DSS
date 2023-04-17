import React, { useState } from "react";
import axios from "axios";
import { OPENAI_API_KEY } from "../utils/APIs";

function ChatGPT() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('https://api.openai.com/v1/chat/completions', {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: question }],
        temperature: 0.7
      }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`
        }
      }).then(response => {
        console.log(response)
        setAnswer(response.data.choices[0].message.content);
        console.log(response.data)
      }).catch(error => {
        console.log(error.response.data)
      })
      setQuestion("");
      setError("");
      
    } catch (error) {
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div style={{ justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div>{answer}</div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
        />
        <button type="submit">Ask</button>
      </form>
      {error && <div>{error}</div>}
    </div>
  );
}

export default ChatGPT;
