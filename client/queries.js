"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//get data
const getData = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: `
      query{
          getUsers{
          firstName
          lastName
          middleName
          role
          address
          phone
          email
        }
      }
        `,
        }),
    });
    const jsonRes = yield res.json();
    console.log("thi sis it", jsonRes);
    return jsonRes;
});
//update data
const updateData = (email, newUser) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: `
      mutation updateUser($email:String!,$newUser:UserInputType!){
          updateUser(email:$email,newUser:$newUser){
              firstName
              lastName
              middleName
              role
              address
              phone
              email
          }
      }
        `, variables: {
                email,
                newUser
            }
        })
    });
    const jsonRes = yield res.json();
    console.log("mtation", jsonRes);
    return jsonRes;
});
//delete data
const deleteData = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: `
        mutation deleteUser($email:String!){
            deleteUser(email:$email){
              firstName
              email
        }
        }
          `, variables: {
                email,
            }
        })
    });
    const jsonRes = yield res.json();
    console.log("mtation", jsonRes);
    return jsonRes;
});
