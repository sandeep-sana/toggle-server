const mongoose = require("mongoose");
const Schema = require("../schema/user");
const { dbconnection } = require("../db-connection");
const { ROLE, SUPER_ADMIN_DETAILS } = require("../constant");
require("dotenv").config({ path: `${__dirname}/../.env` });

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to database:", process.env.MONGO_URI);
    const Dao = await dbconnection("toggle", "user", Schema);
    const result = await Dao.findOneAndUpdate(
      { role: ROLE.SUPER_ADMIN },
      SUPER_ADMIN_DETAILS,
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
