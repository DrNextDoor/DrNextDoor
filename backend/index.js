const express = require('express');
const connectDB = require('./config/db.js');
const cors = require('cors');
const dotenv = require('dotenv');
const path=require('path')

const doctorRoutes = require('./routes/doctorRoutes.js'); 
const patientRouter = require('./routes/Patient.router.js');
const adminRouter = require('./routes/AdminRoutes.js');

const questionRoutes = require('./routes/questionRoute.js');
const app=express()
const PORT=process.env.PORT || 5000;
dotenv.config();



// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // handles form-urlencoded

app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5000',
    'https://dr-next-door.vercel.app',
    'https://dr-next-door-jbnk.vercel.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.urlencoded({extended:true}))
app.use(cors());

// Serve static files from /uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API endpoints
app.use('/admin', adminRouter);         // e.g., /api/admin/all
app.use('/api/doctors', doctorRoutes);      // e.g., /api/doctors/register
app.use('/patient', patientRouter);    // Changed to /api/patients for consistency

// Default route
app.get('/', (req, res) => {
  res.send('API is running...');
});

//for image uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Routes
app.use('/api/doctors', doctorRoutes); //handles register, login, profile, all doctors
app.use('/patient',patientRouter)
app.use('/api/questions', questionRoutes);



connectDB();  

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

