import React from "react";

const Speedometer = ({ value, label }) => {
  const minAngle = -90; // 0% should be at -90° (leftmost)
  const maxAngle = 90;  // 100% should be at +90° (rightmost)

  // Corrected angle formula (ensuring correct direction)
  const angle = minAngle + (value / 100) * (maxAngle - minAngle);

  return (
    <div className="flex flex-col items-center justify-center bg-white rounded-xl shadow-lg p-4 w-64 h-40">
      <div className="text-lg font-bold mb-2">{label}</div>

      <div className="relative w-full flex justify-center">
        <svg viewBox="0 0 200 120" className="w-40">
          {/* Background Arc */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="#ddd"
            strokeWidth="10"
          />
          {/* Active Arc - Adjusted for Value */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="orange"
            strokeWidth="10"
            strokeDasharray={`${(value / 100) * 251}, 251`}
            strokeLinecap="round"
          />
          {/* Needle - Now Flipped Correctly */}
          <line
            x1="100"
            y1="100"
            x2={100 + 40 * Math.cos(((angle - 90) * Math.PI) / 180)}
            y2={100 + 40 * Math.sin(((angle - 90) * Math.PI) / 180)}
            stroke="red"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Percentage Display */}
      <div className="text-xl font-bold mt-2">{value.toFixed(1)}%</div>
    </div>
  );
};

export default Speedometer;
