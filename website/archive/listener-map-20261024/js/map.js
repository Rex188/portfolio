export function createMap(places,onSelect){
  const map=new maplibregl.Map({container:'mapBase',style:'https://tiles.openfreemap.org/styles/positron',center:[118.78,32.04702],zoom:12,attributionControl:false,dragRotate:false,pitchWithRotate:false});
  map.addControl(new maplibregl.AttributionControl({compact:true,customAttribution:'© OpenStreetMap contributors · OpenMapTiles · OpenFreeMap'}),'bottom-right');
  const pins=[];
  places.forEach((place,index)=>{
    const el=document.createElement('button');el.className='map-pin';el.type='button';el.setAttribute('aria-label',place.name.zh);el.title=place.name.zh;el.innerHTML=`<span class="pin-shape"><b>${String(index+1).padStart(2,'0')}</b></span>`;
    const marker=new maplibregl.Marker({element:el,anchor:'center'}).setLngLat([place.coordinates.lng,place.coordinates.lat]).addTo(map);
    marker.setPopup(new maplibregl.Popup({closeButton:false,closeOnClick:false,offset:12,className:'place-label'}).setText(`${String(index+1).padStart(2,'0')} · ${place.name.en}`));
    el.addEventListener('click',()=>onSelect(index));pins.push(el);
  });
  return {map,pins};
}
