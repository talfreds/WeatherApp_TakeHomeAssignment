import { getModelForClass, prop } from "@typegoose/typegoose";

export class Weather {
  readonly _id: string;

  @prop({ required: true })
  searchTerm: string;

  @prop({ required: true })
  name: string;

  @prop()
  sunrise: string;

  @prop()
  sunset: string;

  @prop()
  temp: string;

  @prop()
  raw: string;

  @prop()
  userId: string;
}

const WeatherModel = getModelForClass<typeof Weather>(Weather);
export default WeatherModel;
