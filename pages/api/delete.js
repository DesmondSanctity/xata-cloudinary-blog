import { getXataClient } from '../../src/xata.js'

const xata = getXataClient()

const deleteItem = async (id) => {
  return await xata.db.posts.delete(id)
}

export default async function deleteFromXata(req,res) {
  const { id } = req.body
  await deleteItem(id)

  res.json({
    ok: true,
  })
}
