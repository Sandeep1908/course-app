import supabase from "../utils/supabase";

const userLogin=async(email,password)=>{
    console.log(email,password);
    try {
        const {data,error}= await supabase.auth.signInWithPassword({email,password})
        if(error){
            return {error:error.message}
        }
        return data
    } catch (error) {
        console.log(error.message);
    }
}

export {userLogin}