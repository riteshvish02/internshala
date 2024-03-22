class ErrorHandler extends Error {
    Constructor (message,statuscode) {
        super(message);
        this.statusCode = statuscode;
        Error.captureStackTrace(this,this.Constructor);
    }
}

module.exports = ErrorHandler;