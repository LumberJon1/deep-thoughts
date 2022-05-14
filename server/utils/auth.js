const jwt = require("jsonwebtoken");

const secret = process.env.SECRET;
const expiration = "2h";

module.exports = {

    // Middleware to handle passing headers to the resolvers
    authMiddleware: function({req}) {
        let token = req.body.token || req.query.token || req.headers.authorization;

        if (req.headers.authorization) {
            // Separates the "Bearer" from the token value
            token = token
                .split(" ")
                .pop()
                .trim();
        }

        // If there is no token, return the request object
        if (!token) {
            return req;
        }

        try {
            const {data} = jwt.verify(token, secret, {maxAge: expiration});
            req.user = data;
        } catch {
            console.log("Invalid token");
        }

        return req;
    },

    // Sign token expects a user object to destructure
    signToken: function({username, email, _id}) {
        const payload = {username, email, _id};

        return jwt.sign({data: payload}, secret, {expiresIn: expiration});
    }
};