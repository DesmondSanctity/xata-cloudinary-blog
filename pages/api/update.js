import { getXataClient } from '../../src/xata.js'

const xata = getXataClient()

export default async function updateToXata(req, res) {
    let id = req.body.id
    let post = {
        title: req.body.post.title,
        body: req.body.post.body,
        image: req.body.post.image,
        tags: req.body.post.tags
    }
    console.log(id, post)
    await xata.db.posts.update(id, post);
    res.json({
        ok: true,
    })
}