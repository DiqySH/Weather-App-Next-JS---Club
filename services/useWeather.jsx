import useGeolocation from "./useGeoLocation";
const { default: axios } = require("axios");
const { useEffect, useState } = require("react");

const useWeather = (city = null) => {
  const [data, setData] = useState(null);
  const [weeklyForecast, setWeeklyForecast] = useState([]);
  const [error, setError] = useState(null);
  const { position } = useGeolocation();

  useEffect(() => {
    const fetchData = async () => {
      let url = "";
      if (city) {
        url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=744bd5396fc652d469fbfd310fd65784&units=metric`;
      } else if (position) {
        url = `https://api.openweathermap.org/data/2.5/forecast?lat=${position.latitude}&lon=${position.longitude}&appid=744bd5396fc652d469fbfd310fd65784&units=metric`;
      } else {
        return;
      }

      try {
        const response = await axios.get(url);
        const forecastData = response.data;

        // Proses weekly forecast
        const groupedByDate = {};

        forecastData.list.forEach((item) => {
          const date = item.dt_txt.split(" ")[0]; // contoh: "2025-07-29"
          if (!groupedByDate[date]) {
            groupedByDate[date] = [];
          }
          groupedByDate[date].push(item);
        });

        // Ambil 1 data per hari (jam 12:00 siang)
        const dailySummaries = Object.values(groupedByDate)
          .slice(0, 5) // hanya ambil 5 hari ke depan
          .map((dayItems) => {
            // Cari data yang mendekati jam 12:00:00
            const midDayItem = dayItems.find((item) =>
              item.dt_txt.includes("12:00:00")
            );

            return midDayItem || dayItems[Math.floor(dayItems.length / 2)];
          });

        setData(forecastData);
        setWeeklyForecast(dailySummaries);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, [city, position]);

  return { error, data, weeklyForecast };
};

export default useWeather;