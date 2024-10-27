const User = require("../schemas/User");

class UserController {
    async store(req, res) {
        const { username, password } = req.body;
        
        const checkUsername = await User.findOne({username});

        if(checkUsername){
            return res.status(400).json({ error: 'Nome de usuário já utilizado' });
        }

        const user = await User.create({
            username: username,
            password: password
        })

        user = user.toJSON();

        return res.json(user);
    }
}
export default new UserController();