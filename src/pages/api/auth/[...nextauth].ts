//libs
import NextAuth, {NextAuthOptions} from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import {PrismaAdapter} from '@next-auth/prisma-adapter';

//utils
import {prisma} from '@/server/prisma';

//types
import {AdapterUser} from 'next-auth/adapters';

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
  // https://next-auth.js.org/configuration/providers/oauth
  adapter: {
    ...PrismaAdapter(prisma),
    createUser: (data) =>
      prisma.user.create({data: {...data, role: 'USER'}}) as unknown as AdapterUser,
  },
  providers: [
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          }),
        ]
      : []),
  ],
  callbacks: {
    session({session, user}) {
      if (user && session.user) {
        session.user = user;
      }

      return session;
    },
  },
};

export default NextAuth(authOptions);
