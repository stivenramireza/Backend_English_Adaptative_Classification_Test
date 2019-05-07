const express = require('express');
const adminCtlr = require('../controllers/admin');
const examenCtlr = require('../controllers/examen');
const studentCtrlr = require('./../controllers/student');
const loginCtlr = require('../controllers/login');
const testCtlr = require('../controllers/examen');
const auth = require('../middlewares/auth') // Aún no se está usando
var cors = require('cors')
var request = require('request')

var corsOptions = {
    origin: 'http://ec2-34-207-193-227.compute-1.amazonaws.com',
    optionsSuccessStatus: 200
}

const router = express.Router();
const {check} = require('express-validator/check');
const QUERY_PATH = "http://ec2-34-207-193-227.compute-1.amazonaws.com";

// GET first_question desde Amazon Web Services (AWS)
router.get('/test/prestart', cors(corsOptions), function(req, res, next){
    request.get(QUERY_PATH + '/test/prestart', function(error, response, data){
        var _data = data;
        examenCtlr.saveTestStatus(req, res, _data);
    });
});

router.put('/api/test/update', examenCtlr.updateInfoExamen);

// POST next_question desde Amazon Web Services (AWS)
router.post('/test/next_question', cors(corsOptions), examenCtlr.next_question);

router.get('/test/info', cors(corsOptions), examenCtlr.getInfoExamen);

router.get('/test/statistics', cors(corsOptions), examenCtlr.statistics);

router.post('/test/statistics/level', cors(corsOptions), function(req, res, next){
    request.post({url: QUERY_PATH + '/test/statistics/level', 
    body: {c_part1: req.body.c_part1, c_part2: req.body.c_part2, c_part3: req.body.c_part3}, 
    json: true},  
    function(error, response, data){
        res.send(data);
    });
});

// GET de la Principal Page 
router.get('/signin', loginCtlr.loadLogin); // Carga el signin (página principal)

// GET del Aspirante
router.get('/signin/candidate', studentCtrlr.loadLoginCandidate); // Carga el signin del aspirante
router.get('/signup/candidate', studentCtrlr.loadSignupCandidate); //Carga el egistro del aspirante
router.get('/candidate/profile', studentCtrlr.updateProfile); // Carga el perfil del aspirante
router.get('/candidate/test/pre_started', testCtlr.loadPreStarted); // Carga las instrucciones del examen
router.get('/candidate/test/', testCtlr.loadTest); // Cargas las preguntas y opciones de respuesta
router.get('/candidate/test/final_result', testCtlr.loadResult); // Muestra la nota final
router.get('/api/candidate/list', studentCtrlr.getInfoCandidate); // Obtiene la info del aspirante
router.put('/api/candidate/update', studentCtrlr.updateInfoCandidate); // Actualiza la info del aspirante

// GET del Administrador
router.get('/signin/admin', adminCtlr.loadLoginAdmin); // Carga el signin del administrador
router.get('/admin/profile', adminCtlr.loadProfile); // Carga el perfil del administrador
router.get('/admin/logout', adminCtlr.logout); // Cerrar sesión del administrador
router.get('/api/admin/list', adminCtlr.getInfoAdmin); // Obtiene la info del admin
router.get('/api/admin/edit', adminCtlr.editarAdmin); // Obtiene la info del admin para editar
router.put('/api/admin/update', adminCtlr.updateInfoAdmin); // Actualiza la info del admin
router.get('/admin/profile/register', adminCtlr.loadProfileRegister) // Registrar administradores
router.get('/admin/profile/exam-enable', adminCtlr.loadExamEnable) //Habilitar examenes
router.get('/admin/profile/exam-reactivate', adminCtlr.loadExamReactivate) //Reactivar examenes
router.get('/admin/profile/grade', adminCtlr.loadGrade) //Clasificar aspirante
router.get('/admin/profile/add-question', adminCtlr.loadAddQuestion)
router.get('/admin/profile/edit-question', adminCtlr.loadEditQuestion)
router.get('/admin/profile/edit-admin', adminCtlr.loadAdminEdit)
router.get('/admin/profile/edit-admin/data', adminCtlr.loadAdminEditData)
router.get('/admin/profile/candidate-grades', adminCtlr.loadAdminCandidateGrades)

// Questions

// POST del Aspirante
router.post('/api/signin/candidate', [
    check('doctype').isNumeric().isIn([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]),
    check('docnumber').isNumeric().isLength({min: 5})
], studentCtrlr.login); // Postea para el signin del aspirante
router.post('/api/register/candidate', [
    check('doctype').isNumeric().isIn([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]),
    check('docnumber').isNumeric().isLength({min: 5}),
    check('firstname').matches('[a-zA-Z\\s]+').isLength({min: 4}),
    check('lastname').matches('[a-zA-Z\\s]+').isLength({min: 4}),
    check('genre').isNumeric().isIn([1, 2, 3]),
    check('currentcity').isAlphanumeric().isLength({min: 3}),
    check('address').matches('[a-zA-Z0-9\\#\\-\\°\\s]+').isLength({min: 4}),
    check('phonenumber').isNumeric().isLength({min: 5}),
    check('mobilephonenumber').isMobilePhone().isLength({max: 12}),
    check('email').isEmail().isLength({min: 7}),
    check('examen_activo').isBoolean()
], studentCtrlr.register); // Postea para el registro del aspirante

// POST del Admin
router.post('/api/signin/admin', [
    check('username').matches('[a-zA-Z\\s]+').isLength({min: 4}),
    check('password').matches('[a-zA-Z0-9\\#\\-\\°\\s]+').isLength({min: 8})
], adminCtlr.loguearAdmin); // Postea para el signin del admin
router.post('/api/register/admin', [
    check('doctype').isNumeric().isIn([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]),
    check('docnumber').isNumeric().isLength({min: 5}),
    check('firstname').matches('[a-zA-Z\\s]+').isLength({min: 4}),
    check('lastname').matches('[a-zA-Z\\s]+').isLength({min: 4}),
    check('estado').isBoolean(),
    check('genre').isNumeric().isIn([1, 2, 3]),
    check('currentcity').isAlphanumeric().isLength({min: 3}),
    check('address').matches('[a-zA-Z0-9\\#\\-\\°\\s]+').isLength({min: 4}),
    check('phonenumber').isNumeric().isLength({min: 7}),
    check('mobilephonenumber').isMobilePhone().isLength({max: 12}),
    check('email').isEmail().isLength({min: 7}),
    check('username').matches('[a-zA-Z\\s]+').isLength({min: 4}),
    check('password').matches('[a-zA-Z0-9\\#\\-\\°\\s]+').isLength({min: 8}),
    check('habilitar_examenes').isBoolean(),
    check('reactivar_examenes').isBoolean(),
    check('gestionar_estadisticas').isBoolean(),
    check('clasificar_aspirantes').isBoolean()
], adminCtlr.registrarAdmin); // Postea para el registro del admin

module.exports = router;