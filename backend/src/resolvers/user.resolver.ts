import { Arg, Ctx, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import {
  LoginInput,
  LoginResponse,
  RegisterInput,
  UserResponse,
  UsersPublicResponse,
} from "../schemas/user.schema";
import UserService from "../services/user.service";
import { Context } from "../types/context";

@Resolver()
export default class UserResolver {
  constructor(private userService: UserService) {
    this.userService = new UserService();
  }

  @Query(() => [UsersPublicResponse])
  async getUsersPublic() {
    return this.userService.getUsersPublic();
  }

  @Mutation(() => UserResponse)
  async registerUser(@Arg("input") input: RegisterInput) {
    return this.userService.registerUser(input);
  }

  @Query(() => UserResponse)
  async getSelf(@Ctx() ctx: Context) {
    return this.userService.getSelf(ctx);
  }

  @Query(() => LoginResponse)
  async refreshAccessToken(@Ctx() ctx: Context) {
    return this.userService.refreshAccessToken(ctx);
  }

  @Mutation(() => LoginResponse)
  async loginUser(@Arg("input") loginInput: LoginInput, @Ctx() ctx: Context) {
    return this.userService.loginUser(loginInput, ctx);
  }

  @Mutation(() => Boolean)
  async logoutUser(@Ctx() ctx: Context) {
    return this.userService.logoutUser(ctx);
  }
}
