import { Play, Pause, MonitorSpeaker, CheckCircle2 } from "lucide-react";
import { usePlayer } from "../context/PlayerContext";
import { motion } from "motion/react";

export default function MiniPlayer() {
  const { currentTrack, isPlaying, togglePlay, nowPlayingScreen, setNowPlayingScreen } =
    usePlayer();

  if (!currentTrack || nowPlayingScreen !== "mini") return null;

  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 20, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="px-2 pb-1 z-40 relative"
    >
      <motion.div
        whileTap={{ scale: 0.98 }}
        onClick={() => setNowPlayingScreen("full")}
        className="bg-[#0a1c23] rounded-md flex items-center p-2 gap-3 cursor-pointer relative overflow-hidden shadow-lg"
      >
        <img
          src={currentTrack.cover}
          alt="Cover"
          className="w-10 h-10 rounded-md object-cover"
        />
        <div className="flex-1 overflow-hidden">
          <div className="text-sm font-bold text-white truncate">
            {currentTrack.title}
          </div>
          <div className="text-xs text-neutral-400 truncate">
            {currentTrack.artist}
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button className="text-white p-2">
            <MonitorSpeaker size={20} />
          </button>
          <button className="text-[#1DB954] p-2">
            <CheckCircle2 size={24} className="fill-[#1DB954] text-black" />
          </button>
          <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={(e) => {
              e.stopPropagation();
              togglePlay();
            }}
            className="text-white p-2"
          >
            {isPlaying ? (
              <Pause size={24} className="fill-white" />
            ) : (
              <Play size={24} className="fill-white" />
            )}
          </motion.button>
        </div>
        
        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/20">
          <div className="h-full bg-white w-1/3 rounded-r-full" />
        </div>
      </motion.div>
    </motion.div>
  );
}
