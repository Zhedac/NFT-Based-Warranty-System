import mongoose from "mongoose";

const Connection = async (username, password) => {
  const URL = `mongodb://user:codeforinterview@ac-4e2p1ih-shard-00-00.mj9omqs.mongodb.net:27017,ac-4e2p1ih-shard-00-01.mj9omqs.mongodb.net:27017,ac-4e2p1ih-shard-00-02.mj9omqs.mongodb.net:27017/FLIPKART_GRID?ssl=true&replicaSet=atlas-58tss8-shard-0&authSource=admin&retryWrites=true&w=majority`;
  //   `mongodb+srv://${username}:${password}@cluster0.tyx2wtg.mongodb.net/?retryWrites=true&w=majority`;
  // "mongodb://user:codeforinterview@ac-4e2p1ih-shard-00-00.mj9omqs.mongodb.net:27017,ac-4e2p1ih-shard-00-01.mj9omqs.mongodb.net:27017,ac-4e2p1ih-shard-00-02.mj9omqs.mongodb.net:27017/FLIPKART_GRID?ssl=true&replicaSet=atlas-58tss8-shard-0&authSource=admin&retryWrites=true&w=majority";
  try {
    await mongoose.connect(URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    });
    console.log("Database Connected Succesfully");
  } catch (error) {
    console.log("Error: ", error.message);
  }
};

export default Connection;
