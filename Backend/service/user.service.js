const userModel = require("../modal/user.modal");

class userService {

    findAll = async () => {
        const records = await userModel.find({});
        return records;
    }
    
    create = async (userBody) => {
        try {
            const existingUser = await userModel.findOne({ email: userBody.email });
    
            if (existingUser) {
                throw new Error("Email already exists");
            }
    
            const newUser = new userModel(userBody);
            const data = await newUser.save();
            return data;
        } 
        catch (error) {
            console.error("Error while creating user: ", error);
            throw new Error("Internal Server Error");
        }
    }   
    
    patch = async (ID, userBody) => {
        const patchedUser = await userModel.findOneAndUpdate(
            { id: ID },
            userBody,
            { new: true }
        );
        return patchedUser;
    }

    delete = async (ID) => {
        const deletedUser = await userModel.deleteOne({id: ID});
        return deletedUser;
    }
}

module.exports = userService;