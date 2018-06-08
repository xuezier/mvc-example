# Goods API
## create goods
Post /api/goods
param|name|type|des
-----|----|----|---
key|name|String|goods name
key|type|String|goods type
key|tags|String[]|goods tags
key|price|Number|goods price
key|description|String|goods description
key|thumb_images|String[]|goods thumb images
key|combination|String[]|goods combinations

## get goods counter
Get /api/goods/counter

## get goods counter by type
Get /api/goods/counter/type/:type
param|name|type|des
-----|----|----|---
param|type|String|goods type _id

## get goods list
Get /api/goods
param|name|type|des
-----|----|----|---
query|last|String|last goods _id
query|page|Number|optional, list page, if page is having, last will not effect

## modify goods
Put /api/goods/update/:goodsId
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

## create discount
Post /api/goods/discount
param|name|type|des
-----|----|----|---
key|type|String|discount type [REDUCTION, CUT_OFF]
key|condition|String|discount condition [AMOUNT, NUMBERS]
key|satisfied|Number|discount condition satisfied
key|start_at|Date|discount start use time
key|end_at|Date|discount end use time

## disable discount
Put /api/goods/discount/disable/:_id
param|name|type|des
-----|----|----|---
param|_id|String|discount id

## enable discount
Put /api/goods/discount/enable/:_id
param|name|type|des
-----|----|----|---
param|_id|String|discount id

## add discount to goods
Post /api/goods/discount/add
param|name|type|des
-----|----|----|---
key|goods|String|goods id
key|discount|String|discount id

## remove goods discount
Delete /api/goods/discount/
param|name|type|des
-----|----|----|---
key|goods|String|goods id

## get discount info
Get /api/goods/discount/:discount
param|name|type|des
-----|----|----|---
param|discount|String|discount id
