/**
 * Created by artem on 08.12.2015.
 */
var express = require('express');
var router = express.Router();
var ProjectRepo = require('project-repo');

/* GET Project page. */
router.get('/project', function(req, res) {
    ProjectRepo.getProjects().then(function (result) {
        res.render('projectlist.ejs', {
            user: req.user, // get the user out of session and pass to template
            table_names: result
        });
    }).catch(function (error) {
        if (error) {
            console.log("Conn ERROR in /project:" + error);
            res.writeHead(400);
            res.end();
        }
    });
});


module.exports = router;