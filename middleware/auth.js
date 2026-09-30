import jwt from "jsonwebtoken";

const auth = (req,res,next) => {
    try {
        const token = req.header("Authorization");

        if (!token) {
            return res.status(401).json({
                message: "token is ont  provided"
            });
        }
        const actualToken = token.replace("Bearer ", "");

        const decoded = jwt.verify(
            actualToken,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();

    } catch (error) {
        res.status(401).json({
            message: "Invalid"
        });
    }
};

export default auth;
