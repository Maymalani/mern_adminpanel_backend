var validator = (schema) => async (req,res,next) => {
    try {
        var parseBody = await schema.parseAsync(req.body);
        req.body = parseBody;
        next();
    } catch (err) {
        var status = 400;
        var message = "Fill Input Properly";
        var extraDetails = err.errors[0].message;

        const error = { status , message , extraDetails };
        next(error)
    }
};

module.exports = validator;