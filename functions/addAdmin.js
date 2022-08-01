const db = require('../models/index')
const Admins = db.admins_model

let addAdmin = async (message) => {
    try {
        let owner = await message.guild.fetchOwner()
        await Admins.findOrCreate({
            where: {
                userId: owner.user.id,
                serverId: message.guild.id
            }
        })
    }
    catch (error) {
        console.log(error)
    }
    return
}

module.exports = addAdmin
