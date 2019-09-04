# Util API

## request sms code
Post /util/sms

param|name|type|des
-----|----|----|---
key|mobile|String|user mobile number
key|code|String|image code, param *code*, *hex* just only need one
key|hex|String|mobile number encrypted hash by rsa, param *code*, *hex* just only need one

## request image code
Get /util/code/image

param|name|type|des
-----|----|----|---
query|mobile|String|user mobile number