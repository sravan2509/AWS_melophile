
const mongoose = require('mongoose');
const cors = require('cors');
const users = require('./models/users')
const reviews = require('./models/reviews')
const Subscription = require('./models/subscription')
const product = require('./routes/music.route');
    mongoose.connect('mongodb+srv://sravansatish2509:hcA0eYyzlgvtXBKU@cluster.qlgrnaj.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true,  useUnifiedTopology: true })
    .then(() => { console.log("connected"); })
    .catch((err) => { console.log("error connecting", err); });

const express = require('express');
const app = express();
const bodyParser  = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors({origin: '*'}));


app.use((req, res, next) => {
    console.log('This line is always called');
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    next();
});



app.get('/users', (req, res, next) => {
    users.find() 
    .then(data => res.status(200).json(data))
    .catch(err => {
    console.log('Error: ${err}');
    res.status(500).json(err);
});

});

app.post('/users', (req, res, next) => {
    res.status(201).json('Post successful');
    const Users = new users({
    firstName: req.body.firstName,
    lastName:  req.body.lastName,
    email:  req.body.email,
    phoneNumber: req.body.phoneNumber,
    });
    Users.save()
        .then(() => { console.log('Success');})
        .catch(err => {console.log('Error:' + err);});
});

app.delete("/users/:id", (req, res, next) => {
    users.deleteOne({ _id: req.params.id }).then(result => {
        console.log(result);
        res.status(200).json("Deleted!");
    });
});

app.put('/users/:id', (req, res, next) => { 
    console.log("id: " + req.params.id) 
    if (mongoose.Types.ObjectId.isValid(req.params.id)) { 
        users.findOneAndUpdate( 
            {_id: req.params.id}, 
            {$set:{ 
                firstName : req.body.firstName, 
                lastName : req.body.lastName,
                email:  req.body.email,
                phoneNumber: req.body.phoneNumber,
            }}, 
            {new:true} 
        ) 
        .then((users) => { 
            if (users) { 
                console.log(users); 
            } else { 
                console.log("no data exist for this id"); 
            } 
        }) 
        .catch((err) => { 
            console.log(err); 
        }); 
    } else { 
        console.log("please provide correct id"); 
    } 
});

app.get('/users/:id', (req, res, next) => {
    users.findOne({_id: req.params.id}) 
        .then(data => {
            res.status(200).json(data)
            console.log(data);
        })
        .catch(err => {
        console.log('Error: ${err}');
        res.status(500).json(err);
    });
});
          


app.get('/reviews', (req, res, next) => {
    reviews.find() 
    .then(data => res.status(200).json(data))
    .catch(err => {
    console.log('Error: ${err}');
    res.status(500).json(err);
});

});

app.post('/reviews', (req, res, next) => {
    res.status(201).json('Post successful');
    const Reviews = new reviews({
    firstName: req.body.firstName,
    rate:  req.body.rate,
    review:  req.body.review,
    });
    Reviews.save()
        .then(() => { console.log('Success');})
        .catch(err => {console.log('Error:' + err);});
});

app.delete("/reviews/:id", (req, res, next) => {
    reviews.deleteOne({ _id: req.params.id }).then(result => {
        console.log(result);
        res.status(200).json("Deleted!");
    });
});

app.put('/reviews/:id', (req, res, next) => { 
    console.log("id: " + req.params.id) 
    if (mongoose.Types.ObjectId.isValid(req.params.id)) { 
        reviews.findOneAndUpdate( 
            {_id: req.params.id}, 
            {$set:{ 
                firstName : req.body.firstName, 
                rate : req.body.rate,
                review:  req.body.review,
            }}, 
            {new:true} 
        ) 
        .then((reviews) => { 
            if (reviews) { 
                console.log(users); 
            } else { 
                console.log("no data exist for this id"); 
            } 
        }) 
        .catch((err) => { 
            console.log(err); 
        }); 
    } else { 
        console.log("please provide correct id"); 
    } 
});

app.get('/reviews/:id', (req, res, next) => {
    reviews.findOne({_id: req.params.id}) 
        .then(data => {
            res.status(200).json(data)
            console.log(data);
        })
        .catch(err => {
        console.log('Error: ${err}');
        res.status(500).json(err);
    });
});

app.get('/subscription', (req, res, next) => {
    Subscription.find() 
    .then(data => res.status(200).json(data))
    .catch(err => {
    console.log('Error: ${err}');
    res.status(500).json(err);
});
});


app.post('/deleteSubscription', (req, res, next) => {  
    Subscription.deleteMany(req.body.query) 
    .then(data => res.status(200).json(data))
    .catch(err => {
    console.log('Error: ${err}');
    res.status(500).json(err);
});
});

app.post('/updateSubscription', (req, res, next) => {
    console.log("Entered upgrade subscription............................")
    var query = req.body.query;
    var newVal = { $set: { subscribed: req.body.subscribed } }; 
    Subscription.updateOne(query, newVal)
    .then(data => res.status(200).json(data))
    .catch(err => {
    console.log('Error: ${err}');
    res.status(500).json(err);
});
});

app.post('/subscription', (req, res, next) => {
    const subscription = new Subscription({
    subscribed: req.body.subscribed
    });
    console.log("Created...........................................",req.body)
subscription.save()
    .then(() => { console.log('Success');
     })
    .catch(err => {console.log('Error:' + err);});
});  
app.use('/playlist', product);

app.listen(process.env.PORT ||8000,()=>{ console.log('Listening')})    
module.exports=app;