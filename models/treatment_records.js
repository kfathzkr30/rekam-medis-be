const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const TreatmentRecordSchema = new mongoose.Schema(
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
		treatment_type: {
			type: Array,
			required: true,
		},
		treatment_information: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
		_id: false,
	}
);

TreatmentRecordSchema.plugin(AutoIncrement, { id: 'treatment_record_id_counter', inc_field: '_id' });

module.exports = mongoose.model('treatment_records', TreatmentRecordSchema);
