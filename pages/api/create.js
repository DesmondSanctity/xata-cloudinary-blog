import { getXataClient } from '../../src/xata.js'


const xata = getXataClient()

export default async function createToXata(req, res) {
    let posts = req.body
    await xata.db.posts.create(posts)
    res.json({
        ok: true,
    })
}