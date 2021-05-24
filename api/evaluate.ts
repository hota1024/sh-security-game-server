import zxcvbn from 'zxcvbn'
import { VercelRequest, VercelResponse } from '@vercel/node'

export default (request: VercelRequest, response: VercelResponse) => {
  if (request.method !== 'POST') {
    return response.status(404).send({
      message: '404 page not found',
    })
  }

  const password: string | undefined = request?.body?.password

  if (typeof password === 'undefined') {
    return response.status(400).send({
      message: 'password field is required',
    })
  }

  const result = zxcvbn(password)

  response.send({
    level: result.score,
  })
}
