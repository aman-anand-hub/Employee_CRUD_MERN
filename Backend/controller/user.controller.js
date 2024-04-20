const userService = require("../service/user.service");
const userServiceInstance = new userService();

const getAllUsers = async (req, res) => {

    try {
        const allRecords = await userServiceInstance.findAll();
        res.status(200).json(allRecords);
    }
    catch(error) {
        const errorMessage = "Error inside getAllUsers controller: " + error.message;
        res.status(500).json({ error: errorMessage });
    }
}

const saveNewUser = async (req, res) => {

    try {
        const newUser = await userServiceInstance.create(req.body);
        res.status(200).json(newUser);
    }
    catch(error) {
        const errorMessage = "Error inside saveNewUser controller: " + error;
        console.error(error);
        res.status(500).json({ error: errorMessage });
    }
}

const updateUser = async (req, res) => {

    try {
        const { id } = req.params;
        const userBody = req.body;
        const patchedUser = await userServiceInstance.patch(id, userBody);
        if (!patchedUser) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(patchedUser);
    }
    catch (error) {
        const errorMessage = "Error inside updateUser controller: " + error.message;
        res.status(500).json({ error: errorMessage });
    }
}

const deleteUser = async (req, res) => {

    try {
        const { id } = req.params;
        const deletedUser = await userServiceInstance.delete(id);

        if (!deletedUser.deletedCount) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully" });
    }
    catch (error) {
        const errorMessage = "Error inside deleteUser controller: " + error.message;
        res.status(500).json({ error: errorMessage });
    }
}


module.exports = {
    getAllUsers,
    saveNewUser,
    updateUser,
    deleteUser
};
