import mongoose from 'mongoose'
import beautifyUnique from 'mongoose-beautiful-unique-validation'
const Schema = mongoose.Schema;


const PetSchema = new Schema({
	name: {
		type: String,
		required: true,
		index: true,
		unique: 'Un autre animal porte déjà ce nom'
	},
	species: {
		type: String,
		index: true
	},
	birthday: { type: String },
	updated: { type: Date, default: Date.now },
	created: { type: Date, default: Date.now },
});

PetSchema.plugin(beautifyUnique)

export default mongoose.model('Pet', PetSchema)