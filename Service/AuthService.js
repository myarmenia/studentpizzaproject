import User from '../Model/UserModel.js'
import genToken from '../Utils/Token.js'
import bcrypt from "bcrypt";
const authService = {

    login: async (email, password) => {
        const loginUser = await User.findOne({ email: email })
        
        if (loginUser) {
            if (bcrypt.compareSync(password, loginUser.password)) {
                const token = genToken(loginUser)
                return { token: token, message: "login successful" }
            }
        }
        return { message: "Wrong Email or Password" }
    }

}

export default authService