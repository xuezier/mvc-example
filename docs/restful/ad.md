# ad API
## create banner
Post /api/ad/banner

param|name|type|des
-----|----|----|---
key|description|String|banner show description
key|image|String|banner image file _id
key|link|String|banner link address

## remove ad banner
Delete /api/ad/banner/:bannerId

param|name|type|des
-----|----|----|---
param|bannerId|String|the _id of banner want to delete