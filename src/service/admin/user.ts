import { auth } from "../index";

const getAllUsers = async () => {
    const res = await auth.get("660/users");
    return res.data;
};
