// components/PerformanceRingComponent.js

const PerformanceRingComponent = ({ value, max }) => {
  const percentage = (value / max) * 100; // Calculate percentage
  const radius = 50; // Radius of the circle
  const strokeWidth = 10; // Width of the stroke
  const circumference = 2 * Math.PI * radius; // Circumference of the circle

  // Calculate strokeDashoffset to cut the circle based on percentage
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{ position: "relative", width: "150px", height: "150px" }}>
        <svg width="150" height="150" viewBox="0 10 150 150">
          {/* Background Circle (Darker black remaining part) */}
          <circle
            cx="75"
            cy="75"
            r={radius}
            stroke="#333333" // Darker black color for the remaining part
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference} // Defines the total circumference
            strokeDashoffset="0" // No offset for the background (full circle)
          />
          {/* Progress Circle (Red part) */}
          <circle
            cx="75"
            cy="75"
            r={radius}
            stroke="red" // Red for progress
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference} // Defines the total circumference
            strokeDashoffset={strokeDashoffset} // Adjust how much of the circle is drawn
            transform="rotate(-90 75 75)" // Rotate so progress starts from top (12 o'clock)
          />
        </svg>
      </div>
      <div
        style={{
          marginLeft: "5px",
          marginRight: "5px",
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        {Math.round(percentage)}{/* Show the value outside */}
      </div>
    </div>
  );
};

export default PerformanceRingComponent;