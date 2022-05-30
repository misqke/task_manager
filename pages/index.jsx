import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (session) {
    router.push("/user");
  }

  const handleLogin = async () => {
    try {
      await signIn("google");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Task Manager</h1>
      <div>
        <button type="button" onClick={handleLogin}>
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
