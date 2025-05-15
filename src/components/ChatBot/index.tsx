import React, { useState, useEffect, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import Logo from "@Assets/images/logo.png";
import { ChatApiService } from '../../Api/chat-services';
import NotificationService from '@Services/NotificationService';

interface Message {
  type: 'user' | 'bot';
  text: string;
  isLoading?: boolean;
}

interface ApiResponse {
  ok: boolean;
  response: {
    message?: string;
  };
  data: {
    data?: {
      response?: string;
    };
  };
}

const ChatBot: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    return savedMessages ? JSON.parse(savedMessages) : [
      { type: 'bot', text: 'Hello! I\'m Agaahi\'s virtual assistant. How can I help you today?' }
    ];
  });
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  // Auto scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const { mutate: sendMessage, isLoading } = useMutation<ApiResponse, Error, string>(
    (message: string) => ChatApiService.sendMessage({ message }),
    {
      onSuccess: ({ ok, response, data }) => {
        if (ok) {
          // Remove loading message and add the actual response
          setMessages(prev => {
            const newMessages = prev.filter(msg => !msg.isLoading);
            return [...newMessages, { type: 'bot', text: data?.data?.response || 'I apologize, but I couldn\'t process your request.' }];
          });
        } else {
          // Remove loading message and show error
          setMessages(prev => prev.filter(msg => !msg.isLoading));
          NotificationService.error(response?.message || 'Failed to get response');
        }
      },
      onError: (error) => {
        // Remove loading message and show error
        setMessages(prev => prev.filter(msg => !msg.isLoading));
        NotificationService.error('Failed to send message');
        console.error('Error sending message:', error);
      }
    }
  );

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { type: 'user', text: inputMessage }]);

    // Add loading message
    setMessages(prev => [...prev, { type: 'bot', text: '', isLoading: true }]);

    // Send message to API
    sendMessage(inputMessage);

    setInputMessage('');
  };

  return (
    <>
      {/* Chat Bot Button */}
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-6 right-6 bg-[#0B0D18] text-white p-4 rounded-full shadow-lg cursor-pointer transition-all duration-300 z-50"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>

      {/* Connecting Arrow */}
      {isChatOpen && (
        <div className="fixed bottom-[72px] right-[72px] w-8 h-16 z-50">
          <div className="w-0.5 h-full bg-[#0B0D18] mx-auto"></div>
          <div className="w-4 h-4 border-r-2 border-b-2 border-[#0B0D18] transform rotate-45 translate-x-1/2 -translate-y-1/2"></div>
        </div>
      )}

      {/* Chat Container */}
      {isChatOpen && (
        <div className="fixed bottom-24 right-16 w-96 h-[450px] rounded-lg shadow-xl z-50 flex flex-col overflow-hidden bg-white">
          {/* Background Image Container */}
          <div className="absolute inset-0">
            <img 
              src={Logo} 
              alt="Agaahi Logo Background" 
              className="w-full h-full object-contain opacity-40"
            />
          </div>
      
          {/* Content Container */}
          <div className="relative z-10 flex flex-col h-full bg-white/10">
            {/* Chat Header */}
            <div className="bg-[#0B0D18] text-white p-4 rounded-t-lg flex justify-between items-center">
              <h3 className="font-semibold">Agaahi Bot</h3>
              <button 
                onClick={() => setIsChatOpen(false)} 
                className="p-0 m-0 border-0 bg-transparent hover:opacity-80 transition-opacity"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.type === 'user'
                        ? 'bg-[#0B0D18] text-white'
                        : 'bg-white/90 backdrop-blur-sm text-gray-800 shadow-sm'
                    }`}
                  >
                    {message.isLoading ? (
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    ) : (
                      message.text
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input - Fixed at bottom */}
            <div className="mt-auto p-4 border-t bg-white/20 backdrop-blur-sm">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-[#A855F7] bg-white"
                  disabled={isLoading}
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-[#0B0D18] text-white p-2 rounded-lg hover:bg-[#9333EA] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoading}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot; 