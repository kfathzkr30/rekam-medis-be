const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const clientRoutes = require('./routes/clients');
const patientRoutes = require('./routes/patients');
const treatmentRoutes = require('./routes/treatment_records');
const statusRoutes = require('./routes/status_presents');
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
app.use('/treatment-record', treatmentRoutes);
app.use('/status-present', statusRoutes);

app.listen(5000, () => {
	console.log('Server started on 5000');
});
