const getIPAddress = (req) => {
    const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    return ipAddress;
  };
  export default function logIPAddress(req, res, next) {
    const ipAddress = getIPAddress(req);
    req.ipAddress = ipAddress;
    next();
  }
  