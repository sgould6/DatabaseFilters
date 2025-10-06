'use strict';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import fetch from 'node-fetch';
import passport from 'passport';
import session from 'express-session';
import passportLocal from 'passport-local';
import User from './js/user.js';
import mongoStore from 'connect-mongo';
import cors from 'cors'
import Token from './js/token.js';
import crypto from 'crypto';
import AddressItem from './js/addressItem.js';
import 'dotenv/config';


const app = express();
//TODO UPDATE MONGODB
//mongodb
const mongodbApiKey = process.env.API_KEY_MONGODB;
const emailJsApiKey = process.env.API_KEY_EMAILJS;

const uri = `mongodb+srv://rodymademe:${mongodbApiKey}@dynamiccanvas.hnmr8x8.mongodb.net/?retryWrites=true&w=majority&appName=DynamicCanvas`;

const mongoStoreSession = new mongoStore({
    mongoUrl: uri,
    databaseName: "DynamicCanvas",
    collectionName: "sessions",
    ttl: 24 * 3600,
    autoRemove: 'native'
});

//initialize mongodb
mongoose.connect(uri)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
    });

    //TODO UPDATE CORS
//cors options
var corsOptions = {
    origin: "http://localhost:3000/",
    methods: ["GET", "POST"],
    credentials: true
}

//JsonParser, cors and proxy
app.use(bodyParser.json());
app.use(cors(corsOptions));
//app.set('trust proxy', 1);

//sessions and passport
app.use(session({
    name: 'session-id',
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    store: mongoStoreSession,
    cookie: {
        maxAge: 86400,
        //sameSite: 'None',
        //secure: true
    }
}));

//serialize passport
const strategy = new passportLocal(User.authenticate());
passport.use(strategy);
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(passport.initialize());
app.use(passport.session());


//initialize sessions
app.get('/', function (req, res) {
    res.send('Initialize Express server for Vercel');
});


//APIs
//register user
app.post("/registerUser", async (req, res) => {
    try {
        User.register(
            new User({
                username: req.body.username,
                displayName: req.body.displayName
            }), req.body.password, function (err, msg) {
                if (err) {
                    res.status(201).json(false);
                } else {
                    res.status(201).json(true);
                }
            }
        )
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    };
});

app.post("/registerAddress", async (req, res) => {
    try {
        const newAddress = new AddressItem(req.body);
        await newAddress.save();
        res.status(201).json(true);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    };
});


app.post("/lookupAddress", async (req, res) => {
    try {
        const newAddress = new AddressItem(req.body);

        //lookup DB ignoring status filter
        if (newAddress.status == "") {
            const foundAddress = await AddressItem.find({ address: { $regex: newAddress.address, $options: "i" } });
            res.status(200).json(foundAddress);
        } 

        //lookup DB ignoring address filter
        if (newAddress.address == "") {
            const foundAddress = await AddressItem.find({ status: { $regex: newAddress.status, $options: "i" } });
            res.status(200).json(foundAddress);
        }

        //lookup DB enforcing both filters
        const foundAddress = await AddressItem.find({ address: { $regex: newAddress.address, $options: "i" }, status: { $regex: newAddress.status, $options: "i" } });
        res.status(200).json(foundAddress);
        

    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    };
});


app.post('/loginUser', passport.authenticate('local', {
    failureRedirect: '/login-failure',
    successRedirect: '/login-success'
}), (err, req, res, next) => {
    if (err) next(err);
});

app.get('/login-failure', (req, res, next) => {
    res.status(201).json(false);
});

app.get('/login-success', (req, res, next) => {
    res.status(201).json(true);
});

app.get('/profile', function (req, res) {
    if (req.isAuthenticated()) {
        res.status(201).json(true);
    } else {
        res.status(201).json(false);
    }
});

app.post('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.session.destroy(function (err) {
            if (err) {
                console.error('Error destroying session:', err);
                return res.status(500).json({ message: 'Error during logout' });
            }
            res.status(201).json(true);
        });
    });
});


//TODO UPDATE DOMAIN FOR RESET PASSWORDS
//send reset email link
app.post('/sendResetEmail', async (req, res) => {
    try {

        var clientEmail = req.body.username;

        //look for username in db
        const user = await User.findOne({ username: clientEmail });
        if (!user) {
            return res.status(200).send(false);
        }

        //check username has token if not create token
        let token = await Token.findOne({ userId: user._id });
        if (!token) {
            token = await new Token({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex"),
            }).save();
        }


        //set reset link for emailJs
        var resetLink = `https://dynamic-canvas.vercel.app/ResetPassword/${user._id}/${token.token}`;

        //update emailJS entries        
        var data = {
            service_id: 'default_service',
            template_id: 'template_g2xqz2g',
            user_id: '86fzf1YpFzMu7IQmr',
            template_params: {
                'email': clientEmail,
                'link': resetLink,
            },
            accessToken: emailJsApiKey,

        };


        //send to emailjs
        await fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (response.txt = 'OK') {
                    return res.status(200).json(true);

                }
            })


    } catch (err) {
        console.error('Error sending email', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//api for password reset page
//create new route and password submit form in react
app.post("/:userId/:token", async (req, res) => {
    try {

        //look up username in db
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(200).send(false);
        }

        //look up token in db
        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        });

        if (!token) {
            return res.status(200).send(false);
        }

        await user.setPassword(req.body.password);
        await user.save();
        await Token.findByIdAndDelete(token._id);
        return res.status(200).json(true);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


//set port
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export default app;