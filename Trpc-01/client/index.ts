// NODE Client
import { createTRPCClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../server';
//     👆 **type-only** import
 
// Pass AppRouter as generic here. 👇 This lets the `trpc` object know
// what procedures are available on the server and their input/output types.
export const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000',

      // context-4 add authorization header
      async headers(){
        return {
          // Authorization: 'Bearer ' + localStorage.getItem("token"),
          Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InR1c2hhckBnbWFpbC5jb20iLCJpYXQiOjE3NDcwNzAzMzMsImV4cCI6MjA3MTA3MDMzM30.kdQBYSRyjNsWYhqu5Vw8ng5GY1sasKzK3K1QtrgtRnE'
        }
      }
    }),
  ],
});


async function CreateTodo(){
    const response = await trpc.createTodo.mutate({
        title:"Go to gym",
        des:"Back + Bicep"
    })
    console.log(response);
} 

async function SignUp(){
  const response = await trpc.signUp.mutate({
      email:"tushar@gmail.com",
      password:"123"
  })
  // localStorage.setItem("token", response.token);
  
  console.log(response.token);
}

// SignUp();
CreateTodo();