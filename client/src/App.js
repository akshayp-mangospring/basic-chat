import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import cryptoRandomString from 'crypto-random-string';

const socket = io.connect('http://localhost:4000');
const randStr = () => cryptoRandomString({ length: 10, type: 'base64' });

function App() {
  const [input, setInput] = useState('');
  const [chatMsgs, setChatMsgs] = useState([]);

  useEffect(() => {
    socket.on('publish_message', ({ msg }) => {
      setChatMsgs([...chatMsgs, msg]);
    });
  });

  const sendMessage = () => {
    if (input === '') return;
    socket.emit('message', {
      message: input
    });

    setInput('');
  };

  return (
    <>
      <div>
        <input placeholder="Message..." onChange={({ target: { value } }) => setInput(value)} value={input} />
        <button onClick={sendMessage} disabled={input === '' ? 'disabled': ''}>Send</button>
      </div>
      <ul>
        {chatMsgs.map((m) => <li key={randStr()}>{m}</li>)}
      </ul>
    </>
  );
}

export default App;
