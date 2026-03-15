import React from "react";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function GlassCard({ children, className = "", onClick }: GlassCardProps) {
  return (
    <div
      onClick={onClick}
      className={`relative rounded-2xl shadow-lg ${className} px-[10px] py-[30px] mx-[0px] my-[20px]`}
      style={{
        background: "rgba(255,255,255,0.35)",
        border: "1px solid rgba(255,255,255,0.5)",
        backdropFilter: "blur(30px)",
        WebkitBackdropFilter: "blur(30px)",
        boxShadow:
          "inset 0 1px 2px rgba(255,255,255,0.6), 0 4px 24px rgba(0,0,0,0.08)",
      }}
    >
      {children}
    </div>
  );
}
