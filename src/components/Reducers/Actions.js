export const showVehicles = val => {
    const {value, destination,destinationIndex} = val
    return {
        type: 'SHOW_VEHICLES',
       ...val
    }
}

export const showRadio = val => {
const {vehicle,planetIndex, destination} = val
console.log('vallll',val)
return {
    type: 'SHOW_RADIO',
    ...val
}
}