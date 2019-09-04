# User API

## create user
Post /user

param|name|type|des
-----|----|----|---
key|code|String|sms code
key|mobile|String|user mobile number
key|password|String|login password

## get user info
Get /api/user/info


## modify user info
Put /api/user/info

param|name|type|des
-----|----|----|---
key|name|String|user nickname
key|description|String|user description
key|avatar|String|avatar url
key|birthdate|String|user birthdate
key|sex|String|user sex

## create user shipping address
Post /api/user/shipping/address

param|name|type|des
-----|----|----|---
key|receiver|String|revceive name
key|address.zip|String|address zip code
key|address.province|String|address province name
key|address.city|String|address city name
key|address.county|String|address county name
key|address.town|String|address town name
key|address.street|String|address street
key|address.mark|String|address remark
key|mobile|String|receiver mobile number
key|email|String|receiver email address
key|telephone|String|receiver telephone number

## get user shipping address list
Get /api/user/shipping/address


## modify user shipping address
Put /api/user/shipping/address/:addressId

param|name|type|des
-----|----|----|---
param|addressId|String|user shipping address _id
key|receiver|String|revceive name
key|address.zip|String|address zip code
key|address.province|String|address province name
key|address.city|String|address city name
key|address.county|String|address county name
key|address.town|String|address town name
key|address.street|String|address street
key|address.mark|String|address remark
key|mobile|String|receiver mobile number
key|email|String|receiver email address
key|telephone|String|receiver telephone number

## remove user shipping address
Delete /api/user/shipping/address/:addressId

param|name|type|des
-----|----|----|---
param|addressId|String|user shipping address _id