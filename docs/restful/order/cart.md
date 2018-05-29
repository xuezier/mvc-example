# Cart API
## get user cart info
Get /api/cart

## add goods to cart
Put /api/cart/add
param|name|type|des
-----|----|----|---
key|goods|String|goods _id
key|nums|Number|goods num want to buy

## remove goods from cart
Put /api/cart/remove
param|name|type|des
-----|----|----|---
key|goods|String|goods _id