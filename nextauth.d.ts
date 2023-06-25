//types
import type {Role, User} from '@prisma/client';
import type {DefaultSession} from 'next-auth';

// nextauth.d.ts
declare module 'next-auth' {
  interface User {
    id: string;
    name: string | null;
    email: string | null;
    emailVerified: Date | null;
    image: string | null;
    createdAt: Date;
    updatedAt: Date;
    role: Role;
  }

  interface Session extends DefaultSession {
    user?: User;
  }
}
