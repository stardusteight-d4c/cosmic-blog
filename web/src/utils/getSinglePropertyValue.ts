export function getSinglePropertyValue(obj: any) {
  const keys = Object.keys(obj)
  if (keys.length === 1) {
    const propertyName = keys[0]
    return obj[propertyName]
  }
  return null
}
