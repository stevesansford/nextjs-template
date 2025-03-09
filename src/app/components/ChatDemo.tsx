'use client';

import { useState, FormEvent, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatDemo() {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!input.trim() || isLoading) return;
    
    // Add user message
    const userMessage: Message = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: input,
          systemMessage: 'You are a helpful assistant.',
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const data = await response.json();
      
      // Add assistant message
      const assistantMessage: Message = { role: 'assistant', content: data.response };
      setMessages([...newMessages, assistantMessage]);
    } catch (err) {
      setError(`Error: ${(err as Error).message}`);
      console.error('Chat error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-3xl mx-auto p-4 h-[600px] bg-card rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4 text-foreground">AI Chat Demo</h2>
      
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-4 p-4 bg-muted rounded">
        {messages.length === 0 && (
          <div className="text-center text-muted-foreground my-8">
            Send a message to start chatting with the AI.
          </div>
        )}
        
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] p-3 rounded-lg ${
                message.role === 'user' 
                  ? 'bg-primary text-white rounded-br-none' 
                  : 'bg-muted text-foreground rounded-bl-none'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-muted text-foreground p-3 rounded-lg rounded-bl-none max-w-[80%]">
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        {error && (
          <div className="text-center p-2 bg-error/10 text-error rounded-lg">
            {error}
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input form */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-2 border border-border rounded bg-background text-foreground"
          disabled={isLoading}
        />
        <button 
          type="submit" 
          className="bg-primary text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={isLoading || !input.trim()}
        >
          Send
        </button>
      </form>
      
      <div className="text-xs text-muted-foreground mt-2 text-center">
        Powered by {process.env.NEXT_PUBLIC_AI_PROVIDER || 'OpenAI'} API
      </div>
    </div>
  );
} 