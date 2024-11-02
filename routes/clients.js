const express = require('express');
const Client = require('../models/clients');
const router = express.Router();

//Get Client(s)
router.get('/', async (req, res) => {
	try {
		const result = await Client.find();

		res.status(200).json({
			status: 200,
			message: 'Success get all clients',
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

//GET Client by ID
router.get('/:id', async (req, res) => {
	try {
		const result = await Client.findOne({ _id: req.params.id });

		res.status(200).json({
			status: 200,
			message: 'Success get client with ID ' + req.params.id,
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

		const existClient = await Client.find({ name: body.name, phone_number: body.phone_number });
		if (existClient.length) {
			return res.status(400).json({
				status: 400,
				message: 'Client already exists',
			});
		}

		const chapter = new Client({
			name: body.name,
			address: body.address,
			phone_number: body.phone_number,
			dvm: body.dvm,
		});

		const result = await chapter.save();

		res.status(200).json({
			status: 200,
			message: 'Success create new client ',
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

		const result = await Client.updateOne(
			{ _id: id },
			{
				$set: {
					name: body.name,
					address: body.address,
					phone_number: body.phone_number,
					dvm: body.dvm,
				},
			}
		);
		res.status(200).json({
			status: 200,
			message: 'Success update client with ID ' + req.params.id,
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
	Client.deleteOne({ _id: req.params.id })
		.then((data) => {
			res.status(200).json({
				status: 200,
				message: 'Success delete client with ID ' + req.params.id,
				data: data,
			});
		})
		.catch((e) => {
			console.log(e);
			res.status(500).json({ message: e });
		});
});

module.exports = router;
