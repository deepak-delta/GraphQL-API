import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose'
import { IsEmail, MinLength } from 'class-validator'
import { Field, InputType, ObjectType } from 'type-graphql'

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

export const UserModel = getModelForClass(User)

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
