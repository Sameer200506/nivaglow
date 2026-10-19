export class SignupDto {
  name: string;
  email: string;
  password: string;
  orgName: string;
  businessName: string;
}

export class LoginDto {
  email: string;
  password: string;
}

export class RefreshTokenDto {
  refreshToken: string;
}