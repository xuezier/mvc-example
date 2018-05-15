import * as Mongodb from 'mongodb';
import * as Reids from 'redis';

import {Service, Redis} from 'mvc-ts';
import { OauthToken, User } from '../model';

@Service()
@Redis({name: 'code.image', prefix: 'code.image'})
export class ImageCodeRedisService {
  private codeId: number = 0;
  private ttl: number = 180;
  private client: Reids.client;

  public async mobileExists(mobile: string): Promise<boolean> {
    const exists: number = await this.client.exists(`.mobile${mobile}`);
    return exists === 1 ? true : false;
  }

  public async delOldCode(mobile: string): Promise<boolean> {
    const code = await this.getCodeByMobile(mobile);
    await this.client.del(code);
    await this.client.del(`.mobile${mobile}`);
    return true;
  }

  public async codeExists(code: string): Promise<boolean> {
    const exists: number = await this.client.exists(code);
    return exists === 1 ? true : false;
  }

  public async bindImageCodeWithMobile(code: string, mobile: string): Promise<boolean> {
    await this.client.setex(code, this.ttl, mobile);
    await this.client.setex(`.mobole${mobile}`, this.ttl, code);
    return true;
  }

  public async getMobileByCode(code: string): Promise<string> {
    return await this.client.get(code);
  }

  public async getCodeByMobile(mobile: string): Promise<string> {
    return await this.client.get(`.mobile${mobile}`);
  }
}

@Service()
@Redis({name: 'sms.code', prefix: 'sms.code'})
export class SmsRedisService {
  private client: Reids.client;

  public async bindCodeWithMobile(mobile: string, code: string): Promise<string> {
    return await this.client.setex(mobile, 60 * 5, code);
  }

  public async getCodeByMobile(mobile: string): Promise<string> {
    return await this.client.get(mobile);
  }

  public async incrCodeRequest(mobile) {
    const key = `.request${mobile}`;

    const now = new Date;
    const hours = 23 - now.getHours();
    const munites = 59 - now.getMinutes();
    const seconds = 60 - now.getSeconds();
    const ttl = seconds + munites * 60 + hours * 60 * 60;

    await this.client.incr(key);
    await this.client.expire(key, ttl);
  }

  public async getCodeRequestLimit(mobile): Promise<number> {
    const key = `.request${mobile}`;

    const limit: number = await this.client.get(key);

    return limit ? limit : 0;
  }
}

@Service()
@Redis({name: 'oauth.token', prefix: 'oauth.token', db: 1})
export class OauthAccessTokenRedisService {
  private client: Reids.client;

  public async setAccessToken(token: OauthToken) {
    token.user = token.user.toHexString();
    token.client = token.client.toHexString();

    delete token._id;

    await this.client.hmset(token.accessToken, token);
    return await this.client.pexpireat(token.accessToken, +token.accessTokenExpiresAt);
  }

  public async getAccessToken(key: string) {
    const token: OauthToken = await this.client.hmget(key);
    if(!token) return null;

    token.accessTokenExpiresAt = new Date(token.accessTokenExpiresAt);
    token.refreshTokenExpiresAt = new Date(token.refreshTokenExpiresAt);
    return token;
  }

  public async setUser(user: User) {
    user._id = user._id.toHexString();
    await this.client.set(`.user${user._id}`, JSON.stringify(user));
    user._id = Mongodb.ObjectID(user._id);
  }

  public async getUser(key: string) {
    const userString: string = await this.client.get(`.user${key}`);
    if(!userString) return null;

    const user: User = JSON.parse(userString);

    user._id = Mongodb.ObjectID(user._id);
    return user;
  }
}
