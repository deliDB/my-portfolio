const express = require('express');
const { projects } = require('./data/data.json')

const app = express();

app.set('view engine', 'pug');

//Adds static middleware
app.use('/static', express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//GET home page
app.get('/', (req, res, next) => {
    res.render('index', { projects });
});

//GET about page
app.get('/about', (req, res, next) => {
    //res.render('about');  
    error.status = 500;
});

//GET project page
app.get('/project/:id', (req, res, next) => {
    const projectId = req.params.id;
    const project = projects.find( ({ id }) => id === +projectId);

    if(project){
        res.render('project', { project });
    } else {
        next();
    }
});

//404 Error Handler
app.use((req, res, next) => {
    console.log('Handling 404 error');

    //Create new error to handle non-existent page routes
    const err = new Error('err');
    err.status = 404;
    err.message = "Oops! Page not found. Looks like this page doesn't exist.";
    next(err);
}); 

//Global error handler
app.use((err, req, res, next) => {
    console.log('Handling a global error');
    if(err.status === 404){
        res.render('not_found', { err })
        //res.send(err.message)
        console.error(`${err.status} - ${err.message}`)
        
    } else {
        err.status = err.status || 500;
        err.message = "There was an error with the server."
        res.render('error', { err })
        //res.send(err.message);
        console.error(`${err.status} - ${err.message}`);
    }
});


app.listen(3000, () => {
    console.log('The application is running on localhost:3000!')
});