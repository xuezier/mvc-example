import * as Mongodb from 'mongodb';
import {Collection, Model} from 'mvc-ts';

@Collection('oauth.clients')
@Model()
export class OauthClient {
  _id: Mongodb.ObjectID;
  client_id: string;
  client_secret: string;
  redirect_uri: string[];

  redirectUris: string[];

  public getCollection(): Mongodb.Collection {}
}