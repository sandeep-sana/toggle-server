const Dao = require('../dao/super-admin');
const mongoose = require('mongoose');
require('dotenv').config({ path: `${__dirname}/../.env` });

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to the database', process.env.MONGO_URI))
    .catch((err) => console.error('Database connection error:', err));

(async () => {
    try {
        const result = await Dao.findOneAndUpdate(
            { role: "SUPER_ADMIN" },
            {
                firstName: "sandeep",
                lastName: "sana",
                company: {
                    name: "RS Limited",
                    email: "rs@gmail.com",
                    password: "Sandeep@123",
                },
                status: "",
                role: "SUPER_ADMIN",
            },
            {
                new: true,             
                upsert: true,          
                rawResult: true        
            }
        );

        if (result.rawResult) {
            if (result.rawResult.nModified) {
                console.log(`Updated ${result.rawResult.nModified} document(s)`);
            } else if (result.rawResult.upserted) {
                console.log(`Inserted a new document with id: ${result.rawResult.upserted[0]._id}`);
            } else {
                console.log('No changes were made.');
            }
        }

    } catch (error) {
        console.error('Error updating or inserting document:', error);
    } finally {
        mongoose.connection.close();
    }
})();
