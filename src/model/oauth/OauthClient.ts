import * as Mongodb from 'mongodb';
import {Collection, Model} from 'mvc-ts';

@Collection('oauth.clients')
@Model()
export class OauthClient {
  _id: Mongodb.ObjectID;
  clientId: string;
  clientSecret: string;

  redirectUris: string[];

  public getCollection(): Mongodb.Collection {}
}