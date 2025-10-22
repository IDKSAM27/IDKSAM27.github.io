import * as React from "react"

const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    className="w-full h-full text-current"
    {...props}
  >
    <defs>
      <style>{".cls-1{fill:#ff927d}.cls-4{fill:#54596e}"}</style>
    </defs>
    <title>{"sun"}</title>
    <g id="sun">
      <path
        d="M37.69 5.1a6.33 6.33 0 0 1 11 4.56 6.33 6.33 0 0 0 6.64 6.64 6.33 6.33 0 0 1 4.56 11 6.32 6.32 0 0 0 0 9.38 6.33 6.33 0 0 1-4.56 11 6.33 6.33 0 0 0-6.64 6.64 6.33 6.33 0 0 1-11 4.56 6.32 6.32 0 0 0-9.38 0 6.33 6.33 0 0 1-11-4.56 6.33 6.33 0 0 0-6.64-6.64 6.33 6.33 0 0 1-4.56-11 6.32 6.32 0 0 0 0-9.38 6.33 6.33 0 0 1 4.56-11 6.33 6.33 0 0 0 6.63-6.64 6.33 6.33 0 0 1 11-4.56 6.32 6.32 0 0 0 9.39 0Z"
        className="cls-1"
      />
      <circle
        cx={33}
        cy={32}
        r={22}
        style={{
          fill: "#fff35f",
          stroke: "#54596e",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: 2,
        }}
      />
      <path
        d="M33 48a22 22 0 0 1-21.79-19 22.78 22.78 0 0 0-.21 3 22 22 0 0 0 44 0 22.78 22.78 0 0 0-.21-3A22 22 0 0 1 33 48Z"
        style={{
          opacity: 0.15,
          fill: "#54596e",
        }}
      />
      <circle cx={22} cy={23} r={2} className="cls-4" />
      <circle cx={44} cy={23} r={2} className="cls-4" />
      <path
        d="M40 31.18c0-1.57-14-1.57-14 0 0 2.68 3.13 4.82 7 4.82s7-2.14 7-4.79Z"
        className="cls-4"
      />
      <ellipse cx={33} cy={33} className="cls-1" rx={3} ry={1} />
    </g>
  </svg>
)
export default SvgComponent
