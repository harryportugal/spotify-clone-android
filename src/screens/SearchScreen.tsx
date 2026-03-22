import { Search as SearchIcon, Camera } from "lucide-react";
import { searchCategories } from "../mock-data";
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
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function SearchScreen() {
  return (
    <div className="flex-1 overflow-y-auto pb-24 bg-[#121212]">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="p-4 pt-12 sticky top-0 bg-[#121212] z-10"
      >
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-white">Search</h1>
          <Camera size={24} className="text-white" />
        </div>
        <div className="bg-white rounded-md flex items-center p-3 gap-2 shadow-lg">
          <SearchIcon size={24} className="text-neutral-800" />
          <input
            type="text"
            placeholder="What do you want to listen to?"
            className="bg-transparent text-neutral-800 font-medium w-full outline-none placeholder:text-neutral-500"
          />
        </div>
      </motion.div>

      <div className="p-4">
        <motion.h2 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-base font-bold text-white mb-4"
        >
          Browse all
        </motion.h2>
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 gap-4"
        >
          {searchCategories.map((cat) => (
            <motion.div
              variants={itemAnim}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              key={cat.id}
              className={`${cat.color} rounded-lg p-3 h-24 relative overflow-hidden cursor-pointer shadow-md`}
            >
              <span className="text-white font-bold text-base">
                {cat.title}
              </span>
              {/* Decorative rotated square to simulate category image */}
              <div className="absolute -bottom-2 -right-4 w-16 h-16 bg-black/20 rotate-[25deg] rounded-sm shadow-lg"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
