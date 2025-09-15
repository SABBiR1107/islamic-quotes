import React, { useState } from 'react';
import { Send, Sparkles } from 'lucide-react';
import { askIslam } from '../utils/ai';

const AskAIPage: React.FC = () => {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const nextMessages = [...messages, { role: 'user', content: trimmed }];
    setMessages(nextMessages);
    setInput('');
    setLoading(true);

    const reply = await askIslam(trimmed);
    setMessages([...nextMessages, { role: 'assistant', content: reply }]);
    setLoading(false);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100">
      <div className="max-w-3xl mx-auto p-4 pb-24">
        <div className="text-center mb-6 pt-8">
          <div className="flex items-center justify-center mb-3">
            <Sparkles className="text-emerald-600 mr-2" size={28} />
            <h1 className="text-2xl font-bold text-emerald-800">Ask AI</h1>
          </div>
          <p className="text-emerald-600">Ask anything about Islam respectfully and concisely.</p>
        </div>

        <div className="bg-white rounded-xl border border-emerald-200 shadow-sm p-4 h-[60vh] overflow-y-auto space-y-4">
          {messages.length === 0 && (
            <div className="text-center text-gray-500">Start by asking a question about Islam.</div>
          )}
          {messages.map((m, idx) => (
            <div key={idx} className={`p-3 rounded-lg ${m.role === 'user' ? 'bg-emerald-50 text-emerald-800' : 'bg-gray-50 text-gray-800'}`}>
              <div className="text-xs uppercase tracking-wide mb-1 opacity-70">{m.role === 'user' ? 'You' : 'Assistant'}</div>
              <div className="whitespace-pre-wrap leading-relaxed">{m.content}</div>
            </div>
          ))}
          {loading && (
            <div className="p-3 rounded-lg bg-gray-50 text-gray-600">Thinking…</div>
          )}
        </div>

        <div className="fixed bottom-16 left-0 right-0">
          <div className="max-w-3xl mx-auto px-4">
            <div className="bg-white border border-emerald-200 rounded-xl shadow-lg p-3 flex items-end space-x-3">
              <textarea
                className="flex-1 resize-none outline-none p-2 rounded-md bg-gray-50 h-20"
                placeholder="Type your question about Islam…"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button
                onClick={handleSend}
                disabled={loading || input.trim().length === 0}
                className="flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-lg px-4 py-3"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AskAIPage;
