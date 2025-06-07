import React, { useState } from 'react';
import './ChatBot.scss';
import ai_logo from './../../assets/ai_asis.png';

interface Message {
  text: string;
  isUser: boolean;
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Добавляем сообщение пользователя
    const userMessage: Message = {
      text: inputMessage,
      isUser: true,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputMessage }),
      });

      const data = await response.json();

      // Добавляем ответ бота
      const botMessage: Message = {
        text: data.response,
        isUser: false,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  return (
    <div className="chat-bot">
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <h3>AI Assistant</h3>
            <button onClick={() => setIsOpen(false)}>×</button>
          </div>
          <div className="chat-messages">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.isUser ? 'user' : 'bot'}`}>
                {message.text}
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Введи своё сообщение..."
            />
            <button onClick={handleSendMessage}>Отправить</button>
          </div>
        </div>
      )}
      <button className="chat-button" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '×' : <img src={ai_logo} alt="AI Assistant" />}
      </button>
    </div>
  );
};

export default ChatBot;
