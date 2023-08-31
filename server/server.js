require('dotenv').config();
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require("./models/User");
const userRoute = require("./routes/users");
const subjectRoute = require("./routes/subject");
const unitRoute = require("./routes/unit");
const AuthRoute = require("./routes/auth");
const ContributorRoute = require("./routes/contributor");

/* CONFIG */
const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors());
app.use('/assets', express.static('public/assets'))

/* FILE STORAGE */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets");
    } , 
    filename: function (req, file, cb) {
        cb(null, new Date().getTime() + file.originalname);
    },
});

const upload = multer({ storage });

/* ROUTES WITH FILE */
app.post('/api/contributor', upload.single('profileImage'), async (req, res) => {
    try {
        const user = req.user;
        if (user.role !== 'CONTRIBUTOR') {
            throw 'Unauthorized access';
        }
        const contributor = new Contributor(req.body);
        // Access the uploaded image path
        const imagePath = req.file.path;
        contributor.profileImagePath = imagePath;
        await contributor.save();
        res.json({
            status: 'ok',
            message: 'Contributor profile created successfully',
        });
    } catch (err) {
        res.json({ status: 'error', error: err });
    }
});

/* ROUTES */
app.get('/', (req, res) => res.sendStatus(200));
app.use('/api/users', userRoute);
app.use('/api/subjects', subjectRoute);
app.use('/api/units', unitRoute);
app.use('/api/auth', AuthRoute);
app.use('/api/contributor', ContributorRoute);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(async () => {
    app.listen(PORT, () => console.log(`Server: ${PORT}`));
    // const user = User({
    //     username: "testuser",
    //     email: "test@gmail.com",
    //     password: "helloworld123"
    // })
    // await user.save()
})
.catch((err) => console.log(`Error: ${err}`));