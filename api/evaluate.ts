import zxcvbn from 'zxcvbn'
import { VercelRequest, VercelResponse } from '@vercel/node'

export default (request: VercelRequest, response: VercelResponse) => {
  if (request.method !== 'POST') {
    return response.status(404).send({
      message: '404 page not found',
    })
  }

  const password: string | undefined = request?.body?.password
  const token: string | undefined = request?.body?.token

  if (typeof password === 'undefined') {
    return response.status(400).send({
      message: 'password field is required',
    })
  }

  if (typeof token === 'undefined') {
    return response.status(400).send({
      message: 'token field is required',
    })
  }

  if (typeof token !== process.env.TOKEN) {
    return response.status(401).send({
      message: 'invalid token',
    })
  }

  const result = zxcvbn(password)

  response.send({
    level: result.score,
  })
}
