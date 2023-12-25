import { Query, Resolver } from 'type-graphql'
import { User } from '../Schema/user.schema'

@Resolver()
export default class UserResolver {
  @Query(() => User)
  me() {
    return {
      _id: '123',
      name: 'John',
      email: 'John Doe',
    }
  }
}
