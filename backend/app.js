const express = require(`express`);
const bodyParser = require(`body-parser`);
const Post = require(`./models/post`);
const { default: mongoose } = require("mongoose");
const app = express();
const time = new Date();
const cors = require(`cors`);
app.use(cors());

mongoose.connect(`mongodb://localhost:27017/Angular-app`).then(()=>{  
    console.log(`database connected`);
})
.catch(()=>{
    console.log(`database connection failed`)
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use((req, res, next)=>{   //this part of code snippet is to avoid or prevent the CORS error in our application.
    res.setHeader(`Access-Control-Allow-Origin`, `*`);
    res.setHeader(`Access-Control-Allow-Headers`, `Origin, X-Requested-With, Content-Type, Accept`);
    res.setHeader(`Access-Control-Allow-Methods`, `GET, POST, PATCH, PUT, DELETE, OPTIONS`);
    next();
});

app.post(`/posts/api`, (req, res, next)=>{
    const post = new Post({
        name: req.body.name,
        Bio: req.body.Bio,
        Email: req.body.Email,
        MobNumber: req.body.MobNumber,
        DOB: req.body.DOB,
        time: time
    });
    post.save().then(createdPosts => {
        res.status(201).json({
            message: `posted successfully!`,
            id: createdPosts._id
        });
    });
});

app.put(`/posts/api/:id`, (req, res, next)=>{
    const post = new Post({
        _id: req.params.id,
        name: req.body.name,
        Bio: req.body.Bio,
        Email: req.body.Email,
        MobNumber: req.body.MobNumber,
        DOB: req.body.DOB,
        time: time
    })
    Post.updateOne({_id: req.params.id}, post).then(result=>{
        console.log(result);
        res.status(200).json({message: `update successfull`});
    });
});

app.get(`/posts/api`,(req, res, next)=>{
    Post.find().then((records)=>{
        res.status(200).json({
            message: `posted successfully!`,
            posts: records
        });
    })
});

app.delete(`/posts/api/:id`, (req, res)=>{
    Post.deleteOne({_id: req.params.id }).then(res=>{
        console.log(res);
    })
    res.status(200).json({message: `post deleted`});
});

module.exports = app;