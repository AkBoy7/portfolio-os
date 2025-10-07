import { useState, useEffect } from "react";

interface WeatherData {
  temperature: number;
  weatherCode: number;
  isDay: boolean;
}

export const useWeather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Eindhoven coordinates: 51.4408, 5.4778
        const response = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=51.4408&longitude=5.4778&current=temperature_2m,weather_code,is_day&timezone=Europe/Amsterdam"
        );
        const data = await response.json();
        setWeather({
          temperature: Math.round(data.current.temperature_2m),
          weatherCode: data.current.weather_code,
          isDay: data.current.is_day === 1,
        });
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch weather:", error);
        setIsLoading(false);
      }
    };

    fetchWeather();
    // Refresh weather every 10 minutes
    const weatherTimer = setInterval(fetchWeather, 600000);

    return () => clearInterval(weatherTimer);
  }, []);

  return { weather, isLoading };
};
