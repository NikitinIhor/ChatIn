export interface SignupCredentials {
  name: string;
  email: string;
  password: string;
}

export interface SignupResponse {
  email: string;
  name: string;
  token: string;
}

export interface SigninCredentials {
  email: string;
  password: string;
}

export interface SigninResponse {
  email: string;
  name: string;
  token: string;
}

export interface RefreshUserResponse {
  _id: string;
  name: string;
  email: string;
  token: string;
}
