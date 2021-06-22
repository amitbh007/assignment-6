"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = void 0;
const crudMutations_1 = require("../utils/crudMutations");
const type_graphql_1 = require("type-graphql");
const User_1 = require("../entities/User");
let UserInputType = class UserInputType {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UserInputType.prototype, "firstName", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], UserInputType.prototype, "middleName", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UserInputType.prototype, "lastName", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UserInputType.prototype, "email", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UserInputType.prototype, "phone", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], UserInputType.prototype, "role", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UserInputType.prototype, "address", void 0);
UserInputType = __decorate([
    type_graphql_1.InputType()
], UserInputType);
let UserResolver = class UserResolver {
    getUsers() {
        return crudMutations_1.getObjects();
    }
    addUser(newUser) {
        const user = {
            firstName: "hello",
            middleName: "Kumar",
            lastName: "Shukla",
            email: "abhilash@gmail.com",
            phone: "921299034",
            role: 0,
            address: "vasant kunj"
        };
        return crudMutations_1.addObject(newUser);
    }
    updateUser(email, newUser) {
        return crudMutations_1.updateObject(email, newUser);
    }
    deleteUser(email) {
        return crudMutations_1.deleteObject(email);
    }
};
__decorate([
    type_graphql_1.Query(() => [User_1.User]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "getUsers", null);
__decorate([
    type_graphql_1.Mutation(() => [User_1.User]),
    __param(0, type_graphql_1.Arg('newUser', () => UserInputType)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserInputType]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "addUser", null);
__decorate([
    type_graphql_1.Mutation(() => [User_1.User]),
    __param(0, type_graphql_1.Arg('email')),
    __param(1, type_graphql_1.Arg('newUser', () => UserInputType)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UserInputType]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "updateUser", null);
__decorate([
    type_graphql_1.Mutation(() => [User_1.User]),
    __param(0, type_graphql_1.Arg('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "deleteUser", null);
UserResolver = __decorate([
    type_graphql_1.Resolver()
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=user.js.map