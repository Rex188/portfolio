(() => {
  let index=0,request=0;
  const image=document.getElementById('background');
  const paths=Array.from({length:6},(_,i)=>'assets/photo-'+String(i+1).padStart(2,'0')+'.jpg');
  async function show(next){
    const ticket=++request;
    const target=(next+paths.length)%paths.length;
    const candidate=new Image();candidate.src=paths[target];
    try{await candidate.decode();}catch(error){return;}
    if(ticket!==request)return;
    index=target;image.src=paths[index];
    document.getElementById('photoCount').textContent=String(index+1).padStart(2,'0')+' / 06';
  }
  document.getElementById('previousPhoto').onclick=()=>show(index-1);
  document.getElementById('nextPhoto').onclick=()=>show(index+1);
  paths.slice(1).forEach(path=>{const preload=new Image();preload.src=path;});
})();
