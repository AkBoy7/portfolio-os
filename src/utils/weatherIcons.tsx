import React from "react";

export const getWeatherInfo = (
  code: number,
  isDay: boolean
): { icon: React.ReactElement; description: string } => {
  const weatherMap: Record<
    number,
    { icon: React.ReactElement; description: string }
  > = {
    0: {
      icon: isDay ? (
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ) : (
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      ),
      description: "Clear",
    },
    1: {
      icon: isDay ? (
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ) : (
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      ),
      description: "Mainly Clear",
    },
    2: {
      icon: (
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
        </svg>
      ),
      description: "Partly Cloudy",
    },
    3: {
      icon: (
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
        </svg>
      ),
      description: "Overcast",
    },
    45: {
      icon: (
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
          <line x1="8" y1="19" x2="8" y2="21" opacity="0.5" />
          <line x1="8" y1="13" x2="8" y2="15" opacity="0.5" />
          <line x1="16" y1="19" x2="16" y2="21" opacity="0.5" />
          <line x1="16" y1="13" x2="16" y2="15" opacity="0.5" />
          <line x1="12" y1="21" x2="12" y2="23" opacity="0.5" />
          <line x1="12" y1="15" x2="12" y2="17" opacity="0.5" />
        </svg>
      ),
      description: "Foggy",
    },
    48: {
      icon: (
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
          <line x1="8" y1="19" x2="8" y2="21" opacity="0.5" />
          <line x1="8" y1="13" x2="8" y2="15" opacity="0.5" />
          <line x1="16" y1="19" x2="16" y2="21" opacity="0.5" />
          <line x1="16" y1="13" x2="16" y2="15" opacity="0.5" />
          <line x1="12" y1="21" x2="12" y2="23" opacity="0.5" />
          <line x1="12" y1="15" x2="12" y2="17" opacity="0.5" />
        </svg>
      ),
      description: "Foggy",
    },
    51: {
      icon: (
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
          <line x1="8" y1="19" x2="8" y2="21" />
          <line x1="8" y1="13" x2="8" y2="15" />
          <line x1="16" y1="19" x2="16" y2="21" />
          <line x1="16" y1="13" x2="16" y2="15" />
        </svg>
      ),
      description: "Light Drizzle",
    },
    53: {
      icon: (
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
          <line x1="8" y1="19" x2="8" y2="21" />
          <line x1="8" y1="13" x2="8" y2="15" />
          <line x1="16" y1="19" x2="16" y2="21" />
          <line x1="16" y1="13" x2="16" y2="15" />
          <line x1="12" y1="21" x2="12" y2="23" />
        </svg>
      ),
      description: "Drizzle",
    },
    55: {
      icon: (
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
          <line x1="8" y1="19" x2="8" y2="21" />
          <line x1="8" y1="13" x2="8" y2="15" />
          <line x1="16" y1="19" x2="16" y2="21" />
          <line x1="16" y1="13" x2="16" y2="15" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="12" y1="15" x2="12" y2="17" />
        </svg>
      ),
      description: "Heavy Drizzle",
    },
    61: {
      icon: (
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
          <line x1="16" y1="13" x2="16" y2="21" />
          <line x1="8" y1="13" x2="8" y2="21" />
          <line x1="12" y1="15" x2="12" y2="23" />
        </svg>
      ),
      description: "Light Rain",
    },
    63: {
      icon: (
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
          <line x1="16" y1="13" x2="16" y2="21" />
          <line x1="8" y1="13" x2="8" y2="21" />
          <line x1="12" y1="15" x2="12" y2="23" />
        </svg>
      ),
      description: "Rain",
    },
    65: {
      icon: (
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
          <line x1="16" y1="13" x2="16" y2="21" strokeWidth="3" />
          <line x1="8" y1="13" x2="8" y2="21" strokeWidth="3" />
          <line x1="12" y1="15" x2="12" y2="23" strokeWidth="3" />
        </svg>
      ),
      description: "Heavy Rain",
    },
    71: {
      icon: (
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
          <line x1="8" y1="13" x2="8" y2="16" />
          <line x1="8" y1="17" x2="8" y2="17.01" />
          <line x1="12" y1="16" x2="12" y2="19" />
          <line x1="12" y1="20" x2="12" y2="20.01" />
          <line x1="16" y1="13" x2="16" y2="16" />
          <line x1="16" y1="17" x2="16" y2="17.01" />
        </svg>
      ),
      description: "Light Snow",
    },
    73: {
      icon: (
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
          <line x1="8" y1="13" x2="8" y2="16" />
          <line x1="8" y1="17" x2="8" y2="17.01" />
          <line x1="12" y1="16" x2="12" y2="19" />
          <line x1="12" y1="20" x2="12" y2="20.01" />
          <line x1="16" y1="13" x2="16" y2="16" />
          <line x1="16" y1="17" x2="16" y2="17.01" />
        </svg>
      ),
      description: "Snow",
    },
    75: {
      icon: (
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
          <line x1="8" y1="13" x2="8" y2="16" strokeWidth="3" />
          <line x1="8" y1="17" x2="8" y2="17.01" strokeWidth="3" />
          <line x1="12" y1="16" x2="12" y2="19" strokeWidth="3" />
          <line x1="12" y1="20" x2="12" y2="20.01" strokeWidth="3" />
          <line x1="16" y1="13" x2="16" y2="16" strokeWidth="3" />
          <line x1="16" y1="17" x2="16" y2="17.01" strokeWidth="3" />
        </svg>
      ),
      description: "Heavy Snow",
    },
    95: {
      icon: (
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
          <path d="M13 16l-2 4m4-4l-2 4m-4-4l-2 4" strokeWidth="2.5" />
        </svg>
      ),
      description: "Thunderstorm",
    },
    96: {
      icon: (
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
          <path d="M13 16l-2 4m4-4l-2 4m-4-4l-2 4" strokeWidth="2.5" />
        </svg>
      ),
      description: "Thunderstorm",
    },
    99: {
      icon: (
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
          <path d="M13 16l-2 4m4-4l-2 4m-4-4l-2 4" strokeWidth="3" />
        </svg>
      ),
      description: "Heavy Thunderstorm",
    },
  };

  const defaultWeather = weatherMap[0];
  return weatherMap[code] || defaultWeather;
};
