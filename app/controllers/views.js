// Main View

function loadMainPage(req, res){
    res.render('../views/main/main.ejs');
}

// Admin View

function loadLoginAdmin(req, res){
    res.render("../views/login-admin/login-admin.ejs");
}

function loadProfile(req, res){
    res.render("../views/admin-profile/admin-profile.ejs");
}

function logout(req, res){
    res.redirect('/');
}

function loadProfileRegister(req, res){
    res.render("../views/admin-profile/admins/admin-register.ejs");
}

function loadExamEnable(req, res){
    res.render("../views/admin-profile/candidates/admin-exam-enable.ejs");
}

function loadExamReactivate(req, res){
    res.render("../views/admin-profile/candidates/admin-exam-reactivate.ejs");
}

function loadGrade(req, res){
    res.render("../views/admin-profile/candidates/admin-grade.ejs");
}

function loadAddQuestion(req, res){
    res.render("../views/admin-profile/questions/admin-add-question.ejs");
}

function loadEditQuestion(req, res){
    res.render("../views/admin-profile/questions/admin-edit-question.ejs");
}

function loadUpdateQuestion(req, res){
    res.render("../views/admin-profile/questions/admin-edit-question-data.ejs");
}

function loadAdminEdit(req, res){
    res.render("../views/admin-profile/admins/admin-edit.ejs");
}

function loadAdminEditData(req, res){
    res.render("../views/admin-profile/admins/admin-edit-data.ejs");
}

function loadAdminCandidateGrades(req, res){
    res.render("../views/admin-profile/candidates/admin-candidate-grades.ejs");
}

function loadStatistics(req, res){
    res.render("../views/admin-profile/statistics/admin-statistics.ejs");
}

function loadDesfase(req, res){
    res.render("../views/admin-profile/statistics/admin-desfase.ejs");
}

function loadCandidateResults(req, res){
    res.render("../views/admin-profile/statistics/admin-candidate-results.ejs");
}


// Examen View

function loadPreStarted(req, res) {
    res.render('../views/test-prestarted/test-prestarted.ejs');
}

function loadTest(req, res) {
    res.render('../views/examen/examen.ejs');
}

function loadTestError(req, res) {
    res.render('../views/examen/exam-error.ejs');
}

function loadResult(req, res) {
    res.render('../views/examen-results/examen-results.ejs');
}

// Candidate View

function loadLoginCandidate(req, res){
    res.render("../views/login-candidate/login-candidate.ejs")
}

function loadSignupCandidate(req, res){
    res.render("../views/signup-candidate/signup-candidate.ejs")
}

function loadUpdateProfile(req, res){
    res.render("../views/candidate-update/candidate-update.ejs")
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
    loadUpdateQuestion
};