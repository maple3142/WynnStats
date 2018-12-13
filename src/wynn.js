import xf from 'xfetch-js'

export const APIURL = 'https://api.wynncraft.com/public_api.php'

export function get(action, command = '') {
	return xf.get(`${APIURL}?action=${action}&command=${command}`).json()
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
	return await xf.get(`${APIURL}?action=statsLeaderboard&type=${type}&timeframe=${timeframe}`).json(r => r.data)
}

export async function search(str) {
	return await xf.get(`${APIURL}?action=statsSearch&search=${str}`).json()
}

export async function getMyLocation() {
	return await xf.get('https://api.wynncraft.com/map/getMyLocation').json()
}

export async function getAllItem() {
	const r = await xf.get(`${APIURL}?action=itemDB&category=all`).json(x => x.items)
	return r.map(x => {
		if (x.accessoryType) {
			x.type = x.accessoryType
			delete x.accessoryType
		}
		return x
	})
}

export async function getUUID(id) {
	return xf.get(`https://api.minetools.eu/uuid/${id}`).json(({ id }) => (id === 'null' ? null : id))
}
