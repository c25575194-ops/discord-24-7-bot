require('dotenv').config();
const express = require('express');
const { Client, GatewayIntentBits } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');

const app = express();
app.get('/', (req, res) => res.send('Bot is online!'));
app.listen(process.env.PORT || 3000, () => console.log('🌐 Web server started'));

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates
  ]
});

client.once('ready', async () => {
  console.log(`✅ Logged in as ${client.user.tag}`);

  const channelId = '1426978162545528872'; // Voice channel ID
  const guildId = '13508208198566854083'; // Guild ID

  try {
    const channel = await client.channels.fetch(channelId);
    if (!channel) return console.log('❌ ไม่เจอห้องเสียง ตรวจสอบ ID อีกครั้ง');

    joinVoiceChannel({
      channelId: channel.id,
      guildId: guildId,
      adapterCreator: channel.guild.voiceAdapterCreator,
      selfDeaf: false
    });

    console.log('🎵 เข้าห้องเสียงสำเร็จและจะอยู่ตลอด 24 ชั่วโมง');
  } catch (error) {
    console.error('⚠️ Error joining voice channel:', error);
  }
});

client.login(process.env.DISCORD_TOKEN);
