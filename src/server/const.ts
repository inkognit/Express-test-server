export const AUTHNAME = "auth";

export const SYSTEM_MESSAGE = {
  ok: {
    statusCode: 200,
    message: "OK!",
  },
  error_pass: {
    code: "INVALID_PASS",
    statusCode: 403,
    message: "Неправильно введен Пароль!",
  },
  error_log: {
    code: "INVALID_LOG",
    statusCode: 403,
    message: "Неправильно введен Логин!",
  },
};
