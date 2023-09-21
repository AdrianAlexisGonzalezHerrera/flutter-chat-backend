/*
    path:   api/login

*/
const { Router } = require('express');
const { check } = require('express-validator');

const { crearUsuario, loginUsuario, renewToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();



router.post('/new', [
    check('nombre','El Nombre Es Obligatorio').not().isEmpty(),
    check('email','El Email Es Obligatorio').isEmail(),
    check('password','El Password Es Obligatorio').not().isEmpty(),
    validarCampos
], crearUsuario);

router.post('/', [
    check('email','El Email Es Obligatorio').isEmail(),
    check('password','El Password Es Obligatorio').not().isEmpty(),
    validarCampos
], loginUsuario);


// validarJWT,
router.get('/renew', validarJWT, renewToken );






module.exports = router;