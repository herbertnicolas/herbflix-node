const User = require("../schemas/User");

class UserController {
    async store(req, res) {
        try {
            const { name, email, password } = req.body;
            
            const checkIfUser = await User.findOne({ email });
    
            if (checkIfUser) {
                return res.status(400).json({ error: 'Nome de usuário já utilizado' });
            }
    
            let user = await User.create({
                name: name,
                email: email,
                password: password
            });

            user = user.toJSON();
    
            return res.json(user);
        } catch (error) {
            console.log(error);
            return res.status(400).json({ error: 'Erro ao cadastrar usuário\n', error });
        }
    }

    async put(req, res) {
        console.log("entrouaqui")
        try{
            const { email, password } = req.body;
            const { id } = req.params;
    
            const user = await User.findById(id);

            if(!user){
                return res.status(400).json({ error: 'Usuário não encontrado' });
            }

            user.email = email;
            user.password = password;

            await user.save();

            return res.json(user);
        } catch (error) {
            return res.status(400).json({ error: 'Erro ao atualizar usuário' });
        }
    }

    async delete(req, res) {
        try{
            const { id } = req.params;
    
            const user = await User.findById(id);

            if(!user){
                return res.status(400).json({ error: 'Usuário não encontrado' });
            }

            await user.remove();

            return res.json({ message: 'Usuário removido com sucesso' });
        } catch (error) {
            return res.status(400).json({ error: 'Erro ao remover usuário' });
        }
    }

    async get(req, res) {
        try{
            const { id } = req.params;
    
            const user = await User.findById(id);

            if(!user){
                return res.status(400).json({ error: 'Usuário não encontrado' });
            }

            return res.json(user);
        } catch (error) {
            return res.status(400).json({ error: 'Erro ao buscar usuário' });
        }
    }
}
module.exports = new UserController();