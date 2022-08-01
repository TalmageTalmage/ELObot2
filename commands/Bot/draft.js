const db = require('../../models/index');
const { Op } = require("sequelize");
const printLobby = require('../../functions/printLobby')
const endDraft = require('../../functions/endDraft');
const e = require('express');
const Lobbies = db.lobbies_model
const InLobby = db.inLobby_model
const Games = db.games_model

module.exports = {
    name: "draft",
    category: "Bot",
    aliases: ['d', 'p'],
    usage: "-draft <USERNAME>",
    description: "drafts a player",
    run: async (client, message, args) => {
        try {

            const drafter = await InLobby.findOne({
                where: {
                    playerId: message.author.id,
                    capt: true
                },
                include: {
                    model: Lobbies,
                    where: { channelId: message.channel.id }
                }
            })

            let turnToPick = drafter.dataValues.lobbies_model.dataValues.status
            let pick = drafter.dataValues.lobbies_model.dataValues.turn
            if (drafter.dataValues.team == turnToPick && drafter.dataValues.capt == 1) {

                const picked = await InLobby.update({
                    team: drafter.dataValues.team
                }, {
                    where: {
                        username: { [Op.eq]: args[0] },
                        team: null
                    },
                    include: {
                        model: Lobbies,
                        where: { channelId: message.channel.id }
                    }
                })

                if (picked == 1) {
                    console.log(pick)
                    if (turnToPick == 1 && pick == 2) {
                        turnToPick = 2
                        pick = 1
                    }
                    else if (turnToPick == 1 && pick == 1) {
                        pick = 2
                    }
                    else if (turnToPick == 2 && pick == 2) {
                        turnToPick = 1
                        pick = 1
                    }
                    else if (turnToPick == 2 && pick == 1) {
                        pick = 2
                    }
                    console.log(turnToPick + ' ' + pick)
                    const turn = await Lobbies.update({
                        status: turnToPick,
                        turn: pick
                    },
                        {
                            where: { channelId: message.channel.id }
                        })

                    const left = await InLobby.findAll({
                        where: { team: null },
                        include: {
                            model: Lobbies,
                            where: { channelId: message.channel.id }
                        }
                    })

                    if (left.length == 1) {
                        const last = await InLobby.update({
                            team: turnToPick
                        }, {
                            where: {
                                team: null
                            },
                            include: {
                                model: Lobbies,
                                where: { channelId: message.channel.id }
                            }
                        })

                        endDraft(message)
                        return
                    }
                }
                else {

                    message.channel.send('Invalid selection!')
                }
                const captain = await InLobby.findOne({
                    where: {
                        capt: true,
                        team: turnToPick
                    }
                })
                console.log(captain.dataValues.playerId)
                message.channel.send(`<@${captain.dataValues.playerId}>, please pick a player!`)
                printLobby(message)
            }
            else if (drafter.dataValues.capt == 1) {
                message.channel.send(`It's not your turn!`)
            }
        }
        catch (error) {
            console.log(error)
            message.channel.send("You're not a captain")
        }
    }
};