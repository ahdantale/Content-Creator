const bcrypt = require('bcrypt')
const saltRounds = 10

async function creatSecurePassword(password){
    try {
        const hashedPassword = await bcrypt.hash(password,saltRounds)
        return hashedPassword
    }catch(err){
        throw err
    }
}

async function validatePassowrd(enteredPassword,existingPassword) {
    try {
        const isValid = await bcrypt.compare(enteredPassword,existingPassword)
        return isValid
    }catch(err){
        throw err
    }
}

module.exports = {
    creatSecurePassword,
    validatePassowrd
}