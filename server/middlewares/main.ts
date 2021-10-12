// const body = {
//   name: 'michael',
// }
export const sendRequest = async (
  url: string,
  method: string = 'GET',
  data: object | null = null,
) => {
  try {
    const headers: any = {}
    let body

    if (data) {
      headers['Content-Type'] = 'application/json'
      body = JSON.stringify(data)
    }

    const response = await fetch(url, {
      method: method,
      body,
      headers,
    })
    console.log(response)
    return await response.json()
  } catch (err) {
    console.warn('Error: ', err)
  }
}
sendRequest('https://jsonplaceholder.typicode.com/todos/1')
