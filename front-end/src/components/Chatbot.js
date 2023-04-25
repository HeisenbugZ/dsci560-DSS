import Chatbot from 'react-chatbot-kit'
import 'react-chatbot-kit/build/main.css'
import './ChatbotComp/chatbot.css'
import config from './ChatbotComp/config.js';
import MessageParser from './ChatbotComp/MessageParser.js';
import ActionProvider from './ChatbotComp/ActionProvider.js';

export default function Chatbott () {
  return (
    <div style={{width:'500px'}}>
      <Chatbot
        // style={{width:'500px'}}
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
      />
    </div>
  );
};

















// import ChatBot from 'react-simple-chatbot';
// import { ThemeProvider } from 'styled-components';

// const theme = {
//   background: '#f5f8fb',
//   fontFamily: 'Helvetica Neue',
//   headerBgColor: '#EF6C00',
//   headerFontColor: '#fff',
//   headerFontSize: '15px',
//   botBubbleColor: '#EF6C00',
//   botFontColor: '#fff',
//   userBubbleColor: '#fff',
//   userFontColor: '#4a4a4a',
// };


// export default function Chatbot () {
//   return (
//     <ThemeProvider theme={theme}>
//       <ChatBot
//         headerTitle="Speech Recognition"
//         recognitionEnable={true}
//         steps={[
//           {
//             id: '1',
//             message: 'What is your name?',
//             trigger: '2',
//           },
//           {
//             id: '2',
//             user: true,
//             trigger: '3',
//           },
//           {
//             id: '3',
//             message: 'Hi {previousValue}, nice to meet you!',
//             trigger: '2',
//           },
//         ]}
//       />
//     </ThemeProvider>
//   )
// }