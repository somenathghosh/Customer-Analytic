var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var db = require('node-mysql');
var mongoose = require('mongoose');

/*var r = require('./util/Results.js');*/




////


function Results  () {
    
}



Results.prototype.addPersons = function(persons) {

    this.persons = persons;
    return this;
};


Results.prototype.addKeywords = function(keywords) {

    //console.log(keywords);
    this.keywords = keywords;
    //console.log(this);
    return this;
};

Results.prototype.getKeyWords = function(first_argument) {
    return this.keywords;
};

Results.prototype.searchScore = function(searchString) {
    var results = [];
    //console.log(searchString);
    this.keywords.forEach(function function_name (element, index, array) {
        //console.log(element);
        if( searchString.search(element) > 0) {

            results.push(element);
        }

    })

    return results;

};


Results.prototype.run = function(results, callback) {

    //console.log(results);
    

    score = [];

    

    var that = this;
    results.forEach(function function_name (element, index, array) {
        var rank = that.searchScore(element.description.toUpperCase());
        if(rank.length !== 0) {
            var temp = {};
            temp.name = element.name;
            temp.date = new Date(element.date);
            //temp.rank = that.searchScore(element.description.toUpperCase());
            //console.log(temp);
            temp.rank = rank
            score.push(temp);

        }
    });

    callback(score);
        



};

var r = new Results();
//////

var DB = db.DB;



var app = express();

var SCORE;


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



// catch 404 and forward to error handler



mongoose.connect('mongodb://heroku:97aa100aa71b190805c41b70bed0e20b@troup.mongohq.com:10097/app22192444');
var Schema = new mongoose.Schema({
    
    keywords : new Array()
    

    
},{ collection : 'KeyWords' });


var KW = mongoose.model('KeyWords',Schema);


var Schema1 = new mongoose.Schema({
    
    res: String

       
},{ collection : 'ResultSets' });


var RS = mongoose.model('ResultSets',Schema1);


var box = new DB({
    host     : 'us-cdbr-iron-east-01.cleardb.net',
    user     : 'b141b333912ca6',
    password : '2c91bba3',
    database : 'heroku_aa8f23881258c37'
});



var queryPersons = 'select distinct PERSON_NAME as name from new_table order by PERSON_NAME';
var querySearch = 'select PERSON_NAME as name, MEETING_DATE as date , CONCAT( COALESCE(MEETING_DESCRIPTION,"") ," ", COALESCE(LONG_MEETING_DESCRIPTION,"")) as description from new_table  where MEETING_DESCRIPTION is  NOT NULL or LONG_MEETING_DESCRIPTION is NOT NULL order by name , date ';





KW.find({},function(err,docs){

    if(err) {
        console.log("Error from MongoDB:" + err);
        
    }
    if(!docs){
        console.log("No Docs");
    }
    else {
        
        //console.log(docs[0].keywords);

        box.connect(function(conn, cb) {
        
            conn.query(querySearch, function function_name (err, res) {
                //console.log(res);
                r.addKeywords(docs[0].keywords).run(res, function function_name (argument) {
                    
                    SCORE = argument;

                    RS.findOne({}, function(err, doc){

                        if(err) console.log(err);

                        if(!doc) {
                            /*console.log('no doc');
                            new RS({

                                res : JSON.stringify(SCORE)   

                            }).save(function(err, doc){

                                if(err) console.log('save error' + err);

                                if(doc) console.log('successful in creating doc');

                                if(!doc) console.log('something went wrong in saving');

                            });*/

                        }

                        if(doc){
                            console.log(doc._id);
                            RS.update(

                                {_id: doc._id},
                                {$set : {res : JSON.stringify(SCORE)}},
                                function(err, result){

                                    if(err) console.log(err);
                                    if(result) console.log('successful in updating');

                            });

                        }
                    });

                });
                    
            });
        });
          
      
    }
});


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.get('/', function (req, res) {
    console.log("index");
    res.render('index');
});

app.get('/keywords', function(req, res){
    res.send(r.getKeyWords());

});

app.get('/score', function (req, res) {

    res.send({score: JSON.stringify(SCORE)});
});


app.get('/persons', function(req, res){
    
    box.connect(function(conn, cb) {
        
            conn.query(queryPersons, function function_name (err, result) {
                
                console.log(result);

                res.send(result);
                
            });
          
      
        }, function function_name () {
            console.log('successful');
    });


});

app.use('/users', users);


app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});



app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});



/*module.exports = app;*/
