require("dotenv").config();

const { Client, GatewayIntentBits } = require("discord.js");
const { joinVoiceChannel } = require("@discordjs/voice");

// โหลดตัวแปร .env
const TOKEN = process.env.DISCORD_TOKEN;
const VOICE_CHANNEL_ID = process.env.VOICE_CHANNEL_ID;
const GUILD_ID = process.env.GUILD_ID;

// สร้าง client Discord
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates
    ]
});

// เมื่อบอทออนไลน์
client.once("ready", () => {
    console.log(`✅ บอทออนไลน์ในชื่อ: ${client.user.tag}`);

    const guild = client.guilds.cache.get(GUILD_ID);
    const channel = client.channels.cache.get(VOICE_CHANNEL_ID);

    if (!guild) {
        console.log("❌ ไม่พบ GUILD_ID ตรวจสอบใน .env");
        return;
    }

    if (!channel) {
        console.log("❌ ไม่พบห้องเสียง ตรวจสอบ VOICE_CHANNEL_ID ใหม่ใน .env");
        return;
    }

    // ให้บอทเข้าห้องเสียง
    joinVoiceChannel({
        channelId: channel.id,
        guildId: guild.id,
        adapterCreator: guild.voiceAdapterCreator,
    });

    console.log("🎧 บอทเข้าห้องเสียงเรียบร้อย!");
});

// ล็อกอินบอท
client.login(TOKEN);
