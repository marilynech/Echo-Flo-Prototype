import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { Settings, Users, Hexagon, Radio, ChevronRight, Heart, Activity } from "lucide-react";
import { GlassCard } from "./GlassCard";
import { EchoLogo } from "./EchoLogo";
import imgGlasses from "figma:asset/02814927535adfce0124e346010f41ee8018e48a.png";

// Generate a smooth wave Y value from layered sine waves that scroll continuously
function waveY(x: number, t: number, seed: number) {
  return (
    Math.sin(x * 0.025 + t * 1.2 + seed) * 22 +
    Math.sin(x * 0.04 + t * 0.8 + seed * 1.7) * 14 +
    Math.sin(x * 0.015 + t * 1.6 + seed * 0.5) * 10 +
    Math.cos(x * 0.035 + t * 0.5 + seed * 2.1) * 8
  );
}

// Build a smooth cubic-bezier SVG path through sampled wave points
function buildSmoothPath(points: { x: number; y: number }[]) {
  if (points.length < 2) return "";
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(i - 1, 0)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(i + 2, points.length - 1)];
    const tension = 0.35;
    const cp1x = p1.x + (p2.x - p0.x) * tension;
    const cp1y = p1.y + (p2.y - p0.y) * tension;
    const cp2x = p2.x - (p3.x - p1.x) * tension;
    const cp2y = p2.y - (p3.y - p1.y) * tension;
    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  }
  return d;
}

function DashboardChart({ activeFilter }: { activeFilter: string }) {
  const tickRef = useRef(0);
  const animRef = useRef<number>();
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    const animate = () => {
      tickRef.current += 0.018;
      forceUpdate((n) => n + 1);
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, []);

  const t = tickRef.current;

  const W = 320;
  const H = 180;
  const padX = 10;
  const midY = H * 0.48;
  const numPoints = 60;

  const colors: Record<string, { main: string; secondary: string; seed: number }> = {
    NEUTRAL: { main: "#7B8DA4", secondary: "#5A6B82", seed: 0 },
    SOCIAL: { main: "#3B82F6", secondary: "#2563EB", seed: 3.5 },
    AMBIENT: { main: "#16A34A", secondary: "#15803D", seed: 7 },
  };
  const c = colors[activeFilter] || colors.SOCIAL;

  // Sample main wave points — x shifts with time for continuous scrolling
  const points: { x: number; y: number }[] = [];
  for (let i = 0; i <= numPoints; i++) {
    const px = padX + (i / numPoints) * (W - padX * 2);
    const py = midY + waveY(px + t * 60, t, c.seed);
    points.push({ x: px, y: Math.max(10, Math.min(H - 10, py)) });
  }

  // Secondary ghost wave (offset phase)
  const points2: { x: number; y: number }[] = [];
  for (let i = 0; i <= numPoints; i++) {
    const px = padX + (i / numPoints) * (W - padX * 2);
    const py = midY + waveY(px + t * 60 + 30, t + 0.8, c.seed + 1.5) * 0.7;
    points2.push({ x: px, y: Math.max(10, Math.min(H - 10, py)) });
  }

  const mainPath = buildSmoothPath(points);
  const secondPath = buildSmoothPath(points2);
  const areaPath = `${mainPath} L ${points[points.length - 1].x} ${H} L ${points[0].x} ${H} Z`;
  const dotPoints = points.filter((_, i) => i % 8 === 0);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-40">
      <defs>
        <linearGradient id="chartGrad1" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={c.secondary} stopOpacity="0.4" />
          <stop offset="100%" stopColor={c.main} stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="chartGrad2" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={c.main} stopOpacity="0.6" />
          <stop offset="100%" stopColor={c.main} />
        </linearGradient>
        <linearGradient id="chartAreaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={c.main} stopOpacity="0.25" />
          <stop offset="100%" stopColor={c.main} stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Area fill under main wave */}
      <path d={areaPath} fill="url(#chartAreaGrad)" />
      {/* Secondary ghost wave */}
      <path
        d={secondPath}
        fill="none"
        stroke="url(#chartGrad1)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.35}
      />
      {/* Main wave */}
      <path
        d={mainPath}
        fill="none"
        stroke="url(#chartGrad2)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ filter: `drop-shadow(0 0 8px ${c.main})` }}
      />
      {/* Glowing dots riding the wave */}
      {dotPoints.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r="3"
          fill={c.main}
          style={{ filter: `drop-shadow(0 0 4px ${c.main})` }}
        />
      ))}
    </svg>
  );
}

export function HomePage() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("SOCIAL");
  const [signals, setSignals] = useState(258);
  const filters = ["NEUTRAL", "SOCIAL", "AMBIENT"];

  useEffect(() => {
    const interval = setInterval(() => {
      setSignals((s) => s + Math.floor(Math.random() * 3));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center px-4 pt-6 pb-28 min-h-full" style={{ fontFamily: "'Outfit', sans-serif" }}>
      {/* Header */}
      <div className="w-full flex justify-between items-start mb-2">
        <div className="w-10" />
        <EchoLogo size={42} />
        <button
          onClick={() => navigate("/settings")}
          className="w-10 h-10 flex items-center justify-center rounded-full border"
          style={{ background: "rgba(255,255,255,0.3)", borderColor: "rgba(255,255,255,0.5)" }}
        >
          <Settings size={18} className="text-slate-600" />
        </button>
      </div>

      {/* Welcome */}
      <h1
        className="text-white mt-4 mb-4"
        style={{ fontSize: 28, fontWeight: 300 }}
      >
        Welcome Back!
      </h1>

      {/* Dashboard Chart Card */}
      <GlassCard className="w-full p-4 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="flex gap-1">
            <div className="w-1 h-3 bg-slate-400 rounded-full" />
            <div className="w-1 h-4 bg-slate-500 rounded-full" />
            <div className="w-1 h-3 bg-slate-400 rounded-full" />
          </div>
          <span className="text-slate-600 tracking-widest" style={{ fontSize: 12 }}>
            ZARIF'S DASHBOARD
          </span>
        </div>

        <DashboardChart activeFilter={activeFilter} />

        {/* Filters */}
        <div className="flex justify-center gap-3 mt-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-1.5 rounded-full text-xs tracking-wider transition-all duration-300 ${
                activeFilter === f
                  ? f === "AMBIENT"
                    ? "bg-green-500/20 border border-green-500/40 text-green-700"
                    : f === "SOCIAL"
                    ? "bg-blue-500/20 border border-blue-500/40 text-blue-700"
                    : "bg-slate-500/20 border border-slate-400/40 text-slate-700"
                  : "bg-white/20 border border-white/30 text-slate-500"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </GlassCard>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-3 w-full mb-2 mt-1">
        <GlassCard className="p-3 text-center cursor-pointer transition-colors">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Users size={12} className="text-slate-500" />
            <span className="text-slate-500 tracking-wider" style={{ fontSize: 10 }}>
              SIGNALS
            </span>
          </div>
          <div className="text-slate-800" style={{ fontSize: 28 }}>
            {signals}
          </div>
          <div className="text-slate-500" style={{ fontSize: 11 }}>
            + 12 this hour
          </div>
        </GlassCard>

        <GlassCard className="p-3 text-center cursor-pointer transition-colors">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Hexagon size={12} className="text-slate-500" />
            <span className="text-slate-500 tracking-wider" style={{ fontSize: 10 }}>
              SPACES
            </span>
          </div>
          <div className="text-slate-800 text-center" style={{ fontSize: 28 }}>
            Elated
          </div>
          <div className="text-slate-500" style={{ fontSize: 11 }}>
            + 12% positive
          </div>
        </GlassCard>

        <GlassCard className="p-3 text-center cursor-pointer transition-colors">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Radio size={12} className="text-slate-500" />
            <span className="text-slate-500 tracking-wider" style={{ fontSize: 10 }}>
              NODES
            </span>
          </div>
          <div className="text-slate-800" style={{ fontSize: 28 }}>
            3
          </div>
          <div className="text-slate-500" style={{ fontSize: 11 }}>
            Connected
          </div>
        </GlassCard>
      </div>

      {/* Vision System Card */}
      <GlassCard className="w-full p-4 cursor-pointer mb-4" onClick={() => navigate("/vision")}>
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mx-[0px] my-[14px] ml-[14px]">
              <div className="w-5 h-5 rounded-full border border-slate-400/50 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-slate-500" />
              </div>
              <span className="text-slate-700 tracking-widest" style={{ fontSize: 12 }}>
                VISION SYSTEM
              </span>
            </div>
            <div className="flex items-center gap-2 ml-[24px] mr-[50px] mt-[20px] mb-[0px]">
              <div
                className="rounded-lg px-3 py-[4px] flex items-center gap-1.5"
                style={{
                  background: "rgba(255,255,255,0.35)",
                  border: "1px solid rgba(255,255,255,0.5)",
                }}
              >
                {/* Battery icon */}
                <div className="flex items-center gap-0.5">
                  <div
                    className="relative rounded-sm overflow-hidden"
                    style={{ width: 22, height: 11, border: "1.5px solid #30752F", background: "rgba(255,255,255,0.2)" }}
                  >
                    <div
                      className="absolute top-0 left-0 h-full rounded-sm"
                      style={{ width: "83%", background: "linear-gradient(90deg, #30752F, #5ADB58)" }}
                    />
                  </div>
                  {/* Battery tip */}
                  <div
                    className="rounded-r-sm"
                    style={{ width: 3, height: 5, background: "#30752F" }}
                  />
                </div>
                <span style={{ fontSize: 11 }} className="text-slate-700 tracking-wider">
                  83%
                </span>
              </div>
              <div
                className="w-2 h-6 rounded-sm"
                style={{
                  background: "linear-gradient(180deg, #30752F, white)",
                }}
              />
            </div>
          </div>
          <div className="flex flex-col items-center mx-[0px] mt-[-5px] mb-[0px]">
            <img
              src={imgGlasses}
              alt="Echo Lens"
              className="w-28 h-auto object-contain mx-[30px] my-[-60px]"
            />
            <span className="text-slate-600 tracking-widest text-center mx-[0px] mt-[45px] mb-[20px]" style={{ fontSize: 11 }}>
              ECHO LENS
            </span>
          </div>
        </div>
      </GlassCard>

      {/* Mini Biometric Health Panel */}
      <GlassCard className="w-full p-4 cursor-pointer" onClick={() => navigate("/health")}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 ml-[14px]">
            <Heart size={14} className="text-green-600" />
            <span className="text-slate-700 tracking-widest" style={{ fontSize: 11 }}>
              BIOMETRIC HEALTH
            </span>
          </div>
          <ChevronRight size={14} className="text-slate-400" />
        </div>

        {/* Status */}
        <div className="flex justify-center mb-7 mt-5">
          <div className="rounded-full bg-green-500/15 border border-green-500/30 mx-[20px] my-[0px] px-[20px] py-[5px]">
            <span className="text-green-700 tracking-widest" style={{ fontSize: 9 }}>NORMAL STATUS</span>
          </div>
        </div>

        {/* Heart Rate + BP side by side */}
        <div className="grid grid-cols-2 gap-3">
          {/* Heart Rate */}
          <div className="rounded-xl p-3" style={{ background: "rgba(255,255,255,0.25)", border: "1px solid rgba(255,255,255,0.4)" }}>
            <div className="flex items-center gap-1 mb-1">
              <Activity size={10} className="text-green-600" />
              <span className="text-slate-500 tracking-wider" style={{ fontSize: 8 }}>HEART RATE</span>
            </div>
            <div className="flex items-end gap-1">
              <span className="text-slate-800" style={{ fontSize: 28, lineHeight: 1 }}>73</span>
              <span className="text-slate-500 pb-0.5" style={{ fontSize: 10 }}>BPM</span>
            </div>
            {/* Mini ECG line */}
            <svg viewBox="0 0 120 30" className="w-full mt-1" style={{ height: 24 }}>
              <defs>
                <linearGradient id="miniEcgGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#16A34A" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="#16A34A" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#16A34A" stopOpacity="0.2" />
                </linearGradient>
              </defs>
              <path
                d="M 0 15 L 15 15 L 20 15 L 25 5 L 30 25 L 35 10 L 38 18 L 42 15 L 55 15 L 60 15 L 65 5 L 70 25 L 75 10 L 78 18 L 82 15 L 95 15 L 100 15 L 105 5 L 110 25 L 115 10 L 118 18 L 120 15"
                fill="none"
                stroke="url(#miniEcgGrad)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Blood Pressure */}
          <div className="rounded-xl p-3" style={{ background: "rgba(255,255,255,0.25)", border: "1px solid rgba(255,255,255,0.4)" }}>
            <div className="flex items-center gap-1 mb-1">
              <Heart size={10} className="text-blue-600" />
              <span className="text-slate-500 tracking-wider" style={{ fontSize: 8 }}>BLOOD PRESSURE</span>
            </div>
            <div className="flex items-end gap-0.5">
              <span className="text-slate-800" style={{ fontSize: 28, lineHeight: 1 }}>118</span>
              <span className="text-slate-500 pb-0.5" style={{ fontSize: 14 }}>/78</span>
            </div>
            <span className="text-slate-500 block mt-1" style={{ fontSize: 9 }}>mmHg</span>
            {/* Mini pressure bar */}
            <div className="w-full h-1.5 rounded-full mt-1.5 overflow-hidden" style={{ background: "rgba(0,0,0,0.08)" }}>
              <div
                className="h-full rounded-full"
                style={{
                  width: "38%",
                  background: "linear-gradient(90deg, #1274F3, #60A5FA)",
                }}
              />
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}