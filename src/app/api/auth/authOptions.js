import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import * as bcrypt from "bcrypt";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/utils/prisma";
import { ambassadeur, admin } from "@/utils/Habilitation";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/",
  },
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    CredentialsProvider({
      name: "Credidentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Votre email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        const user = await prisma.Email.findUnique({
          email: credentials?.username,
        });
        if (!user) {
          throw new Error("L'email n'est pas enregistré...");
        } else if (user?.emailVerified === null) {
          throw new Error("L'email n'est pas vérifié...");
        } else if (!user?.password) {
          throw new Error("Créer votre mot de passe...");
        }

        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.password,
        );

        if (!isPasswordCorrect)
          throw new Error("Vous avez entrer un mauvais mot de passe");

        const { password, _id, __v, emailVerified, ...userWithoutPass } = user;
        return userWithoutPass;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (user && account?.provider === "google") {
        const userPerso = await prisma.Email.findUnique({
          where: { email: profile.email },
        });
        let role;
        if (!userPerso) {
          if (profile.email === admin) {
            role = "ADMIN";
          } else if (profile.email === ambassadeur) {
            role = "AMBASSADEUR";
          }
          await prisma.User.create({
            data: {
              id: profile.sub,
              email: profile.email,
              phone: "",
              firstName: profile.given_name,
              lastName: profile.family_name,
              image: profile.picture,
              name: profile.name,
              emailVerified:
                profile.email_verified === true ? new Date() : null,
              role: role ? role : "CLIENT",
            },
          });
        } else {
          if (profile.email === admin) {
            role = "ADMIN";
          } else if (profile.email === ambassadeur) {
            role = "AMBASSADEUR";
          }
          await UserModel.findOneAndUpdate(
            { email: profile.email },
            {
              $set: {
                firstName: user?.firstName
                  ? user.firstName
                  : profile.given_name,
                lastName: user?.lastName ? user.lastName : profile.family_name,
                image: profile.picture,
                emailVerified:
                  user.emailVerified === null && profile.email_verified === true
                    ? new Date()
                    : user.emailVerified,
              },
            },
            { upsert: true },
          )
            .lean()
            .exec();
        }
        const { id, password, _id, __v, emailVerified, ...userWithoutPass } =
          user;
        token.user = userWithoutPass;

        return token;
      } else if (user && account?.provider === "credentials") {
        token.user = user;
        return token;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token?.user;
      session.accessToken = token?.accessToken;
      return session;
    },
  },
};
