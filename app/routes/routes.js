const express = require('express');
const adminCtlr = require('../controllers/admin');
const studentCtrlr = require('./../controllers/student');
const examenCtlr = require('../controllers/examen');
const questionCtlr = require('../controllers/pregunta');
const viewsCtlr = require('../controllers/views');
var cors = require('cors')
var request = require('request')
const sessManCtlr = require('../controllers/session_manager');

/** El módulo 'corsOptions' permite el acceso a esta URL en cualquier browser */
var corsOptions = {
    origin: 'http://ec2-34-207-193-227.compute-1.amazonaws.com',
    optionsSuccessStatus: 200
}

const router = express.Router();
const {check} = require('express-validator/check');
const QUERY_PATH = "http://ec2-34-207-193-227.compute-1.amazonaws.com";

/**
 * Ruta GET que carga la vista de la página principal
 * @exports '/signin'
 */
router.get('/signin', viewsCtlr.loadMainPage);

/**
 * Ruta GET que carga la vista de la página de no acceso
 * @exports '/forbiden'
 */
router.get('/forbiden', viewsCtlr.loadForbiden);

/** CRUD del Examen*/

/**
 * Ruta PUT que permite actualizar la información del examen de un aspirante
 * @exports '/api/test/update'
 */
router.put('/api/test/update', examenCtlr.updateInfoExamen);

/**
 * Ruta PUT que permite actualizar la información del examen de un aspirante por número de documento
 * @exports '/api/test/updatebydoc'
 */
router.put('/api/test/updatebydoc', examenCtlr.updateByDocNumber);

/**
 * Ruta POST que permite mostrar la siguiente pregunta del examen de un aspirante
 * @exports '/test/next_question'
 * @exports cors(corsOptions)
 */
router.post('/test/next_question', cors(corsOptions), examenCtlr.next_question);

/**
 * Ruta GET que permite obtener la información del examen de un aspirante
 * @exports '/test/info'
 * @exports cors(corsOptions)
 */
router.get('/test/info', cors(corsOptions), examenCtlr.getInfoExamen);

/**
 * Ruta GET que permite obtener la información del examen de un aspirante por número de documento
 * @exports '/test/infoById'
 * @exports cors(corsOptions)
 */
router.get('/test/infoById', cors(corsOptions), examenCtlr.getInfoById);

/**
 * Ruta GET que permite mostrar las estadísticas de los exámenes
 * @exports '/test/statistics'
 * @exports cors(corsOptions)
 */
router.get('/test/statistics', cors(corsOptions), examenCtlr.statistics);

/**
 * Ruta GET que permite obtener las estadísticas de los exámenes del último año
 * @exports '/test/statistics/lastyear'
 * @exports cors(corsOptions)
 */
router.get('/test/statistics/lastyear', cors(corsOptions), examenCtlr.getLastYearExams);

/**
 * Ruta GET que permite obtener las estadísticas de los exámenes del último mes
 * @exports '/test/statistics/lastmonth'
 * @exports cors(corsOptions
 */
router.get('/test/statistics/lastmonth', cors(corsOptions), examenCtlr.getLastMonthExams);

/**
 * Ruta GET que permite obtener las estadísticas de los exámenes de la última semana
 * @exports '/test/statistics/lastweek'
 * @exports cors(corsOptions)
 */
router.get('/test/statistics/lastweek', cors(corsOptions), examenCtlr.getLastWeekExams);

/**
 * Ruta GET que permite obtener las estadísticas de los exámenes del último semestre
 * @exports '/test/statistics/lastsemester'
 * @exports cors(corsOptions)
 */
router.get('/test/statistics/lastsemester', cors(corsOptions), examenCtlr.getLastSemesterExams);

/**
 * Ruta GET que permite obtener la información de todos los exámenes
 * @exports '/test/statistics/all'
 * @exports cors(corsOptions)
 */
router.get('/test/statistics/all', cors(corsOptions), examenCtlr.getAllExams);

/**
 * Ruta GET que permite obtener la primera pregunta de un examen de un aspirante
 * @exports '/test/prestart'
 * @exports cors(corsOptions)
 */
router.get('/test/prestart', cors(corsOptions), function(req, res, next){
    request.get(QUERY_PATH + '/test/prestart', function(error, response, data){
        var _data = data;
        examenCtlr.saveTestStatus(req, res, _data);
    });
});

/**
 * Ruta POST que permite postear el curso de inglés al cual podría aspirante según sus resultados en el examen
 * @exports '/test/statistics/level'
 * @exports sessManCtlr.sessChecker - Ruta segura
 * @exports cors(corsOptions)
 */
router.post('/test/statistics/level', sessManCtlr.sessChecker, cors(corsOptions), function(req, res, next){
    request.post({url: QUERY_PATH + '/test/statistics/level', 
    body: {c_part1: req.body.c_part1, c_part2: req.body.c_part2, c_part3: req.body.c_part3}, 
    json: true},  
    function(error, response, data){
        res.send(data);
    });
});

/** CRUD del Aspirante */

/**
 * Ruta GET que carga una página de error por no acceso para el aspirante
 * @exports '/candidate/test/error'
 * @exports sessManCtlr.sessChecker - Ruta segura
 */
router.get('/candidate/test/error', sessManCtlr.sessChecker, viewsCtlr.loadTestError);

/** Ruta GET que permite obtener la información del aspirante
 * @exports  '/api/candidate/list'
 */
router.get('/api/candidate/list', studentCtrlr.getInfoCandidate);

/**
 * Ruta PUT que permite actualizar la información del aspirante
 * @exports '/api/candidate/update'
 * @exports studentCtrlr.updateInfoCandidate
 */
router.put('/api/candidate/update', studentCtrlr.updateInfoCandidate);

/**
 * Ruta PUT que permite actualizar la información de un aspirante por número de documento
 * @exports '/api/candidate/update-doc'
 */
router.put('/api/candidate/update-doc', studentCtrlr.updateCandidateByDoc);

/**
 * Ruta POST que permite loguear al aspirante
 * @exports '/api/signin/candidate'
 */
router.post('/api/signin/candidate', [
    check('doctype').isNumeric().isIn([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]),
    check('docnumber').isNumeric().isLength({min: 5})
], studentCtrlr.login);

/**
 * Ruta POST que permite registrar al aspirante
 * @exports '/api/register/candidate'
 */
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

/** Views del Aspirante */

/**
 * Ruta GET que carga la vista de login del aspirante
 * @exports '/signin/candidate'
 */
router.get('/signin/candidate', viewsCtlr.loadLoginCandidate);

/**
 * Ruta GET que carga la vista de registro del aspirante
 * @exports '/signup/candidate'
 */
router.get('/signup/candidate', viewsCtlr.loadSignupCandidate); 

/**
 * Ruta GET que carga la vista del perfil del aspirante
 * @exports '/candidate/profile'
 * @exports sessManCtlr.sessChecker - Ruta segura
 */
router.get('/candidate/profile', sessManCtlr.sessChecker, viewsCtlr.loadUpdateProfile);

/**
 * Ruta GET que carga la vista de las instrucciones del examen
 * @exports '/candidate/test/pre_started'
 * @exports sessManCtlr.sessChecker - Ruta segura
 */
router.get('/candidate/test/pre_started', sessManCtlr.sessChecker, viewsCtlr.loadPreStarted);

/**
 * Ruta GET que carga la vista del examen con sus preguntas
 * @exports '/candidate/test/'
 * @exports sessManCtlr.sessChecker - Ruta segura
 */
router.get('/candidate/test/', sessManCtlr.sessChecker, viewsCtlr.loadTest);

/**
 * Ruta GET que carga la vista del examen con su resultado final
 * @exports '/candidate/test/final_result'
 * @exports sessManCtlr.sessChecker
 */
router.get('/candidate/test/final_result', sessManCtlr.sessChecker, viewsCtlr.loadResult);

/** CRUD del Admin */

/**
 * Ruta GET que obtiene la información del administrador
 * @exports '/api/admin/list'
 */
router.get('/api/admin/list', adminCtlr.getInfoAdmin); 

/**
 * Ruta GET que permite editar los datos de un administrador
 * @exports '/api/admin/edit'
 */
router.get('/api/admin/edit', adminCtlr.editarAdmin); 

/**
 * Ruta PUT que permite actualizar los datos de un administrador
 * @exports '/api/admin/update'
 */
router.put('/api/admin/update', adminCtlr.updateInfoAdmin);

/**
 * Ruta POST que permite loguear al administrador
 * @exports '/api/signin/admin'
 */
router.post('/api/signin/admin', [
    check('username').matches('[a-zA-Z\\s]+').isLength({min: 4}),
    check('password').matches('[a-zA-Z0-9\\#\\-\\°\\s]+').isLength({min: 8})
], adminCtlr.loguearAdmin); 

/**
 * Ruta POST que permite registrar al administrador
 * @exports '/api/register/admin'
 */
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

/** Views del Admin */


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

/** CRUD de Preguntas */


router.get('/api/question/list', questionCtlr.obtenerPregunta);
router.post('/api/register/question', questionCtlr.registrarPregunta); 
router.put('/api/question/update', questionCtlr.actualizarPregunta);
router.delete('/api/question/remove', questionCtlr.eliminarPregunta);
router.get('/api/question/findall', questionCtlr.encontrarTodo);

module.exports = router;
