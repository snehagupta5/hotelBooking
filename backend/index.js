const express = require('express');
const cors = require('cors');
const User = require("./model/userSchema");
const place = require('./model/placeSchema');
const UserBooking = require('./model/UserBookingSchema');
const { json } = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const imageDownloader = require('image-downloader');
const multer = require('multer');
const fs = require('fs');

const app = express();
const secret = 'xgfxhgklo8y67rytsfajksandoalslkm';

app.use(json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/Uploads'));
app.use(cors({
    origin: 'http://127.0.0.1:3000',
    credentials: true,
}
));

mongoose.connect("mongodb://127.0.0.1:27017");
const saltRounds = 10;

app.get('/test', (req, res) => {
    res.send('hello');
});

// Register the user
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const userDoc = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, saltRounds),
        });
        if(userDoc){
            const token = jwt.sign({ email: userDoc.email, id: userDoc._id }, secret, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json(userDoc);
            });
        }
    } catch (err) {
        res.status(422).json(err);
    }
});

//Login the User
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const userDoc = await User.findOne({ email });
        if (userDoc) {
            const passok = bcrypt.compareSync(password, userDoc.password);
            if (passok) {
                const token = jwt.sign({ email: userDoc.email, id: userDoc._id }, secret, {}, (err, token) => {
                    if (err) throw err;
                    res.cookie('token', token).json(userDoc);
                });
            } else {
                res.status(422).json('pass not ok')
            }
        } else {
            res.status().json('user not found');
        }
    } catch (err) {
        res.status(422).json(err);
    }
});

//Logout the User
app.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.status(200).json('clear');
    res.redirect('/');
});


//For Details of the user
app.get('/profile', async (req, res) => {
    try {
        const { token } = req.cookies;
        if (!token) {
          return res.status(404).json({ message: 'not found' });
        }
        const userData = await jwt.verify(token, secret);
        const { name, email, _id } = await User.findById(userData.id);
        res.json({ name, email, _id });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
});

// to upload image by link   
app.post('/upload', (req, res) => {
    const { link } = req.body;
    const path = 'photo' + Date.now() + '.jpg'
    imageDownloader.image({
        url: link,
        dest: __dirname + '/Uploads/' + path,
    })
    res.json(path);
})

// to define the storage for photo uploading via files 
// uploading the photo via file 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'Uploads/')
    }
})
const upload = multer({ storage: storage })
app.post('/upload-by-Files', upload.array('photos', 10), (req, res) => {
    const allphotos = [];
    for (let i = 0; i < req.files.length; i++) {
        let { path, originalname } = req.files[i];
        var originalpath = originalname.split('.');
        var ext = originalpath[originalpath.length - 1];
        var newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
        allphotos.push(newPath.replace('Uploads\\', ''));
    }
    res.json(allphotos);
})

//adding the new user accomodation
app.post('/places/new', async (req, res) => {
    const { token } = req.cookies;
    const { title, address, addphoto, perks, description, extraInfo, checkIn, checkOut, maxGuest, price } = req.body;
    if (token) {
        jwt.verify(token, secret, {}, async (err, userData) => {
            if (err) throw err;
            const newPlace = await place.create({
                owner: userData.id, title, address, photos: addphoto, perks, description, extraInfo, checkIn, checkOut, maxGuest, price
            })
            res.json(newPlace);
        })
    }
});

//fetching the user uploaded accomodations
app.get('/User-place', (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, secret, {}, async (err, userData) => {
            if (err) throw err;
            res.json(await place.find({ owner: userData.id }));
        })
    }
});

// deleting the user uploaded accomodation 
app.delete('/deleteplace', (req, res) => {
    const { placeid } = req.body;
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, secret, {}, async (err, userData) => {
            if (err) throw err;
            await UserBooking.deleteMany({ place: placeid });
            await place.findByIdAndDelete(placeid);
            res.json('deleted succesfully');
        })
    }
});
//fetching all the places uploaded by all the user
app.get('/places', async (req, res) => {
    res.json(await place.find());
});

//fetching the detail of one hotel by using id of that hotel 
app.get('/places/:id', async (req, res) => {
    const { id } = req.params;
    res.json(await place.findById(id));
});



//booking the hotel for any user
app.post('/Bookings', (req, res) => {
    const { place, name, mobile, checkIn, checkOut, maxGuest, price } = req.body;
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, secret, {}, (err, userData) => {
            if (err) {
                console.error(err);
                return res.status(401).json({ message: 'Unauthorized' });
            }
            UserBooking.create({
                user: userData.id, place, checkIn, checkOut, maxGuest, name, mobile, price
            }).then((doc) => {
                res.json(doc);
            }).catch((err) => {
                console.error(err);
                return res.status(500).json({ message: 'Internal server error' });
            });
        });
    } else {
        return res.status(401).json({ message: 'Unauthorized' });
    }
});

//showing the detail of the booking done by any user 
app.get('/User-Bookings',(req,res)=>{
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, secret, {}, async(err, userData) => {
            if (err) throw err;
            res.json(await UserBooking.find({user:userData.id}).populate('place'));
        });
    }
})




app.listen(4000);