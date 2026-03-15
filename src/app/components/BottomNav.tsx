import { useNavigate, useLocation } from "react-router";
import { Home, BarChart3, Heart } from "lucide-react";

const navItems = [
  { icon: Home, path: "/", label: "Home" },
  { icon: BarChart3, path: "/graph", label: "Graph" },
  { icon: Heart, path: "/health", label: "Health" },
];

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-4 px-4">
      <div
        className="flex items-center gap-2 rounded-full px-4 py-3"
        style={{
          background: "rgba(255,255,255,0.45)",
          border: "1px solid rgba(255,255,255,0.6)",
          backdropFilter: "blur(30px)",
          WebkitBackdropFilter: "blur(30px)",
          boxShadow: "inset 0 1px 1px rgba(255,255,255,0.5), 0 8px 32px rgba(0,0,0,0.1)",
        }}
      >
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex items-center justify-center rounded-full p-3 transition-all duration-300 ${
                isActive
                  ? "shadow-inner"
                  : "opacity-50 hover:opacity-100"
              }`}
              style={
                isActive
                  ? {
                      background: "rgba(60,80,120,0.15)",
                      border: "1px solid rgba(60,80,120,0.2)",
                    }
                  : undefined
              }
            >
              <item.icon
                size={22}
                className={isActive ? "text-slate-800" : "text-slate-600"}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}