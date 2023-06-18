type decodedToken = {
  user_id: string;
  username: string;
  avatarId: string;
  email: string;
  type: TUserRole;
};

interface ISession {
  activeSession: boolean;
  token: string | undefined;
  decodedToken: decodedToken | undefined;
}
