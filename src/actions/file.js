import fs from 'fs'
import mime from 'mime-types'
import waitFor from 'event-to-promise'
import action from '../base'

export default action(path => async (req, res) => {
  const stream = fs.createReadStream(path)

  try {
    await waitFor(stream, 'open', true)
  } catch (error) {
    return
  }

  if (!res.headers['content-type']) {
    res.headers['content-type'] = mime.lookup(path) || 'application/octet-stream'
  }
  res.body = stream

  return false
})
