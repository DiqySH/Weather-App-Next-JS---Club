import useGeolocation from "./useGeoLocation";
const { default: axios } = require("axios");
const { useEffect, useState } = require("react");

const useWeather = (city = null) => {
  const [data, setData] = useState(null);
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
        setData(response.data);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, [city, position]);

  return { error, data };
};

export default useWeather;