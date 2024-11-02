const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const clientRoutes = require('./routes/clients');
const patientRoutes = require('./routes/patients');
require('dotenv').config();

app.use(cors());
app.use(bodyParser.json());

mongoose
	.connect(process.env.DATABASE_ACCESS)
	.then((data) => {
		console.log('connected to DB');
	})
	.catch((error) => {
		console.log(error);
	});

app.use(express.static(path.join(__dirname, './public')));

app.use('/client', clientRoutes);
app.use('/patient', patientRoutes);

app.listen(5000, () => {
	console.log('Server started on 5000');
});
