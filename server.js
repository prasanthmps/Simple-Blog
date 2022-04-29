const express= require('express');
const mongoose=require('mongoose');
const methodOverride=require('method-override')
const marked=require('marked')
const slugify=require('slugify')
const Article=require('./models/article')
const articleRouter=require('./routes/articles')
const app=express();

mongoose.connect('mongodb+srv://prasanth:prasanth@cluster0.cbhc9.mongodb.net/myFirstDatabase', {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
})
app.set('view engine','ejs')

app.use(express.urlencoded({extended:false}))
app.use(methodOverride('_method'))
app.use('/articles',articleRouter)

app.get('/',async (req,res)=>{
    const articles=await Article.find().sort({
        createdAt:'desc'
    })
    res.render('articles/index',{articles:articles})
})
 
let port = process.env.PORT;
app.listen(process.env.PORT || 5000)