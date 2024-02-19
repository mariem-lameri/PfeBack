import * as mongoose from 'mongoose';

export const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  clientName: { type: String, required: true }, 
  teamMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

