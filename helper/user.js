import Dao from "../dao/user.js";
import { sendEmail } from "../sendEmail.js";
import { CREATE_PASSWORD } from "../utils/email-template.js";

export const createDatabase = async (account) => {
    try {
        await Dao.findOneAndUpdate(account.domain,
            {
                email: account.email
            }, {
            firstName: account.firstName,
            lastName: account.lastName,
            email: account.email,
            password: account.domain,
            role: account.role,
        }, {
            new: true,
            upsert: true,
            rawResult: true,
        });
        
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
