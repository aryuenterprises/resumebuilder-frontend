// LockIcon.jsx
import React from "react";

export default function CrownIcon({ width = 48, height = 48, className = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width={width}
      height={height}
      className={className}
    >
      <defs>
        {/* Gold gradient */}
        <linearGradient id="goldLockGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fff4b0" />
          <stop offset="25%" stopColor="#ffd84d" />
          <stop offset="60%" stopColor="#f6b400" />
          <stop offset="100%" stopColor="#c47f00" />
        </linearGradient>

        {/* Shadow / depth gradient */}
        <linearGradient id="lockShadow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(0,0,0,0.15)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </linearGradient>
      </defs>

      {/* Shackle (top curve) */}
      <path
        d="M20 26v-6a12 12 0 0124 0v6"
        stroke="#8a5a00"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />

      {/* Lock body */}
      <rect
        x="16"
        y="26"
        width="32"
        height="26"
        rx="4"
        ry="4"
        fill="url(#goldLockGradient)"
        stroke="#8a5a00"
        strokeWidth="1.5"
      />

      {/* Keyhole circle */}
      <circle cx="32" cy="40" r="4" fill="#8a5a00" />

      {/* Keyhole rectangle */}
      <rect x="30.8" y="40" width="2.5" height="6" rx="1" fill="#8a5a00" />

      {/* Light overlay for shine */}
      <rect
        x="16"
        y="26"
        width="32"
        height="13"
        fill="url(#lockShadow)"
        opacity="0.3"
        rx="4"
      />
    </svg>
  );
}
