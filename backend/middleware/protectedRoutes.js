import supabase from "../utlis/supabase.js";

const verifyToken = async (req, res, next) => { 
    console.log(req?.cookies?.token);
    try {


        const token = req?.cookies?.token;

        if (!token) res.status(401).json({ error: "User no authenticated" })

        const { data: user, error } = await supabase.auth.getUser(token)

        if (error || !user) {
            res.status(401).json({ error: "Not Authencticated" })
        }
        req.user = user
        next()
    }
    catch (err) {
        console.log(err);
    }
} 

export default verifyToken;