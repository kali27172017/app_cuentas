let express = require('express');
let chalk = require('chalk');



let app  = express();

//Defino mi template engine en este caso sera pug
app.set('view engine', 'pug');

//Sirvo mi archivos estaticos
app.use(express.static('public'));


app.get('/user',(req,res) => {
    res.render('user')
});






//Levanto mi server
app.listen(3000,(err)  => {

       if(err){
          return console.log(chalk.red('Hubo un error'));
          process.exit(1);
       }

      console.log(chalk.green("Levantando mi servidor en el puerto 3000"))
});

