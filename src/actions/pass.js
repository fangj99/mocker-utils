import { waitFor } from '../utils'

export default async (req, res) => {
  const remoteRes = await req.send()

  res.writeHead(remoteRes.statusCode, remoteRes.headers)
  remoteRes.pipe(res)

  await waitFor(remoteRes, 'end', true)
  return false
}