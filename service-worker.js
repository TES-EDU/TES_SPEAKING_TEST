const CACHE_NAME = 'tes-speaking-test-v5';
const BASE = new URL('./', self.location.href);
const URLS_TO_CACHE = ['index.html','css/style.css','js/supabase.js','favicon.png','manifest.json'].map(x=>new URL(x,BASE).href);
self.addEventListener('install', event => {event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(URLS_TO_CACHE)).then(()=>self.skipWaiting()));});
self.addEventListener('activate', event => {event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('tes-speaking-')&&k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch', event => {if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;event.respondWith(fetch(event.request).then(response=>{if(response.ok){const copy=response.clone();event.waitUntil(caches.open(CACHE_NAME).then(c=>c.put(event.request,copy)));}return response;}).catch(()=>caches.match(event.request)));});
