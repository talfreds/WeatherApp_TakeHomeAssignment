import UserResolver from "./user.resolver";
import WeatherResolver from "./weather.resolver";

export const resolvers = [UserResolver, WeatherResolver] as const;
