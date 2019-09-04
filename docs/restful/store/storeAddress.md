# Store Address API

## create address
Post /api/store/address

param|name|type|des
-----|----|----|---
key|mobile|String|
key|telephone|String|
key|email|String|
key|contact|String|
key|address.longitude|Number|
key|address.latitude|Number|
key|address.state|String|
key|address.province|String|
key|address.city|String|
key|address.county|String|
key|address.town|String|
key|address.street|String|
key|address.mart|String|
key|address.zip|String|

## modify address
Put /api/store/address/modify/:address_id

param|name|type|des
-----|----|----|---
param|address_id|String|address _id
key|mobile|String|
key|telephone|String|
key|email|String|
key|contact|String|
key|address.longitude|Number|
key|address.latitude|Number|
key|address.state|String|
key|address.province|String|
key|address.city|String|
key|address.county|String|
key|address.town|String|
key|address.street|String|
key|address.mart|String|
key|address.zip|String|

