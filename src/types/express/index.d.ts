declare namespace Express {
  interface User {
    _id: number;
    accessToken?: string;
    refreshToken?: string;
    username?: string;
  }

  interface Request {
    user?: User;
  }
}
