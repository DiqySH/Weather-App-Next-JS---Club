"use client";
import { createTheme, TextField, ThemeProvider } from "@mui/material";
import { useForm } from "react-hook-form";

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

const status = [
  {
    icon: "/wind.svg",
    value: "6.69/ms",
    title: "Wind",
  },
  {
    icon: "/humidity.svg",
    value: "70%",
    title: "Humidity",
  },
  {
    icon: "/clouds.svg",
    value: "40%",
    title: "Clouds",
  },
  {
    icon: "/realFeel.svg",
    value: "40%",
    title: "Real Feel",
  },
];

const weeklyForecast = [
  {
    day: "Tuesday",
    iconWeather: "/cloud.svg",
    weather: "Cloudy",
    temp: "26°",
  },
  {
    day: "Wednesday",
    iconWeather: "/rainy.svg",
    weather: "Rainy",
    temp: "14°",
  },
  {
    day: "Thursday",
    iconWeather: "/cloud.svg",
    weather: "Cloudy",
    temp: "25°",
  },
  {
    day: "Friday",
    iconWeather: "/clear.svg",
    weather: "Clear",
    temp: "32°",
  },
  {
    day: "Saturday",
    iconWeather: "/cloud.svg",
    weather: "Cloudy",
    temp: "22°",
  },
];

const WeatherApp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
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
            <p className="font-[700]">Monday</p>
            <p className="font-[400]">04 September</p>
          </div>
          <p className="text-[49.47px] font-[700]">Jakarta</p>
        </div>
        <div className="w-full h-[2px] bg-white"></div>
        <div className="text-white flex items-center gap-[25px]">
          <div className="flex flex-col gap-2">
            <p className="text-[97.71px] font-azeret-mono leading-[100%]">
              29°
            </p>
            <p className="leading-[100%]">Cloudy</p>
          </div>
          <img src="/cloud.svg" alt="" className="max-w-[140px] w-full" />
        </div>
        <div className="w-full h-[2px] bg-white"></div>
        <div className="flex w-full justify-between">
          {status.map((i) => {
            return (
              <div className="text-white">
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
          {weeklyForecast.map((i) => {
            return (
              <div className="flex-1/5 p-[10px] bg-[#2D2D2D59] text-white gap-[0.25rem] flex flex-col">
                <p className="font-schibsted-grotesk text-[15px]">{i.day}</p>
                <div className="flex gap-[4px]">
                  <img src={i.iconWeather} alt="" />
                  <p className="font-azeret-mono">{i.temp}</p>
                </div>
                <p className="font-schibsted-grotesk text-[13px]">{i.weather}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WeatherApp;
