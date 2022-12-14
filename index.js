const express = require('express');
const app = express();
const port = 8000;

//require express ejs layouts
const expressLayouts = require('express-ejs-layouts');

//require mongoose db
const db = require('./config/mongoose');

//set static files path
app.use(express.static('./assets'));

//use express layouts
app.use(expressLayouts);

//extract style and scripts from subpages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// use express router
app.use('/', require('./routes'));

//set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, function(err){
    if(err){
        // console.log("Error in running the server: ", err);
        console.log(`Error in running the server: ${err}`);
        return;
    }
    console.log(`Server is running on port: ${port}`);
})