# Goods API
## create goods
Post /api/goods
param|name|type|des
-----|----|----|---
key|name|String|goods name
key|type|String|goods type
key|tags|String[]|goods tags
key|description|goods description
key|thumb_images|String[]|goods thumb images
key|combination|String[]|goods combinations

## get goods list
Get /api/goods
param|name|type|des
-----|----|----|---
query|last|String|last goods _id

## modify goods
Put /api/goods/:goodsId
param|name|type|des
-----|----|----|---
param|goodsId|String|goods _id
key|name|String|goods name
key|type|String|goods type
key|tags|String[]|goods tags
key|description|goods description
key|thumb_images|String[]|goods thumb images
key|combination|String[]|goods combinations

## create goods type
Post /api/goods/type
param|name|type|des
-----|----|----|---
key|name|String|type name
key|description|String|type description
key|parent|String|parent type _id

## get root goods type list
Get /api/goods/type

## get goods type by parent
Get /api/goods/type/:parent
param|name|type|des
-----|----|----|---
param|parent|String|goods type parent id

## modify goods type
Put /api/goods/type/:typeId
param|name|type|des
-----|----|----|---
param|typeId|String|goods type _id
key|name|String|type name
key|description|String|type description
key|parent|String|parent type _id

## remove goods type
Delete /api/goods/type/:typeId
param|name|type|des
-----|----|----|---
param|typeId|String|goods type _id

## modify goods stock
Put /api/goods/stock/:goodsId
param|name|type|des
-----|----|----|---
param|goodsId|String|goods _id
key|name|String|goods stock name
key|stock|Number|goods stock number
