export const APIURL = 'https://api.wynncraft.com/public_api.php'

export async function get(action, command = '') {
	return await fetch(`${APIURL}?action=${action}&command=${command}`).then(r => r.json())
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

export async function getOnlinePlayers() {
	return await get('onlinePlayers')
}

export async function getLeaderBoard(type, timeframe = 'alltime') {
	return await fetch(`${APIURL}?action=statsLeaderboard&type=${type}&timeframe=${timeframe}`).then(r => r.json()).then(j => j.data)
}

export async function search(str) {
	return await fetch(`${APIURL}?action=statsSearch&search=${str}`).then(r => r.json())
}

export async function getMyLocation() {
	return await fetch('https://api.wynncraft.com/map/getMyLocation').then(r => r.json())
}

export async function getAllItem() {
	return await fetch(`${APIURL}?action=itemDB&category=all`).then(r => r.json()).then(j => j.items)
}