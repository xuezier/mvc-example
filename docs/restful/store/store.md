# Store API

## create store
Post /api/store

param|name|type|des
-----|----|----|---
key|name|String|store name
key|brief_introduction|String|store introduction
key|url|String|store url
key|url_type|String| url type
key|description|String|store description

## set store address
Put /api/store/set/address

param|name|type|des
-----|----|----|---
key|address|String|address _id
key|store|String|store _id