import React from 'react';
import { Home, Search, LibraryBig, PlusSquare, Heart, ListMusic, Music2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface NavItemProps {
  href: string;
  icon: React.ElementType;
  label: string;
  isActive?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ href, icon: Icon, label, isActive }) => (
  <a
    href={href}
    className={cn(
      'flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium',
      isActive
        ? 'bg-sidebar-accent text-sidebar-accent-foreground'
        : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
      'transition-colors duration-150 ease-in-out'
    )}
  >
    <Icon className="h-5 w-5 flex-shrink-0" />
    <span>{label}</span>
  </a>
);

interface PlaylistItemProps {
  id: string;
  name: string;
  href: string;
  isActive?: boolean;
}

const PlaylistItem: React.FC<PlaylistItemProps> = ({ name, href, isActive }) => (
  <a
    href={href}
    className={cn(
      'block truncate rounded-md px-3 py-1.5 text-sm',
      isActive
        ? 'text-sidebar-foreground font-semibold' 
        : 'text-muted-foreground hover:text-sidebar-foreground',
      'transition-colors duration-150 ease-in-out'
    )}
  >
    {name}
  </a>
);

interface CurrentSong {
  title: string;
  artist: string;
  albumArtUrl?: string;
}

const Sidebar: React.FC = () => {
  const mainNavItems: NavItemProps[] = [
    { href: '#home', icon: Home, label: 'Home', isActive: true as const },
    { href: '#search', icon: Search, label: 'Search' },
    { href: '#library', icon: LibraryBig, label: 'Your Library' },
  ];

  const secondaryNavActions: NavItemProps[] = [
    { href: '#create-playlist', icon: PlusSquare, label: 'Create Playlist' },
    { href: '#liked-songs', icon: Heart, label: 'Liked Songs' },
  ];
  
  const userPlaylists: PlaylistItemProps[] = [
    { id: 'pl1', name: 'Chill Vibes', href: '#playlist/1' },
    { id: 'pl2', name: 'Workout Mix', href: '#playlist/2' },
    { id: 'pl3', name: '90s Throwback', href: '#playlist/3', isActive: true as const },
    { id: 'pl4', name: 'Indie Acoustic', href: '#playlist/4' },
    { id: 'pl5', name: 'Focus Playlist', href: '#playlist/5' },
    { id: 'pl6', name: 'Road Trip Tunes', href: '#playlist/6' },
    { id: 'pl7', name: 'Rainy Day Jazz', href: '#playlist/7' },
    { id: 'pl8', name: 'Summer Hits', href: '#playlist/8' },
    { id: 'pl9', name: 'Deep Focus Coding', href: '#playlist/9' },
    { id: 'pl10', name: 'Late Night Lo-Fi', href: '#playlist/10' },
    { id: 'pl11', name: 'Morning Commute Classics', href: '#playlist/11' },
  ];

  const currentSong: CurrentSong | null = {
    title: 'Current Track Title Is Quite Long And May Need Truncation',
    artist: 'Performer Name',
    albumArtUrl: undefined, 
  };

  return (
    <aside className="flex h-screen w-64 flex-col bg-sidebar text-sidebar-foreground">
      <div className="p-6 pb-4">
        <div className="mb-6 flex items-center space-x-2">
          {/* This could be a logo component in a real app */} 
          <ListMusic className="h-8 w-8 text-primary" /> 
          <h1 className="text-2xl font-bold text-sidebar-foreground">Spotify</h1>
        </div>
        
        <nav className="space-y-1">
          {mainNavItems.map((item) => (
            <NavItem key={item.label} {...item} />
          ))}
        </nav>
      </div>

      <div className="px-6 pt-2 pb-4">
         <nav className="space-y-1">
            {secondaryNavActions.map((item) => (
              <NavItem key={item.label} {...item} />
            ))}
          </nav>
      </div>
      
      <Separator className="mx-6 bg-sidebar-border" />

      <div className="flex-grow px-6 pt-4 pb-2 overflow-hidden">
        <h2 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Playlists
        </h2>
        <ScrollArea className="h-full">
          <div className="space-y-0.5 pr-1">
            {userPlaylists.map((playlist) => (
              <PlaylistItem key={playlist.id} {...playlist} />
            ))}
          </div>
        </ScrollArea>
      </div>
      
      {currentSong && (
        <>
          <Separator className="mx-6 bg-sidebar-border" />
          <div className="p-4">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10 rounded">
                {currentSong.albumArtUrl ? (
                  <AvatarImage src={currentSong.albumArtUrl} alt={`${currentSong.title} album art`} />
                ) : (
                  <AvatarFallback className="bg-sidebar-accent text-sidebar-accent-foreground rounded">
                    <Music2 className="h-5 w-5" />
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-sidebar-foreground truncate">{currentSong.title}</p>
                <p className="text-xs text-muted-foreground truncate">{currentSong.artist}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </aside>
  );
};

export default Sidebar;
