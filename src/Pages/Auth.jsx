import Link from "antd/es/typography/Link"
function Auth(){
    return (

<div
      className="h-screen w-screen flex flex-col 
        items-center
        justify-center"
    >
      <Button>Login With Google</Button>
      <Button>Login With Github</Button>
      <Link to={"login"}>
        <Button>Login with Email</Button>
      </Link>

      <h1>
        Don't have an account <Link to={"/signin"}>Create Account</Link>
      </h1>
    </div>)
    }
    export default Auth