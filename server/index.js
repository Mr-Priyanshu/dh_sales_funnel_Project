const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const cron = require('node-cron');
const app = express();
const userRoutes = require('./router/userRoute.js');
const authRoutes = require('./router/authRoute.js');

dotenv.config();
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(cookieParser()); 
app.use(userRoutes);
app.use(authRoutes);

// cron.schedule('* * * * *', () =>
//  console.log('Tasked scheduled with 1 minute interval')
// );

app.listen(8080, () => {
    console.log('server is running');
});

