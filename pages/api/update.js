import { getXataClient } from '../../src/xata.js'

const xata = getXataClient()

export default async function updateToXata(req, res) {
    const id = req.body
    await xata.db.posts.update(id, Post);
    res.json({
        ok: true,
    })
}