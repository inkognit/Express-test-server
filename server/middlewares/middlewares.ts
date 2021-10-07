import colors from 'colors'
export var requestTime = function requestTime(
  req: { requestTime: number },
  _res: any,
  next: () => void,
) {
  req.requestTime = Date.now()

  next()
}

export var logger = function logger(
  req: { requestTime: string },
  _res: any,
  next: () => void,
) {
  console.log(colors.bgWhite.green('Req.time:' + req.requestTime))
  next()
}
