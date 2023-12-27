import config from 'config'
import jwt, { sign } from 'jsonwebtoken'

const PublicKey = Buffer.from(
  config.get<string>('publicKey'),
  'base64'
).toString('ascii')

const PrivateKey = Buffer.from(
  config.get<string>('privateKey'),
  'base64'
).toString('ascii')

export function signJwt(object: Object, options?: jwt.SignOptions | undefined) {
  return jwt.sign(object, PrivateKey, {
    ...(options && options),
    algorithm: 'RS256',
  })
}

export function verifyJwt<T>(token: string): T | null {
  try {
    const decoded = jwt.verify(token, PublicKey) as T
    return decoded
  } catch (error) {
    return null
  }
}
