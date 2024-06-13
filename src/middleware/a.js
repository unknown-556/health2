// Middleware to check if user is a writer
function checkWriter(req, res, next) {
    if (req.user.role === 'writer') {
        next(); // User is a writer, allow access
    } else {
        return res.status(403).json({ message: 'Access forbidden. Only writers allowed.' });
    }
}

export default checkWriter
