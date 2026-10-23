const V="koreys-v3",FILES=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{const r=e.request,u=new URL(r.url);
if(r.method!=="GET"||u.origin!==location.origin)return;
e.respondWith(caches.match(r,{ignoreSearch:true}).then(c=>{
const n=fetch(r).then(res=>{if(res&&res.ok){const k=res.clone();caches.open(V).then(x=>x.put(r,k))}return res}).catch(()=>c||caches.match("./"));
return c||n}))});
