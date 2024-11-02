const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const ClientSchema = new mongoose.Schema(
	{
		_id: {
			type: Number,
		},
		name: {
			type: String,
			required: true,
		},
		address: {
			type: String,
			required: true,
		},
		phone_number: {
			type: String,
			required: true,
		},
		dvm: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
		_id: false,
	}
);

ClientSchema.plugin(AutoIncrement, { id: 'client_id_counter', inc_field: '_id' });

module.exports = mongoose.model('clients', ClientSchema);
