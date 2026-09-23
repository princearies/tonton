import { LegacyRef } from 'react';
import { ChatMessage } from '../App';

interface ChatSidebarProps {
  messages: ChatMessage[];
  inputValue: string;
  onInputChange: (value: string) => void;
  onSend: () => void;
  chatEndRef: LegacyRef<HTMLDivElement>;
}

export default function ChatSidebar({
  messages,
  inputValue,
  onInputChange,
  onSend,
  chatEndRef,
}: ChatSidebarProps) {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1 scrollbar-thin">
        {messages.map((msg) => (
          <ChatMessageItem key={msg.id} message={msg} />
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Chat Input */}
      <div className="p-3 border-t border-[#0f3460]">
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => onInputChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  onSend();
                }
              }}
              placeholder="Send a message..."
              className="w-full px-3 py-2 bg-[#1a1a2e] border border-[#2a4080] rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 transition-colors"
            />
          </div>
          <button
            onClick={onSend}
            className="w-9 h-9 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shrink-0"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
          {/* Emoji button */}
          <button className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

function ChatMessageItem({ message }: { message: ChatMessage }) {
  if (message.isSystem) {
    return (
      <div className="flex items-start gap-2 py-1.5 px-2 rounded-lg hover:bg-white/5 transition-colors">
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 mt-0.5"
          style={{ backgroundColor: message.avatarColor }}
        >
          {message.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-300">{message.user}</span>
            <span className="text-[10px] text-gray-500">{message.time}</span>
            {message.timestamp && (
              <span className="text-[10px] text-blue-400 bg-blue-400/10 px-1.5 py-0.5 rounded">
                @{message.timestamp}
              </span>
            )}
          </div>
          <p className="text-xs text-gray-400 italic">{message.text}</p>
        </div>
        <div className="flex items-center gap-1 opacity-0 hover:opacity-100 transition-opacity">
          <button className="text-gray-500 hover:text-gray-300 text-xs">↩</button>
          <button className="text-gray-500 hover:text-gray-300 text-xs">😀</button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-2 py-1.5 px-2 rounded-lg hover:bg-white/5 transition-colors">
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 mt-0.5"
        style={{ backgroundColor: message.avatarColor }}
      >
        {message.avatar}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-gray-200">{message.user}</span>
          <span className="text-[10px] text-gray-500">{message.time}</span>
          {message.timestamp && (
            <span className="text-[10px] text-blue-400 bg-blue-400/10 px-1.5 py-0.5 rounded">
              @{message.timestamp}
            </span>
          )}
        </div>
        <p className="text-sm text-gray-200 break-words">{message.text}</p>
      </div>
      <div className="flex items-center gap-1 opacity-0 hover:opacity-100 transition-opacity">
        <button className="text-gray-500 hover:text-gray-300 text-xs">↩</button>
        <button className="text-gray-500 hover:text-gray-300 text-xs">😀</button>
      </div>
    </div>
  );
}
