const express = require('express');
const StatusPresent = require('../models/status_presents'); // Pastikan path model benar
const Patient = require('../models/patients');
const router = express.Router();

// GET all StatusPresent records
router.get('/', async (req, res) => {
	try {
		const result = await StatusPresent.find().populate({
			path: 'patient',
			select: '_id name',
		});
		res.status(200).json({
			status: 200,
			message: 'Success get all status present records',
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

// GET StatusPresent by ID
router.get('/:id', async (req, res) => {
	try {
		const result = await StatusPresent.findOne({ _id: req.params.id }).populate({
			path: 'patient',
			select: '_id name',
		});
		res.status(200).json({
			status: 200,
			message: 'Success get status present with ID ' + req.params.id,
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

// POST a new StatusPresent record
router.post('/', async (req, res) => {
	try {
		const body = req.body;

		// Check if patient exists
		const existPatient = await Patient.findOne({ _id: body.patient_id });
		if (!existPatient) {
			return res.status(400).json({
				status: 400,
				message: 'Patient not found with ID ' + body.patient_id,
			});
		}

		// Create new StatusPresent record
		const payload = new StatusPresent({
			patient: body.patient_id,
			date: body.date,
			weight: body?.weight,
			tpr: body?.tpr,
			hr: body?.hr,
			rr: body?.rr,
			general_apr: body?.general_apr,
			eyes: body?.eyes,
			ears: body?.ears,
			oral_exam: body?.oral_exam,
			respiratory: body?.respiratory,
			musculoskeletal: body?.musculoskeletal,
			lymphnod: body?.lymphnod,
			cardiov: body?.cardiov,
			abdomen: body?.abdomen,
			hair_and_skin: body?.hair_and_skin,
			extremt: body?.extremt,
			genito_urinary: body?.genito_urinary,
			anamnese: body?.anamnese,
			other: body?.other,
		});

		const result = await payload.save();
		res.status(200).json({
			status: 200,
			message: 'Success create new status present',
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

// PATCH (Update) a StatusPresent record by ID
router.patch('/:id', async (req, res) => {
	try {
		const body = req.body;
		const id = req.params.id;

		const result = await StatusPresent.updateOne(
			{ _id: id },
			{
				$set: {
					date: body.date,
					weight: body.weight,
					tpr: body?.tpr,
					hr: body?.hr,
					rr: body?.rr,
					general_apr: body?.general_apr,
					eyes: body?.eyes,
					ears: body?.ears,
					oral_exam: body?.oral_exam,
					respiratory: body?.respiratory,
					musculoskeletal: body?.musculoskeletal,
					lymphnod: body?.lymphnod,
					cardiov: body?.cardiov,
					abdomen: body?.abdomen,
					hair_and_skin: body?.hair_and_skin,
					extremt: body?.extremt,
					genito_urinary: body?.genito_urinary,
					anamnese: body?.anamnese,
					other: body?.other,
				},
			}
		);
		res.status(200).json({
			status: 200,
			message: 'Success update status present with ID ' + id,
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

// DELETE a StatusPresent record by ID
router.delete('/:id', async (req, res) => {
	try {
		const result = await StatusPresent.deleteOne({ _id: req.params.id });
		res.status(200).json({
			status: 200,
			message: 'Success delete status present with ID ' + req.params.id,
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

module.exports = router;
