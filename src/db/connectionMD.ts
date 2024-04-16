import mongoose from "mongoose";

const mongoCon = (url: string) => {
    mongoose.connect(url);
};
export default mongoCon;
