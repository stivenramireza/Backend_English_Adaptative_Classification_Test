/**
 * Función que permite validar si un aspirante ha iniciado sesión
 * @param  {json} req
 * @param  {json} res
 * @param  {json} next
 * @returns JSON del aspirante que ha iniciado sesión, de lo contrario redirección a la página de no acceso
 */
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

/**
 * Función que permite validar si un administrador ha iniciado sesión
 * @param  {json} req
 * @param  {json} res
 * @param  {json} next
 * @returns JSON del admin que ha iniciado sesión, de lo contrario redirección a la página de no acceso
 */
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

/**
 * Función que permite validar si un administrador puede habilitar exámenes o tener todos los roles
 * @param  {json} req
 * @param  {json} res
 * @param  {json} next
 * @returns JSON del admin que tiene estos permisos, de lo contrario redirección a la página de no acceso
 */
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

/**
 * Función que permite validar si un administrador puede gestionar estadísticas o tener todos los roles
 * @param  {json} req
 * @param  {json} res
 * @param  {json} next
 * @returns JSON del admin que tiene estos permisos, de lo contrario redirección a la página de no acceso
 */
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

/**
 * Función que permite validar si un administrador puede clasificar aspirantes o tener todos los roles
 * @param  {json} req
 * @param  {json} res
 * @param  {json} next
 * @returns JSON del admin que tiene estos permisos, de lo contrario redirección a la página de no acceso
 */
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

/**
 * Función que permite validar si un administrador puede gestionar preguntas o tener todos los roles
 * @param  {json} req
 * @param  {json} res
 * @param  {json} next
 * @returns JSON del admin que tiene estos permisos, de lo contrario redirección a la página de no acceso
 */
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
