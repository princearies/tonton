import { forwardRef } from 'react';

interface VideoPlayerProps {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  onTogglePlay: () => void;
  onSeek: (time: number) => void;
}

const VideoPlayer = forwardRef<HTMLVideoElement, VideoPlayerProps>(
  ({ isPlaying, onTogglePlay }, ref) => {
    return (
      <div className="w-full h-full flex items-center justify-center relative group cursor-pointer" onClick={onTogglePlay}>
        {/* Video placeholder - animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]">
          {/* Animated film reel effect */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {/* Big Buck Bunny style placeholder */}
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  {/* Animated bunny illustration */}
                  <div className="relative mb-4">
                    <svg className="w-32 h-32 mx-auto text-gray-600 opacity-50" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="2" strokeDasharray="8 4" />
                      <circle cx="100" cy="100" r="60" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
                      <path d="M80 85 L80 65 Q80 55 90 55 Q100 55 100 65 L100 80" stroke="currentColor" strokeWidth="2" fill="none" />
                      <path d="M105 85 L105 65 Q105 55 115 55 Q125 55 125 65 L125 80" stroke="currentColor" strokeWidth="2" fill="none" />
                      <circle cx="85" cy="95" r="4" fill="currentColor" />
                      <circle cx="115" cy="95" r="4" fill="currentColor" />
                      <path d="M90 115 Q100 125 110 115" stroke="currentColor" strokeWidth="2" fill="none" />
                      <ellipse cx="75" cy="105" rx="8" ry="5" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5" />
                      <ellipse cx="125" cy="105" rx="8" ry="5" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5" />
                    </svg>
                  </div>
                  <p className="text-gray-500 text-lg font-medium">Big Buck Bunny</p>
                  <p className="text-gray-600 text-sm mt-1">Blender Open Movie</p>
                </div>
              </div>
            </div>
          </div>

          {/* Play/Pause overlay */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          )}

          {/* Now playing indicator */}
          {isPlaying && (
            <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1.5">
              <div className="flex items-end gap-0.5 h-3">
                <div className="w-0.5 bg-green-400 rounded-full animate-pulse" style={{ height: '60%', animationDelay: '0ms' }} />
                <div className="w-0.5 bg-green-400 rounded-full animate-pulse" style={{ height: '100%', animationDelay: '150ms' }} />
                <div className="w-0.5 bg-green-400 rounded-full animate-pulse" style={{ height: '40%', animationDelay: '300ms' }} />
                <div className="w-0.5 bg-green-400 rounded-full animate-pulse" style={{ height: '80%', animationDelay: '450ms' }} />
              </div>
              <span className="text-xs text-green-400 font-medium">Now Playing</span>
            </div>
          )}
        </div>
        <video ref={ref} className="hidden" />
      </div>
    );
  }
);

VideoPlayer.displayName = 'VideoPlayer';
export default VideoPlayer;
