import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";

import { weatherSearchInput, WeatherData } from "../schemas/weather.schema";
import WeatherService from "../services/weather.service";
import { Context } from "../types/context";

@Resolver()
export default class WeatherResolver {
  constructor(private weatherService: WeatherService) {
    this.weatherService = new WeatherService();
  }

  @Mutation(() => String)
  getWeather(@Arg("input") searchTerm: string, @Ctx() ctx: Context) {
    return this.weatherService.getWeather(searchTerm, ctx);
  }

  @Query(() => [WeatherData])
  getWeatherSearches(@Ctx() ctx: Context) {
    return this.weatherService.getWeatherSearches(ctx);
  }
}
