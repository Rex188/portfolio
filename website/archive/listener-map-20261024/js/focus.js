export function focusPlace(map,place){map.flyTo({center:[place.coordinates.lng,place.coordinates.lat],zoom:15.2,duration:1050,essential:false})}
export function restoreOverview(map,view){if(view)map.flyTo({...view,duration:800,essential:false})}
