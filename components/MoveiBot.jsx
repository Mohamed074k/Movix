'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, X, Minimize2, MessageCircle, Maximize2, Trash2 } from 'lucide-react';

const MoveiBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Hello! I am MovieBot, your AI assistant from Movix. I can help you find movies and TV shows, provide recommendations, or answer entertainment-related questions. How can I assist you today?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const chatWindowRef = useRef(null);

  // Pre-programmed responses (English)
  const fallbackResponses = {
    'recommendation': [
      'Based on your preferences, I recommend:\n\n1. **Inception** (2010) - A mind-bending sci-fi thriller\n2. **The Dark Knight** (2008) - One of the greatest superhero movies\n3. **Interstellar** (2014) - An epic space adventure\n4. **Parasite** (2019) - Oscar-winning social thriller\n5. **Mad Max: Fury Road** (2015) - Spectacular action film',
      'Here are some top-rated movies:\n\n1. **La La Land** (2016) - Beautiful romantic musical\n2. **Get Out** (2017) - Smart horror-thriller\n3. **Spider-Man: Into the Spider-Verse** (2018) - Best superhero animation\n4. **The Grand Budapest Hotel** (2014) - Unique and entertaining comedy\n5. **Whiplash** (2014) - Intense musical drama'
    ],
    'action': [
      'Top action movies I recommend:\n\n1. **John Wick** (2014) - Best action choreography\n2. **Mad Max: Fury Road** (2015) - Spectacular and intense\n3. **The Raid** (2011) - Brutal martial arts action\n4. **Mission: Impossible - Fallout** (2018) - Amazing stunts\n5. **Die Hard** (1988) - Timeless classic',
      'Recent action movies worth watching:\n\n1. **Top Gun: Maverick** (2022) - Even better than the original\n2. **The Batman** (2022) - Dark and atmospheric\n3. **Bullet Train** (2022) - Fun action comedy\n4. **Everything Everywhere All at Once** (2022) - Multiverse action\n5. **RRR** (2022) - Epic action from India'
    ],
    'drama': [
      'Best drama movies of all time:\n\n1. **The Shawshank Redemption** (1994)\n2. **Forrest Gump** (1994)\n3. **The Green Mile** (1999)\n4. **Schindler\'s List** (1993)\n5. **Goodfellas** (1990)',
      'Recent must-watch dramas:\n\n1. **Parasite** (2019)\n2. **Joker** (2019)\n3. **Marriage Story** (2019)\n4. **The Irishman** (2019)\n5. **Little Women** (2019)'
    ],
    'comedy': [
      'Great comedy films:\n\n1. **The Grand Budapest Hotel** (2014)\n2. **Superbad** (2007)\n3. **Bridesmaids** (2011)\n4. **Shaun of the Dead** (2004)\n5. **The Big Lebowski** (1998)',
      'Romantic comedies you might enjoy:\n\n1. **La La Land** (2016)\n2. **Crazy Rich Asians** (2018)\n3. **The Proposal** (2009)\n4. **500 Days of Summer** (2009)\n5. **About Time** (2013)'
    ],
    'horror': [
      'Top horror films:\n\n1. **The Shining** (1980)\n2. **Hereditary** (2018)\n3. **Get Out** (2017)\n4. **A Quiet Place** (2018)\n5. **The Conjuring** (2013)',
      'Modern horror movies:\n\n1. **Midsommar** (2019)\n2. **Us** (2019)\n3. **The Babadook** (2014)\n4. **It Follows** (2014)\n5. **The Witch** (2015)'
    ],
    'sci-fi': [
      'Top sci-fi movies:\n\n1. **Blade Runner 2049** (2017)\n2. **Arrival** (2016)\n3. **Ex Machina** (2014)\n4. **Her** (2013)\n5. **Edge of Tomorrow** (2014)',
      'Classic sci-fi films:\n\n1. **2001: A Space Odyssey** (1968)\n2. **Alien** (1979)\n3. **The Matrix** (1999)\n4. **Back to the Future** (1985)\n5. **E.T.** (1982)'
    ]
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Handle fullscreen on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsFullscreen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Function to get fallback response
  const getFallbackResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('recommend') || message.includes('suggest')) {
      return fallbackResponses.recommendation[Math.floor(Math.random() * fallbackResponses.recommendation.length)];
    }
    if (message.includes('action') || message.includes('fight')) {
      return fallbackResponses.action[Math.floor(Math.random() * fallbackResponses.action.length)];
    }
    if (message.includes('drama') || message.includes('emotional')) {
      return fallbackResponses.drama[Math.floor(Math.random() * fallbackResponses.drama.length)];
    }
    if (message.includes('comedy') || message.includes('funny')) {
      return fallbackResponses.comedy[Math.floor(Math.random() * fallbackResponses.comedy.length)];
    }
    if (message.includes('horror') || message.includes('scary')) {
      return fallbackResponses.horror[Math.floor(Math.random() * fallbackResponses.horror.length)];
    }
    if (message.includes('sci-fi') || message.includes('science fiction')) {
      return fallbackResponses['sci-fi'][Math.floor(Math.random() * fallbackResponses['sci-fi'].length)];
    }

    return "I can help you discover movies and TV shows! Try asking about genres, ratings, or popular titles.";
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage.content,
          conversationHistory: messages.slice(-10)
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const botMessage = {
          id: Date.now() + 1,
          type: 'bot',
          content: data.response,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
      } else {
        const fallbackResponse = getFallbackResponse(userMessage.content);
        setMessages(prev => [...prev, {
          id: Date.now() + 1,
          type: 'bot',
          content: fallbackResponse,
          timestamp: new Date()
        }]);
      }
    } catch (error) {
      const fallbackResponse = getFallbackResponse(userMessage.content);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        type: 'bot',
        content: fallbackResponse,
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const clearChat = () => {
    if (isClearing) return;
    setIsClearing(true);

    const messagesContainer = document.querySelector('.messages-container');
    if (messagesContainer) {
      messagesContainer.style.transition = 'opacity 0.3s ease-out';
      messagesContainer.style.opacity = '0';
    }

    setTimeout(() => {
      setMessages([{
        id: Date.now(),
        type: 'bot',
        content: 'Hello! I am MovieBot, your AI assistant from Movix. How can I assist you today?',
        timestamp: new Date()
      }]);
      setInputValue('');
      setIsClearing(false);
      if (messagesContainer) messagesContainer.style.opacity = '1';
    }, 300);
  };

  const handleClose = () => {
    if (isClosing) return;
    setIsClosing(true);
    if (chatWindowRef.current) {
      chatWindowRef.current.style.transition = 'all 0.3s ease';
      chatWindowRef.current.style.transform = 'translateX(100%) scale(0.95)';
      chatWindowRef.current.style.opacity = '0';
    }
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
      if (chatWindowRef.current) {
        chatWindowRef.current.style.transform = '';
        chatWindowRef.current.style.opacity = '';
        chatWindowRef.current.style.transition = '';
      }
    }, 300);
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-br from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110"
          aria-label="Open MovieBot"
        >
          <div className="relative">
            <MessageCircle className="h-6 w-6" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        </button>
      )}

      {isOpen && (
        <div 
          ref={chatWindowRef}
          className={`fixed z-50 bg-gray-900 border border-purple-500/30 rounded-2xl shadow-2xl backdrop-blur-sm ${
            isFullscreen 
              ? 'inset-4 md:inset-6' 
              : 'bottom-6 right-6 w-80 h-96 md:w-96 md:h-[500px]'
          }`}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-full">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">MovieBot</h3>
                <p className="text-purple-200 text-xs">AI Assistant</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button onClick={clearChat} className="text-white/80 hover:text-white p-1">
                <Trash2 className="h-4 w-4" />
              </button>
              <button onClick={toggleFullscreen} className="text-white/80 hover:text-white md:hidden">
                {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </button>
              <button onClick={handleClose} className="text-white/80 hover:text-white p-1">
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className={`flex-1 overflow-y-auto p-4 space-y-4 messages-container ${
            isFullscreen ? 'h-[calc(100vh-200px)]' : 'h-64 md:h-80'
          }`}>
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.type === 'user'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-800 text-gray-100 border border-gray-700'
                }`}>
                  <div className="flex items-start space-x-2">
                    {message.type === 'bot' && <Bot className="h-4 w-4 text-purple-400 mt-1" />}
                    <div>
                      <p className="text-sm whitespace-pre-line">{message.content}</p>
                      <p className="text-xs mt-2 text-gray-400">{formatTime(message.timestamp)}</p>
                    </div>
                    {message.type === 'user' && <User className="h-4 w-4 text-purple-200 mt-1" />}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-800 text-gray-100 border border-gray-700 rounded-2xl px-4 py-3 flex items-center space-x-2">
                  <Bot className="h-4 w-4 text-purple-400" />
                  <span className="animate-pulse">Typing...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-700">
            <div className="flex items-end space-x-2">
              <textarea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="w-full bg-gray-800 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 resize-none focus:outline-none focus:border-purple-500"
                rows="1"
                style={{ minHeight: '44px', maxHeight: '120px' }}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                className="bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-xl"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MoveiBot;
