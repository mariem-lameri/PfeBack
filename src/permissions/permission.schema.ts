import * as mongoose from 'mongoose';

export const PermissionSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
});
export const Permission = mongoose.model('Permission', PermissionSchema);