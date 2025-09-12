const mongoose = require("mongoose");
const Schema = require("../schema/user");
const { dbconnection } = require("../db-connection");
require("dotenv").config({ path: `${__dirname}/../.env` });

(async () => {
  try {
    // 1) Connect once
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to database:", process.env.MONGO_URI);

    // 2) Use your custom Dao connection
    const Dao = await dbconnection("toggle", "user", Schema);

    // 3) Perform update or insert
    const result = await Dao.findOneAndUpdate(
      { role: "SUPER-ADMIN" },
      {
        firstName: "sandeep",
        lastName: "sana",
        companyName: "RS Limited",
        email: "rs@gmail.com",
        password: "Sandeep@123",
        status: "",
        role: "SUPER-ADMIN",
        modules: ["DASHBOARD","ACCOUNT", "REJECT-ACCOUNT", "ACCEPT-ACCOUNT", "BLOCK-ACCOUNT"]
      },
      {
        new: true,
        upsert: true,
        rawResult: true,
      }
    );

    if (result.rawResult) {
      if (result.rawResult.nModified) {
        console.log(`🔄 Updated ${result.rawResult.nModified} document(s)`);
      } else if (result.rawResult.upserted) {
        console.log(`🆕 Inserted new document with id: ${result.rawResult.upserted[0]._id}`);
      } else {
        console.log("ℹ️ No changes were made.");
      }
    }
  } catch (error) {
    console.error("❌ Error updating/inserting:", error);
  } finally {
    // 4) Always disconnect
    await mongoose.disconnect();
    console.log("🔌 Database connection closed");
  }
})();
