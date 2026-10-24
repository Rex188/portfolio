(() => {
  'use strict';
  let language='en',map,places=[];
  const links=[];
  const status=document.getElementById('mapStatus');
  const fallback=document.getElementById('fallback');
  let loaded=false;
  function updateLanguage(){
    document.documentElement.lang=language==='en'?'en':'zh-CN';
    document.getElementById('city').textContent=language==='en'?'/ Nanjing':'/ 南京';
    document.getElementById('language').textContent=language==='en'?'中文':'EN';
    document.getElementById('backProject').textContent=language==='en'?'← Project':'← 返回项目';
    document.getElementById('map').setAttribute('aria-label',language==='en'?'Map of recording locations in Nanjing':'南京录音地点地图');
    links.forEach(({element,label,place})=>{
      label.textContent=place.name[language];
      element.setAttribute('aria-label',place.name[language]);
      element.title=place.name[language];
    });
    if(!status.hidden)status.textContent=fallback.hidden?(language==='en'?'Loading map…':'正在加载地图……'):(language==='en'?'Map unavailable. Choose a place above.':'地图暂不可用，请从上方选择地点。');
  }
  function showFallback(){
    if(loaded)return;
    fallback.hidden=false;status.hidden=false;updateLanguage();
  }
  function fit(){
    if(!map||!places.length)return;
    map.resize();
    const bounds=new maplibregl.LngLatBounds();
    places.forEach(place=>bounds.extend([place.coordinates.lng,place.coordinates.lat]));
    const mobile=innerWidth<=600;
    map.fitBounds(bounds,{padding:{top:mobile?150:170,bottom:160,left:mobile?75:145,right:mobile?75:145},maxZoom:13.2,duration:0});
  }
  document.getElementById('language').onclick=()=>{language=language==='en'?'zh':'en';updateLanguage();};
  async function init(){
    const timer=setTimeout(showFallback,15000);
    try{
      const response=await fetch('data/places.json');
      if(!response.ok)throw new Error('Place data unavailable');
      places=await response.json();
      if(!window.maplibregl)throw new Error('Map library unavailable');
      map=new maplibregl.Map({container:'map',style:'data/map-style.json',center:[118.772,32.058],zoom:12.5,attributionControl:false,dragRotate:false,pitchWithRotate:false});
      map.addControl(new maplibregl.AttributionControl({compact:true}),'bottom-right');
      map.addControl(new maplibregl.NavigationControl({showCompass:false}),'top-left');
      places.forEach(place=>{
        const element=document.createElement('a');
        element.className='pin '+place.label;element.href=place.href;
        const dot=document.createElement('span');dot.className='pin-dot';dot.setAttribute('aria-hidden','true');
        const label=document.createElement('span');label.className='pin-name';
        element.append(dot,label);
        new maplibregl.Marker({element,anchor:'center'}).setLngLat([place.coordinates.lng,place.coordinates.lat]).addTo(map);
        links.push({element,label,place});
      });
      updateLanguage();fit();
      map.on('load',()=>{
        loaded=true;clearTimeout(timer);status.hidden=true;fallback.hidden=true;
        map.getStyle().layers.forEach(layer=>{
          if(layer.type==='symbol'&&/poi|shield|housenumber|airport|transit/i.test(layer.id))map.setLayoutProperty(layer.id,'visibility','none');
        });
        fit();
      });
      window.addEventListener('resize',()=>requestAnimationFrame(fit));
      new ResizeObserver(()=>requestAnimationFrame(fit)).observe(document.getElementById('map'));
      window.addEventListener('pageshow',()=>{map.resize();fit();});
    }catch(error){clearTimeout(timer);showFallback();}
  }
  init();
})();
