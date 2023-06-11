export function removeObjEmptyValues(obj: any) {
  Object.keys(obj).forEach((key) => {
    if (obj[key] === "") {
      delete obj[key];
    }
  });
}
