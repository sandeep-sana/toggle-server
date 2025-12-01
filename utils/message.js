
const COMMON = {
    DELETED: 'deleted!',
    NOT_FOUND: 'not found',
    ADD_UPDATE: 'Add/Update',
    IS_REQUIRED: 'is required',
    ALREADY_EXIST: 'already exist',
    UPDATED_SUCCESSFULLY: 'updated successfully!',
    DELETED_SUCCESSFULLY: 'deleted successfully!',
    CREATED_SUCCESSFULLY: 'created successfully!',
}

const MESSAGE = {
    SERVER_ERROR: 'Server error',
    DELETED_SUCCESSFULLY: 'deleted successfully!',
    CREATED_SUCCESSFULLY: 'created successfully!',
    UPDATED_SUCCESSFULLY: 'updated successfully!',

    /**  */

    USER: {
        LOGIN_SUCCESSFULLY: `Login successfully.`,
        EMAIL_PASSWORD_NOT_CORRECT: `Email password not correct.`,
        ACCOUNT_REGESTER_SUCCESSFULLY: `Account register successfully.`,
    },
    PRICE: {
        NAME_ALREADY_EXIST: `Price name ${COMMON.ALREADY_EXIST}`,
        CREATED_SUCCESSFULLY: `Price ${COMMON.CREATED_SUCCESSFULLY}`,
    },
    
    LOGIN_SUCCESSFULLY: 'Login successfully',
    EMAIL_ALREADY_EXIST: 'Email already exist',
    DOMAIN_ALREADY_EXIST: 'Domain already exist',
    EMAIL_PASSWORD_NOT_CORRECT: 'Email password not correct',
    
    ROLE_CREATED_SUCCESSFULLY: `Role ${COMMON.CREATED_SUCCESSFULLY}`,
    MASTER_CREATED_SUCCESSFULLY: `Master ${COMMON.CREATED_SUCCESSFULLY}`,
    DATABASE_CREATED_SUCCESSFULLY: `Database ${COMMON.CREATED_SUCCESSFULLY}`,
    
    ROLE_UPDATED_SUCCESSFULLY: `Role ${COMMON.UPDATED_SUCCESSFULLY}`,
    MASTER_UPDATED_SUCCESSFULLY: `Master ${COMMON.UPDATED_SUCCESSFULLY}`,
    MASTER_DELETED_SUCCESSFULLY: `Master ${COMMON.UPDATED_SUCCESSFULLY}`,
    MASTER: {
        DELETED: `Master ${COMMON.DELETED}`,
    },
    MASTER_BINDING_RULE: {
        ADD_UPDATE: `Master Binding Rule ${COMMON.ADD_UPDATE}`,
    }

}

module.exports = {
    MESSAGE
};