import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import axios from "axios";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [signUpUserName, setSignUpUserName] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [loginUserName, setLoginUserName] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();

    const { data } = await axios.post("/api/auth/signup", {
      userName: signUpUserName,
      password: signUpPassword,
    });
    console.log(data);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // signIn("credentials", {
      //   userName: loginUserName,
      //   password: loginPassword,
      //   redirect: false,
      // });
      signIn("google");
      router.push("/user");
    } catch (error) {}
  };

  return (
    <div>
      <form onSubmit={handleSignUp}>
        <h4>Sign up</h4>
        <input
          type="text"
          placeholder="username"
          value={signUpUserName}
          onChange={(e) => setSignUpUserName(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={signUpPassword}
          onChange={(e) => setSignUpPassword(e.target.value)}
        />
        <button type="submit">sign up</button>
      </form>
      <form onSubmit={handleLogin}>
        <h4>Login</h4>
        <input
          type="text"
          placeholder="username"
          value={loginUserName}
          onChange={(e) => setLoginUserName(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
        />
        <button type="submit">log in</button>
      </form>
      <button type="button" onClick={() => signOut()}>
        Log out
      </button>
    </div>
  );
}
