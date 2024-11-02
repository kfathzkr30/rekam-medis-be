const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const PatientSchema = new mongoose.Schema(
	{
		_id: {
			type: Number,
		},
		client: {
			type: Number,
			ref: 'clients',
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		breed: {
			type: String,
			required: true,
		},
		species: {
			type: String,
			required: true,
		},
		weight: {
			type: Number,
			required: true,
			default: 0,
		},
		birthdate: {
			type: Date,
			required: true,
		},
		gender: {
			type: String,
			enum: ['male', 'female'],
		},
	},
	{
		timestamps: true,
		_id: false,
	}
);

PatientSchema.plugin(AutoIncrement, { id: 'patient_id_counter', inc_field: '_id' });

module.exports = mongoose.model('patients', PatientSchema);
