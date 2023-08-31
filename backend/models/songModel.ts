import mongoose, { Document, Schema } from 'mongoose';

export interface ISong extends Document {
  title: string;
  artist: string;
  duration: string;
  url: string;  // Assume the URL where the song can be streamed from
}

const SongSchema: Schema = new Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  duration: { type: String, required: true },
  url: { type: String, required: true }
}, { 
  versionKey: false 
});

export default mongoose.model<ISong>('Song', SongSchema);
