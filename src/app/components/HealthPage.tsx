import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Home, Settings } from "lucide-react";
import { GlassCard } from "./GlassCard";
import { EchoLogo } from "./EchoLogo";

function HeartRateWave({ bpm }: { bpm: number }) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((o) => (o + 2) % 200);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <svg viewBox="0 0 200 60" className="w-full h-16">
      <defs>
        <linearGradient id="heartGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#16A34A" stopOpacity="0.2" />
          <stop offset="50%" stopColor="#16A34A" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#16A34A" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      <path
        d={`M ${-offset} 30 ${Array.from({ length: 10 }, (_, i) => {
          const base = i * 40 - offset;
          return `L ${base + 10} 30 L ${base + 15} 30 L ${base + 18} 15 L ${base + 22} 45 L ${base + 25} 25 L ${base + 28} 35 L ${base + 30} 30`;
        }).join(" ")}`}
        fill="none"
        stroke="url(#heartGrad)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BloodPressureBar({ systolic, diastolic }: { systolic: number; diastolic: number }) {
  // Map systolic value to position on the 80-180 scale
  const position = ((systolic - 80) / (180 - 80)) * 100;
  return (
    <div className="w-full mt-4">
      {/* Bar track */}
      <div className="relative h-3 rounded-full overflow-hidden" style={{ background: "rgba(0,0,0,0.06)" }}>
        {/* Gradient fill */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: "linear-gradient(90deg, #1274F3 0%, #4A9AF5 25%, #ffffff 45%, #e8dcc8 55%, #CBD5E1 75%, #94A3B8 100%)",
          }}
        />
        {/* Glowing indicator dot */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full"
          style={{
            left: `calc(${position}% - 7px)`,
            background: "#fff",
            boxShadow: "0 0 8px 2px rgba(18,116,243,0.5), 0 0 2px rgba(0,0,0,0.2)",
            border: "2px solid rgba(18,116,243,0.6)",
          }}
        />
      </div>
      {/* Scale labels */}
      <div className="flex justify-between mt-2 px-0.5">
        {[80, 100, 110, 120, 130, 150, 180].map((v) => (
          <span key={v} className="text-slate-400" style={{ fontSize: 10 }}>
            {v}
          </span>
        ))}
      </div>
    </div>
  );
}

export function HealthPage() {
  const navigate = useNavigate();
  const [heartRate, setHeartRate] = useState(73);
  const [systolic, setSystolic] = useState(118);
  const [diastolic, setDiastolic] = useState(78);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeartRate((h) => Math.max(60, Math.min(90, h + Math.floor(Math.random() * 5) - 2)));
      setSystolic((s) => Math.max(110, Math.min(130, s + Math.floor(Math.random() * 3) - 1)));
      setDiastolic((d) => Math.max(70, Math.min(85, d + Math.floor(Math.random() * 3) - 1)));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center px-4 pt-6 pb-28 min-h-full" style={{ fontFamily: "'Outfit', sans-serif" }}>
      {/* Header */}
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

      {/* Title */}
      <h1 className="mt-4 mb-4 tracking-wider text-[#ffffff]" style={{ fontSize: 18, fontWeight: 300 }}>
        BIOMETRIC HEALTH
      </h1>

      {/* Status Badge */}
      <div className="flex justify-center mb-2 mt-2">
        <div className="px-5 py-2 rounded-full border border-green-400/60" style={{ background: "rgba(34,197,94,0.25)" }}><span className="text-white tracking-[0.2em]" style={{ fontSize: 12, textShadow: "0 1px 4px rgba(0,0,0,0.3)" }}>NORMAL STATUS</span></div>
      </div>

      {/* Heart Rate Card */}
      <GlassCard className="w-full p-5">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-slate-500 tracking-[0.15em]" style={{ fontSize: 12 }}>
              HEART RATE
            </span>
            <div className="flex items-end gap-2 mt-2">
              <span className="text-slate-800" style={{ fontSize: 48, lineHeight: 1 }}>
                {heartRate}
              </span>
              <span className="text-slate-400 pb-1.5" style={{ fontSize: 16 }}>
                BPM
              </span>
            </div>
          </div>
          <div className="w-36">
            <GlassCard className="p-2">
              <HeartRateWave bpm={heartRate} />
            </GlassCard>
          </div>
        </div>
      </GlassCard>

      {/* Blood Pressure Card */}
      <GlassCard className="w-full p-5">
        <span className="text-slate-500 tracking-[0.15em]" style={{ fontSize: 12 }}>
          BLOOD PRESSURE
        </span>
        <div className="flex items-end gap-1 mt-2">
          <span className="text-slate-800" style={{ fontSize: 48, lineHeight: 1 }}>
            {systolic}
          </span>
          <span className="text-slate-400 pb-1" style={{ fontSize: 24 }}>
            / {diastolic}
          </span>
          <span className="text-slate-400 pb-1.5 ml-3" style={{ fontSize: 14 }}>
            mmHg
          </span>
        </div>
        <BloodPressureBar systolic={systolic} diastolic={diastolic} />
      </GlassCard>
    </div>
  );
}