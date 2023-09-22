export interface ImageQueryResult {
  component: 'img'
  src: string
}

export default function createImageQuery(fieldName: string, auto = false) {
  return `
    'auto': ${auto},
    'component': 'img',
    'src': ${fieldName}
  `
}
