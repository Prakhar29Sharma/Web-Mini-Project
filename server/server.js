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
const EvaluatorRoute = require("./routes/evaluator");
const CourseRoute = require("./routes/course");
const reviewsRoute = require("./routes/reviews");
const notificationRoute = require("./routes/notification");
const authMiddleware = require('./middleware/auth');
const Contributor = require('./models/Contributor');
const Unit = require('./models/Unit');
const Subject = require('./models/Subject');
const Course = require('./models/Course');
const Evaluator = require('./models/Evaluator');

/* CONFIG */
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
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

const fileUploadMiddleware = upload.fields([{ name: 'courseVideo', maxCount: 1 }, { name: 'coursePDFs', maxCount: 8 }]);

app.post('/api/courses/', authMiddleware, fileUploadMiddleware, async (req, res) => {
    try {
        const user = req.user;
        if (user.role !== 'CONTRIBUTOR') {
            throw 'Unauthorized access';
        }
        const { authorName, subjectCode, unitNumber, courseContent } = req.body;
        const userData = await User.findOne({ username: authorName });
        if (!userData) {
            throw 'User not found';
        } else {
            authorId = userData._id;
        }
        const unit = await Unit.findOne({ subjectCode: subjectCode, unitNumber: unitNumber });
        if (!unit) {
            throw 'Unit not found';
        } else {
            unitData = unit;
        }
        const subject = await Subject.findOne({ subjectCode: subjectCode });
        if (!subject) {
            throw 'Subject not found';
        } else {
            subjectData = subject;
        }
        const course = new Course({
            authorId: authorId,
            authorName: authorName,
            subjectData: subjectData,
            unitData: unitData,
            courseContent: courseContent,
            courseVideoPath: '',
            coursePdfPath: [],
            isPublic: false,
            status: 'Draft',
        });
        // Access the uploaded video's filename and path
        // console.log("files", req.files);
        // console.log(videoFile.path);
        if (req.files.courseVideo !== undefined) {
            const videoFile = req.files.courseVideo[0];
            course.courseVideoPath = videoFile.path;
        }
        if (req.files.coursePDFs !== undefined) {
            // Access the uploaded PDFs' filenames and paths
            const pdfFiles = req.files.coursePDFs; // Make sure to use req.files, which should be an array
            const pdfPaths = pdfFiles.map((file) => file.path);
            // console.log(pdfPaths);
            course.coursePdfPath = pdfPaths;
        }
        await course.save();
        res.json({
            status: 'ok',
            message: 'Course created successfully',
        });
    } catch (err) {
        console.log('error course uploading', err);
        res.json({ status: 'error', error: err });
    }
});

app.post('/api/contributor/',authMiddleware, upload.single('profileImage'), async (req, res) => {
    try {
        const user = req.user;
        if (user.role !== 'CONTRIBUTOR') {
            throw 'Unauthorized access';
        }
        const contributor = new Contributor(req.body);
        console.log('hi');
        // Access the uploaded image path
        console.log(req.file);
        const imagePath = req.file.path;
        contributor.profileImagePath = imagePath;
        await contributor.save();
        console.log('hi');
        res.json({
            status: 'ok',
            message: 'Contributor profile created successfully',
        });
    } catch (err) {
        console.log('error hi', err);
        res.json({ status: 'error', error: err });
    }
});

app.post('/api/evaluator/', authMiddleware, upload.single('profileImage'), async (req, res) => {
    try {
        const user = req.user;
        if (user.role !== 'EVALUATOR') {
            throw 'Unauthorized access';
        }
        const evaluator = new Evaluator(req.body);
        console.log('hi');
        // Access the uploaded image path
        console.log(req.file);
        const imagePath = req.file.path;
        evaluator.profileImagePath = imagePath;
        await evaluator.save();
        console.log('hi');
        res.json({
            status: 'ok',
            message: 'Evaluator profile created successfully',
        });
    } catch (err) {
        console.log('error hi', err);
        res.json({ status: 'error', error: err });
    }
});


app.post('/api/units/', authMiddleware, upload.single('unitImage'), async (req, res) => {
    try {
        // const user = req.user;
        // if (user.role !== 'ADMIN' || user.role !== 'admin') {
        //     throw 'Unauthorized access';
        // }
        console.log(req.body);
        let { unitNumber, unitName, subjectCode, subjectName, unitDescription, unitPrerequisites, unitObjectives } = req.body;
        unitPrerequisites = unitPrerequisites.split(',');
        unitObjectives = unitObjectives.split(',');
        const unit = new Unit({ unitNumber, unitName, subjectCode, subjectName, unitDescription, unitPrerequisites, unitObjectives });
        // Access the uploaded image path
        console.log(req.file);
        const imagePath = req.file.path;
        unit.unitImagePath = imagePath;
        await unit.save();
        res.json({
            status: 'ok',
            message: 'Unit added successfully',
        });

    } catch (err) {
        console.log('error hi', err);
        res.json({ status: 'error', error: err });
    }
});

app.get('/api/public/contributor/:username', async (req, res) => {
    try {
        const { username } = req.params;
        const contributor = await Contributor.findOne({ username: username });
        if (contributor === null) {
            res.json({
                status: 'error',
                message: 'Contributor not found'
            });
        } else {
            res.json({
                status: 'ok',
                data: contributor
            })
        }
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
app.use('/api/courses', CourseRoute);
app.use('/api/reviews', reviewsRoute);
app.use('/api/notifications', notificationRoute);
app.use('/api/evaluator', EvaluatorRoute);

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