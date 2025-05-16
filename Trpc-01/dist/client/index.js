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
Object.defineProperty(exports, "__esModule", { value: true });
exports.trpc = void 0;
// NODE Client
const client_1 = require("@trpc/client");
//     👆 **type-only** import
// Pass AppRouter as generic here. 👇 This lets the `trpc` object know
// what procedures are available on the server and their input/output types.
exports.trpc = (0, client_1.createTRPCClient)({
    links: [
        (0, client_1.httpBatchLink)({
            url: 'http://localhost:3000',
            // context-4 add authorization header
            headers() {
                return __awaiter(this, void 0, void 0, function* () {
                    return {
                        // Authorization: 'Bearer ' + localStorage.getItem("token"),
                        Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InR1c2hhckBnbWFpbC5jb20iLCJpYXQiOjE3NDcwNzAzMzMsImV4cCI6MjA3MTA3MDMzM30.kdQBYSRyjNsWYhqu5Vw8ng5GY1sasKzK3K1QtrgtRnE'
                    };
                });
            }
        }),
    ],
});
function CreateTodo() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield exports.trpc.createTodo.mutate({
            title: "Go to gym",
            des: "Back + Bicep"
        });
        console.log(response);
    });
}
function SignUp() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield exports.trpc.signUp.mutate({
            email: "tushar@gmail.com",
            password: "123"
        });
        // localStorage.setItem("token", response.token);
        console.log(response.token);
    });
}
// SignUp();
CreateTodo();
