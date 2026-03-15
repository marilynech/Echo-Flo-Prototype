import svgPaths from "./svg-lh78cnympt";

export default function Frame() {
  return (
    <div className="relative size-full">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1476 2908">
        <g id="Frame 15">
          <g data-figma-bg-blur-radius="40" filter="url(#filter0_ddii_1_448)" id="Rectangle 117">
            <mask fill="black" height="1499" id="path-1-outside-1_1_448" maskUnits="userSpaceOnUse" width="1183" x="147" y="801">
              <rect fill="white" height="1499" width="1183" x="147" y="801" />
              <path d={svgPaths.p49dc280} />
            </mask>
            <path d={svgPaths.p49dc280} fill="var(--fill-0, white)" fillOpacity="0.098" style={{ mixBlendMode: "plus-lighter" }} />
            <g clipPath="url(#paint0_angular_1_448_clip_path)" data-figma-skip-parse="true" mask="url(#path-1-outside-1_1_448)">
              <g transform="matrix(0.5905 0 0 0.7485 148 802)" />
            </g>
            <path d={svgPaths.p1b48df00} data-figma-gradient-fill="{'type':'GRADIENT_ANGULAR','stops':[{'color':{'r':1.0,'g':1.0,'b':1.0,'a':0.39700001478195190},'position':0.11939926445484161},{'color':{'r':1.0,'g':1.0,'b':1.0,'a':0.0},'position':0.36939927935600281},{'color':{'r':1.0,'g':1.0,'b':1.0,'a':0.39700001478195190},'position':0.61939924955368042},{'color':{'r':1.0,'g':1.0,'b':1.0,'a':0.0},'position':0.86939924955368042}],'stopsVar':[{'color':{'r':1.0,'g':1.0,'b':1.0,'a':0.39700001478195190},'position':0.11939926445484161},{'color':{'r':1.0,'g':1.0,'b':1.0,'a':0.0},'position':0.36939927935600281},{'color':{'r':1.0,'g':1.0,'b':1.0,'a':0.39700001478195190},'position':0.61939924955368042},{'color':{'r':1.0,'g':1.0,'b':1.0,'a':0.0},'position':0.86939924955368042}],'transform':{'m00':1181.0,'m01':0.0,'m02':-442.50,'m10':0.0,'m11':1497.0,'m12':53.50},'opacity':1.0,'blendMode':'LINEAR_DODGE','visible':true}" mask="url(#path-1-outside-1_1_448)" style={{ mixBlendMode: "plus-lighter" }} />
          </g>
          <g id="Frame 12" />
        </g>
        <defs>
          <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1597.39" id="filter0_ddii_1_448" width="1282.15" x="87.8496" y="742.608">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
            <feOffset dx="-1.8584" dy="-1.732" />
            <feGaussianBlur stdDeviation="6" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
            <feBlend in2="BackgroundImageFix" mode="plus-darker" result="effect1_dropShadow_1_448" />
            <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
            <feOffset dx="-11.1504" dy="-10.392" />
            <feGaussianBlur stdDeviation="24" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
            <feBlend in2="effect1_dropShadow_1_448" mode="plus-darker" result="effect2_dropShadow_1_448" />
            <feBlend in="SourceGraphic" in2="effect2_dropShadow_1_448" mode="normal" result="shape" />
            <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
            <feOffset dx="1.8584" dy="1.732" />
            <feGaussianBlur stdDeviation="3" />
            <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.1485 0" />
            <feBlend in2="shape" mode="plus-lighter" result="effect3_innerShadow_1_448" />
            <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
            <feOffset dx="2.7876" dy="2.598" />
            <feGaussianBlur stdDeviation="6" />
            <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.1485 0" />
            <feBlend in2="effect3_innerShadow_1_448" mode="plus-lighter" result="effect4_innerShadow_1_448" />
          </filter>
          <clipPath id="bgblur_0_1_448_clip_path" transform="translate(-87.8496 -742.608)">
            <path d={svgPaths.p49dc280} />
          </clipPath>
          <clipPath id="paint0_angular_1_448_clip_path">
            <path d={svgPaths.p1b48df00} mask="url(#path-1-outside-1_1_448)" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}