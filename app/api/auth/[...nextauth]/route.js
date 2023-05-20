import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDB } from "@/utils/database";
import User from "@/models/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials, req) {
        console.log("get auth", credentials);
        const { email, csrfToken } = await credentials;
        // if (credentials.email) {
        //   //   const { email, csrfToken } = credentials;
        //   try {
        //     await connectToDB();

        //     // // check if user already exists
        //     const userExists = await User.findOne({ email: email });
        //     if (!userExists) {
        //       await User.create({
        //         email: credentials.email,
        //         username: credentials.email.split("@")[0],
        //         //   image: profile.picture,
        //       });
        //     }
        //     return { email, csrfToken };
        //   } catch (error) {}
        // }
        return { email, csrfToken };
      },
    }),
  ],
  callbacks: {
    async session({ session }) {
      // store the user id from MongoDB to session
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();

      return session;
    },
    async signIn({ account, profile, user, credentials }) {
      console.log("profile", profile);
      console.log("credentials-->", credentials);

      if (profile?.email) {
        try {
          await connectToDB();

          // Check if user already exists
          const userExists = await User.findOne({ email: profile.email });

          // If not, create a new document and save user in MongoDB
          if (!userExists) {
            await User.create({
              email: profile.email,
              username: profile.name.replace(" ", "").toLowerCase(),
              image: profile.picture,
            });
          }

          return true;
        } catch (error) {
          console.log("Error checking if user exists: ", error.message);
          return false;
        }
      } else if (credentials?.email) {
        const { email, csrfToken } = credentials;
        try {
          await connectToDB();

          // Check if user already exists
          const userExists = await User.findOne({ email });
          if (!userExists) {
            await User.create({
              email: credentials.email,
              username: credentials.email.split("@")[0],
            });
          }

          return { email, csrfToken };
        } catch (error) {
          console.log("Error creating user with credentials: ", error.message);
          return false;
        }
      }
    },
  },
});

export { handler as GET, handler as POST };
