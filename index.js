const { joinVoiceChannel } = require('@discordjs/voice');

client.once('ready', () => {
  console.log(`✅ Logged in as ${client.user.tag}`);

  // ใส่ ID ห้องเสียง (Voice Channel ID) ที่ต้องการให้บอทอยู่ 24 ชม.
  const channelId = '1426978162545528872';
  const guildId = '1350820198566854803';
  const channel = client.channels.cache.get(channelId);

  if (!channel) {
    console.log('❌ ไม่เจอห้องเสียง ตรวจสอบ ID อีกครั้ง');
    return;
  }

  joinVoiceChannel({
    channelId: channel.id,
    guildId: guildId,
    adapterCreator: channel.guild.voiceAdapterCreator,
  });

  console.log('🎧 เข้าห้องเสียงเรียบร้อยแล้ว!');
});
