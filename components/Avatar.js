const Avatar = () => (
  <svg
    viewBox="0 0 100 100"
    className="w-full max-w-xs mx-auto"
    aria-hidden="true"
  >
    <defs>
      <clipPath id="avatar-clip">
        <circle cx="50" cy="50" r="45" />
      </clipPath>
    </defs>
    {/* Background shape */}
    <path
      d="M 9.16,65.31 C 21.37,83.45 42.63,95 62.2,95 83.1,95 100,78.1 100,57.2 100,36.3 83.1,19.4 62.2,19.4 41.3,19.4 24.4,36.3 24.4,57.2 24.4,60.23 24.8,63.18 25.56,65.98"
      className="fill-current text-green-200 dark:text-green-800"
    />
    {/* Simple face */}
    <g clipPath="url(#avatar-clip)">
      <rect width="100" height="100" className="fill-current text-slate-200 dark:text-slate-700" />
      <circle cx="38" cy="45" r="4" className="fill-current text-slate-900 dark:text-slate-200" />
      <circle cx="62" cy="45" r="4" className="fill-current text-slate-900 dark:text-slate-200" />
      <path
        d="M 40 65 A 10 10 0 0 0 60 65"
        strokeWidth="3"
        strokeLinecap="round"
        className="stroke-current text-slate-900 dark:text-slate-200"
        fill="none"
      />
    </g>
  </svg>
);

export default Avatar;
