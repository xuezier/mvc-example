openssl genrsa -passout pass:1111 -des3 -out ca.key 2048

# openssl req -passin pass:1111 -new -x509 -days 365 -key ca.key -out ca.crt -subj  "/C=FR/ST=Paris/L=Paris/O=Test/OU=Test/CN=localhost"
openssl req -passin pass:1111 -new -x509 -days 365 -key ca.key -out ca.crt -subj  "/C=FR/ST=Paris/L=Paris/O=Test/OU=Test/CN=ca"

openssl genrsa -passout pass:1111 -des3 -out server.key 2048

# openssl req -passin pass:1111 -new -key server.key -out server.csr -subj  "/C=FR/ST=Paris/L=Paris/O=Test/OU=Test/CN=localhost"
openssl req -passin pass:1111 -new -key server.key -out server.csr -subj  "/C=FR/ST=Paris/L=Paris/O=Test/OU=Server/CN=localhost"

openssl x509 -req -passin pass:1111 -days 365 -in server.csr -CA ca.crt -CAkey ca.key -set_serial 01 -out server.crt

openssl rsa -passin pass:1111 -in server.key -out server.key

openssl genrsa -passout pass:1111 -des3 -out oriclient.key 2048

# openssl req -passin pass:1111 -new -key client.key -out client.csr -subj  "/C=FR/ST=Paris/L=Paris/O=Test/OU=Test/CN=localhost"
openssl req -passin pass:1111 -new -key oriclient.key -out client.csr -subj  "/C=FR/ST=Paris/L=Paris/O=Test/OU=Client/CN=localhost"

openssl x509 -passin pass:1111 -req -days 365 -in client.csr -CA ca.crt -CAkey ca.key -set_serial 01 -out client.crt

openssl rsa -passin pass:1111 -in oriclient.key -out client.key

openssl pkcs8 -topk8 -inform PEM -passin pass:1111 -in oriclient.key -outform pem -nocrypt -out client.p8
# openssl pkcs8 -passin pass:1111 -in client.key -out client-java.key -nocrypt
# openssl pkcs12 -export -clcerts -in client.crt -inkey client.key -out client.p12
