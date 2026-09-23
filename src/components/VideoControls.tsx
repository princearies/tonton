interface VideoControlsProps {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  playbackRate: number;
  isFullscreen: boolean;
  theaterMode: boolean;
  onTogglePlay: () => void;
  onSeek: (time: number) => void;
  onVolumeChange: (vol: number) => void;
  onToggleMute: () => void;
  onPlaybackRateChange: (rate: number) => void;
  onToggleFullscreen: () => void;
  onToggleTheater: () => void;
  formatTime: (seconds: number) => string;
}

export default function VideoControls({
  isPlaying,
  currentTime,
  duration,
  volume,
  isMuted,
  playbackRate,
  isFullscreen,
  theaterMode,
  onTogglePlay,
  onSeek,
  onVolumeChange,
  onToggleMute,
  onPlaybackRateChange,
  onToggleFullscreen,
  onToggleTheater,
  formatTime,
}: VideoControlsProps) {
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const rates = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

  return (
    <div className="bg-[#0f3460] border-t border-[#1a4080] px-4 py-2 shrink-0">
      {/* Progress Bar */}
      <div className="mb-2 group">
        <div
          className="relative h-1.5 bg-gray-700 rounded-full cursor-pointer group-hover:h-2.5 transition-all"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const percentage = x / rect.width;
            onSeek(percentage * duration);
          }}
        >
          {/* Buffered */}
          <div className="absolute inset-0 bg-gray-600 rounded-full" style={{ width: '65%' }} />
          {/* Progress */}
          <div
            className="absolute inset-y-0 left-0 bg-blue-500 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
          {/* Thumb */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
            style={{ left: `calc(${progress}% - 7px)` }}
          />
        </div>
      </div>

      {/* Controls Row */}
      <div className="flex items-center justify-between">
        {/* Left Controls */}
        <div className="flex items-center gap-2">
          {/* Play/Pause */}
          <button
            onClick={onTogglePlay}
            className="w-9 h-9 flex items-center justify-center text-white hover:text-blue-400 transition-colors rounded-lg hover:bg-white/10"
          >
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          {/* Skip Back */}
          <button
            onClick={() => onSeek(Math.max(0, currentTime - 10))}
            className="w-9 h-9 flex items-center justify-center text-white hover:text-blue-400 transition-colors rounded-lg hover:bg-white/10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z" />
            </svg>
          </button>

          {/* Skip Forward */}
          <button
            onClick={() => onSeek(Math.min(duration, currentTime + 10))}
            className="w-9 h-9 flex items-center justify-center text-white hover:text-blue-400 transition-colors rounded-lg hover:bg-white/10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z" />
            </svg>
          </button>

          {/* Volume */}
          <div className="flex items-center gap-1 group/vol">
            <button
              onClick={onToggleMute}
              className="w-9 h-9 flex items-center justify-center text-white hover:text-blue-400 transition-colors rounded-lg hover:bg-white/10"
            >
              {isMuted || volume === 0 ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
              )}
            </button>
            <input
              type="range"
              min="0"
              max="100"
              value={isMuted ? 0 : volume}
              onChange={(e) => onVolumeChange(Number(e.target.value))}
              className="w-20 h-1 bg-gray-600 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
            />
          </div>

          {/* Time */}
          <span className="text-xs text-gray-400 ml-2 font-mono">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-1">
          {/* Sync indicator */}
          <div className="flex items-center gap-1 mr-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-xs text-green-400">Synced</span>
          </div>

          {/* Playback Rate */}
          <div className="relative group/rate">
            <button className="px-2 py-1 text-xs text-gray-300 hover:text-white bg-[#1a1a2e] rounded border border-[#2a4080] transition-colors">
              {playbackRate.toFixed(2)}x
            </button>
            <div className="absolute bottom-full right-0 mb-2 bg-[#1a1a2e] border border-[#2a4080] rounded-lg shadow-xl hidden group-hover/rate:block z-50">
              {rates.map((rate) => (
                <button
                  key={rate}
                  onClick={() => onPlaybackRateChange(rate)}
                  className={`block w-full px-4 py-1.5 text-xs text-left hover:bg-blue-600/20 transition-colors ${
                    playbackRate === rate ? 'text-blue-400' : 'text-gray-300'
                  }`}
                >
                  {rate.toFixed(2)}x
                </button>
              ))}
            </div>
          </div>

          {/* Loop */}
          <button className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/10">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>

          {/* Captions */}
          <button className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/10">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
          </button>

          {/* Theater Mode */}
          <button
            onClick={onToggleTheater}
            className={`w-9 h-9 flex items-center justify-center transition-colors rounded-lg hover:bg-white/10 ${
              theaterMode ? 'text-blue-400' : 'text-gray-400 hover:text-white'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5z" />
            </svg>
          </button>

          {/* Fullscreen */}
          <button
            onClick={onToggleFullscreen}
            className={`w-9 h-9 flex items-center justify-center transition-colors rounded-lg hover:bg-white/10 ${
              isFullscreen ? 'text-blue-400' : 'text-gray-400 hover:text-white'
            }`}
          >
            {isFullscreen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9L4 4m0 0v4m0-4h4m7 5l5-5m0 0v4m0-4h-4m-7 5l-5 5m0 0v-4m0 4h4m7-5l5 5m0 0v-4m0 4h-4" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
