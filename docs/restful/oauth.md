# Oauth API

## get access token
Post /oauth/token
param|name|type|des
-----|----|----|---
key|client_id|String|oauth clientId
key|client_secret|String|oauth clientSecret
key|grant_type|String|oauth grant_type, 'password'
key|username|String|user account mobile or email
key|password|String|user account password

## get authorization code
Post /oauth/authorize
```json
{
  "headers": {
    "Authorization": "Bearer ${accessToken}"
  }
}
```
param|name|type|des
-----|----|----|---
key|client_id|String|authorization code clientId
key|response_type|String|'code'