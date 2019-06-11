const express = require('express');

const adminCtlr = require('../controllers/admin');
const studentCtrlr = require('./../controllers/student');
const examenCtlr = require('../controllers/examen');
const questionCtlr = require('../controllers/pregunta');
const viewsCtlr = require('../controllers/views');

var cors = require('cors')
var request = require('request')


const sessManCtlr = require('../controllers/session_manager');
var corsOptions = {
    origin: 'http://ec2-34-207-193-227.compute-1.amazonaws.com',
    optionsSuccessStatus: 200
}

const router = express.Router();
const {check} = require('express-validator/check');
const QUERY_PATH = "http://ec2-34-207-193-227.compute-1.amazonaws.com";

// Views de la Página Principal
router.get('/signin', viewsCtlr.loadMainPage);


router.get('/forbiden', viewsCtlr.loadForbiden);

// CRUD del Examen
router.put('/api/test/update', examenCtlr.updateInfoExamen);
router.put('/api/test/updatebydoc', examenCtlr.updateByDocNumber);
router.post('/test/next_question', cors(corsOptions), examenCtlr.next_question);
router.get('/test/info', cors(corsOptions), examenCtlr.getInfoExamen);
router.get('/test/infoById', cors(corsOptions), examenCtlr.getInfoById);
router.get('/test/statistics', cors(corsOptions), examenCtlr.statistics);
router.get('/test/statistics/lastyear', cors(corsOptions), examenCtlr.getLastYearExams);
router.get('/test/statistics/lastmonth', cors(corsOptions), examenCtlr.getLastMonthExams);
router.get('/test/statistics/lastweek', cors(corsOptions), examenCtlr.getLastWeekExams);
router.get('/test/statistics/lastsemester', cors(corsOptions), examenCtlr.getLastSemesterExams);
router.get('/test/statistics/all', cors(corsOptions), examenCtlr.getAllExams);
router.get('/test/prestart', cors(corsOptions), function(req, res, next){
    request.get(QUERY_PATH + '/test/prestart', function(error, response, data){
        var _data = data;
        examenCtlr.saveTestStatus(req, res, _data);
    });
});
router.post('/test/statistics/level', sessManCtlr.sessChecker, cors(corsOptions), function(req, res, next){
    request.post({url: QUERY_PATH + '/test/statistics/level', 
    body: {c_part1: req.body.c_part1, c_part2: req.body.c_part2, c_part3: req.body.c_part3}, 
    json: true},  
    function(error, response, data){
        res.send(data);
    });
});

// Views del Examen
router.get('/candidate/test/error', sessManCtlr.sessChecker, viewsCtlr.loadTestError);

// CRUD del Aspirante
router.get('/api/candidate/list', studentCtrlr.getInfoCandidate);
router.put('/api/candidate/update', studentCtrlr.updateInfoCandidate);
router.put('/api/candidate/update-doc', studentCtrlr.updateCandidateByDoc);
router.post('/api/signin/candidate', [
    check('doctype').isNumeric().isIn([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]),
    check('docnumber').isNumeric().isLength({min: 5})
], studentCtrlr.login); 
router.post('/api/register/candidate', [
    check('doctype').isNumeric().isIn([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]),
    check('docnumber').isNumeric().isLength({min: 5}),
    check('firstname').matches('[a-zA-Z\\s]+').isLength({min: 4}),
    check('lastname').matches('[a-zA-Z\\s]+').isLength({min: 4}),
    check('genre').isNumeric().isIn([1, 2, 3]),
    check('currentdepartment').matches('[a-zA-Z\\s]+'),
    check('currentcity').matches('[a-zA-Z\\s]+'),
    check('address').matches('[a-zA-Z0-9\\#\\-\\°\\s]+').isLength({min: 4}),
    check('phonenumber'),
    check('mobilephonenumber').isMobilePhone().isLength({max: 18}),
    check('email').isEmail().isLength({min: 7}),
    check('examen_activo').isBoolean()
], studentCtrlr.register);

// Views del Aspirante
router.get('/signin/candidate', viewsCtlr.loadLoginCandidate);
router.get('/signup/candidate', viewsCtlr.loadSignupCandidate); 
router.get('/candidate/profile', sessManCtlr.sessChecker, viewsCtlr.loadUpdateProfile);
router.get('/candidate/test/pre_started', sessManCtlr.sessChecker, viewsCtlr.loadPreStarted);
router.get('/candidate/test/', sessManCtlr.sessChecker, viewsCtlr.loadTest);
router.get('/candidate/test/final_result', sessManCtlr.sessChecker, viewsCtlr.loadResult);

// CRUD del Admin
router.get('/api/admin/list', adminCtlr.getInfoAdmin); 
router.get('/api/admin/edit', adminCtlr.editarAdmin); 
router.put('/api/admin/update', adminCtlr.updateInfoAdmin); 
router.post('/api/signin/admin', [
    check('username').matches('[a-zA-Z\\s]+').isLength({min: 4}),
    check('password').matches('[a-zA-Z0-9\\#\\-\\°\\s]+').isLength({min: 8})
], adminCtlr.loguearAdmin); 
router.post('/api/register/admin', [
    check('doctype').isNumeric().isIn([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]),
    check('docnumber').isNumeric().isLength({min: 5}),
    check('firstname').matches('[a-zA-Z\\s]+').isLength({min: 4}),
    check('lastname').matches('[a-zA-Z\\s]+').isLength({min: 4}),
    check('estado').isBoolean(),
    check('genre').isNumeric().isIn([1, 2, 3]),
    check('currentdepartment').matches('[a-zA-Z\\s]+'),
    check('currentcity').matches('[a-zA-Z\\s]+'),
    check('phonenumber'),
    check('email').isEmail().isLength({min: 7}),
    check('username').matches('[a-zA-Z\\s]+').isLength({min: 4}),
    check('password').matches('[a-zA-Z0-9\\#\\-\\°\\s]+').isLength({min: 8}),
    check('sede').matches('[a-zA-Z\\s]+'),
    check('habilitar_examenes').isBoolean(),
    check('reactivar_examenes').isBoolean(),
    check('gestionar_estadisticas').isBoolean(),
    check('clasificar_aspirantes').isBoolean()
], adminCtlr.registrarAdmin);

// Views del Admin
router.get('/signin/admin', viewsCtlr.loadLoginAdmin);
router.get('/admin/profile', sessManCtlr.sessCheckGeneralAdmin, viewsCtlr.loadProfile);
router.get('/admin/logout', viewsCtlr.logout); 
router.get('/admin/profile/register', sessManCtlr.sessCheckerAdminManageQuestionsAndRoles, viewsCtlr.loadProfileRegister)
router.get('/admin/profile/exam-enable', sessManCtlr.sessCheckerAdminEnableExam, viewsCtlr.loadExamEnable)
router.get('/admin/profile/exam-reactivate', sessManCtlr.sessCheckerAdminEnableExam, viewsCtlr.loadExamReactivate)
router.get('/admin/profile/grade', sessManCtlr.sessCheckerAdminManageStudent, viewsCtlr.loadGrade)
router.get('/admin/profile/add-question', sessManCtlr.sessCheckerAdminManageQuestionsAndRoles, viewsCtlr.loadAddQuestion)
router.get('/admin/profile/edit-question', sessManCtlr.sessCheckerAdminManageQuestionsAndRoles, viewsCtlr.loadEditQuestion)
router.get('/admin/profile/edit-admin', sessManCtlr.sessCheckerAdminManageQuestionsAndRoles, viewsCtlr.loadAdminEdit)
router.get('/admin/profile/edit-admin/data', sessManCtlr.sessCheckerAdminManageQuestionsAndRoles, viewsCtlr.loadAdminEditData)
router.get('/admin/profile/candidate-grades', sessManCtlr.sessCheckerAdminManageStudent, viewsCtlr.loadAdminCandidateGrades)
router.get('/admin/profile/statistics', sessManCtlr.sessCheckerAdminManageStatistics, viewsCtlr.loadStatistics)
router.get('/admin/profile/gap', sessManCtlr.sessCheckerAdminManageStatistics, viewsCtlr.loadDesfase);
router.get('/admin/profile/individual-results', sessManCtlr.sessCheckerAdminManageStatistics, viewsCtlr.loadCandidateResults);
router.get('/admin/profile/edit-question/data', sessManCtlr.sessCheckerAdminManageQuestionsAndRoles, viewsCtlr.loadUpdateQuestion);

// CRUD de Preguntas
router.get('/api/question/list', questionCtlr.obtenerPregunta);
router.post('/api/register/question', questionCtlr.registrarPregunta); 
router.put('/api/question/update', questionCtlr.actualizarPregunta);
router.delete('/api/question/remove', questionCtlr.eliminarPregunta);
router.get('/api/question/findall', questionCtlr.encontrarTodo);

module.exports = router;
