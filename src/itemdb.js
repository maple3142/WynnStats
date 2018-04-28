import Dexie from 'dexie'

const db = new Dexie('ItemDB')
db.version(1).stores({
	items: 'name,type,level,tier'
})
export default db
