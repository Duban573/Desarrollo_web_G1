const usuarios = {};

usuarios.get = (req, res) => {
    res.json({message: 'Get - users - controller'});
}

usuarios.post = (req, res) => {
    res.json({message: 'Post - users - controller'});
}

usuarios.put = (req, res) => {
    res.json({message: 'Put - users - controller'});
}

usuarios.delete = (req, res) => {
    res.json({message: 'Delete - users - controller'});
}

usuarios.patch = (req, res) => {
    res.json({message: 'Patch - users - controller'});
}

export default usuarios;