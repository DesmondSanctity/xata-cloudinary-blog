import { getXataClient } from '../../src/xata.js'


const xata = getXataClient()

export default async function getAllXata(req, res) {
    const records = await xata.db.posts.getAll();
    return res.json({
        ok: true,
        posts: records
    })
}