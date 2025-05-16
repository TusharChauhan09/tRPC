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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const trpc_1 = require("./trpc");
const zod_1 = require("zod");
// step-3 serve the api
const standalone_1 = require("@trpc/server/adapters/standalone");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const todoInputType = zod_1.z.object({
    title: zod_1.z.string(),
    des: zod_1.z.string(),
});
//  step-2 setup the routes 
// router
const appRouter = (0, trpc_1.router)({
    // procedure 
    createTodo: trpc_1.publicProcedure //procedure -1
        .input(todoInputType)
        .mutation((opts) => __awaiter(void 0, void 0, void 0, function* () {
        // context-3 use context
        const email = opts.ctx.email;
        console.log(email);
        const title = opts.input.title;
        const des = opts.input.des;
        // store task in db
        return {
            id: "1",
            title: title,
            des: des,
        };
    })),
    // Authentication
    signUp: trpc_1.publicProcedure //procedure-2
        .input(zod_1.z.object({
        email: zod_1.z.string(),
        password: zod_1.z.string()
    }))
        .mutation((opts) => __awaiter(void 0, void 0, void 0, function* () {
        const email = opts.input.email;
        const password = opts.input.password;
        // store in db 
        // validation if already exist
        const token = jsonwebtoken_1.default.sign({ email: email }, 'hi', { expiresIn: '90000h' });
        return {
            token
        };
    }))
});
// step-3 serve the api
const server = (0, standalone_1.createHTTPServer)({
    router: appRouter,
    // context-2 create context
    createContext(opts) {
        const authHeader = opts.req.headers["authorization"];
        console.log(authHeader);
        // @ts-ignore
        let verify = jsonwebtoken_1.default.verify(authHeader, 'hi');
        return {
            email: verify.email
        };
    }
});
server.listen(3000);
