import Mongoose from 'mongoose';

const connectMongoDB = async () => {
  try {
    const Url = process.env.MONGODB_URI;
    await Mongoose.connect(Url as string);
    console.log('Mongo DB is connected...');
  } catch (error) {
    console.log(error);
  }
};

export default connectMongoDB;
