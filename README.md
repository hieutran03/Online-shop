

## Pull source code

```bash
$ git clone https://github.com/hieutran03/Online-shop
```
## Environment example

```bash
.env
#Postgres
POSTGRES_HOST=db
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=12345
POSTGRES_DB=online-shop

#App
PORT=3000
SECRET_KEY=verysecret

#JWT
JWT_SECRET=verysecret
JWT_EXPIRATION_TIME=18000
BCRYPT_SALT_ROUNDS=10

#Redis
REDIS_HOST=cache
REDIS_PORT=6379

#RabbitMQ
RABBITMQ_HOST=queue
RABBITMQ_PORT=5672
RABBITMQ_USER=guest
RABBITMQ_PASSWORD=guest
CLOUDAMQP_URL=amqp://${RABBITMQ_USER}:${RABBITMQ_PASSWORD}@${RABBITMQ_HOST}:${RABBITMQ_PORT}
#Mail
SMTP_USER='your email go here'
SMTP_PASSWORD='your app password go here'

```
## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
$ npm run test
```

## Build and run source sode

```bash
$ docker compose up -d --build
```