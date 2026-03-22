import {
  ChevronDown,
  MoreHorizontal,
  Heart,
  Shuffle,
  SkipBack,
  Play,
  Pause,
  SkipForward,
  Repeat,
  Share2,
  ListMusic,
  MonitorSpeaker,
  CheckCircle2,
  PlaySquare,
  Plus,
  Languages,
  Maximize2,
} from "lucide-react";
import { usePlayer } from "../context/PlayerContext";
import { spotifyContextData } from "../lib/mock-data";
import { motion } from "motion/react";
import { useState, useEffect } from "react";

export default function NowPlayingScreen() {
  const {
    currentTrack,
    isPlaying,
    togglePlay,
    nowPlayingScreen,
    setNowPlayingScreen,
  } = usePlayer();

  const [activeLineIndex, setActiveLineIndex] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (nowPlayingScreen === "lyrics" && isPlaying) {
      interval = setInterval(() => {
        setActiveLineIndex((prev) => 
          prev < spotifyContextData.lyrics.lines.length - 1 ? prev + 1 : prev
        );
      }, 3000); // Advance every 3 seconds for demo purposes
    }
    return () => clearInterval(interval);
  }, [nowPlayingScreen, isPlaying]);

  if (
    !currentTrack ||
    nowPlayingScreen === "hidden" ||
    nowPlayingScreen === "mini"
  )
    return null;

  const isLyrics = nowPlayingScreen === "lyrics";

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className={`absolute inset-0 z-50 flex flex-col bg-[#121212] overflow-hidden`}
    >
      {/* Solid Background Gradient */}
      {!isLyrics && (
        <div className="absolute inset-0 bg-gradient-to-b from-[#1b4d7a] via-[#121212] to-[#121212] pointer-events-none" />
      )}

      {isLyrics ? (
        <div className="relative z-10 flex-1 p-6 pt-12 flex flex-col bg-[#1DB954] overflow-y-auto overflow-x-hidden no-scrollbar">
          <div className="flex items-center justify-between mb-8 shrink-0">
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={currentTrack.cover}
                alt="Cover"
                className="w-12 h-12 rounded-md object-cover shadow-lg shrink-0"
              />
              <div className="min-w-0">
                <h2 className="text-white font-bold text-lg truncate">
                  {currentTrack.title}
                </h2>
                <p className="text-white/70 font-medium text-sm truncate">
                  {currentTrack.artist}
                </p>
              </div>
            </div>
            <button
              onClick={() => setNowPlayingScreen("full")}
              className="bg-black/20 text-white px-3 py-1 rounded-full text-xs font-bold shrink-0 ml-4"
            >
              Cancel
            </button>
          </div>
          <div className="flex-1 flex flex-col gap-4 pb-12">
            {spotifyContextData.lyrics.lines.map((line, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0.5 }}
                animate={{ 
                  opacity: index <= activeLineIndex ? 1 : 0.5,
                  color: index === activeLineIndex ? "#ffffff" : "rgba(255,255,255,0.5)"
                }}
                transition={{ duration: 0.3 }}
                className="text-3xl font-bold tracking-tight min-h-[2.5rem]"
              >
                {line}
              </motion.p>
            ))}
          </div>
          {/* Mini controls for lyrics view */}
          <div className="mt-8 mb-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-4 min-w-0">
              <button
                onClick={togglePlay}
                className="w-12 h-12 bg-white rounded-full flex items-center justify-center shrink-0"
              >
                {isPlaying ? (
                  <Pause size={24} className="fill-black text-black" />
                ) : (
                  <Play size={24} className="fill-black text-black" />
                )}
              </button>
              <div className="flex flex-col min-w-0">
                <span className="text-white text-xs font-bold truncate">
                  {currentTrack.title}
                </span>
                <span className="text-white/70 text-[10px] truncate">
                  {currentTrack.artist}
                </span>
              </div>
            </div>
            <div className="flex gap-4 text-white shrink-0 ml-4">
              <Share2 size={20} />
            </div>
          </div>
        </div>
      ) : (
        <div className="relative z-10 flex-1 overflow-y-auto overflow-x-hidden no-scrollbar flex flex-col">
          {/* Header - Now inside the scrollable container */}
          <div className="flex items-center justify-between px-4 pt-4 pb-2 shrink-0">
            <button
              onClick={() => setNowPlayingScreen("mini")}
              className="text-white p-2 shrink-0"
            >
              <ChevronDown size={28} />
            </button>
            <div className="flex flex-col items-center min-w-0 px-2">
              <span className="text-[10px] font-medium text-white tracking-widest uppercase truncate max-w-full">
                Playing from playlist
              </span>
              <span className="text-xs font-bold text-white truncate max-w-full">
                {spotifyContextData.homeScreen.recentPlaylists[4].title}
              </span>
            </div>
            <button className="text-white p-2 shrink-0">
              <MoreHorizontal size={24} />
            </button>
          </div>

          <div className="px-6 pb-12 flex flex-col">
            {/* Artwork */}
            <div className="w-full max-w-[360px] mx-auto aspect-square mb-4 flex items-center justify-center shrink-0">
              <img
                src={currentTrack.cover}
                alt="Cover"
                className="w-full h-full object-cover rounded-md shadow-2xl"
              />
            </div>

            {/* Info & Controls */}
            <div className="flex flex-col shrink-0">
              <div className="mb-2">
                <button className="bg-white/10 hover:bg-white/20 transition-colors text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-2 w-fit">
                  <PlaySquare size={16} />
                  Mudar para vídeo
                </button>
              </div>

              <div className="flex items-center justify-between mb-3">
                <div className="flex-1 pr-4 min-w-0">
                  <h2 className="text-white font-bold text-[28px] leading-tight mb-1 truncate">
                    {currentTrack.title}
                  </h2>
                  <div className="flex items-center gap-2">
                    <span className="bg-neutral-400 text-black text-[10px] font-bold px-1 rounded-sm">E</span>
                    <p className="text-neutral-400 font-medium text-lg truncate">
                      {currentTrack.artist}
                    </p>
                  </div>
                </div>
                <button className="text-[#1DB954] shrink-0">
                  <CheckCircle2 size={32} className="fill-[#1DB954] text-black" />
                </button>
              </div>

              {/* Progress */}
              <div className="mb-3">
                <div className="h-1 bg-white/20 rounded-full w-full mb-2 group cursor-pointer">
                  <div className="h-full bg-white rounded-full w-1/3 relative">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-neutral-400 font-medium">
                  <span>1:15</span>
                  <span>{currentTrack.duration}</span>
                </div>
              </div>

              {/* Playback Controls */}
              <div className="flex items-center justify-between mb-4">
                <motion.button whileTap={{ scale: 0.8 }} className="text-[#1DB954] shrink-0">
                  <Shuffle size={24} />
                </motion.button>
                <motion.button whileTap={{ scale: 0.8 }} className="text-white shrink-0">
                  <SkipBack size={36} className="fill-white" />
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={togglePlay}
                  className="w-[72px] h-[72px] bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform shrink-0"
                >
                  {isPlaying ? (
                    <Pause size={32} className="fill-black text-black" />
                  ) : (
                    <Play size={32} className="fill-black text-black" />
                  )}
                </motion.button>
                <motion.button whileTap={{ scale: 0.8 }} className="text-white shrink-0">
                  <SkipForward size={36} className="fill-white" />
                </motion.button>
                <motion.button whileTap={{ scale: 0.8 }} className="text-neutral-400 hover:text-white transition-colors shrink-0">
                  <Repeat size={24} />
                </motion.button>
              </div>

              {/* Bottom Actions */}
              <div className="flex items-center justify-between text-neutral-400 mb-6">
                <button className="hover:text-white transition-colors shrink-0">
                  <MonitorSpeaker size={20} />
                </button>
                <div className="flex gap-6 shrink-0">
                  <button className="hover:text-white transition-colors">
                    <Share2 size={20} />
                  </button>
                  <button className="hover:text-white transition-colors">
                    <ListMusic size={20} />
                  </button>
                </div>
              </div>

              {/* Related Track Card */}
              <div className="bg-[#282828] rounded-2xl p-4 mb-4 shrink-0">
                <h3 className="text-white font-bold text-sm mb-3">Faixa relacionada</h3>
                <div className="flex items-center justify-between bg-white/5 rounded-xl p-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <img src={currentTrack.cover} alt="Related" className="w-14 h-14 rounded-md object-cover shrink-0" />
                    <div className="min-w-0">
                      <h4 className="text-white font-bold text-base truncate">Te Amo Amor</h4>
                      <p className="text-neutral-400 text-xs truncate">Música • Harry P.</p>
                    </div>
                  </div>
                  <button className="text-neutral-400 hover:text-white shrink-0 ml-2">
                    <Plus size={24} />
                  </button>
                </div>
              </div>

              {/* Lyrics Card */}
              <div
                onClick={() => setNowPlayingScreen("lyrics")}
                className="bg-[#3A7A94] rounded-2xl p-4 cursor-pointer shadow-lg active:scale-[0.98] transition-transform shrink-0 mb-4"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-white font-bold text-base tracking-wide">Letra</h3>
                  <div className="flex gap-3 text-white">
                    <button className="bg-black/20 p-1.5 rounded-full"><Languages size={16} /></button>
                    <button className="bg-black/20 p-1.5 rounded-full"><Share2 size={16} /></button>
                    <button className="bg-black/20 p-1.5 rounded-full"><Maximize2 size={16} /></button>
                  </div>
                </div>
                <p className="text-white font-bold text-2xl leading-relaxed line-clamp-6 break-words">
                  {spotifyContextData.lyrics.lines.filter(l => l.trim() !== "").slice(0, 4).map((line, i) => (
                    <span key={i}>{line}<br/></span>
                  ))}
                </p>
              </div>

              {/* Related Videos */}
              <div className="bg-[#282828] rounded-2xl p-4 mb-4 shrink-0">
                <h3 className="text-white font-bold text-base mb-4">Videoclipes relacionados</h3>
                <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                  <div className="w-[240px] shrink-0">
                    <div className="relative aspect-video rounded-lg overflow-hidden mb-2">
                      <img src={currentTrack.cover} alt="Video" className="w-full h-full object-cover" />
                      <div className="absolute top-2 right-2 bg-black/70 text-white text-xs font-bold px-1.5 py-0.5 rounded">04:03</div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                          <Play size={20} className="fill-black text-black" />
                        </div>
                      </div>
                    </div>
                    <h4 className="text-white font-bold text-sm truncate">Come As You Are - Live</h4>
                    <p className="text-neutral-400 text-xs truncate">{currentTrack.artist}</p>
                  </div>
                  <div className="w-[240px] shrink-0">
                    <div className="relative aspect-video rounded-lg overflow-hidden mb-2 bg-neutral-800">
                      <img src={currentTrack.cover} alt="Video" className="w-full h-full object-cover opacity-50" />
                    </div>
                    <h4 className="text-white font-bold text-sm truncate">Come As You Are</h4>
                    <p className="text-neutral-400 text-xs truncate">{currentTrack.artist}</p>
                  </div>
                </div>
              </div>

              {/* About Artist */}
              <div className="bg-[#282828] rounded-2xl overflow-hidden mb-4 shrink-0">
                <div className="relative h-64">
                  <img src={currentTrack.artistImageUrl || currentTrack.cover} alt="Artist" className="w-full h-full object-cover object-top" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <h3 className="absolute top-4 left-4 text-white font-bold text-lg">Sobre o artista</h3>
                </div>
                <div className="p-4">
                  <p className="text-neutral-400 text-xs font-medium mb-1">N.º 120 no mundo</p>
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-white font-bold text-2xl">{currentTrack.artist}</h4>
                    <button className="border border-white/50 text-white text-xs font-bold px-4 py-1.5 rounded-full hover:scale-105 transition-transform">
                      Seguir
                    </button>
                  </div>
                  <p className="text-neutral-400 text-sm mb-4">30,5 mi ouvintes mensais</p>
                  <p className="text-neutral-300 text-sm line-clamp-3">
                    Nirvana was an American rock band formed in Aberdeen, Washington, in 1987. Founded by lead singer and guitarist Kurt Cobain... <span className="text-white font-bold cursor-pointer">Veja mais</span>
                  </p>
                </div>
              </div>

              {/* Discover Artist */}
              <div className="bg-[#282828] rounded-2xl p-4 mb-4 shrink-0">
                <h3 className="text-white font-bold text-base mb-4">Conheça {currentTrack.artist}</h3>
                <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                  <div className="w-32 h-48 rounded-lg overflow-hidden relative shrink-0">
                    <img src={currentTrack.artistImageUrl || currentTrack.cover} alt="Discover" className="w-full h-full object-cover object-top" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-3">
                      <span className="text-white font-bold text-sm leading-tight">Músicas de {currentTrack.artist}</span>
                    </div>
                  </div>
                  <div className="w-32 h-48 rounded-lg overflow-hidden relative shrink-0">
                    <img src={currentTrack.cover} alt="Discover" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-3">
                      <span className="text-white font-bold text-sm leading-tight">Parecidas com {currentTrack.artist}</span>
                    </div>
                  </div>
                  <div className="w-32 h-48 rounded-lg overflow-hidden relative shrink-0">
                    <img src={currentTrack.cover} alt="Discover" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-3">
                      <span className="text-white font-bold text-sm leading-tight">Parecidas com Come A...</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Credits */}
              <div className="bg-[#282828] rounded-2xl p-4 shrink-0">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-white font-bold text-base">Créditos</h3>
                  <button className="text-white text-xs font-bold hover:underline">Mostrar tudo</button>
                </div>
                
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h4 className="text-white font-bold text-base mb-0.5">{currentTrack.artist}</h4>
                    <p className="text-neutral-400 text-sm">Artista principal • Composição • Let...</p>
                  </div>
                  <button className="border border-white/50 text-white text-xs font-bold px-4 py-1.5 rounded-full hover:scale-105 transition-transform">
                    Seguir
                  </button>
                </div>

                <div className="mb-6">
                  <h4 className="text-white font-bold text-base mb-0.5">Kurt Cobain</h4>
                  <p className="text-neutral-400 text-sm">Composição • Letrista</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
