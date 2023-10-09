import { v4 as uuidv4 } from 'uuid'

function createRandomUUID() {
  return uuidv4()
}

export default createRandomUUID
