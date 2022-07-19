import { Field, InputType, ObjectType } from "type-graphql";
import { MaxLength, MinLength } from "class-validator";

@InputType()
export class weatherSearchInput {
  @MinLength(0, { message: "Search input cannot be empty" })
  @MaxLength(255, {
    message: "Search input can be at most 255 characters long",
  })
  @Field(() => String)
  value: string;
}

@ObjectType()
export class WeatherData {
  @Field(() => String)
  readonly _id: string;

  @Field(() => String, { nullable: true })
  readonly id: string;

  @Field(() => String)
  searchTerm: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  sunrise: number;

  @Field(() => String)
  sunset: number;

  @Field(() => String)
  temp: number;

  @Field(() => String)
  raw: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
