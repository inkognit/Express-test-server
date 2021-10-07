import express from 'express'

const app = express()

const PATH = (__dirname: any): string => {
  const path = __dirname.split('/')
  const newPath = path.slice(0, path.length - 1)
  return newPath.join('/')
}

export const getFunc = (rout: string, filePath: string) => {
  return app.get(rout, async (req, res) => {
    res.sendFile(PATH(__dirname) + `/pages/` + filePath)
  })
}
