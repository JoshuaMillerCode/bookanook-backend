import { Router } from 'express';
const router = Router();
import passport from 'passport';

router.get('/login/success', (req, res) => {
  if (req.user) {
    res.status(200).json({
      error: false,
      message: 'Successfully Logged In',
      user: req.user,
    });
  } else {
    res.status(403).json({ error: true, message: 'Not Authorized' });
  }
});

router.get('/login/failed', (req, res) => {
  res.status(401).json({
    error: true,
    message: 'Log in failure',
  });
});

router.get(
  '/google/callback',
  passport.authenticate('google', {
    //bring them to protected routes
    successRedirect: 'http://localhost:5173',
    failureRedirect: '/login/failed',
  })
);
// don't know why tutorial said to put here, works just fine without it
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/logout', (req, res) => {
  console.log(req.user);
  req.logout();
  res.redirect('http://localhost:5173');
});

export default router;
