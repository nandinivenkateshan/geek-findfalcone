export const getReq = async (url) => {
  try {
    const response = await window.fetch(url)
    return await response.json()
  } catch {
    return { netErr: 'error' }
  }
}

export const postReq = async (url, value) => {
  try {
    const response = await window.fetch(url, {
      method: 'POST',
      headers: {
        accept: 'application/json'
      },
      body: JSON.stringify(value)
    })
    return await response.json()
  } catch {
    return { netErr: 'error' }
  }
}
