import { Outlet, useLocation } from "react-router";
import { BottomNav } from "./BottomNav";

export function Layout() {
  const location = useLocation();
  const isVisionPage = location.pathname === "/vision";

  return (
    <div className="relative w-full h-dvh flex justify-center bg-[#cdd3de]">
      <div className="relative w-full max-w-[430px] h-full overflow-hidden">
        {/* Background */}
        {!isVisionPage && (
          <div className="absolute inset-0 pointer-events-none">
            {/* Base gradient */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(160deg, #d4dce8 0%, #c8cdd8 20%, #b8c0d0 40%, #e0e4ec 55%, #cdd3de 75%, #dde1ea 100%)",
              }}
            />

            {/* Dark blue-grey blob — top left */}
            <div
              className="absolute"
              style={{
                width: 340,
                height: 340,
                left: -60,
                top: -40,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(60,80,120,0.35) 0%, transparent 70%)",
                filter: "blur(35px)",
              }}
            />

            {/* Deep navy blob — center */}
            <div
              className="absolute"
              style={{
                width: 400,
                height: 400,
                left: "50%",
                top: "45%",
                transform: "translate(-50%, -50%)",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(40,50,70,0.4) 0%, transparent 65%)",
                filter: "blur(40px)",
              }}
            />

            {/* Blue-steel blob — top right */}
            <div
              className="absolute"
              style={{
                width: 300,
                height: 300,
                right: -50,
                top: -20,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(100,140,200,0.3) 0%, transparent 70%)",
                filter: "blur(30px)",
              }}
            />

            {/* Bright silver highlight — middle */}
            <div
              className="absolute"
              style={{
                width: 350,
                height: 280,
                left: "50%",
                top: "35%",
                transform: "translate(-50%, -50%)",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(220,225,240,0.7) 0%, transparent 60%)",
                filter: "blur(25px)",
              }}
            />

            {/* Light warm glow — bottom */}
            <div
              className="absolute"
              style={{
                width: 450,
                height: 260,
                left: "50%",
                bottom: -40,
                transform: "translateX(-50%)",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(200,210,225,0.6) 0%, transparent 65%)",
                filter: "blur(30px)",
              }}
            />
          </div>
        )}

        {/* Content */}
        <div className="relative w-full h-full overflow-y-auto overflow-x-hidden">
          <Outlet />
        </div>

        {/* Bottom Nav */}
        <BottomNav />
      </div>
    </div>
  );
}
