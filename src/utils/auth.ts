import { NextAuthOptions } from 'next-auth';
import { getServerSession } from 'next-auth/next';
import { Session } from 'next-auth';

// Define the session type
export interface CustomSession extends Session {
  user: {
    id: string;
    email: string;
    name?: string;
    role?: string;
  };
}

// Auth options configuration
export const authOptions: NextAuthOptions = {
  providers: [
    // Add your providers here
    // Example:
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID!,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    // }),
  ],
  callbacks: {
    async session({ session, token }): Promise<CustomSession> {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub as string,
          role: token.role as string,
        },
      };
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
};

// Helper function to get the session on the server side
export const getSession = async () => {
  return await getServerSession(authOptions);
}; 