"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User = (function () {
    function User(email, firstName, lastName, password, dateOfBirth) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth;
        this.password = password;
        this.role = 'USER';
    }
    return User;
}());
exports.User = User;
