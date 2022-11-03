import { getXataClient } from '../../src/xata.js'


const xata = getXataClient()

export default async function getAllXata(req, res) {
    const records = await xata.db.posts.getAll();
    res.json({
        ok: true,
        data: records
    })
}