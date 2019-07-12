var express = require('express')
var bodyParser = require('body-parser')
var path = require('path')
const{check, validattionResult} = require('express-validator')
var mongojs = require('mongojs')
var ObjectId = mongojs.ObjectId
var db = mongojs('userapp',['order'])


var app = express()
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views') )

//tells the system to use json
app.use(bodyParser.json() )

//use simple algorithim for shalow parsing(false) 
//or complex algorithim for deep parsing
app.use(bodyParser.urlencoded({extended:false}) ) 

//set static path
app.use(express.static(path.join(__dirname,'public')))

//global users


app.get('/',function(req,res){
    //res.render('index',{title:'Customer', users:undefined} )
    db.order.find(function(err, docs){
        res.render('index',{title:'Customer',users:docs } )
    })
})


app.post('/users/add',
function(req,res){
    var newOrder = {
        order_name:req.body.company_name,
        order_size:req.body.order_size,
        order_quant:req.body.order_quantity,
        order_truck:req.body.order_truck
    }
    db.order.insert(newOrder);
    res.redirect('/');
    console.log(newOrder);
})
app.post('/users/update/orderName', function(req,res){
    console.log(req.params)
    console.log(req.body.nameUpdate +" : ")
    res.redirect('/')
})

app.delete('/users/delete/:id',function(req,res){
    console.log('button pressed: '+req.params.id)
    db.order.remove({_id:ObjectId(req.params.id)}, function(err,result){
        if(err){
            console.log(err);
        }
        res.redirect('/')
    })
})

app.listen(3000, function(){
    console.log("Server started on port: 3000")
} )
