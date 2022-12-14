let { MessageType } = require('@adiwajshing/baileys')
let handler = async (m, { conn, text }) => {
    if (!text) throw 'Masukkan jumlah Limit yang akan dikurangi'
    let who
    if (m.isGroup) who = m.mentionedJid[0]
    else who = m.chat
    if (!who) throw 'Tag salah satu lah'
    let txt = text.replace('@' + who.split`@`[0], '').trim()
    if (isNaN(txt)) throw 'Hanya angka'
    let poin = parseInt(txt)
    let limit = poin
    if (limit < 1) throw 'Minimal 1'
    let users = global.db.data.users
    users[who].limit -= poin

    conn.reply(m.chat, `Hai @${who.split`@`[0]}. Limit Kamu Berkurang -${poin} LIMIT!`, m, { mentions: [who] }, {
        mentions: [m.sender]
    }) 
}

handler.help = ['resetlimit @user <amount>']
handler.tags = ['owner']
handler.command = /^resetlimit$/
handler.rowner = true
handler.police = true

module.exports = handler