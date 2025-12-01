// บังคับใช้ opusscript เพื่อให้ Render รองรับ voice
process.env.DISCORDJS_OPUS = "opusscript";
process.env.DOCKER_SKIP_GLIBC_CHECK = "1";

require("dotenv").config();

const { Client, GatewayIntentBits } = require("discord.js");
const { joinVoiceChannel } = require("@discordjs/voice");

const TOKEN = process.env.DISCORD_TOKEN;
const VOICE_CHANNEL_ID = process.env.VOICE_CHANNEL_ID;
const GUILD_ID = process.env.GUILD_ID;

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates
    ]
});

client.once("ready", () => {
    console.log(`✅ บอทออนไลน์: ${client.user.tag}`);

    const guild = client.guilds.cache.get(GUILD_ID);
    const channel = client.channels.cache.get(VOICE_CHANNEL_ID);

    if (!guild) return console.log("❌ ไม่พบ GUILD_ID");
    if (!channel) return console.log("❌ ไม่พบ VOICE_CHANNEL_ID");

    // เข้าห้องเสียง
    const connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: guild.id,
        adapterCreator: guild.voiceAdapterCreator,
        selfDeaf: false,
        selfMute: false
    });

    // ป้องกัน Render error "No compatible encryption modes"
    connection.receiver.speaking.on("start", () => {});

    console.log("🎧 บอทเข้าห้องเสียงเรียบร้อย!");
});

client.login(TOKEN);
