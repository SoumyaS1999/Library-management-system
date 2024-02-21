const path = require('path');


const express = require('express');
const bodyParser = require('body-parser');
const mongoose=require('mongoose');


const User=require('./models/User.js');
const Admin=require('./models/Admin.js');


var cors=require('cors');

const app = express();

const dotenv = require('dotenv');


dotenv.config();


app.use(cors());

app.set('views', 'views');

const userRoutes=require('./routes/user');
const adminRoutes=require('./routes/admin');


app.use(bodyParser.json({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/user',userRoutes);
app.use('/admin',adminRoutes);


app.use((req,res)=>{
  console.log(req.url);
  res.sendFile(path.join(__dirname,`views/${req.url}`));
})

app.get('/', (req, res) => {
  res.send('Server is running!');
});

mongoose.connect('mongodb+srv://soumya1999crj:MAI2ZV8SC2qpz5LB@mydatabase.5mhcjzl.mongodb.net/library?retryWrites=true&w=majority')
.then(result => {
  app.listen(3000, () => {
    console.log('Server started on port 3000');
  });
})
.catch(err => {
  console.error('MongoDB connection error:', err);
});

