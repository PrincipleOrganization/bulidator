import { Router } from 'express';

import { all, create, change, remove } from './controllers';
//import { authJwt } from '../../services/auth.service';

const router = new Router();

/*
router.get('/', authJwt, all);
router.post('/', authJwt, create);
router.put('/:id', authJwt, change);
router.delete('/:id', authJwt, remove);
*/

router.get('/', all);
router.post('/', create);
router.put('/:id', change);
router.delete('/:id', remove);

export default router;
