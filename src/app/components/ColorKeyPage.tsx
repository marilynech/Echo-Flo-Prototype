import { useNavigate } from "react-router";
import { ArrowLeft, BarChart3 } from "lucide-react";
import { EchoLogo } from "./EchoLogo";

const colorData = [
  {
    title: "SOCIAL (BLUE)",
    bgColor: "rgba(59, 130, 246, 0.4)",
    borderColor: "rgba(59, 130, 246, 0.55)",
    glowColor: "#3B82F6",
    textColor: "#1D4ED8",
    means:
      'The sensors detect a calm, low-energy environment. No intense social pressure is present.',
    feeling:
      'This is your "Safe Zone." Use this color to find quiet corners in a room or to recalibrate your own "Social Battery" before re-engaging.',
  },
  {
    title: "FRICTION (RED)",
    bgColor: "rgba(220, 38, 38, 0.35)",
    borderColor: "rgba(220, 38, 38, 0.5)",
    glowColor: "#DC2626",
    textColor: "#B91C1C",
    means:
      "The LiDAR detects rapid movements or rPPG shows a sudden spike in heart rate/vocal pitch.",
    feeling:
      'Overstimulation or tension. This is a gentle nudge from EchoFlo to take a deep breath, adjust your physical space, or initiate a "Co-Regulation" break.',
  },
  {
    title: "AMBIENT (GREEN)",
    bgColor: "rgba(22, 163, 74, 0.35)",
    borderColor: "rgba(22, 163, 74, 0.5)",
    glowColor: "#16A34A",
    textColor: "#15803D",
    means:
      "Your biometrics (heart rate and breath) are syncing with the person you are interacting with.",
    feeling:
      'You are "In the flow." This color indicates a safe, productive, and deep social connection where communication feels effortless.',
  },
  {
    title: "NEUTRAL (GREY)",
    bgColor: "rgba(100, 116, 139, 0.35)",
    borderColor: "rgba(100, 116, 139, 0.5)",
    glowColor: "#64748B",
    textColor: "#1E293B",
    means:
      'The "unknown" or the "baseline." Data is being gathered, but no significant emotional "echo" has been established yet.',
    feeling:
      'Potential. This represents a "clean slate" where you can observe the room\'s energy before the colors begin to shift into a specific resonance.',
  },
];

export function ColorKeyPage() {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col items-center px-4 pt-6 pb-28 min-h-full"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      {/* Header */}
      <div className="w-full flex justify-between items-start mb-2">
        <button
          onClick={() => navigate("/graph")}
          className="w-10 h-10 flex items-center justify-center rounded-full border"
          style={{ background: "rgba(255,255,255,0.3)", borderColor: "rgba(255,255,255,0.5)" }}
        >
          <ArrowLeft size={18} className="text-slate-600" />
        </button>
        <EchoLogo size={42} />
        <button
          onClick={() => navigate("/graph")}
          className="w-10 h-10 flex items-center justify-center rounded-full border"
          style={{ background: "rgba(255,255,255,0.3)", borderColor: "rgba(255,255,255,0.5)" }}
        >
          <BarChart3 size={18} className="text-slate-600" />
        </button>
      </div>

      {/* Title */}
      <h1
        className="mt-6 mb-8 tracking-wider text-[#ffffff]"
        style={{ fontSize: 24, fontWeight: 300 }}
      >
        COLOR KEY
      </h1>

      {/* Color Cards */}
      <div className="flex flex-col gap-5 w-full">
        {colorData.map((color) => (
          <div
            key={color.title}
            className="rounded-3xl p-5 border"
            style={{
              background: color.bgColor,
              borderColor: color.borderColor,
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              boxShadow: `0 0 30px ${color.glowColor}30, inset 0 1px 0 rgba(255,255,255,0.4)`,
            }}
          >
            <h2
              className="text-center mb-4 tracking-wider"
              style={{ fontSize: 16, fontWeight: 700, color: "#FFFFFF" }}
            >
              {color.title}
            </h2>

            <p className="text-white mb-3" style={{ fontSize: 13, lineHeight: 1.5 }}>
              <span style={{ fontWeight: 700 }}>WHAT IT MEANS: </span>
              <span className="text-white/85" style={{ fontWeight: 300 }}>
                {color.means}
              </span>
            </p>

            <p className="text-white" style={{ fontSize: 13, lineHeight: 1.5 }}>
              <span style={{ fontWeight: 700 }}>THE FEELING: </span>
              <span className="text-white/85" style={{ fontWeight: 300 }}>
                {color.feeling}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}