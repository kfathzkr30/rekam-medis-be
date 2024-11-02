const express = require('express');
const Patient = require('../models/patients');
const Client = require('../models/clients');
const router = express.Router();

//Get Patient(s)
router.get('/', async (req, res) => {
	try {
		const result = await Patient.find().populate({
			path: 'client',
			select: '_id name address phone_number dvm createdAt',
		});

		res.status(200).json({
			status: 200,
			message: 'Success get all patients',
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
		const result = await Patient.findOne({ _id: req.params.id }).populate({
			path: 'client',
			select: '_id name address phone_number dvm createdAt',
		});

		res.status(200).json({
			status: 200,
			message: 'Success get patient with ID ' + req.params.id,
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

		const existClient = await Client.findOne({ _id: body.client_id });
		if (!existClient) {
			return res.status(400).json({
				status: 400,
				message: 'Client not found with ID ' + body.client_id,
			});
		}

		const chapter = new Patient({
			client: body.client_id,
			name: body.name,
			breed: body.breed,
			species: body.species,
			weight: body.weight,
			birthdate: body.birthdate,
			gender: body.gender,
		});

		const result = await chapter.save();

		res.status(200).json({
			status: 200,
			message: 'Success create new patient ',
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

		const result = await Patient.updateOne(
			{ _id: id },
			{
				$set: {
					name: body.name,
					breed: body.breed,
					species: body.species,
					weight: body.weight,
					birthdate: body.birthdate,
					gender: body.gender,
				},
			}
		);
		res.status(200).json({
			status: 200,
			message: 'Success update patient with ID ' + req.params.id,
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
	Patient.deleteOne({ _id: req.params.id })
		.then((data) => {
			res.status(200).json({
				status: 200,
				message: 'Success delete patient with ID ' + req.params.id,
				data: data,
			});
		})
		.catch((e) => {
			console.log(e);
			res.status(500).json({ message: e });
		});
});

module.exports = router;
