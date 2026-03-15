import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { Home, Settings, ChevronRight } from "lucide-react";
import { GlassCard } from "./GlassCard";
import { EchoLogo } from "./EchoLogo";

const TIME_RANGES = ["1H", "6H", "1D", "1W", "1M"];

// Generate a pure sine wave path with many sample points for a perfectly smooth look
function generateSineWavePath(
  tick: number,
  phaseOffset: number,
  cycles: number,
  amplitude: number,  // 0–1 fraction of half-height
  W: number,
  H: number,
  padX = 18,
  padY = 16
): string {
  const samples = 160;
  const cx = W / 2;
  const cy = H / 2;
  const amp = amplitude * (H / 2 - padY);
  let d = "";
  for (let i = 0; i <= samples; i++) {
    const t = i / samples;
    const x = padX + t * (W - padX * 2);
    const y = cy + Math.sin(t * Math.PI * 2 * cycles - tick + phaseOffset) * amp;
    d += i === 0 ? `M ${x.toFixed(2)} ${y.toFixed(2)}` : ` L ${x.toFixed(2)} ${y.toFixed(2)}`;
  }
  return d;
}

interface ChartConfig {
  color: string;
  label: string;
  gradId: string;
  cycles: number;
  amplitude: number;
  phaseOffset: number;
  speed: number;
}

function FullChart({ configs, activeFilter, tick }: { configs: ChartConfig[]; activeFilter: string; tick: number }) {
  const W = 340;
  const H = 190;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 190, overflow: "visible" }}>
      <defs>
        {configs.map((c) => (
          <filter key={`glow-${c.gradId}`} id={`glow-${c.gradId}`} x="-20%" y="-60%" width="140%" height="220%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        ))}
      </defs>

      {configs.map((c) => {
        const isActive = activeFilter === "ALL" || activeFilter === c.label;
        const path = generateSineWavePath(tick * c.speed, c.phaseOffset, c.cycles, c.amplitude, W, H);
        return (
          <g key={c.label} style={{ transition: "opacity 0.5s ease" }} opacity={isActive ? 1 : 0.1}>
            {/* soft glow duplicate */}
            <path
              d={path}
              fill="none"
              stroke={c.color}
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.18"
            />
            {/* main crisp line */}
            <path
              d={path}
              fill="none"
              stroke={c.color}
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter={`url(#glow-${c.gradId})`}
            />
          </g>
        );
      })}
    </svg>
  );
}

function MiniStat({ label, value, change, changeColor }: { label: string; value: string; change: string; changeColor: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-slate-500 tracking-widest" style={{ fontSize: 10 }}>{label}</span>
      <span className="text-slate-800" style={{ fontSize: 26 }}>{value}</span>
      <span style={{ fontSize: 11, color: changeColor }}>{change}</span>
    </div>
  );
}

export function GraphPage() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [timeRange, setTimeRange] = useState("1D");
  const [socialVal, setSocialVal] = useState(258);
  const [ambientVal, setAmbientVal] = useState(72);
  const [tick, setTick] = useState(0);
  const animRef = useRef<number>();

  const filters = ["ALL", "SOCIAL", "AMBIENT", "NEUTRAL"];

  useEffect(() => {
    let t = 0;
    const animate = () => {
      t += 0.04;
      setTick(t);
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, []);

  const configs: ChartConfig[] = [
    { color: "#3B82F6", label: "SOCIAL",  gradId: "socialGrad",  cycles: 3,   amplitude: 0.72, phaseOffset: 0,               speed: 0.6  },
    { color: "#16A34A", label: "AMBIENT", gradId: "ambientGrad", cycles: 2.8, amplitude: 0.58, phaseOffset: Math.PI * 0.65,  speed: 0.5  },
    { color: "#7B8DA4", label: "NEUTRAL", gradId: "neutralGrad", cycles: 3.2, amplitude: 0.44, phaseOffset: Math.PI * 1.3,   speed: 0.7  },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setSocialVal((s) => s + Math.floor(Math.random() * 3));
      setAmbientVal((a) => Math.max(50, Math.min(99, a + Math.floor(Math.random() * 5) - 2)));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center px-4 pt-6 pb-28 min-h-full" style={{ fontFamily: "'Outfit', sans-serif" }}>
      <div className="w-full flex justify-between items-start mb-2">
        <button
          onClick={() => navigate("/")}
          className="w-10 h-10 flex items-center justify-center rounded-full border"
          style={{ background: "rgba(255,255,255,0.3)", borderColor: "rgba(255,255,255,0.5)" }}
        >
          <Home size={18} className="text-slate-600" />
        </button>
        <EchoLogo size={42} />
        <button
          onClick={() => navigate("/settings")}
          className="w-10 h-10 flex items-center justify-center rounded-full border"
          style={{ background: "rgba(255,255,255,0.3)", borderColor: "rgba(255,255,255,0.5)" }}
        >
          <Settings size={18} className="text-slate-600" />
        </button>
      </div>

      <h1 className="mt-4 mb-4 tracking-wider text-[#ffffff]" style={{ fontSize: 18, fontWeight: 300 }}>
        ANALYTICS
      </h1>

      <div className="flex gap-2 mb-4 w-full justify-center flex-wrap">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-4 py-1.5 rounded-full tracking-wider transition-all duration-300 ${
              activeFilter === f
                ? f === "SOCIAL"
                  ? "bg-blue-500/20 border border-blue-500/40 text-blue-700"
                  : f === "AMBIENT"
                  ? "bg-green-500/20 border border-green-500/40 text-green-700"
                  : f === "NEUTRAL"
                  ? "bg-slate-500/20 border border-slate-400/40 text-slate-700"
                  : "bg-slate-200/50 border border-slate-300 text-slate-800"
                : "bg-white/20 border border-white/30 text-slate-500"
            }`}
            style={{ fontSize: 11 }}
          >
            {f}
          </button>
        ))}
      </div>

      <GlassCard className="w-full p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-slate-600 tracking-widest" style={{ fontSize: 12 }}>SIGNAL ACTIVITY</span>
          <div className="flex items-center gap-3">
            {configs.map((c) => (
              <div key={c.label} className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full" style={{ background: c.color }} />
                <span className="text-slate-500" style={{ fontSize: 10 }}>{c.label}</span>
              </div>
            ))}
          </div>
        </div>

        <FullChart configs={configs} activeFilter={activeFilter} tick={tick} />

        <div className="flex justify-center gap-2 mt-3">
          {TIME_RANGES.map((t) => (
            <button
              key={t}
              onClick={() => setTimeRange(t)}
              className={`px-3 py-1 rounded-md transition-all duration-200 ${
                timeRange === t
                  ? "text-slate-800"
                  : "text-slate-400"
              }`}
              style={timeRange === t ? { fontSize: 12, background: "rgba(255,255,255,0.4)" } : { fontSize: 12 }}
            >
              {t}
            </button>
          ))}
        </div>
      </GlassCard>

      <div className="grid grid-cols-3 gap-3 w-full mb-4">
        <GlassCard className="p-3">
          <MiniStat label="SIGNALS" value={String(socialVal)} change="+ 12 this hour" changeColor="#2563EB" />
        </GlassCard>
        <GlassCard className="p-3">
          <MiniStat label="MOOD" value="Elated" change="+ 12% positive" changeColor="#16A34A" />
        </GlassCard>
        <GlassCard className="p-3">
          <MiniStat label="AMBIENT" value={`${ambientVal}%`} change="Stable" changeColor="#64748B" />
        </GlassCard>
      </div>

      <GlassCard className="w-full p-4">
        <button
          onClick={() => navigate("/color-key")}
          className="w-full flex items-center justify-between mb-0"
        >
          <span className="text-slate-600 tracking-widest" style={{ fontSize: 12 }}>COLOR BREAKDOWN</span>
          <ChevronRight size={16} className="text-slate-400" />
        </button>
        <div className="flex flex-col gap-3 mt-4">
          {[
            { label: "Elated", pct: 38, color: "#16A34A" },
            { label: "Focused", pct: 27, color: "#2563EB" },
            { label: "Calm", pct: 20, color: "#7C3AED" },
            { label: "Anxious", pct: 10, color: "#DC2626" },
            { label: "Other", pct: 5, color: "#64748B" },
          ].map((e) => (
            <div key={e.label}>
              <div className="flex justify-between mb-1">
                <span className="text-slate-700" style={{ fontSize: 13 }}>{e.label}</span>
                <span className="text-slate-500" style={{ fontSize: 13 }}>{e.pct}%</span>
              </div>
              <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: "rgba(0,0,0,0.08)" }}>
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${e.pct}%`, background: e.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}