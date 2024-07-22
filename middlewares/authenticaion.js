import { validatetoken } from "../services/auth.js";

function checkforauthenticationcookie(cookieName) {
  return (req, res, next) => {
    const tokencookievalue = req.cookies[cookieName];
    
    if (!tokencookievalue) {
      // If the token cookie is not found, continue to the next middleware
      return next();
    }

    try {
      const userpayload = validatetoken(tokencookievalue);
      req.user = userpayload;
      console.log("requser hai ",req.user);
    } catch (error) {
      // If token validation fails, continue to the next middleware
      return next();
    }
1
    // Always call next() to pass control to the next middleware or route handler
    next();
  };

  
}

export { checkforauthenticationcookie };
