const express = require('express');
const router = express();
const User = require('./model/User');
const fs = require('fs')
const bcrypt = require('bcrypt');
const { registerValidation, loginValidation } = require('./validation');
const path = require('path');


router.use(express.static(path.join(__dirname, '/client/public')))



router.post('/register', async (req, res) => {
    console.log('req', req.body)

    // Validation
    // const { error } = await registerValidation(req.body)
    // if (error) return res.status(400).json({ "message": error.details[0].message, "type": "register" })

    // Checking if email already exists
    const emailExists = await User.findOne({ email: req.body.email })
    console.log('emailExists', emailExists)
    if (emailExists) return res.status(400).json({
        "message": "Email already exists",
        "type": "register"
    });

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    // Creating new user
    const user = await new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        status: req.body.status,
        username: req.body.username,
        hash: req.body.hash,
        image: req.body.image,
        // favouriteDetails: []
    })

    try {
        const newUser = await user.save();
        return res.json(newUser);
    }
    catch (err) {
        return res.status(400).send(err);
    }
})




router.post('/login', async (req, res) => {
    console.log('req', req.body)
    const user = await User.findOne({ email: req.body.email });
    console.log('user', user)
    if (!user) {
        return await (res.status(400).json({ "message": "Email already exists", "type": "login" }))
    }
    const correctPass = await bcrypt.compare(req.body.password, user.password)
    if (!correctPass) return res.status(400).json({ "message": "Invalid password", "type": "login" })

    try {
        return res.status(200).json(user);
    }
    catch (err) {
        return res.status(400).send(err)
    }
})


router.post('/upload', async (req, res) => {
    const file = req.files.file;

    // Changing file name so no spaces
    const fileName = await file.name.replace(/ /g, '-');

    const updatedUser = await User.findOneAndUpdate({ _id: req.body.id }, { image: fileName }, { new: true })
    const data = await fs.readdirSync(`${__dirname}/client/build/uploads`, { encoding: 'utf8' })
    if (data.includes(updatedUser.image)) {
        return res.json(updatedUser)
    }

    await file.mv(`${__dirname}/client/build/uploads/${updatedUser.image}`, err => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.send(updatedUser);
    });

});


router.post('/addfaveourite', async (req, res) => {
    const id = req.body.id;

    if (req.body === null) {
        return await res.status(400).json({ msg: 'No id selected' });
    }

    const idExists = await User.findOne({ email: req.body.email, favourites: id })
    if (idExists) {
        return await res.status(400).send({ message: "id already exists" });
    }

    const updatedUser = await User.findOneAndUpdate({ email: req.body.email }, {
        $addToSet: {
            favourites: id
        }
    }, { new: true })

    return res.status(200).json(updatedUser)
});


router.post('/deletefavourite', async (req, res) => {
    const id = req.body.id;

    if (req.body === null) {
        return await res.status(400).json({ msg: 'No id selected' });
    }

    const updatedUser = await User.findOneAndUpdate({ email: req.body.email }, {
        $pull: {
            favourites: id
        }
    }, { new: true })

    return await res.status(200).json(updatedUser)
});


module.exports = router;