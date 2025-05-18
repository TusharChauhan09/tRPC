import { trpc } from "../utils/trpc";
const SignUp = () => {
    // we can use the query hook to get the data and the mutation hook to mutate the data
  const userQuery = trpc.user.me.useQuery();
  const userCreator = trpc.createUser.useMutation();
  
  // if query is loading
  if(userQuery.isLoading){
      return <div>Loading...</div>
  }
  // if query fails 
  if(userQuery.isError){
      return <div>wrong...</div>
  }

  return 
  <div>
    {/* to acces the data from the query */}
    <p>Hi {userQuery.data?.email}</p>
    Signup
    <button onClick={()=>{
        userCreator.mutate({
            username: "harkirat@gmail.com",
            password: "!23456"
        })
    }}></button>
  </div>;
};

export default SignUp;
