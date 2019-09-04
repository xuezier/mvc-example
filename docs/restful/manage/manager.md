# Manager api
## bind manager with code
Post /api/manager/bind

param|name|type|des
-----|----|----|---
key|code|String|the bind verify code

## create manager bind code
Post /api/manager/code

param|name|type|des
-----|----|----|---
key|code|String|the bind verify code
key|user|String|user _id
