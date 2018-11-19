const { env } = process
module.exports = {
  // 端口号
  PORT: env.PORT,
  // 数据库配置
  DATABASE: {
    NAME: env.DB_NAME,
    USERNAME: env.DB_USER,
    PASSWORD: env.DB_PASS,
    PORT: env.DB_PORT,
    HOST: env.DB_HOST
  },
  JWT_SECRET: env.SECRET_KEY
}