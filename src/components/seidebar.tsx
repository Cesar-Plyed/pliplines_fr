import { useState, Suspense, useTransition } from "react";
import { AnimatePresence, motion } from "framer-motion";
import FeedbackPoup from "./feedbackPoup";
import ErrorBoundary from "../utils/ErrorBoundary";

interface SidebarProps {
  children: React.ReactNode;
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ children, className }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handlePopupToggle = () => {
    startTransition(() => {
      setShowPopup(true);
    });
  };

  return (
    <ErrorBoundary>
      <div className={`w-full h-full bg-[#f8edcd] ${className || ""}`}>
        <ul>
          <li>Comida</li>
          <li>Bebidas</li>
          <li>
            <button onClick={handlePopupToggle} disabled={isPending}>
              {isPending ? "Loading..." : "Feedback"}
            </button>
          </li>
        </ul>
        <Suspense fallback={<div>Loading...</div>}>
          <AnimatePresence mode="wait">
            {showPopup && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
              >
                <FeedbackPoup
                  show={showPopup}
                  onClose={() => setShowPopup(false)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </Suspense>
        {children}
      </div>
    </ErrorBoundary>
  );
};

export default Sidebar;
