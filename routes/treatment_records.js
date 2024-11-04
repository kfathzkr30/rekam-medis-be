const express = require('express');
const Patient = require('../models/patients');
const TreatmentRecord = require('../models/treatment_records');
const router = express.Router();

//Get Patient(s)
router.get('/', async (req, res) => {
	try {
		const result = await TreatmentRecord.find().populate({
			path: 'patient',
			select: '_id name',
		});

		res.status(200).json({
			status: 200,
			message: 'Success get all treatment records',
			data: result,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			status: 500,
			message: err,
		});
	}
});

//GET Patient by ID
router.get('/:id', async (req, res) => {
	try {
		const result = await TreatmentRecord.findOne({ _id: req.params.id }).populate({
			path: 'patients',
			select: '_id name',
		});

		res.status(200).json({
			status: 200,
			message: 'Success get treatment record with ID ' + req.params.id,
			data: result,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			status: 500,
			message: err,
		});
	}
});

router.post('/', async (req, res) => {
	try {
		const body = req.body;

		const existPatient = await Patient.findOne({ _id: body.patient_id });
		if (!existPatient) {
			return res.status(400).json({
				status: 400,
				message: 'Patient not found with ID ' + body.patient_id,
			});
		}

		const payload = new TreatmentRecord({
			patient: body.patient_id,
			date: body.date,
			treatment_type: body.treatment_type,
			treatment_information: body.treatment_information,
		});

		const result = await payload.save();

		res.status(200).json({
			status: 200,
			message: 'Success create new treatment ',
			data: result,
		});
	} catch (e) {
		console.log(e);
		res.status(500).json({
			status: 500,
			message: err,
		});
	}
});

router.patch('/:id', async (req, res) => {
	try {
		const body = req.body;
		const id = req.params.id;

		const result = await TreatmentRecord.updateOne(
			{ _id: id },
			{
				$set: {
					date: body.date,
					treatment_type: body.treatment_type,
					treatment_information: body.treatment_information,
				},
			}
		);
		res.status(200).json({
			status: 200,
			message: 'Success update record with ID ' + req.params.id,
			data: result,
		});
	} catch (e) {
		console.log(e);
		res.status(500).json({
			status: 500,
			message: err,
		});
	}
});

router.delete('/:id', (req, res) => {
	TreatmentRecord.deleteOne({ _id: req.params.id })
		.then((data) => {
			res.status(200).json({
				status: 200,
				message: 'Success delete record with ID ' + req.params.id,
				data: data,
			});
		})
		.catch((e) => {
			console.log(e);
			res.status(500).json({ message: e });
		});
});

module.exports = router;
