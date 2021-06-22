import { addObject, deleteObject, getObjects, updateObject } from "../utils/crudMutations";
import { Arg, Field, InputType, Int, Mutation, Query,Resolver } from "type-graphql";
import {User} from '../entities/User'

@InputType()
class UserInputType{
    @Field()
    firstName: string;

    @Field({nullable:true})
    middleName?: string;

    @Field()
    lastName: string;

    @Field()
    email: string;

    @Field()
    phone: string;

    @Field(()=>Int)
    role: number;

    @Field()
    address: string;
}

@Resolver()
export class UserResolver{
    @Query(()=>[User])
    getUsers(){
        return getObjects();
    }

    @Mutation(()=>[User])
    addUser(
        @Arg('newUser',()=>UserInputType) newUser:UserInputType
    ){
        const user:User = {
            firstName:"hello",
            middleName : "Kumar",
            lastName : "Shukla",
            email : "abhilash@gmail.com",
            phone : "921299034",
            role:0,
            address:"vasant kunj"
        }

        return addObject(newUser);

    } 

    @Mutation(()=>[User])
    updateUser(
        @Arg('email') email:string,
        @Arg('newUser',()=>UserInputType) newUser:UserInputType
    ){
        return updateObject(email,newUser);
    }   

    @Mutation(()=>[User])
    deleteUser(
        @Arg('email') email:string,
    ){
        return deleteObject(email);
    }   


}