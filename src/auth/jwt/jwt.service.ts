import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
// import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtService {
  constructor(private http: HttpService) {}
  /**
   * Validates the token
   *
   * @param {string} token - The JWT token to validate
   */
  async verify(token: string) {
    try {
      const headersRequest = {
        'Content-Type': 'application/json',
        Authorization: token,
      };

      const url = process.env.BASE_URL;
      const result = await this.http
        .get(url, { headers: headersRequest })
        .toPromise();
      return result.data.data;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.UNAUTHORIZED);
    }
  }
}
