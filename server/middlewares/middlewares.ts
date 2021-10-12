import express from 'express'
const router = express.Router()

const PATH = (__dirname: any): string => {
  const path = __dirname.split('/')
  const newPath = path.slice(0, path.length - 2)
  return newPath.join('/')
}

export const get = (rout: string, filePath: string) => {
  return router.get(rout, async (req, res) => {
    res.contentType('text/html')
    res.status(200)
    res.sendFile(PATH(__dirname) + `/pages/` + filePath)
  })
}

// export const getAll = (req: any, res: any) => {
//   res.status(200).json({})
// }

// export const create = (req: any, res: any) => {
//   res.status(201).json({})
// }
