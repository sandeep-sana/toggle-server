export const ROLE = {
    SUPER_ADMIN: 'SUPER_ADMIN'
}

export const MODULES = {
    ACCOUNT: { label: "ACCOUNT", path: "ACCOUNT" },
    DASHBOARD: { label: "DASHBOARD", path: "DASHBOARD" },
    BLOCK_ACCOUNT: { label: "BLOCK ACCOUNT", path: "BLOCKACCOUNT" },
    ACCEPT_ACCOUNT: { label: "ACCEPT ACCOUNT", path: "ACCEPTACCOUNT" },
    REJECT_ACCOUNT: { label: "REJECT ACCOUNT", path: "REJECTACCOUNT" },
    PRICE: { label: "PRICE", path: "PRICE" },
    WEBSITE: { label: "WEBSITE", path: "WEBSITE" },
    SETTING: { label: "SETTING", path: "SETTING" },
}

export const SUPER_ADMIN_DETAILS = {
    firstName: "sandeep",
    lastName: "sana",
    companyName: "RS Limited",
    email: "s@gmail.com",
    password: "12345",
    role: [ROLE.SUPER_ADMIN],
    activeRole: ROLE.SUPER_ADMIN,
    domain: 'toogle',
    modules: [
        MODULES.DASHBOARD,
        MODULES.ACCOUNT,
        MODULES.ACCEPT_ACCOUNT,
        MODULES.REJECT_ACCOUNT,
        MODULES.BLOCK_ACCOUNT,
        MODULES.PRICE,
        MODULES.WEBSITE,
        MODULES.SETTING,
    ]
}