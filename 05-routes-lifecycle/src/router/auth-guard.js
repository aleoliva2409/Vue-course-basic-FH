const authenticateGuard = async (to, from, next) => {
  return new Promise(() => {
    const random = Math.random() * 100;
    if (random > 50) {
      console.log('User Authenticate dbz');
      next()
    } else {
      console.log(random, 'User blocked dbz');
      next({ name: 'pokemon-home'})
    }
  });
};

export default authenticateGuard;
