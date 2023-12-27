import { ApolloError } from 'apollo-server'
import bcrypt from 'bcrypt'
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

    const passowrdIsValid = bcrypt.compare(input.password, user.password)
    if (!passowrdIsValid) {
      throw new ApolloError('Invalid user/passowrd')
    }
    //sign a jwt
    // seta  cookie for thr jwt
    //retrun jwt
  }
}

export default UserService
