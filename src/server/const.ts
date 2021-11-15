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
  error_pass_valid: {
    code: "INVALID_PASS_VALID",
    statusCode: 403,
    message:
      "Пароль должен быть от 5 до 15 символов и содержать буквы латинского алфавита и цифры!",
  },
  error_nick_exist: {
    code: "INVALID_NICK_EXIST",
    statusCode: 403,
    message: "Такой nickname уже существует!",
  },
  error_email_exist: {
    code: "INVALID_EMAIL_EXIST",
    statusCode: 403,
    message: "Такой email уже существует!",
  },
};
