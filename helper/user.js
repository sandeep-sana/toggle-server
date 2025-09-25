import mongoose from "mongoose";
import UserDao from "../dao/user.js";
import TaskDao from "../dao/task.js";
import { sendEmail } from "../sendEmail.js";
import { CREATE_PASSWORD } from "../utils/email-template.js";

export const createDatabase = async (account) => {
    try {
        await deleteDatabase(account.domain);
        account.domain = account.domain.toLowerCase();
        const user = await UserDao.findOneAndUpdate(account.domain,
            { email: account.email },
            {
                firstName: account.firstName,
                lastName: account.lastName,
                email: account.email,
                password: account.domain,
                role: account.role,
                modules: [
                    { label: 'DASHBOARD', value: 'DASHBOARD', path: "" },
                    { label: 'ACCESS', value: 'ACCESS', path: "" },
                ],
                isHierarchy: false,
            }, {
            new: true,
            upsert: true,
            rawResult: true,
        });
        await TaskDao.findOneAndUpdate(account.domain,
            { userId: user._id },
            {
                userId: user._id,
                tasks: [
                    {
                        name: 'first click on access page.',
                        status: false,
                        path: 'access',
                    },
                    {
                        name: 'available modules drag and drop the role master to active modules',
                        status: false,
                        accessMoveToActive: 'ROLE',
                    },
                    {
                        name: 'first setup the roles.',
                        status: false,
                    }
                ]
            },
            {
                new: true,
                upsert: true,
                rawResult: true,
            }
        )

        console.log(user)

        const html = {
            USER_NAME: account.firstName + ' ' + account.lastName,
            EMAIL: account.email,
            PASSWORD: account.domain,
            COMPANY_NAME: process.env.COMPANY_NAME,
            DOMAIN: account.domain,
        }
        const email = {
            from: process.env.EMAIL_USER,
            to: account.email,
            subject: 'create password',
            html: CREATE_PASSWORD(html),
        }
        await sendEmail(email);
        console.log(`📦 Database "${account.domain}" created with default collection.`);
    } catch (err) {
        console.error("❌ Error connecting to or using the database:", err);
        throw err;
    }
};

export const deleteDatabase = async (dbName) => {
    try {
        const dbUri = `${process.env.DATABASE_URI}${dbName}`;
        const conn = await mongoose.createConnection(dbUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        await conn.dropDatabase();
        console.log(`🗑️ Database "${dbName}" dropped successfully.`);

    } catch (err) {
        console.error(err);
        throw err;
    }
}
