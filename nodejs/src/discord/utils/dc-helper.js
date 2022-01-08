import { client } from '../bot';

async function getDiscordUser(userId) {
  return await client.users.fetch(userId);
}

async function addRoleToMember(userId, guildId, roleId) {
  const guild = await client.guilds.fetch(guildId);
  const member = await guild.members.fetch(userId);
  await member.roles.add(roleId);
}

export { getDiscordUser, addRoleToMember };