const express = require('express');
const app = express();

const { errorHandler404, globalErrorHandler } = require('./errorHandlers');

const mainRoute = require('./routes');

app.set('view engine', 'pug');

//Adds static middleware
app.use('/static', express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(mainRoute);

//Pass handler errors to the app
app.use(errorHandler404);
app.use(globalErrorHandler);

app.listen(3000, () => {
    console.log('The application is running on localhost:3000!')
});