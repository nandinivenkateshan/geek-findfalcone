export const fetchGet = async (url) => {
    try {
      const response = await window.fetch(url)
      return await response.json()
    } catch {
      return { netErr: 'error' }
    }
  }

  export const fetchToken = async (url) => {
    try {
      const response = await window.fetch(url, {
        method: 'POST',
        headers: {
          accept: 'application/json'
        }
      })
     return await response.json()
    } catch {
      return { netErr: 'error' }
    }
  }

export async function fetchPost (url, value) {
    try {
      const response = await window.fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(value)
      })
      return await response.json()
    } catch {
      return { netErr: 'error' }
    }
  }