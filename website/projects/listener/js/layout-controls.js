const $=id=>document.getElementById(id);
const defaults={zoom:11.8,pinX:65,pinY:29};
export function attachLayoutControls(map,places){
 const key='listener-map-layout-v3';let settings=read()||{...defaults};
 function read(){try{const v=JSON.parse(localStorage.getItem(key));return v&&Number.isFinite(v.zoom)&&Number.isFinite(v.pinX)&&Number.isFinite(v.pinY)?v:null}catch{return null}}
 function sync(){ $('zoomSlider').value=settings.zoom;$('pinXSlider').value=settings.pinX;$('pinYSlider').value=settings.pinY;$('zoomValue').textContent=Number(settings.zoom).toFixed(2);$('pinXValue').textContent=`${Math.round(settings.pinX)}%`;$('pinYValue').textContent=`${Math.round(settings.pinY)}%` }
 function align(){if(!map.loaded())return;map.resize();settings=read()||{...defaults};sync();const target={x:innerWidth*settings.pinX/100,y:innerHeight*settings.pinY/100};const zoom=Number(settings.zoom);const center=map.project(map.getCenter());const pin=map.project([places[3].coordinates.lng,places[3].coordinates.lat]);const shifted=map.unproject([center.x+pin.x-target.x,center.y+pin.y-target.y]);map.jumpTo({center:shifted,zoom})}
 function save(){settings={zoom:Number($('zoomSlider').value),pinX:Number($('pinXSlider').value),pinY:Number($('pinYSlider').value)};try{localStorage.setItem(key,JSON.stringify(settings));$('layoutSaved').textContent='Saved in this browser'}catch{$('layoutSaved').textContent='Values active; browser storage unavailable'}sync();align()}
 ['zoomSlider','pinXSlider','pinYSlider'].forEach(id=>$(id).addEventListener('input',save));
 $('layoutToggle').onclick=()=>{const panel=$('layoutPanel');panel.hidden=!panel.hidden;$('layoutToggle').setAttribute('aria-expanded',String(!panel.hidden))};
 $('resetLayout').onclick=()=>{try{localStorage.removeItem(key)}catch{}settings={...defaults};sync();$('layoutSaved').textContent='Reset to automatic composition';align()};
 $('copyLayout').onclick=async()=>{const data=JSON.stringify(settings,null,2);try{await navigator.clipboard.writeText(data);$('layoutSaved').textContent='Values copied: '+data.replaceAll('\n',' ')}catch{$('layoutSaved').textContent=data}};
 sync();map.on('load',()=>{align();requestAnimationFrame(align)});addEventListener('resize',align);return align;
}
