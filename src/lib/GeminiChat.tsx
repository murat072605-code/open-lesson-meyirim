import React from 'react';
import { GoogleGenAI } from '@google/genai';
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { cn } from './utils';

// Initialize the Gemini API client safely
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || 'MISSING_KEY' });

export function GeminiChat() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<{role: 'user' | 'model', text: string}[]>([
    { role: 'model', text: "Hi! I'm your AI Teacher. Ask me about adjectives or any English words!" }
  ]);
  const [input, setInput] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-pro-preview',
        contents: userMessage,
        config: {
          systemInstruction: "You are a friendly, encouraging English teacher for 10-12 year old children. You are helping them learn about Adjectives and Opposites. Keep your answers extremely simple, short (1-3 sentences maximum), and enthusiastic. Use simple emojis.",
          temperature: 0.7,
        }
      });
      
      const text = response.text || "Oops, I'm thinking too hard! Try asking again.";
      setMessages(prev => [...prev, { role: 'model', text }]);
    } catch (err) {
      console.error("Gemini Chat Error:", err);
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I lost my connection for a moment! 🔌 Can you repeat that?" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-xl font-bold transition-transform hover:scale-110 flex items-center justify-center text-white",
          "bg-gradient-to-r from-blue-500 to-purple-500",
          isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"
        )}
      >
        <MessageCircle size={28} />
      </button>

      {/* Chat Window */}
      <div 
        className={cn(
          "fixed bottom-6 right-6 z-50 w-80 md:w-96 bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col transition-all duration-300 transform origin-bottom-right",
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"
        )}
        style={{ height: '500px', maxHeight: 'calc(100vh - 48px)' }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 flex justify-between items-center text-white">
          <div className="flex items-center gap-2 font-bold text-lg">
            <Bot size={24} />
            <span>AI Teacher</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-full text-white">
            <X size={20} />
          </button>
        </div>

        {/* Message Area */}
        <div className="flex-1 overflow-y-auto p-4 bg-blue-50 space-y-4">
          {messages.map((m, i) => (
            <div key={i} className={cn("flex", m.role === 'user' ? "justify-end" : "justify-start")}>
              <div 
                className={cn(
                  "max-w-[80%] rounded-2xl p-3 text-sm shadow-sm",
                  m.role === 'user' 
                    ? "bg-blue-500 text-white rounded-br-none" 
                    : "bg-white text-slate-800 rounded-bl-none border border-slate-100"
                )}
              >
                {m.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start text-blue-500 ml-2">
              <Loader2 className="animate-spin" size={20} />
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-3 bg-white border-t border-slate-100">
          <form onSubmit={handleSend} className="flex gap-2 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
              className="flex-1 rounded-full bg-slate-100 border-none px-4 py-2 focus:ring-2 focus:ring-blue-500 text-sm outline-none"
              disabled={isLoading}
            />
            <button 
              type="submit" 
              disabled={!input.trim() || isLoading}
              className="bg-blue-500 text-white rounded-full w-10 h-10 flex flex-shrink-0 items-center justify-center hover:bg-blue-600 disabled:opacity-50"
            >
              <Send size={18} className="translate-x-[1px]" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
