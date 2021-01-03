'use strict'

var path = require('path');

/** Main view */

/**
 * Función que carga la vista principal
 * @param  {json} req
 * @param  {json} res
 * @returns Vista principal
 */
function loadMainPage(req, res){
    res.sendFile(path.resolve('app/views/main/main.html'));
}

/** Admin views */

/**
 * Función que carga la vista de login del administrador
 * @param  {json} req
 * @param  {json} res
 * @returns Vista de login del administrador
 */
function loadLoginAdmin(req, res){
    res.sendFile(path.resolve('app/views/login-admin/login-admin.html'));
}

/**
 * Función que carga la vista del perfil del administrador
 * @param  {json} req
 * @param  {json} res
 * @returns Vista del perfil del administrador
 */
function loadProfile(req, res){
    res.sendFile(path.resolve('app/views/admin-profile/admin-profile.html'));
}

/**
 * Función que carga permite destruir la sesión del administrador y redirigirlo a la página principal
 * @param  {json} req
 * @param  {json} res
 * @returns Página principal
 */
function logout(req, res){
    req.session.destroy();
    res.redirect('/');
}

/**
 * Función que carga la vista de registro del administrador
 * @param  {json} req
 * @param  {json} res
 * @returns Vista de registro del administrador
 */
function loadProfileRegister(req, res){
    res.sendFile(path.resolve('app/views/admin-profile/admins/admin-register.html'));
}

/**
 * Función que carga la vista de habilitación de exámenes 
 * @param  {json} req
 * @param  {json} res
 * @returns Vista de habilitación de exámenes
 */
function loadExamEnable(req, res){
    res.sendFile(path.resolve('app/views/admin-profile/candidates/admin-exam-enable.html'));
}

/**
 * Función que carga la vista de activación de exámenes 
 * @param  {json} req
 * @param  {json} res
 * @returns Vista de activación de exámenes
 */
function loadExamReactivate(req, res){
    res.sendFile(path.resolve('app/views/admin-profile/candidates/admin-exam-reactivate.html'));
}

/**
 * Función que carga la vista de notas de exámenes
 * @param  {json} req 
 * @param  {json} res
 * @returns Vista de notas de exámenes
 */
function loadGrade(req, res){
    res.sendFile(path.resolve('app/views/admin-profile/candidates/admin-grade.html'));
}

/**
 * Función que carga la vista de adición de preguntas
 * @param  {json} req
 * @param  {json} res
 * @returns Vista de adición de preguntas
 */
function loadAddQuestion(req, res){
    res.sendFile(path.resolve('app/views/admin-profile/questions/admin-add-question.html'));
}

/**
 * Función que carga la vista de edición de preguntas
 * @param  {json} req
 * @param  {json} res
 * @returns Vista de edición de preguntas
 */
function loadEditQuestion(req, res){
    res.sendFile(path.resolve('app/views/admin-profile/questions/admin-edit-question.html'));
}

/**
 * Función que carga la vista de una pregunta a editar
 * @param  {json} req
 * @param  {json} res
 * @returns Vista de una pregunta a editar
 */
function loadUpdateQuestion(req, res){
    res.sendFile(path.resolve('app/views/admin-profile/questions/admin-edit-question-data.html'));
}

/**
 * Función que carga la vista de un administrador a editar
 * @param  {json} req
 * @param  {json} res
 * @returns Vista de un administrador a editar
 */
function loadAdminEdit(req, res){
    res.sendFile(path.resolve('app/views/admin-profile/admins/admin-edit.html'));
}

/**
 * Función que carga la vista de la información un administrador a editar
 * @param  {json} req
 * @param  {json} res
 * @returns Vista de la información un administrador a editar
 */
function loadAdminEditData(req, res){
    res.sendFile(path.resolve('app/views/admin-profile/admins/admin-edit-data.html'));
}

/**
 * Función que carga la vista de las notas de los aspirantes
 * @param  {json} req
 * @param  {json} res
 * @returns Vista de las notas de los aspirantes
 */
function loadAdminCandidateGrades(req, res){
    res.sendFile(path.resolve('app/views/admin-profile/candidates/admin-candidate-grades.html'));
}

/**
 * Función que carga la vista de las estadísticas de los exámenes
 * @param  {json} req
 * @param  {json} res
 * @returns Vista de las estadísticas de los exámenes
 */
function loadStatistics(req, res){
    res.sendFile(path.resolve('app/views/admin-profile/statistics/admin-statistics.html'));
}

/**
 * Función que carga la vista del desfase de clasificación escrita vs oral
 * @param  {json} req
 * @param  {json} res
 * @returns Vista del desfase de clasificación escrita vs oral
 */
function loadDesfase(req, res){
    res.sendFile(path.resolve('app/views/admin-profile/statistics/admin-desfase.html'));
}

/**
 * Función que carga la vista de los resultados individuales de un aspirante
 * @param  {json} req
 * @param  {json} res
 * @returns Vista de los resultados individuales de un aspirante
 */
function loadCandidateResults(req, res){
    res.sendFile(path.resolve('app/views/admin-profile/statistics/admin-candidate-results.html'));
}

/** Examen views */

/**
 * Función que carga la vista de las instrucciones del examen
 * @param  {json} req
 * @param {json} res 
 * @returns Vista de las instrucciones del examen
 */
function loadPreStarted(req, res) {
    res.sendFile(path.resolve('app/views/test-prestarted/test-prestarted.html'));
}

/**
 * Función que carga la vista de las preguntas del examen
 * @param  {json} req
 * @param {json} res 
 * @returns Vista de las preguntas del examen
 */
function loadTest(req, res) {
    res.sendFile(path.resolve('app/views/examen/examen.html'));
}

/**
 * Función que carga la vista de no acceso al examen
 * @param  {json} req
 * @param {json} res 
 * @returns Vista de no acceso al examen
 */
function loadTestError(req, res) {
    res.sendFile(path.resolve('app/views/examen/exam-error.html'));
}

/**
 * Función que carga la vista de los resultados del examen
 * @param  {json} req
 * @param {json} res 
 * @returns Vista de los resultados del examen
 */
function loadResult(req, res) {
    res.sendFile(path.resolve('app/views/examen-results/examen-results.html'));
}

/** Aspirante views */

/**
 * Función que carga la vista de login del aspirante
 * @param  {json} req
 * @param {json} res 
 * @returns Vista de login del aspirante
 */
function loadLoginCandidate(req, res){
    res.sendFile(path.resolve('app/views/login-candidate/login-candidate.html'));
}

/**
 * Función que carga la vista de registro del aspirante
 * @param  {json} req
 * @param {json} res 
 * @returns Vista de registro del aspirante
 */
function loadSignupCandidate(req, res){
    res.sendFile(path.resolve('app/views/signup-candidate/signup-candidate.html'));
}

/**
 * Función que carga la vista de actualización de datos del aspirante
 * @param  {json} req
 * @param {json} res 
 * @returns Vista de actualización de datos del aspirante
 */
function loadUpdateProfile(req, res){
    res.sendFile(path.resolve('app/views/candidate-update/candidate-update.html'));
}

/**
 * Función que carga la vista de no acceso por sesión inactiva
 * @param  {json} req
 * @param {json} res 
 * @returns Vista de no acceso por sesión inactiva
 */
function loadForbiden(req, res) {
    res.sendFile(path.resolve('app/views/forbiden/forbiden.html'));
}

module.exports = {
    loadMainPage,
    loadLoginAdmin,
    loadExamEnable,
    loadExamReactivate,
    loadGrade,
    loadProfile,
    loadProfileRegister,
    loadAddQuestion,
    loadEditQuestion,
    loadAdminEditData,
    loadAdminEdit,
    loadAdminCandidateGrades,
    loadStatistics,
    loadDesfase,
    loadCandidateResults,
    logout,
    loadPreStarted,
    loadTest,
    loadTestError,
    loadResult,
    loadLoginCandidate,
    loadSignupCandidate,
    loadUpdateProfile,
    loadUpdateQuestion,
    loadForbiden
};
