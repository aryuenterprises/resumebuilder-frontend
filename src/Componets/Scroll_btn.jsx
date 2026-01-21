import React, { useEffect, useState } from 'react'
import { MdKeyboardDoubleArrowUp } from "react-icons/md";

const Scroll_btn = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // 👈 smooth scrolling
    });
  };

  return (
    <>
      {showButton && (
        <div className="fixed bottom-5 right-5 z-50">
          <button
            onClick={scrollToTop}
            className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300"
          >
            <MdKeyboardDoubleArrowUp className="text-2xl" />
          </button>
        </div>
      )}
    </>
  );
};

export default Scroll_btn;
