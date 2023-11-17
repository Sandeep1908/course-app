import "dotenv/config"
import { createClient } from "@supabase/supabase-js";
import supabase from "../../utlis/supabase.js";

class Userauthentication {
  supabase
  constructor() {
    this.supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_KEY
    )
  }

  async Login(req, res) {
    try {
      const { email, password } = req.body;
      supabase.auth.signInWithPassword({ email, password }).then((user, err) => {
        if (err) {
          res.status(400).json({ error: err.message });
          return;
        }
        res.json({message:"Login Successfull",user:user});
      });
    } catch (err) {
      console.log("Error in Login");
    }
  }

  async SignUp(req, res) {
    try {
      const { email, password, name } = req.body;

      console.log(email,password);

      const { data, error } = await supabase.auth.signUp({
       email,
       password
      })

      if (error) {
        if (error.message.includes("already registered"))
          res.json({ error: "User already registered" });
      }

     console.log(data.session.access_token);
     
      if (data.session.access_token) {
        
        const { user, error } = await supabase
          .from('students')
          .insert([{ email: email, name: name ,student_id: data.user.id}]);
      }

      
      res.status(200).json({ message: "user created", user: data });

    }
    catch (err) {
      console.log("Error in Signup", err.message);
    }
  };

  async Logout(req, res) {
    await supabase.auth.signOut();
    res.json({ message: "User Logged Out" });
  }

}

export default new Userauthentication();





// const Forgotpassword = async (req, res) => {
//   try {
//     const { email } = req.body;
//     const response = await supabase.auth.resetPasswordForEmail(email, {
//       redirectTo: " ",
//     });
//     const { user, error } = response;
//     if (error) res.status(401).json({ error: error.message });
//     res.status(200).json({ message: "Reset password mail sent successfully." });
//   } catch (err) {
//     console.log(err);
//   }
// };

// const UpdatePassword = async (req, res) => {
//   try {
//     const { password } = req.body;
//     const response = await supabase.auth.updateUser({ password: password });
//     const { error } = response;
//     if (error) res.status(401).json({ error: error.message });
//     res.status(200).json({ message: "password reset successfully" })
//   } catch (error) {
//     console.log(error)
//   }


// }




