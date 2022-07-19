const express = require('express');
const router = express.Router();
const { projects } = require('../data/data.json')

//GET home page
router.get('/', (req, res, next) => {
    res.render('index', { projects });
});

//GET about page
router.get('/about', (req, res, next) => {
    res.render('about');  
});

//GET project page
router.get('/project/:id', (req, res, next) => {
    const projectId = req.params.id;
    const project = projects.find( ({ id }) => id === +projectId);

    if(project){
        res.render('project', { project });
    } else {
        next();
    }
});

module.exports = router;