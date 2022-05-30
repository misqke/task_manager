import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  session: {
    jwt: true,
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // CredentialsProvider({
    //   name: "login",
    //   credentials: {
    //     userName: { label: "username", type: "text" },
    //     password: { label: "password", type: "password" },
    //   },
    //   authorize: async (credendials) => {
    //     await dbConnect();
    //     const user = await Users.findOne({ userName: credendials.userName });
    //     if (!user) {
    //       return null;
    //     }
    //     const checkPassword = await compare(
    //       credendials.password,
    //       user.password
    //     );
    //     if (!checkPassword) {
    //       return null;
    //     }
    //     return {
    //       userName: user.userName,
    //       _id: user._id,
    //     };
    //   },
    // }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token, user }) {
      if (user) {
        session.user = user;
      }

      return session;
    },
  },
});
