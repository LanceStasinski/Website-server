if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let i=Promise.resolve();return c[e]||(i=new Promise((async i=>{if("document"in self){const c=document.createElement("script");c.src=e,document.head.appendChild(c),c.onload=i}else importScripts(e),i()}))),i.then((()=>{if(!c[e])throw new Error(`Module ${e} didn’t register its module`);return c[e]}))},i=(i,c)=>{Promise.all(i.map(e)).then((e=>c(1===e.length?e[0]:e)))},c={require:Promise.resolve(i)};self.define=(i,n,r)=>{c[i]||(c[i]=Promise.resolve().then((()=>{let c={};const a={uri:location.origin+i.slice(1)};return Promise.all(n.map((i=>{switch(i){case"exports":return c;case"module":return a;default:return e(i)}}))).then((e=>{const i=r(...e);return c.default||(c.default=i),c}))})))}}define("./service-worker.js",["./workbox-f7715658"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"./index.html",revision:"1d50f2ce1f16c9e4f7ea65f7e08d7c10"},{url:"index.js",revision:"0bc61ccf999053e9b3cafbf5a569e4bf"},{url:"main.css",revision:"09f9708444cd748f89c3935d682d347d"},{url:"src/client/media/images/sunset.jpg",revision:"c4cbeea404cca97e7cc63775c44c3bdd"},{url:"src/client/media/weather-icons/a01d.png",revision:"6205132425aae9531ca782ada677b4dc"},{url:"src/client/media/weather-icons/a01n.png",revision:"a8b7dd1bd9f316a8b662e4fecdbc79e8"},{url:"src/client/media/weather-icons/a02d.png",revision:"6205132425aae9531ca782ada677b4dc"},{url:"src/client/media/weather-icons/a02n.png",revision:"a8b7dd1bd9f316a8b662e4fecdbc79e8"},{url:"src/client/media/weather-icons/a03d.png",revision:"6205132425aae9531ca782ada677b4dc"},{url:"src/client/media/weather-icons/a03n.png",revision:"a8b7dd1bd9f316a8b662e4fecdbc79e8"},{url:"src/client/media/weather-icons/a04d.png",revision:"6205132425aae9531ca782ada677b4dc"},{url:"src/client/media/weather-icons/a04n.png",revision:"a8b7dd1bd9f316a8b662e4fecdbc79e8"},{url:"src/client/media/weather-icons/a05d.png",revision:"6205132425aae9531ca782ada677b4dc"},{url:"src/client/media/weather-icons/a05n.png",revision:"a8b7dd1bd9f316a8b662e4fecdbc79e8"},{url:"src/client/media/weather-icons/a06d.png",revision:"6205132425aae9531ca782ada677b4dc"},{url:"src/client/media/weather-icons/a06n.png",revision:"a8b7dd1bd9f316a8b662e4fecdbc79e8"},{url:"src/client/media/weather-icons/c01d.png",revision:"5bd79e6650e3e2767f61a4934d4e0c45"},{url:"src/client/media/weather-icons/c01n.png",revision:"15d2a8bf9346af031d632374e27d9aa0"},{url:"src/client/media/weather-icons/c02d.png",revision:"e036c5b2eebc6c9adfa84f5dac34d725"},{url:"src/client/media/weather-icons/c02n.png",revision:"3494f86bb355776828f4e471c76c56d5"},{url:"src/client/media/weather-icons/c03d.png",revision:"e93d272802d6631fd16be26e7b72657f"},{url:"src/client/media/weather-icons/c03n.png",revision:"c284f4296f3f14086f805adefe46d00d"},{url:"src/client/media/weather-icons/c04d.png",revision:"2c5994f7d9426ea4bbae0f33ba417bd9"},{url:"src/client/media/weather-icons/c04n.png",revision:"2c5994f7d9426ea4bbae0f33ba417bd9"},{url:"src/client/media/weather-icons/d01d.png",revision:"1ed8d5a81bde04b96ec44124085f0973"},{url:"src/client/media/weather-icons/d01n.png",revision:"1ed8d5a81bde04b96ec44124085f0973"},{url:"src/client/media/weather-icons/d02d.png",revision:"1ed8d5a81bde04b96ec44124085f0973"},{url:"src/client/media/weather-icons/d02n.png",revision:"1ed8d5a81bde04b96ec44124085f0973"},{url:"src/client/media/weather-icons/d03d.png",revision:"1ed8d5a81bde04b96ec44124085f0973"},{url:"src/client/media/weather-icons/d03n.png",revision:"1ed8d5a81bde04b96ec44124085f0973"},{url:"src/client/media/weather-icons/f01d.png",revision:"fe27c344277901aa5be6e95337439959"},{url:"src/client/media/weather-icons/f01n.png",revision:"fe27c344277901aa5be6e95337439959"},{url:"src/client/media/weather-icons/r01d.png",revision:"fe27c344277901aa5be6e95337439959"},{url:"src/client/media/weather-icons/r01n.png",revision:"fe27c344277901aa5be6e95337439959"},{url:"src/client/media/weather-icons/r02d.png",revision:"fe27c344277901aa5be6e95337439959"},{url:"src/client/media/weather-icons/r02n.png",revision:"fe27c344277901aa5be6e95337439959"},{url:"src/client/media/weather-icons/r03d.png",revision:"c96f1cb1d19fd3453cf74f4dbb7059a5"},{url:"src/client/media/weather-icons/r03n.png",revision:"c96f1cb1d19fd3453cf74f4dbb7059a5"},{url:"src/client/media/weather-icons/r04d.png",revision:"fe27c344277901aa5be6e95337439959"},{url:"src/client/media/weather-icons/r04n.png",revision:"8d760b0907ed8e597cd9eb9185e58a6c"},{url:"src/client/media/weather-icons/r05d.png",revision:"87ccf2d87bfbfb6013b90744986d7781"},{url:"src/client/media/weather-icons/r05n.png",revision:"8d760b0907ed8e597cd9eb9185e58a6c"},{url:"src/client/media/weather-icons/r06d.png",revision:"fe27c344277901aa5be6e95337439959"},{url:"src/client/media/weather-icons/r06n.png",revision:"8d760b0907ed8e597cd9eb9185e58a6c"},{url:"src/client/media/weather-icons/s01d.png",revision:"adf57aee773961e0093750518f0573a9"},{url:"src/client/media/weather-icons/s01n.png",revision:"7c5e9375d99b54defcb17ec56e246703"},{url:"src/client/media/weather-icons/s02d.png",revision:"4445c1dee782450c83183091ece545e4"},{url:"src/client/media/weather-icons/s02n.png",revision:"4445c1dee782450c83183091ece545e4"},{url:"src/client/media/weather-icons/s03d.png",revision:"4445c1dee782450c83183091ece545e4"},{url:"src/client/media/weather-icons/s03n.png",revision:"4445c1dee782450c83183091ece545e4"},{url:"src/client/media/weather-icons/s04d.png",revision:"adf57aee773961e0093750518f0573a9"},{url:"src/client/media/weather-icons/s04n.png",revision:"7c5e9375d99b54defcb17ec56e246703"},{url:"src/client/media/weather-icons/s05d.png",revision:"d1a4a3475009e7c2b7a8ee8ee4dfa8c2"},{url:"src/client/media/weather-icons/s05n.png",revision:"d1a4a3475009e7c2b7a8ee8ee4dfa8c2"},{url:"src/client/media/weather-icons/s06d.png",revision:"9c82e68544657b2c2bbed1918a654747"},{url:"src/client/media/weather-icons/s06n.png",revision:"9c82e68544657b2c2bbed1918a654747"},{url:"src/client/media/weather-icons/t01d.png",revision:"32547a79e8469342782cb03652fe80f1"},{url:"src/client/media/weather-icons/t01n.png",revision:"3344fb6919bc40c030f8c2eb32bb1abc"},{url:"src/client/media/weather-icons/t02d.png",revision:"32547a79e8469342782cb03652fe80f1"},{url:"src/client/media/weather-icons/t02n.png",revision:"3344fb6919bc40c030f8c2eb32bb1abc"},{url:"src/client/media/weather-icons/t03d.png",revision:"32547a79e8469342782cb03652fe80f1"},{url:"src/client/media/weather-icons/t03n.png",revision:"3344fb6919bc40c030f8c2eb32bb1abc"},{url:"src/client/media/weather-icons/t04d.png",revision:"3a792b96d369a96b9baed3b12945f849"},{url:"src/client/media/weather-icons/t04n.png",revision:"4547d79eaf485245262e87203fee77bb"},{url:"src/client/media/weather-icons/t05d.png",revision:"3a792b96d369a96b9baed3b12945f849"},{url:"src/client/media/weather-icons/t05n.png",revision:"4547d79eaf485245262e87203fee77bb"},{url:"src/client/media/weather-icons/u00d.png",revision:"fe27c344277901aa5be6e95337439959"},{url:"src/client/media/weather-icons/u00n.png",revision:"fe27c344277901aa5be6e95337439959"}],{})}));
