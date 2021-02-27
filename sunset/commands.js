const sharp = require('sharp')

module.exports = {
  sunset: {
    desc: 'Sunset someone',
    usage: 'sunset @someone',
    async execute (client, msg, param, db) {
      const user = msg.mentions.members.size === 0 ? msg.author : msg.mentions.members.first().user
      const avatarUrl = user.displayAvatarURL({ format: 'png' })

      const request = require('request').defaults({ encoding: null })

      request.get(avatarUrl, async function (error, response, body) {
        if (!error && response.statusCode === 200) {
          const data = 'data:' + response.headers['content-type'] + ';base64,' + Buffer.from(body).toString('base64')
          console.log(data)

          const img = await sharp(data)
            .resize(500, 500)
            .composite([{ input: 'bruh.png' }])
            .toBuffer()

          msg.channel.send('Sunset', { attachment: img })
        }
      })
    }
  }
}
