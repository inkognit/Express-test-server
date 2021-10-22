// import express from 'express'
// import controller from './authController'
// import authMiddlewares from './authMidlewares'
// import { check } from 'express-validator'
// import { PATH } from './httpMethods'
// const router = express.Router()

// router.get('/user', authMiddlewares, controller.user, (req, res) => {
//   res.contentType('text/html')
//   res.status(200)
//   res.sendFile(PATH(__dirname) + `/pages/accountPage/registration.html`)
// })
// router.post(
//   '/registration',
//   [
//     check('login', 'Имя пользователя не может быть пустым!').notEmpty(),
//     check('pass', 'Пароль должен быть от 8 символов').isLength({ min: 8 }),
//   ],
//   controller.registration,
//   (req: any, res: any) => {
//     res.contentType('application/json')
//     res.status(201)
//     res.sendFile(PATH(__dirname) + `/pages/accountPage/registration.html`)
//   },
// )
// router.post('/login', controller.login, (req, res) => {
//   res.contentType('application/json')
//   res.status(201)
//   res.sendFile(PATH(__dirname) + `/pages/accountPage/auth.html`)
// })

// module.exports = router
