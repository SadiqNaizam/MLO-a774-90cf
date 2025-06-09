import React from 'react';
import { Clock3, ListMusic, MoreHorizontal, Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

interface Song {
  id: string;
  index: number;
  title: string;
  artist: string;
  album: string;
  duration: string; 
  coverImageUrl?: string;
}

const songsData: Song[] = [
  { id: 's1', index: 1, title: 'Bohemian Rhapsody', artist: 'Queen', album: 'A Night at the Opera', duration: '5:55', coverImageUrl: undefined },
  { id: 's2', index: 2, title: 'Stairway to Heaven', artist: 'Led Zeppelin', album: 'Led Zeppelin IV', duration: '8:02', coverImageUrl: undefined },
  { id: 's3', index: 3, title: 'Imagine', artist: 'John Lennon', album: 'Imagine', duration: '3:01', coverImageUrl: undefined },
  { id: 's4', index: 4, title: 'Smells Like Teen Spirit', artist: 'Nirvana', album: 'Nevermind', duration: '5:01', coverImageUrl: undefined },
  { id: 's5', index: 5, title: 'Hotel California', artist: 'Eagles', album: 'Hotel California', duration: '6:30', coverImageUrl: undefined },
  { id: 's6', index: 6, title: 'Like a Rolling Stone', artist: 'Bob Dylan', album: 'Highway 61 Revisited', duration: '6:13', coverImageUrl: undefined },
  { id: 's7', index: 7, title: 'Hey Jude', artist: 'The Beatles', album: 'Hey Jude (Single)', duration: '7:11', coverImageUrl: undefined },
  { id: 's8', index: 8, title: 'Wonderwall', artist: 'Oasis', album: "(What's the Story) Morning Glory?", duration: '4:18', coverImageUrl: undefined },
  { id: 's9', index: 9, title: 'Billie Jean', artist: 'Michael Jackson', album: 'Thriller', duration: '4:54', coverImageUrl: undefined },
  { id: 's10', index: 10, title: "Sweet Child O' Mine", artist: "Guns N' Roses", album: 'Appetite for Destruction', duration: '5:56', coverImageUrl: undefined },
];


const SongTable: React.FC<{ className?: string }> = ({ className }) => {
  const [hoveredRow, setHoveredRow] = React.useState<string | null>(null);

  return (
    <div className={cn('px-4 sm:px-6 md:px-8 pb-8 text-foreground', className)}>
      <Table className="w-full">
        <TableHeader className="border-b border-border/30">
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-12_OLD_VALUE px-2_OLD_VALUE text-center text-xs uppercase text-muted-foreground tracking-wider">#</TableHead>
            <TableHead className="px-2_OLD_VALUE text-xs uppercase text-muted-foreground tracking-wider">Title</TableHead>
            <TableHead className="px-2_OLD_VALUE text-xs uppercase text-muted-foreground tracking-wider hidden md:table-cell">Album</TableHead>
            <TableHead className="w-20_OLD_VALUE px-2_OLD_VALUE text-right text-xs uppercase text-muted-foreground tracking-wider">
              <Clock3 className="inline-block h-4 w-4 stroke-1.5" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {songsData.map((song, idx) => (
            <TableRow
              key={song.id}
              className="group border-none hover:bg-white/5 rounded-md transition-colors duration-100 ease-in-out"
              onMouseEnter={() => setHoveredRow(song.id)}
              onMouseLeave={() => setHoveredRow(null)}
            >
              <TableCell className="w-12_OLD_VALUE px-2_OLD_VALUE text-center text-sm text-muted-foreground font-mono">
                {hoveredRow === song.id ? (
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-foreground hover:text-primary focus-visible:ring-0">
                    <Play className="h-4 w-4 fill-current" />
                  </Button>
                ) : (
                  <span className="pt-px">{idx + 1}</span>
                )}
              </TableCell>
              <TableCell className="px-2_OLD_VALUE py-3">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10 rounded-sm flex-shrink-0">
                    {song.coverImageUrl ? (
                      <AvatarImage src={song.coverImageUrl} alt={`${song.title} cover`} />
                    ) : (
                      <AvatarFallback className="rounded-sm bg-neutral-800 flex items-center justify-center">
                        <ListMusic className="h-5 w-5 text-neutral-500" />
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div className="overflow-hidden">
                    <p className={cn("font-medium text-sm text-foreground truncate", hoveredRow === song.id && "text-primary")}>{song.title}</p>
                    <p className="text-xs text-muted-foreground truncate">{song.artist}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="px-2_OLD_VALUE text-sm text-muted-foreground hidden md:table-cell truncate">{song.album}</TableCell>
              <TableCell className="w-20_OLD_VALUE px-2_OLD_VALUE text-right text-sm text-muted-foreground font-mono">
                <div className="flex items-center justify-end space-x-2">
                  {hoveredRow === song.id && (
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground focus-visible:ring-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  )}
                  <span>{song.duration}</span>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SongTable;
