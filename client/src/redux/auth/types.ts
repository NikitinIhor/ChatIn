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
      id: string;
      username: string;
      email: string;
      role: string;
    };
  };
}
export interface RefreshUserResponse {
  data: {
    username: string;
    email: string;
    role: string;
  };
  _id: string;
  accessToken: string;
}
