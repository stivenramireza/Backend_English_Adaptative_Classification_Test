function sessChecker(req, res, next){
    let sess = req.session;
    if(sess){
        if(sess.user && sess.user.type == 1) {
            return next();
        }else{
            return res.redirect('/forbiden');
        }
    }else{
        return res.redirect('/forbiden');
    }
}

function sessCheckGeneralAdmin(req, res, next){
    let sess = req.session;
    if(sess){
        if(sess.user){
            if(sess.user.type != 2) {
                return res.redirect('/forbiden');
            }else{
                return next();
            }
        }else{
            return res.redirect('/forbiden');
        }
    }else{
        return res.redirect('/forbiden');
    }
}

function sessCheckerAdminEnableExam(req, res, next){
    let sess = req.session;
    if(sess){
        if(sess.user){
            if(sess.user.type != 2) {
                return res.redirect('/forbiden');
            }else{
                if(sess.user.habilitar_examenes || sess.user.administrador_general){
                    return next();
                }else{
                    return res.redirect('/admin/profile');
                }
            }
        }else{
            return res.redirect('/forbiden');
        }
    }else{
        return res.redirect('/forbiden');
    }
}
function sessCheckerAdminManageStatistics(req, res, next){
    let sess = req.session;
    if(sess){
        if(sess.user){
            if(sess.user.type != 2) {
                return res.redirect('/forbiden');
            }else{
                if(sess.user.gestionar_estadisticas || sess.user.administrador_general){
                    return next();
                }else{
                    return res.redirect('/admin/profile');
                }
            }
        }else{
            return res.redirect('/forbiden');
        }
    }else{
        return res.redirect('/forbiden');
    }
}
function sessCheckerAdminManageStudent(req, res, next){
    let sess = req.session;
    if(sess){
        if(sess.user){
            if(sess.user.type != 2) {
                return res.redirect('/forbiden');
            }else{
                if(sess.user.clasificar_aspirantes || sess.user.administrador_general){
                    return next();
                }else{
                    return res.redirect('/admin/profile');
                }
            }
        }else{
            return res.redirect('/forbiden');
        }
    }else{
        return res.redirect('/forbiden');
    }
}
function sessCheckerAdminManageQuestionsAndRoles(req, res, next){
    let sess = req.session;
    if(sess){
        if(sess.user){
            if(sess.user.type != 2) {
                return res.redirect('/forbiden');
            }else{
                if(sess.user.administrador_general){
                    return next();
                }else{
                    return res.redirect('/admin/profile');
                }
            }
        }else{
            return res.redirect('/forbiden');
        }
    }else{
        return res.redirect('/forbiden');
    }
}
module.exports = {
    sessChecker,
    sessCheckerAdminEnableExam,
    sessCheckerAdminManageStatistics,
    sessCheckerAdminManageStudent,
    sessCheckGeneralAdmin,
    sessCheckerAdminManageQuestionsAndRoles
};
