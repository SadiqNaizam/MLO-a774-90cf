import React from 'react';
import { Play, ListMusic } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface PlaylistHeaderProps {
  className?: string;
}

const playlistDetails = {
  type: 'PLAYLIST' as const,
  title: 'Daily Mix 1',
  creator: 'Spotify',
  description: 'Your personalized mix of songs you love and new discoveries, updated daily.',
  songCount: 50,
  totalDurationMinutes: 205, // 3hr 25min
  coverImageUrl: undefined, // Intentionally undefined for placeholder
};

const PlaylistHeader: React.FC<PlaylistHeaderProps> = ({ className }) => {
  const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    let durationString = '';
    if (hours > 0) {
      durationString += `${hours} hr `;
    }
    durationString += `${remainingMinutes} min`;
    return durationString;
  };

  return (
    <div
      className={cn(
        'flex flex-col md:flex-row items-center md:items-end space-y-6 md:space-y-0 md:space-x-6 bg-gradient-to-b from-muted/50 via-background/50 to-background p-6 md:p-8 text-foreground',
        className
      )}
    >
      <Avatar className="h-40 w-40 md:h-48 md:w-48 lg:h-56 lg:w-56 rounded-none shadow-2xl flex-shrink-0">
        {playlistDetails.coverImageUrl ? (
          <AvatarImage src={playlistDetails.coverImageUrl} alt={`${playlistDetails.title} cover`} className="rounded-none object-cover" />
        ) : (
          <AvatarFallback className="rounded-none bg-neutral-800 flex items-center justify-center">
            <ListMusic className="h-20 w-20 md:h-24 md:w-24 text-neutral-500" />
          </AvatarFallback>
        )}
      </Avatar>
      <div className="flex flex-col space-y-2 md:space-y-3 text-center md:text-left">
        <span className="text-xs font-bold uppercase tracking-wider">{playlistDetails.type}</span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight">
          {playlistDetails.title}
        </h1>
        {playlistDetails.description && (
          <p className="text-sm text-muted-foreground max-w-xl">{playlistDetails.description}</p>
        )}
        <div className="flex items-center justify-center md:justify-start space-x-1.5 text-xs sm:text-sm text-muted-foreground pt-1">
          <span className="font-semibold text-foreground">{playlistDetails.creator}</span>
          <span aria-hidden="true">•</span>
          <span>{playlistDetails.songCount} songs,</span>
          <span>{formatDuration(playlistDetails.totalDurationMinutes)}</span>
        </div>
        <div className="pt-4 md:pt-6">
          <Button 
            size="lg" 
            className="bg-primary text-black hover:bg-primary/90 active:bg-primary/80 px-8 py-3 rounded-full font-semibold text-base focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <Play className="mr-2 h-5 w-5 fill-black" />
            Play
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PlaylistHeader;
