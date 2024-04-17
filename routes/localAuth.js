import { Router } from 'express';
const router = Router();
import User from '../schema/user/user.model.js';
import bcrypt from 'bcrypt';
import createJWT from '../utils/createJWT.js';

// /auth/signup
router.post('/signup', signup);

// /auth/login
router.post('/login', login);

async function signup(req, res) {
  try {
    // Add the user to the database
    const user = await User.create(req.body);
    // generate token
    const token = createJWT(user);
    res.json(token);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function login(req, res) {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) throw new Error();

    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new Error();

    res.json(createJWT(user));
  } catch {
    res.status(400).json('Bad Credentials');
  }
}

export default router;
