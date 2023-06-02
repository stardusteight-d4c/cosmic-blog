export function removeEmptyValues(obj: any) {
  Object.keys(obj).forEach((key) => {
    if (obj[key] === '') {
      delete obj[key]
    }
  })
}
