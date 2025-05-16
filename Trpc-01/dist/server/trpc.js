"use strict";
// step-1  initializing trcp
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicProcedure = exports.router = void 0;
const server_1 = require("@trpc/server");
/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
// normal 
// const t = initTRPC.create();
// Context 
// context-1  initializing trcp
const t = server_1.initTRPC.context().create();
/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
exports.router = t.router;
exports.publicProcedure = t.procedure;
