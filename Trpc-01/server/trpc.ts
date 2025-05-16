// step-1  initializing trcp

import { initTRPC } from '@trpc/server';
 
/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
// normal 
// const t = initTRPC.create();
  


// Context 
// context-1  initializing trcp
const t = initTRPC.context<{
    email?: String;
}>().create();

/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router;
export const publicProcedure = t.procedure;