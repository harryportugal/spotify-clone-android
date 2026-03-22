import React, { createContext, useContext, useState } from "react";
import { spotifyContextData } from "../lib/mock-data";

export interface Track {
  id: string;
  title: string;
  artist: string;
  album?: string;
  cover: string;
  artistImageUrl?: string;
  duration: string;
  isLiked?: boolean;
}

interface PlayerContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  progress: number;
  playTrack: (track: Track) => void;
  togglePlay: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  nowPlayingScreen: "hidden" | "mini" | "full" | "lyrics";
  setNowPlayingScreen: (screen: "hidden" | "mini" | "full" | "lyrics") => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const defaultTrack: Track = {
    id: "1",
    title: spotifyContextData.nowPlaying.songTitle,
    artist: spotifyContextData.nowPlaying.artistName,
    album: spotifyContextData.nowPlaying.albumName,
    cover: spotifyContextData.nowPlaying.coverUrl,
    artistImageUrl: spotifyContextData.nowPlaying.artistImageUrl,
    duration: spotifyContextData.nowPlaying.durationText,
    isLiked: spotifyContextData.nowPlaying.isLiked,
  };

  const [currentTrack, setCurrentTrack] = useState<Track | null>(defaultTrack);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 100
  const [nowPlayingScreen, setNowPlayingScreen] = useState<
    "hidden" | "mini" | "full" | "lyrics"
  >("mini");

  const playTrack = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    setNowPlayingScreen("full");
  };

  const togglePlay = () => setIsPlaying(!isPlaying);
  const nextTrack = () => {}; // Mock
  const prevTrack = () => {}; // Mock

  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        isPlaying,
        progress,
        playTrack,
        togglePlay,
        nextTrack,
        prevTrack,
        nowPlayingScreen,
        setNowPlayingScreen,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) throw new Error("usePlayer must be used within PlayerProvider");
  return context;
};
