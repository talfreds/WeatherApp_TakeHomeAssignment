import axios from "axios";
import { Context } from "../types/context";
import config from "config";
import WeatherModel, { Weather } from "../models/weather.model";
const weatherApiKey = config.get<number>("weatherApiKey");
const geocodeApikey = config.get<number>("geocodeApikey");

const storeWeatherSearch = async (
  weatherData: any,
  searchTerm: string,
  userId: string
) => {
  const structuredWeatherData: any = {
    searchTerm,
    userId,
    name: weatherData.name,
    raw: JSON.stringify(weatherData),
  };
  try {
    const weather = await WeatherModel.create(structuredWeatherData);
    return;
  } catch (error: any) {
    return error;
  }
};

const getWeatherHelper = async (input: string, userId: string) => {
  try {
    if (!input) return "Please provide a valid search input";
    const encodedInput = encodeURIComponent(input);

    const res = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedInput}&key=${geocodeApikey}`
    );
    let lat = res.data.results[0].geometry.location.lat;
    let lng = res.data.results[0].geometry.location.lng;

    const weather = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${weatherApiKey}`
    );
    console.log(
      "🚀 ~ file: weather.service.ts ~ line 30 ~ getLatAndLng ~ weather",
      weather.data
    );

    await storeWeatherSearch(weather.data, input, userId);
    return JSON.stringify(weather.data);
  } catch (error) {
    return { error: true, raw: JSON.stringify(error) };
  }
};

export default class WeatherService {
  async getWeather(searchTerm: string, { req, res, deserializeUser }: Context) {
    const user = await deserializeUser(req);
    return getWeatherHelper(searchTerm, "");
  }

  async getWeatherSearches({ req, res, deserializeUser }: Context) {
    const user = await deserializeUser(req);
    const weatherSearches = await WeatherModel.find({});
    return weatherSearches;
  }
}
