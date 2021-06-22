import { Int,Field, ObjectType } from "type-graphql";

//entities can also be turned into graphql types
//act as tables in sql
@ObjectType()
export class User {

  @Field()
  firstName!: string;

  @Field({nullable:true})
  middleName?: string;

  @Field()
  lastName!: string;

  @Field()
  email!: string;

  @Field()
  phone!: string;

  @Field(()=>Int)
  role!: number;

  @Field()
  address!: string;
        

}