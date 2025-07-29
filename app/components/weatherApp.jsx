"use client";
import { createTheme, TextField, ThemeProvider } from "@mui/material";
import { useForm } from "react-hook-form";
import useWeather from "@/services/useWeather";
import { useState } from "react";

const theme = createTheme({
  typography: { fontFamily: "var(--font-schibsted-grotesk)" },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-input": {
            color: "white", // Warna teks input
          },
          "& .MuiInputLabel-root": {
            color: "rgba(255, 255, 255, 0.45) !important", // Warna label
          },
          "& .MuiFormHelperText-root": {
            color: "red", // Warna helper text
          },
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        underline: {
          "&:before": {
            borderBottom: "1px solid white", // default (normal)
          },
          "&:hover:not(.Mui-disabled):before": {
            borderBottom: "1px solid white", // saat hover
          },
          "&.Mui-focused:after": {
            borderBottom: "1px solid white !important", // saat focus
          },
          "&.Mui-focused": {
            borderBottom: "1px solid white !important",
          },
        },
      },
    },
  },
});

// const weeklyForecast = [
//   {
//     day: "Tuesday",
//     iconWeather: "/cloud.svg",
//     weather: "Cloudy",
//     temp: "26°",
//   },
//   {
//     day: "Wednesday",
//     iconWeather: "/rainy.svg",
//     weather: "Rainy",
//     temp: "14°",
//   },
//   {
//     day: "Thursday",
//     iconWeather: "/cloud.svg",
//     weather: "Cloudy",
//     temp: "25°",
//   },
//   {
//     day: "Friday",
//     iconWeather: "/clear.svg",
//     weather: "Clear",
//     temp: "32°",
//   },
//   {
//     day: "Saturday",
//     iconWeather: "/cloud.svg",
//     weather: "Cloudy",
//     temp: "22°",
//   },
// ];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const WeatherApp = () => {
  const [submittedCity, setSubmittedCity] = useState(null);
  const weatherData = useWeather(submittedCity);
  const { error, data, weeklyForecast } = weatherData;
  console.log(weeklyForecast);
  const city = data?.city?.name;
  const date = new Date().getDate();
  const month = new Date().getMonth();
  const day = new Date().getDay();
  const todayWeather = {
    temp: data?.list[0]?.main?.temp,
  };

  const getDayName = (dateString) => {
    const date = new Date(dateString);
    return days[date.getDay()];
  };

  const status = [
    {
      icon: "/wind.svg",
      value: `${data?.list[0]?.wind?.speed}/ms`,
      title: "Wind",
    },
    {
      icon: "/humidity.svg",
      value: `${data?.list[0]?.main?.humidity}%`,
      title: "Humidity",
    },
    {
      icon: "/clouds.svg",
      value: `${data?.list[0]?.clouds?.all}%`,
      title: "Clouds",
    },
    {
      icon: "/realFeel.svg",
      value: `${data?.list[0]?.main?.feels_like}%`,
      title: "Real Feel",
    },
  ];
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    setSubmittedCity(data.city);
  };

  const getWeatherIcon = (main) => {
  switch (main.toLowerCase()) {
    case "clouds":
      return "/cloud.svg";
    case "rain":
    case "drizzle":
    case "thunderstorm":
      return "/rainy.svg";
    case "clear":
      return "/clear.svg";
    default:
      return "/cloud.svg";
  }
};

  return (
    <section
      className="w-full min-h-screen grid place-items-center"
      style={{
        background: "linear-gradient(179.94deg, #434343 0.05%, #3F3F3F 99.95%)",
      }}
    >
      <div className="max-w-[600px] w-full flex flex-col gap-[46px]">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <ThemeProvider theme={theme}>
            <div className="w-full flex items-center">
              <TextField
                label="Insert your city name"
                variant="standard"
                size="small"
                sx={{ width: "100%", color: "white" }}
                {...register("city", { required: true })}
              />
              <input
                type="submit"
                className="bg-cover w-[24px] h-[24px] bg-center"
                value=""
                style={{
                  backgroundImage: "url(/search.svg)",
                }}
              />
            </div>
          </ThemeProvider>
        </form>
        <div className="w-full flex font-schibsted-grotesk items-center gap-8 text-white">
          <div className="flex flex-col text-[24px] leading-[100%]">
            <p className="font-[700]">{days[day]}</p>
            <p className="font-[400]">
              {date} {months[month]}
            </p>
          </div>
          <p className="text-[49.47px] font-[700]">{city}</p>
        </div>
        <div className="w-full h-[2px] bg-white"></div>
        <div className="text-white flex items-center gap-[25px]">
          <div className="flex flex-col gap-2">
            <p className="text-[97.71px] font-azeret-mono leading-[100%]">
              {Math.round(todayWeather.temp)}°
            </p>
            <p className="leading-[100%]">Cloudy</p>
          </div>
          <img src="/cloud.svg" alt="" className="max-w-[140px] w-full" />
        </div>
        <div className="w-full h-[2px] bg-white"></div>
        <div className="flex w-full justify-between">
          {status.map((i, idx) => {
            return (
              <div className="text-white" key={idx}>
                <div className="flex items-center gap-[1rem]">
                  <img src={i.icon} alt="" className="w-[36px]" />
                  <p className="text-[20px]">{i.value}</p>
                </div>
                <p
                  className="font-azeret-mono text-[13px]"
                  style={{
                    color: "rgba(255, 255, 255, 0.75)",
                  }}
                >
                  {i.title}
                </p>
              </div>
            );
          })}
        </div>
        <div className="w-full flex gap-[10px]">
          {
            weeklyForecast.map((i, idx) => {
              const icon = getWeatherIcon(i.weather[0].main);
              return (
                <div key={idx} className="flex-1/4 text-white flex flex-col gap-2 bg-[#2D2D2D59] px-4 py-2">
                  <p>{getDayName(i.dt_txt)}</p>
                  <div className="flex gap-2">
                    <img src={icon} alt="" />
                    <p>{Math.round(i.main.temp)}°</p>
                  </div>
                  <p>{i.weather[0].main}</p>
                </div>
              )
            })
          }
        </div>
      </div>
    </section>
  );
};

export default WeatherApp;
