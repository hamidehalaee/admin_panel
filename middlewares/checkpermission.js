function checkPermission(permission) {
    return async (req, res, next) => {
      const user = req.user; 
      if (!user || !user.permissions || !user.permissions.includes(permission)) {
        return res.status(403).json({ message: 'Access forbidden' });
      }
      next();
    };
  }

Module.exports = checkPermission;