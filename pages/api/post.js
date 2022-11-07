import { getXataClient } from '../../src/xata.js'


const xata = getXataClient()

export default async function getOneXata(req, res) {
    let id = req.query
    console.log(id)
    const record = await xata.db.posts.read(id);
    return res.json({
        ok: true,
        post: record
    })
    
}