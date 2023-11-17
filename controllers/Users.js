import Users from "../models/UserModels.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

export const getUsers = async (req, res) => {
    try {
        const users = await Users.findAll(
            {
                attributes: ['userId', 'name', 'email', 'premium']
            }
        );
        res.json({
            data: users
        });
    } catch (error) {
        console.log(error);
    }
}

// Sebernarnya ini gaperlu wkwkwkwk
export const getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const userById = await Users.findAll({
            where: {
                userId: id,
            },
        });
        res.json({
            data: userById
        });
    } catch (error) {
        console.log(error);
    }
}


export const Register = async (req, res) => {
    const { name, email, password, confirm_password } = req.body;
    if (password !== confirm_password) {
        return res.status(400).json({
            msg: 'Password do not match'
        });
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    try {
        await Users.create({
            name: name,
            email: email,
            password: hashedPassword,
        })
        res.json({ msg: 'User created successfully' });
    } catch (error) {
        console.log(error);
    }
}

export const Login = async (req, res) => {
    try {
        const user = await Users.findAll({ where: { email: req.body.email } });
        const match = await bcrypt.compare(req.body.password, user[0].password);
        if (!match) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }
        const userId = user[0].userId;
        const name = user[0].name;
        const email = user[0].email;
        const accessToken = Jwt.sign({ userId, name, email }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '30s'
        });
        const refreshToken = Jwt.sign({ userId, name, email }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        });
        await Users.update({ refreshToken: refreshToken }, { where: { userId: userId } });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000 // 1 day
            // secure: true //jika mau pakek https
        });
        res.json({ accessToken: accessToken });
    } catch (error) {
        res.status(400).json({ msg: 'Email is not found' });
    }
};

export const Logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.status(204).json({ msg: 'User not authenticated!' });
    }
    const user = await Users.findAll({ where: { refreshToken: refreshToken } });
    if (!user) {
        return res.status(204).json({ msg: 'User not authenticated!' });
    }
    const userId = user[0].userId;
    await Users.update({ refreshToken: null }, {
        where: { userId: userId }
    });
    res.clearCookie('refreshToken');
    return res.status(200).json({ msg: 'Logout success!' });
};