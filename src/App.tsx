/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { PlayerProvider, usePlayer } from "./context/PlayerContext";
import BottomNav from "./components/BottomNav";
import MiniPlayer from "./components/MiniPlayer";
import HomeScreen from "./screens/HomeScreen";
import SearchScreen from "./screens/SearchScreen";
import NowPlayingScreen from "./screens/NowPlayingScreen";
import { AnimatePresence, motion } from "motion/react";

function MainLayout() {
  const [currentTab, setCurrentTab] = useState("home");
  const { nowPlayingScreen } = usePlayer();
  const showBottomNav = nowPlayingScreen === "mini" || nowPlayingScreen === "hidden";

  return (
    <div className="w-full min-h-[100dvh] overflow-x-hidden relative bg-[#121212] flex flex-col">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="flex-1 flex flex-col w-full overflow-hidden"
        >
          {currentTab === "home" && <HomeScreen />}
          {currentTab === "search" && <SearchScreen />}
          {currentTab === "create" && (
            <div className="flex-1 flex items-center justify-center text-white">
              Criar
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {showBottomNav && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute bottom-0 left-0 right-0 flex flex-col z-[60] pt-12"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent -z-10 pointer-events-none" />
            <MiniPlayer />
            <BottomNav currentTab={currentTab} setCurrentTab={setCurrentTab} />
          </motion.div>
        )}
      </AnimatePresence>

      <NowPlayingScreen />
    </div>
  );
}

export default function App() {
  return (
    <PlayerProvider>
      <div className="w-full min-h-[100dvh] bg-black">
        <MainLayout />
      </div>
    </PlayerProvider>
  );
}
