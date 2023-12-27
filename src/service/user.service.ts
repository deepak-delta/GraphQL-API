import { ApolloError } from 'apollo-server'
import { CreateUserInput, LoginInput, UserModel } from '../Schema/user.schema'
import Context from '../types/context'

class UserService {
  async createUser(input: CreateUserInput) {
    return UserModel.create(input)
  }

  async login(input: LoginInput, context: Context) {
    //get user by eamil

    const user = await UserModel.find().findByEmail(input.email).lean()

    if (!user) {
      throw new ApolloError('Invalid user/passowrd')
    }
    //validate password
    //sign a jwt
    // seta  cookie for thr jwt
    //retrun jwt
  }
}

export default UserService
