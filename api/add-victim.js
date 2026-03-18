const bcrypt = require('bcrypt');

async function addVictim(victimData) {
    const hashedPassword = process.env.ADMIN_PASSWORD_HASH;
    if (!hashedPassword) {
        throw new Error('ADMIN_PASSWORD_HASH environment variable not set');
    }

    // Hash the password if it's provided in the victim data
    if (victimData.password) {
        victimData.password = await bcrypt.hash(victimData.password, 10);
    }

    // Your existing logic to add a victim...

    return victimData;
}

module.exports = addVictim;