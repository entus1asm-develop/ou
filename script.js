const express = require('express')
const app = express()
app.set('view engine', "hbs")

var path = require('path')
const { log } = require('console')
app.use(express.static(path.join(__dirname, 'public')))

const BodyParser = require("body-parser")
const urlencoder = BodyParser.urlencoded({extended: false})

const Sequelize = require("sequelize")
const sequelize = new Sequelize ("ivar", "root", "", {
    dialect: "mysql",
    host: "localhost",
})

const Work = sequelize.define("work", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    header: {
        type: Sequelize.STRING,
        allowNull: false
    },
    year: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    tag: {
        type: Sequelize.STRING,
        allowNull: false
    },
    text: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    image: {
        type: Sequelize.STRING,
        allowNull: false
    },
})

const Posts = sequelize.define("post", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    header: {
        type: Sequelize.STRING,
        allowNull: false
    },
    tag: {
        type: Sequelize.STRING,
        allowNull: false
    },
    text: {
        type: Sequelize.TEXT,
        allowNull: false
    },
})

app.get("/", function(req, res) {
    Work.findAll({raw: true}).then(works=>{
        Posts.findAll({raw: true}).then(posts=>{
            res.render("index.hbs", {works: works, posts: posts})
        }).catch(err=>console.log(err))
    }).catch(err=>console.log(err))
})

app.get("/blogs", function(req, res) {
    Posts.findAll({raw: true}).then(data=>{
        res.render("blogs.hbs", {posts: data})
    }).catch(err=>console.log(err))
})

app.get("/works", function(req, res) {
    Work.findAll({raw: true}).then(data=>{
        res.render("works.hbs", {works: data})
    }).catch(err=>console.log(err))
})

// app.get("/work-detailed", function(req, res) {
//     res.render("work-detailed.hbs", {works: data})
// })

// app.get("/product/:id", function(req, res) {
//     const productId = req.params.id
//     res.render("product.hbs", {product: products[productId-1]})
// })

sequelize.sync().then(()=>{
    app.listen(3007, function() {
        console.log("Сервер запущен")
    })
}).catch(err=>console.log(err))