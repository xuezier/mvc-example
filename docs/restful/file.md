# File API
## upload file
Post /api/file

param|name|type|des
-----|----|----|---
key|file|FormData|file object

## preview file
Get /api/file/:fileId

param|name|type|des
-----|----|----|---
param|fileId|String|file _id

## download file
Get /api/file/download/:fileId

param|name|type|des
-----|----|----|---
param|fileId|String|file _id
