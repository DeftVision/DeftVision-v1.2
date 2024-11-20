const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 7000;
const connectDB = require('./config/db');
connectDB();

// const userRoutes = require('./routes/userRoute')
// const evaluationRoutes = require('./routes/evaluationRoute')
const employeeRoutes = require('./routes/employeeRoute')

const app = express();
app.use(express.json());
app.use(cors());

// app.use('/api/user', userRoutes);
// app.use('/api/eval', evaluationRoutes);
app.use('/api/employee', employeeRoutes);



app.listen(PORT, () => console.log(`Listening on port ${PORT}`));