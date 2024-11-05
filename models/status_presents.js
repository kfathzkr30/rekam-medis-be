const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const StatusPresentSchema = new mongoose.Schema(
	{
		_id: {
			type: Number,
		},
		patient: {
			type: Number,
			ref: 'patients',
			required: true,
		},
		date: {
			type: Date,
			required: true,
		},
		weight: {
			type: Number,
		},
		tpr: {
			type: String,
		},
		hr: {
			type: String,
		},
		rr: {
			type: String,
		},
		general_apr: {
			type: String,
		},
		eyes: {
			type: String,
		},
		ears: {
			type: String,
		},
		oral_exam: {
			type: String,
		},
		respiratory: {
			type: String,
		},
		musculoskeletal: {
			type: String,
		},
		lymphnod: {
			type: String,
		},
		cardiov: {
			type: String,
		},
		abdomen: {
			type: String,
		},
		hair_and_skin: {
			type: String,
		},
		extremt: {
			type: String,
		},
		genito_urinary: {
			type: String,
		},
		anamnese: {
			type: String,
		},
		other: {
			type: String,
		},
	},
	{
		timestamps: true,
		_id: false,
	}
);

StatusPresentSchema.plugin(AutoIncrement, { id: 'status_present_id_counter', inc_field: '_id' });

module.exports = mongoose.model('status_presents', StatusPresentSchema);
