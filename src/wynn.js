export const APIURL='https://api.wynncraft.com/public_api.php'

export async function get(action, command) {
	return await fetch(`${APIURL}?action=${action}&command=${command}`).then(r=>r.json())
}

export async function getPlayerStats(player) {
	let res = await get('playerStats', player)
	if (res.error) {
		throw new Error(res.error)
	}
	return res
}

export async function getGuildStats(guild) {
	let res = await get('guildStats', guild)
	if (res.error) {
		throw new Error(res.error)
	}
	return res
}