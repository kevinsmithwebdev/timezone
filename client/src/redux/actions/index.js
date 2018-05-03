import { API_LOCATION, API_SUGGEST } from '../../common/constants/routes'

export const setLocation = (locSlot, locObj) => {
  return {
    type: 'SET_LOCATION',
    payload: { locSlot, locObj }
  }
}

export function checkLocation(locSlot, str) {
  const url = API_LOCATION + str
  return (dispatch) => {

    fetch(url, { method: 'GET' }
    )
    .then((response) => {
      if (response.status === 200) {
        return response.json()
      }
      return null
    })
    .then((json) => {
      if (json)
        dispatch(setLocation(locSlot, json))
    })
    .catch(error => console.error(error))
  }
}

//***

export const swapLocations = () => {
  return {
    type: 'SWAP_LOCATIONS'
  }
}

//***

export const setSuggest = (locSlot, suggestions) => {
  return {
    type: 'SET_SUGGEST',
    payload: { locSlot, suggestions }
  }
}

export function getSuggest(locSlot, str) {
  const url = API_SUGGEST + str

  console.log(url)
  return (dispatch) => {
    fetch(url, { method: 'GET' }
    )
    .then((response) => {
      if (response.status === 200) {
        return response.json()
      }
      return null
    })
    .then((json) => {
      let pred = json.data.predictions.map(l => l.description)
      if (pred) 
        dispatch(setSuggest(locSlot, pred))
    })
    .catch(error => console.error(error))
  }
}
