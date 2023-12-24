import React from "react"

interface Props {
  isMenuOpen: boolean;
  setIsMenuOpen: () => void;
}

function Hamburger({ isMenuOpen, setIsMenuOpen}: Props){
  const baseClass = "bg-secondary-muted block h-1 w-[32px] rounded transform transition-all duration-200 ease-in-out";

  return (
    <button 
      className="outline-none" 
      onClick={setIsMenuOpen}
      aria-label="Navigation Menu"
    >
      <div className="block relative">
        {/* top */}
        <span className={`${baseClass} mb-1 ${isMenuOpen && 'opacity-0'}`}></span>
        {/* two in the middle */}
        <span className={`${baseClass} absolute ${isMenuOpen && '-rotate-45'}`}></span>
        <span className={`${baseClass} absolute ${isMenuOpen && 'rotate-45'}`}></span>
        {/* bottom */}
        <span className={`${baseClass} mt-3 ${isMenuOpen && 'opacity-0'}`}></span>
      </div>
    </button>
  )
}

export default Hamburger;