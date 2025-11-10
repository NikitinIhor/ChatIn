export interface SignupCredentials {
  username: string;
  email: string;
  password: string;
}

export interface SignupResponse {
  data: {
    username: string;
    email: string;
    role: string;
    isActive: boolean;
    avatar: string | null;
  };
  accessToken: string;
}

export interface SigninCredentials {
  email: string;
  password: string;
}

export interface SigninResponse {
  data: {
    accessToken: string;
    user: {
      _id: string;
      username: string;
      email: string;
      role: string;
      isActive: boolean;
      avatar: string | null;
    };
  };
}
export interface RefreshUserResponse {
  data: {
    username: string;
    email: string;
    role: string;
    isActive: boolean;
    avatar: string | null;
  };
  _id: string;
  accessToken: string;
}
