import React from 'react';
import SidebarNav from '@/components/Playlist/SidebarNav';
import PlaylistHeader from '@/components/Playlist/PlaylistHeader';
import SongTable from '@/components/Playlist/SongTable';
import PlayControls from '@/components/layout/PlayControls';

/**
 * Represents the Daily Mix Playlist Page.
 * This page assembles the main UI components for displaying a playlist:
 * - SidebarNav: For navigation and playlist listing.
 * - PlaylistHeader: Displays information about the current playlist.
 * - SongTable: Lists the songs in the playlist.
 * - PlayControls: Provides music playback controls, fixed at the bottom of the viewport.
 *
 * The layout is a common three-part structure for music applications:
 * 1. A fixed-width sidebar on the left (`SidebarNav`).
 * 2. A main content area that takes the remaining width, which is scrollable and contains
 *    the `PlaylistHeader` and `SongTable`.
 * 3. A fixed player control bar at the bottom of the screen (`PlayControls`).
 *
 * `SidebarNav` and `PlayControls` manage their own full-height and fixed positioning respectively.
 * The main content area is designed to scroll its content, with padding at the bottom
 * to ensure no content is obscured by the `PlayControls` bar.
 */
const DailyMixPlaylistPage: React.FC = () => {
  return (
    // Base container for the entire page, ensuring it fits the screen height and manages overflow.
    // The `flex` layout arranges SidebarNav and the main content area side-by-side.
    <div className="h-screen flex overflow-hidden bg-background text-foreground">
      {/* Sidebar Navigation Panel */}
      {/* SidebarNav is styled internally with w-64 and h-screen, fitting directly into this flex layout. */}
      <SidebarNav />

      {/* Main Content Area (Playlist Details and Song List) */}
      {/* This 'main' element takes up the remaining horizontal space (flex-1) 
          and is also a flex container to manage its children vertically. */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Scrollable container for playlist header and song table. */}
        {/* `flex-1` allows this div to grow and shrink within the main flex container. */}
        {/* `overflow-y-auto` enables vertical scrolling for content that exceeds available space. */}
        {/* `pb-[90px]` adds padding to the bottom, equivalent to the height of the PlayControls bar,
            preventing content from being hidden underneath it. */}
        <div className="flex-1 overflow-y-auto pb-[90px]">
          <PlaylistHeader />
          <SongTable />
        </div>
      </main>

      {/* Global Playback Controls */}
      {/* PlayControls is fixed to the bottom of the viewport via its internal styling.
          Its placement in the DOM here doesn't alter its fixed positioning. */}
      <PlayControls />
    </div>
  );
};

export default DailyMixPlaylistPage;
