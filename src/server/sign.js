import crypto from 'crypto'
const signKey = 'XSKDJFHJF'
export default data => {
  const sign = crypto.createHash('sha1')
  sign.update(JSON.stringify(data) + signKey)
  return new Buffer.from(sign.digest('hex').toUpperCase()).toString('base64')
}
