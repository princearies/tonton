import { useState, useRef, useEffect, useCallback } from 'react';
import Header from './components/Header';
import VideoPlayer from './components/VideoPlayer';
import ChatSidebar from './components/ChatSidebar';
import SourceTabs from './components/SourceTabs';
import PeoplePanel from './components/PeoplePanel';
import VideoControls from './components/VideoControls';

export interface ChatMessage {
  id: string;
  user: string;
  avatar: string;
  avatarColor: string;
  text: string;
  time: string;
  timestamp?: string;
  isSystem?: boolean;
}

export interface Person {
  name: string;
  avatar: string;
  avatarColor: string;
  isHost?: boolean;
}

const MOCK_PEOPLE: Person[] = [
  { name: 'You', avatar: 'Y', avatarColor: '#4A90D9', isHost: true },
  { name: 'MovieFan42', avatar: 'M', avatarColor: '#E67E22' },
  { name: 'NightOwl', avatar: 'N', avatarColor: '#9B59B6' },
  { name: 'CinemaBuff', avatar: 'C', avatarColor: '#27AE60' },
];

const MOCK_MESSAGES: ChatMessage[] = [
  {
    id: '1',
    user: 'MovieFan42',
    avatar: 'M',
    avatarColor: '#E67E22',
    text: 'changed the video to Big Buck Bunny',
    time: '2:30 PM',
    isSystem: true,
  },
  {
    id: '2',
    user: 'NightOwl',
    avatar: 'N',
    avatarColor: '#9B59B6',
    text: 'Nice choice! 🎬',
    time: '2:31 PM',
  },
  {
    id: '3',
    user: 'MovieFan42',
    avatar: 'M',
    avatarColor: '#E67E22',
    text: 'started the video at 00:00',
    time: '2:31 PM',
    timestamp: '00:00',
    isSystem: true,
  },
  {
    id: '4',
    user: 'CinemaBuff',
    avatar: 'C',
    avatarColor: '#27AE60',
    text: 'This movie is amazing, love the animation!',
    time: '2:35 PM',
  },
  {
    id: '5',
    user: 'NightOwl',
    avatar: 'N',
    avatarColor: '#9B59B6',
    text: 'The soundtrack is incredible too 🎵',
    time: '2:36 PM',
  },
  {
    id: '6',
    user: 'MovieFan42',
    avatar: 'M',
    avatarColor: '#E67E22',
    text: 'paused the video at 04:23',
    time: '2:38 PM',
    timestamp: '04:23',
    isSystem: true,
  },
  {
    id: '7',
    user: 'CinemaBuff',
    avatar: 'C',
    avatarColor: '#27AE60',
    text: 'Wait for it... 😂',
    time: '2:38 PM',
  },
  {
    id: '8',
    user: 'MovieFan42',
    avatar: 'M',
    avatarColor: '#E67E22',
    text: 'started the video at 04:23',
    time: '2:39 PM',
    timestamp: '04:23',
    isSystem: true,
  },
];

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(596); // 9:56
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [theaterMode, setTheaterMode] = useState(false);
  const [showPeople, setShowPeople] = useState(false);
  const [activeTab, setActiveTab] = useState<'file' | 'screenshare' | 'vbrowser' | 'playlist'>('file');
  const [messages, setMessages] = useState<ChatMessage[]>(MOCK_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [people] = useState<Person[]>(MOCK_PEOPLE);
  const videoRef = useRef<HTMLVideoElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + playbackRate;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration, playbackRate]);

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const handleSeek = useCallback((time: number) => {
    setCurrentTime(time);
  }, []);

  const handleSendMessage = useCallback(() => {
    if (!inputValue.trim()) return;
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      user: 'You',
      avatar: 'Y',
      avatarColor: '#4A90D9',
      text: inputValue,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, newMessage]);
    setInputValue('');
  }, [inputValue]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-[#1a1a2e] text-white overflow-hidden">
      <Header />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Main Content Area */}
        <div className={`flex flex-col flex-1 ${theaterMode ? 'w-full' : ''}`}>
          {/* Source Tabs */}
          <SourceTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          
          {/* Video Player Area */}
          <div className="flex-1 flex items-center justify-center bg-black relative">
            <VideoPlayer
              ref={videoRef}
              isPlaying={isPlaying}
              currentTime={currentTime}
              duration={duration}
              onTogglePlay={togglePlay}
              onSeek={handleSeek}
            />
          </div>
          
          {/* Video Controls */}
          <VideoControls
            isPlaying={isPlaying}
            currentTime={currentTime}
            duration={duration}
            volume={volume}
            isMuted={isMuted}
            playbackRate={playbackRate}
            isFullscreen={isFullscreen}
            theaterMode={theaterMode}
            onTogglePlay={togglePlay}
            onSeek={handleSeek}
            onVolumeChange={setVolume}
            onToggleMute={() => setIsMuted(!isMuted)}
            onPlaybackRateChange={setPlaybackRate}
            onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
            onToggleTheater={() => setTheaterMode(!theaterMode)}
            formatTime={formatTime}
          />
        </div>

        {/* Right Sidebar */}
        {!theaterMode && (
          <div className="w-[380px] flex flex-col bg-[#16213e] border-l border-[#0f3460]">
            {/* People Toggle */}
            <div className="flex items-center justify-between px-4 py-2 bg-[#0f3460]">
              <button
                onClick={() => setShowPeople(!showPeople)}
                className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
                People ({people.length})
              </button>
              <button className="text-sm text-gray-300 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>

            {/* People Panel (collapsible) */}
            {showPeople && <PeoplePanel people={people} />}

            {/* Chat */}
            <ChatSidebar
              messages={messages}
              inputValue={inputValue}
              onInputChange={setInputValue}
              onSend={handleSendMessage}
              chatEndRef={chatEndRef}
            />
          </div>
        )}
      </div>
    </div>
  );
}
