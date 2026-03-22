import { spotifyContextData } from "../lib/mock-data";
import { motion } from "motion/react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const itemAnim = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function HomeScreen() {
  return (
    <div className="flex-1 overflow-y-auto pb-24 bg-[#121212]">
      <div className="p-4 pt-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-3 mb-6 overflow-x-auto no-scrollbar"
        >
          <img 
            src={spotifyContextData.user.avatarUrl} 
            alt={spotifyContextData.user.name}
            className="w-8 h-8 rounded-full object-cover shrink-0"
          />
          {["All", "Music", "Podcasts", "Audiobooks"].map((filter) => (
            <button
              key={filter}
              className="px-4 py-1.5 bg-[#282828] text-white text-sm font-medium rounded-full whitespace-nowrap hover:bg-[#333] transition-colors"
            >
              {filter}
            </button>
          ))}
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 gap-2 mb-8"
        >
          {spotifyContextData.homeScreen.recentPlaylists.map((item) => (
            <motion.div
              variants={itemAnim}
              key={item.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-[#282828]/50 hover:bg-[#282828] flex items-center rounded-md overflow-hidden gap-2 cursor-pointer transition-colors"
            >
              <img
                src={item.cover}
                alt={item.title}
                className="w-14 h-14 object-cover"
              />
              <span className="text-sm font-bold text-white truncate pr-2">
                {item.title}
              </span>
            </motion.div>
          ))}
        </motion.div>

        <Section title="Made For You" items={spotifyContextData.homeScreen.madeForYou} />
      </div>
    </div>
  );
}

function Section({ title, items }: { title: string; items: any[] }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4 }}
      className="mb-8"
    >
      <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="flex gap-4 overflow-x-auto no-scrollbar"
      >
        {items.map((item) => (
          <motion.div 
            variants={itemAnim}
            key={item.id} 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col gap-2 w-[140px] min-w-[140px] cursor-pointer"
          >
            <img
              src={item.cover}
              alt={item.title}
              className="w-[140px] h-[140px] object-cover rounded-md shadow-lg"
            />
            <div className="w-full">
              <div className="text-sm font-bold text-white truncate">
                {item.title}
              </div>
              <div className="text-sm text-neutral-400 truncate">
                {item.description}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
