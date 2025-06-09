import React, { useState, useEffect, useCallback } from 'react';
import {
  Play, Pause, SkipForward, SkipBack, Shuffle, Repeat, Repeat1,
  Volume2, VolumeX, Music2, ListMusic, Maximize2, RadioTower
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface SongPlaybackInfo {
  title: string;
  artist: string;
  albumArtUrl?: string;
  duration: number; // in seconds
}

interface PlayControlsProps {
  className?: string;
}

const PlayControls: React.FC<PlayControlsProps> = ({ className }) => {
  const [currentSong, setCurrentSong] = useState<SongPlaybackInfo | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(25); // Initial progress for demo, 0-100
  const [volume, setVolume] = useState<number>(50); // 0-100
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isShuffle, setIsShuffle] = useState<boolean>(false);
  const [repeatMode, setRepeatMode] = useState<'off' | 'track' | 'context'>('off');
  const [currentTimeDisplay, setCurrentTimeDisplay] = useState<string>("0:00");
  const [durationDisplay, setDurationDisplay] = useState<string>("0:00");

  useEffect(() => {
    setCurrentSong({
      title: "Yesterday",
      artist: "The Beatles",
      albumArtUrl: "https://upload.wikimedia.org/wikipedia/en/e/e7/Help_album_cover.jpg",
      duration: 125, // 2:05 in seconds
    });
  }, []);

  const formatTime = useCallback((totalSeconds: number): string => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }, []);

  useEffect(() => {
    if (currentSong) {
      setDurationDisplay(formatTime(currentSong.duration));
      const initialCurrentTime = (progress / 100) * currentSong.duration;
      setCurrentTimeDisplay(formatTime(Math.floor(initialCurrentTime)));
    }
  }, [currentSong, progress, formatTime]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (isPlaying && currentSong) {
      intervalId = setInterval(() => {
        setProgress((prevProgress) => {
          const currentSeconds = (prevProgress / 100) * currentSong.duration;
          const nextSeconds = currentSeconds + 1;
          if (nextSeconds >= currentSong.duration) {
            setIsPlaying(false);
            setCurrentTimeDisplay(formatTime(currentSong.duration));
            return 100;
          }
          setCurrentTimeDisplay(formatTime(Math.floor(nextSeconds)));
          return (nextSeconds / currentSong.duration) * 100;
        });
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isPlaying, currentSong, formatTime]);

  const handlePlayPause = useCallback(() => {
    if (currentSong) setIsPlaying(prev => !prev);
  }, [currentSong]);

  const handleShuffle = useCallback(() => setIsShuffle(prev => !prev), []);

  const handleRepeat = useCallback(() => {
    setRepeatMode(prev => {
      if (prev === 'off') return 'context' as const;
      if (prev === 'context') return 'track' as const;
      return 'off' as const;
    });
  }, []);

  const handleVolumeChange = (newVolume: number[]) => {
    setVolume(newVolume[0]);
    setIsMuted(newVolume[0] === 0);
  };

  const handleProgressChange = (newProgressValue: number[]) => {
    if (currentSong) {
      const newProgress = newProgressValue[0];
      setProgress(newProgress);
      const newCurrentTime = (newProgress / 100) * currentSong.duration;
      setCurrentTimeDisplay(formatTime(Math.floor(newCurrentTime)));
    }
  };
  
  const toggleMute = useCallback(() => {
      setIsMuted(prevMuted => {
          const newMutedState = !prevMuted;
          if (newMutedState) {
              // Muting: volume effectively 0
          } else {
              // Unmuting: if volume was 0, set to a default, otherwise keep current volume
              if (volume === 0) {
                  setVolume(50); 
              }
          }
          return newMutedState;
      });
  }, [volume]);

  return (
    <TooltipProvider delayDuration={200}>
      <div
        className={cn(
          "fixed bottom-0 left-0 right-0 z-50 flex h-[90px] items-center justify-between border-t border-border bg-sidebar px-4 py-3 text-sidebar-foreground",
          className
        )}
      >
        {/* Left: Song Info */} 
        <div className="flex w-[30%] items-center space-x-3 min-w-0">
          {currentSong ? (
            <>
              <Avatar className="h-14 w-14 flex-shrink-0 rounded-sm">
                {currentSong.albumArtUrl ? (
                    <AvatarImage src={currentSong.albumArtUrl} alt={`${currentSong.title} album art`} />
                ) : null}
                <AvatarFallback className="rounded-sm bg-muted">
                  <Music2 className="h-6 w-6 text-muted-foreground" />
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">{currentSong.title}</p>
                <p className="truncate text-xs text-muted-foreground">{currentSong.artist}</p>
              </div>
            </>
          ) : (
             <div className="flex items-center space-x-3">
                <Avatar className="h-14 w-14 flex-shrink-0 rounded-sm bg-muted flex items-center justify-center">
                    <Music2 className="h-6 w-6 text-muted-foreground" />
                </Avatar>
                <div>
                    <p className="text-sm font-medium text-muted-foreground">No song playing</p>
                </div>
            </div>
          )}
        </div>

        {/* Center: Controls & Progress */} 
        <div className="flex w-[40%] flex-col items-center">
          <div className="mb-2 flex items-center space-x-1 sm:space-x-2 md:space-x-3">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={handleShuffle} className={cn("h-8 w-8", isShuffle && "text-primary")}>
                  <Shuffle className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent><p>Shuffle</p></TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <SkipBack className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent><p>Previous</p></TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="default"
                  size="icon"
                  onClick={handlePlayPause}
                  className="h-10 w-10 rounded-full bg-primary-foreground text-background hover:bg-primary-foreground/90 focus-visible:ring-ring focus-visible:ring-offset-sidebar"
                >
                  {isPlaying ? <Pause className="h-5 w-5 fill-current" /> : <Play className="h-5 w-5 fill-current ml-0.5" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent><p>{isPlaying ? "Pause" : "Play"}</p></TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <SkipForward className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent><p>Next</p></TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={handleRepeat} className={cn("h-8 w-8", repeatMode !== 'off' && "text-primary")}>
                  {repeatMode === 'track' ? <Repeat1 className="h-4 w-4" /> : <Repeat className="h-4 w-4" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent><p>Repeat {repeatMode === 'track' ? 'Track' : repeatMode === 'context' ? 'Playlist' : 'Off'}</p></TooltipContent>
            </Tooltip>
          </div>
          <div className="flex w-full max-w-md items-center space-x-2">
            <span className="w-10 text-right text-xs font-mono text-muted-foreground">{currentTimeDisplay}</span>
            <Slider
              value={[progress]}
              max={100}
              step={0.1}
              onValueChange={handleProgressChange}
              className="flex-1 [&>span:first-child]:h-1 [&>span:first-child>span]:h-1"
              disabled={!currentSong}
            />
            <span className="w-10 text-left text-xs font-mono text-muted-foreground">{durationDisplay}</span>
          </div>
        </div>

        {/* Right: Volume & Other Controls */} 
        <div className="flex w-[30%] items-center justify-end space-x-1 sm:space-x-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 hidden md:inline-flex">
                <ListMusic className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent><p>Queue</p></TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 hidden md:inline-flex">
                <RadioTower className="h-4 w-4" /> 
              </Button>
            </TooltipTrigger>
            <TooltipContent><p>Connect to a device</p></TooltipContent>
          </Tooltip>
          <Button variant="ghost" size="icon" onClick={toggleMute} className="h-8 w-8">
            {isMuted || volume === 0 ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </Button>
          <Slider
            value={[isMuted ? 0 : volume]}
            max={100}
            step={1}
            onValueChange={handleVolumeChange}
            className="w-20 sm:w-24 [&>span:first-child]:h-1 [&>span:first-child>span]:h-1"
          />
          <Tooltip>
            <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 hidden lg:inline-flex">
                    <Maximize2 className="h-4 w-4" />
                </Button>
            </TooltipTrigger>
            <TooltipContent><p>Full screen</p></TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default PlayControls;
