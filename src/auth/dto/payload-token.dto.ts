export class PayloadTokenDto {

  sub: number;
  email: string;
  iat: number;
  exp: number;
  aud: string;
  iss: string;

  private constructor(
    sub, email, iat, exp, aud, iss
  ) {
    this.sub = sub
    this.email = email
    this.iat = iat
    this.exp = exp
    this.aud = aud
    this.iss = iss
  }

}