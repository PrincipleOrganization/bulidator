import { Router } from 'express';

import { all, login, create, change, remove } from './controllers';
//import { authLocal, authJwt } from '../../services/auth.service'; //authentification

const router = new Router();

/* //authentification
router.get('/', authJwt, all);
router.post('/', authJwt, create);
router.put('/:id', authJwt, change);
router.delete('/:id', authJwt, remove);
router.post('/login', authLocal, login);
*/

router.get('/', all);
router.post('/', create);
router.put('/:id', change);
router.delete('/:id', remove);
router.post('/login', login);

export default router;
