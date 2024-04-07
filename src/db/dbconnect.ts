import mongoose from "mongoose";

function dbconnect(url: string | undefined) {
  try {
    mongoose.connect(url!).then(() => {
      console.log("mongodb database connected!!");
    });
  } catch (err: any) {
    throw new Error(err.message);
  }
}

export default dbconnect;
