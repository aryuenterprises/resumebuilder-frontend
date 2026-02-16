import React from "react";

interface GradientButtonProps {
  text: string;
  textColor?: string; 
  gradientFrom?: string; 
  gradientTo?: string; 
  icon?: React.ReactNode;
  borderRadius?: string; 
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" ;
}

const GradientButton: React.FC<GradientButtonProps> = ({
  text,
  textColor = "text-white",
  gradientFrom = "from-[#c40116]",
  gradientTo = "to-[#c40116]/60",
  icon,
  borderRadius = "rounded-lg",
  onClick,
  className = "",
  type = "button",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        flex items-center justify-center gap-2
        "px-4 lg:px-5 py-1.5 lg:py-2 font-semibold
        bg-linear-to-r
        ${gradientFrom} ${gradientTo}
        ${textColor}
        ${borderRadius}
        transition-all duration-500 group relative
        cursor-pointer hover:shadow-lg hover:shadow-[#c40116]/25 
        ${className}
      `}
    >
         <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                      </div>
      {icon && <span className="flex relative items-center">{icon}</span>}
      {text}
    </button>
  );
};

export default GradientButton;
