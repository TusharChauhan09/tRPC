import { router, publicProcedure } from "./trpc";
import { z } from "zod";
// step-3 serve the api
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import jwt from 'jsonwebtoken';

const todoInputType = z.object({
  title: z.string(),
  des: z.string(),
});

//  step-2 setup the routes 
// router
const appRouter = router({
  // procedure 

  createTodo: publicProcedure    //procedure -1
  .input(todoInputType)
  .mutation(async (opts) => {

    // context-3 use context
    const email  = opts.ctx.email;
    console.log(email);

    const title = opts.input.title;
    const des = opts.input.des;

    // store task in db

    return {
      id: "1",
      title: title,
      des: des,
    };

  }),

  // Authentication
  signUp: publicProcedure       //procedure-2
  .input(z.object({
    email: z.string(),
    password: z.string()
  }))
  .mutation(async (opts)=>{
    const email = opts.input.email;
    const password = opts.input.password;

    // store in db 
    // validation if already exist

    const token = jwt.sign({ email: email }, 'hi', { expiresIn: '90000h' });

    return {
      token
    }
  })

});

// step-3 serve the api
const server = createHTTPServer({
    router: appRouter,
    
    // context-2 create context
    createContext(opts){
      const authHeader = opts.req.headers["authorization"];
      console.log(authHeader);
      
      // @ts-ignore
      let verify = jwt.verify(authHeader, 'hi');

      return {
        email: verify.email
      }
    }
}); 
server.listen(3000);

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
 
