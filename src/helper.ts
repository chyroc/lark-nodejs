export const encodeQuery = (query: { [key: string]: any }) => {
  let str = []
  for (const p in query) {
    if (query.hasOwnProperty(p) && query[p] !== undefined) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(query[p]))
    }
  }
  str.sort()
  return str.join('&')
}
