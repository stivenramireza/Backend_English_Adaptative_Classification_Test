'use strict'

var path = require('path');
// Main View

function loadMainPage(req, res){
    res.sendFile(path.resolve('app/views/main/main.html'));
}

// Admin View

function loadLoginAdmin(req, res){
    res.sendFile(path.resolve('app/views/login-admin/login-admin.html'));
}

function loadProfile(req, res){
    res.sendFile(path.resolve('app/views/admin-profile/admin-profile.html'));
}

function logout(req, res){
    req.session.destroy();
    res.redirect('/');
}

function loadProfileRegister(req, res){
    res.sendFile(path.resolve('app/views/admin-profile/admins/admin-register.html'));
}

function loadExamEnable(req, res){
    res.sendFile(path.resolve('app/views/admin-profile/candidates/admin-exam-enable.html'));
}

function loadExamReactivate(req, res){
    res.sendFile(path.resolve('app/views/admin-profile/candidates/admin-exam-reactivate.html'));
}

function loadGrade(req, res){
    res.sendFile(path.resolve('app/views/admin-profile/candidates/admin-grade.html'));
}

function loadAddQuestion(req, res){
    res.sendFile(path.resolve('app/views/admin-profile/questions/admin-add-question.html'));
}

function loadEditQuestion(req, res){
    res.sendFile(path.resolve('app/views/admin-profile/questions/admin-edit-question.html'));
}

function loadUpdateQuestion(req, res){
    res.sendFile(path.resolve('app/views/admin-profile/questions/admin-edit-question-data.html'));
}

function loadAdminEdit(req, res){
    res.sendFile(path.resolve('app/views/admin-profile/admins/admin-edit.html'));
}

function loadAdminEditData(req, res){
    res.sendFile(path.resolve('app/views/admin-profile/admins/admin-edit-data.html'));
}

function loadAdminCandidateGrades(req, res){
    res.sendFile(path.resolve('app/views/admin-profile/candidates/admin-candidate-grades.html'));
}

function loadStatistics(req, res){
    res.sendFile(path.resolve('app/views/admin-profile/statistics/admin-statistics.html'));
}

function loadDesfase(req, res){
    res.sendFile(path.resolve('app/views/admin-profile/statistics/admin-desfase.html'));
}

function loadCandidateResults(req, res){
    res.sendFile(path.resolve('app/views/admin-profile/statistics/admin-candidate-results.html'));
}


// Examen View

function loadPreStarted(req, res) {
    res.sendFile(path.resolve('app/views/test-prestarted/test-prestarted.html'));
}

function loadTest(req, res) {
    res.sendFile(path.resolve('app/views/examen/examen.html'));
}

function loadTestError(req, res) {
    res.sendFile(path.resolve('app/views/examen/exam-error.html'));
}

function loadResult(req, res) {
    res.sendFile(path.resolve('app/views/examen-results/examen-results.html'));
}

// Candidate View

function loadLoginCandidate(req, res){
    res.sendFile(path.resolve('app/views/login-candidate/login-candidate.html'));
}

function loadSignupCandidate(req, res){
    res.sendFile(path.resolve('app/views/signup-candidate/signup-candidate.html'));
}

function loadUpdateProfile(req, res){
    res.sendFile(path.resolve('app/views/candidate-update/candidate-update.html'));
}

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
