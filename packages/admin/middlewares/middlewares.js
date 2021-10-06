import colors from 'colors';
export var requestTime = function requestTime(req, res, next) {
    req.requestTime = Date.now();

    next();
};

export var logger = function logger(req, res, next) {

    console.log(colors.bgWhite.green('Req.time:' + req.requestTime));
    next();
};