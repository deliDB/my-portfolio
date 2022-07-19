/**
 * Error Handlers
 */

//404 Error Handler
const errorHandler404 = (req, res, next) => {
    console.log('Handling 404 error');

    //Create new error to handle non-existent page routes
    const err = new Error('err');
    err.status = 404;
    err.message = "Oops! Page not found. Looks like this page doesn't exist.";
    next(err);
}

//Global error handler
const globalErrorHandler = (err, req, res, next) => {
    console.log('Handling a global error');
    if(err.status === 404){
        res.render('not_found', { err })
        console.error(`${err.status} - ${err.message}`)
        
    } else {
        err.status = err.status || 500;
        err.message = "There was an error with the server."
        res.render('error', { err })
        console.error(`${err.status} - ${err.message}`);
    }
}

module.exports = {errorHandler404, globalErrorHandler}