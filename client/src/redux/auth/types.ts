export interface SignupCredentials {
  username: string;
  email: string;
  password: string;
}

export interface SignupResponse {
  user: {
    username: string;
    email: string;
  };
  token: string;
}

export interface SigninCredentials {
  email: string;
  password: string;
}

export interface SigninResponse {
  user: {
    email: string;
    username: string;
  };
  token: string;
}

export interface RefreshUserResponse {
  user: {
    username: string;
    email: string;
  };
  _id: string;
  token: string;
}
