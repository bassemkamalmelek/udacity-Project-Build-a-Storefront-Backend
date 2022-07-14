//import dotenv
import dotenv from 'dotenv'

//config dotenv and declear the vars
dotenv.config()

const {
  POSTGRES_PORT,
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_TEST_DB,
  ENV,
  DCRYPT_PASSWORD,
  SALT_ROUNDS,
  TOKEN_SECRET,
  INIT_USER,
  INIT_PASSWORD,
} = process.env

export default {
  user: POSTGRES_USER,
  init_user: INIT_USER,
  host: POSTGRES_HOST,
  database: ENV === 'dev' ? POSTGRES_DB : POSTGRES_TEST_DB,
  devdb: POSTGRES_DB,
  testdb: POSTGRES_TEST_DB,
  password: POSTGRES_PASSWORD,
  init_password: INIT_PASSWORD,
  port: POSTGRES_PORT,
  max: 10,
  idleTimeoutMillis: 20000,
  connectionTimeoutMillis: 0,
  pepper: DCRYPT_PASSWORD,
  salt: SALT_ROUNDS,
  tokenSecret: TOKEN_SECRET,
}
