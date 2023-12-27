import {
  QueryMethod,
  getModelForClass,
  index,
  modelOptions,
  pre,
  prop,
} from '@typegoose/typegoose'
import { IsEmail, MinLength } from 'class-validator'
import { Field, InputType, ObjectType } from 'type-graphql'
import bcrypt from 'bcrypt'
import { AsQueryMethod, ReturnModelType } from '@typegoose/typegoose/lib/types'

function findByEmail(
  this: ReturnModelType<typeof User, QueryHelpers>,
  email: User['email']
) {
  return this.findOne({ email })
}

interface QueryHelpers {
  findByEmail: AsQueryMethod<typeof findByEmail>
}

//Password hash middleware
@pre<User>('save', async function () {
  if (!this.isModified('password')) {
    return
  }

  const salt = await bcrypt.genSalt(10)

  const hash = await bcrypt.hashSync(this.password, salt)

  this.password = hash
})
@index({ email: 1 })
@QueryMethod(findByEmail)
@ObjectType()
@modelOptions({ schemaOptions: { collection: 'users' } })
export class User {
  @Field(() => String)
  _id: string

  @Field(() => String)
  @prop({ required: true })
  name: string

  @Field(() => String)
  @prop({ required: true })
  email: string

  @prop({ required: true })
  password: string
}

export const UserModel = getModelForClass<typeof User, QueryHelpers>(User)

@InputType()
export class CreateUserInput {
  @Field(() => String)
  name: string

  @IsEmail()
  @Field(() => String)
  email: string

  @MinLength(6, {
    message: 'min 6',
  })
  @Field(() => String)
  password: string
}

@InputType()
export class LoginInput {
  @Field(() => String)
  email: string

  @Field(() => String)
  password: string
}
