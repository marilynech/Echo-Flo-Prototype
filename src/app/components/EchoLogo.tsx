import imgOrb from "figma:asset/2aacad049903d1d44065593b6ed590c82c1a2818.png";

export function EchoLogo({ size = 48 }: { size?: number }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          className="absolute block size-full"
          fill="none"
          viewBox="0 0 136 137"
        >
          <ellipse
            cx="68"
            cy="68.5"
            fill="url(#echoflo_orb_grad)"
            rx="68"
            ry="68.5"
          />
          <defs>
            <radialGradient
              cx="0"
              cy="0"
              gradientTransform="translate(68 68.5) rotate(90) scale(68.5 68)"
              gradientUnits="userSpaceOnUse"
              id="echoflo_orb_grad"
              r="1"
            >
              <stop stopColor="#6995FE" />
              <stop offset="0.3125" stopColor="#7FBBFD" />
              <stop offset="0.591346" stopColor="#BFDCFE" stopOpacity="0.84" />
              <stop offset="0.932692" stopColor="#0E1738" stopOpacity="0.85" />
              <stop offset="0.9999" stopOpacity="0.62" />
            </radialGradient>
          </defs>
        </svg>
        <div
          className="absolute inset-0 rounded-full overflow-hidden opacity-40"
        >
          <img
            alt=""
            className="size-full object-cover"
            src={imgOrb}
          />
        </div>
      </div>
      <span
        className="tracking-[0.4em] text-[#ffffff]"
        style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14 }}
      >
        E C H O F L O
      </span>
    </div>
  );
}