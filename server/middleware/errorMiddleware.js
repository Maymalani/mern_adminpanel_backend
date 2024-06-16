var errorMiddleware = (err,req,res,next) => {
    var status = err.status || 400;
    var message = err.message || "BackEnd Error";
    var extraDetails = err.extraDetails || "BackEnd Error";

    return res.status(status).json({message,extraDetails});
}

module.exports = errorMiddleware;