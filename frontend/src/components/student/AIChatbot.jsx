import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import api from '../../lib/api';

export default function AIChatbot({ isOpen, onClose }) {
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Hello! Welcome to the Edutech platform. How can I help you today?",
            sender: 'ai',
            timestamp: new Date()
        }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async () => {
        if (!inputMessage.trim()) return;

        const userMessage = {
            id: Date.now(),
            text: inputMessage,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputMessage('');
        setIsTyping(true);

        try {
            const response = await api.post('/chat', { message: inputMessage });

            const aiResponse = {
                id: Date.now() + 1,
                text: response.data.response,
                sender: 'ai',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, aiResponse]);
        } catch (error) {
            console.error('Chat error:', error);
            const errorMessage = {
                id: Date.now() + 1,
                text: "I'm sorry, I'm having trouble connecting right now. Please try again later.",
                sender: 'ai',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed bottom-32 right-10 w-[400px] h-[600px] bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-slate-700 z-[100] flex flex-col overflow-hidden animate-slide-up">
            {/* Header */}
            <div className="bg-primary text-white p-4 rounded-t-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                        <span className="material-symbols-outlined">smart_toy</span>
                    </div>
                    <div>
                        <h3 className="font-bold">Edutech Assistant</h3>
                        <p className="text-xs text-blue-100">Your learning companion</p>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                    <span className="material-symbols-outlined text-sm">close</span>
                </button>
            </div>

            {/* Messages container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 chatbot-messages-container relative">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-[80%] p-3 rounded-2xl ${message.sender === 'user'
                                ? 'bg-primary text-white rounded-br-sm'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-bl-sm'
                                }`}
                        >
                            {message.sender === 'ai' ? (
                                <div className="text-sm markdown-content prose-slate dark:prose-invert max-w-full">
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                        {typeof message.text === 'string' ? message.text : String(message.text || '')}
                                    </ReactMarkdown>
                                </div>
                            ) : (
                                <p className="text-sm">{message.text}</p>
                            )}
                            <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-blue-100' : 'text-slate-400'
                                }`}>
                                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                        </div>
                    </div>
                ))}

                {isTyping && (
                    <div className="flex justify-start">
                        <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-2xl rounded-bl-sm">
                            <div className="flex items-center gap-1">
                                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your message..."
                        className="flex-1 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary text-slate-900 dark:text-slate-100 placeholder-slate-400"
                    />
                    <button
                        onClick={handleSendMessage}
                        disabled={!inputMessage.trim() || isTyping}
                        className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
                    >
                        <span className="material-symbols-outlined text-sm">send</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
