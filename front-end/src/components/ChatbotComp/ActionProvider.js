// in ActionProvider.jsx
import React from 'react';
import axios from 'axios';
import { OPENAI_API_KEY } from '../../utils/APIs';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const handleHello = () => {
    const botMessage = createChatBotMessage('Hello. Ndawawdaaf afwdakhgaf awf dawfauwfbafba ice to meet you.');
    

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const ChatGPT = async (question) => {
    let TempResponse = '';
    console.log(question)
    const {data} = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: question }],
      temperature: 0.7
    }, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`
      }
    })
    // console.log(data)
    TempResponse = data.choices[0].message.content

    const botResponse = createChatBotMessage(TempResponse);
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botResponse],
    }));

  }

  // Put the handleHello function in the actions object to pass to the MessageParser
  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleHello,
            ChatGPT,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;