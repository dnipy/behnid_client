if(!self.define){let e,s={};const a=(a,c)=>(a=new URL(a+".js",c).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(c,n)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let t={};const r=e=>a(e,i),d={module:{uri:i},exports:t,require:r};s[i]=Promise.all(c.map((e=>d[e]||r(e)))).then((e=>(n(...e),t)))}}define(["./workbox-588899ac"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/ATkEd53YFnrLrQCN8k4Ks/_buildManifest.js",revision:"a456a9b2465993f6c9e590a525e2efef"},{url:"/_next/static/ATkEd53YFnrLrQCN8k4Ks/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/1a48c3c1-d6f88178428399f9.js",revision:"d6f88178428399f9"},{url:"/_next/static/chunks/2150-c820cb8463ac5077.js",revision:"c820cb8463ac5077"},{url:"/_next/static/chunks/2892-743694bbb341cd14.js",revision:"743694bbb341cd14"},{url:"/_next/static/chunks/3424-0798341571361230.js",revision:"0798341571361230"},{url:"/_next/static/chunks/373-a0ffc0c2e37bee06.js",revision:"a0ffc0c2e37bee06"},{url:"/_next/static/chunks/4276-857e820ba1b6914c.js",revision:"857e820ba1b6914c"},{url:"/_next/static/chunks/4793-7440d4e4dd94d20b.js",revision:"7440d4e4dd94d20b"},{url:"/_next/static/chunks/48d448c8-ec1de02c3762732d.js",revision:"ec1de02c3762732d"},{url:"/_next/static/chunks/d7eeaac4-4adb91673a362713.js",revision:"4adb91673a362713"},{url:"/_next/static/chunks/framework-839af705687712fa.js",revision:"839af705687712fa"},{url:"/_next/static/chunks/main-17c76a0520930adc.js",revision:"17c76a0520930adc"},{url:"/_next/static/chunks/pages/404-4f9f0dec31907a07.js",revision:"4f9f0dec31907a07"},{url:"/_next/static/chunks/pages/500-0273ef639b617210.js",revision:"0273ef639b617210"},{url:"/_next/static/chunks/pages/_app-5ac5fd685c47cb19.js",revision:"5ac5fd685c47cb19"},{url:"/_next/static/chunks/pages/_error-98fcd42430fe93f3.js",revision:"98fcd42430fe93f3"},{url:"/_next/static/chunks/pages/auth/login-622c77c56cbd1ba1.js",revision:"622c77c56cbd1ba1"},{url:"/_next/static/chunks/pages/auth/logout-ed9cd1ac624ca3ff.js",revision:"ed9cd1ac624ca3ff"},{url:"/_next/static/chunks/pages/auth/register-57d6de3dd6e5dad7.js",revision:"57d6de3dd6e5dad7"},{url:"/_next/static/chunks/pages/auth/register-confirm-271057c136370d17.js",revision:"271057c136370d17"},{url:"/_next/static/chunks/pages/auth/reset-password-e0789bb7029cc6af.js",revision:"e0789bb7029cc6af"},{url:"/_next/static/chunks/pages/auth/set-profile-e995e0cb43eac9c2.js",revision:"e995e0cb43eac9c2"},{url:"/_next/static/chunks/pages/auth/set-profile-two-da123104531d1cc7.js",revision:"da123104531d1cc7"},{url:"/_next/static/chunks/pages/blog-976df45011631fa2.js",revision:"976df45011631fa2"},{url:"/_next/static/chunks/pages/blog/%5Bid%5D-3db8a5a5d6afbbae.js",revision:"3db8a5a5d6afbbae"},{url:"/_next/static/chunks/pages/chat-42fd151e056a2b9f.js",revision:"42fd151e056a2b9f"},{url:"/_next/static/chunks/pages/chat/%5Bid%5D-9e093de08b627f29.js",revision:"9e093de08b627f29"},{url:"/_next/static/chunks/pages/chat/my-contact-776f590e53b5548c.js",revision:"776f590e53b5548c"},{url:"/_next/static/chunks/pages/chat/new-chat-ef69eb425e69c2d8.js",revision:"ef69eb425e69c2d8"},{url:"/_next/static/chunks/pages/contact-us-4a20eb7fce224b9e.js",revision:"4a20eb7fce224b9e"},{url:"/_next/static/chunks/pages/index-1373eb7286df8d0e.js",revision:"1373eb7286df8d0e"},{url:"/_next/static/chunks/pages/products-2b15df11d077ad01.js",revision:"2b15df11d077ad01"},{url:"/_next/static/chunks/pages/products/%5Bid%5D-89625a34e066c508.js",revision:"89625a34e066c508"},{url:"/_next/static/chunks/pages/products/%5Bid%5D/reply-3b1b611d43f36b1f.js",revision:"3b1b611d43f36b1f"},{url:"/_next/static/chunks/pages/profile-d9152cac66c0f421.js",revision:"d9152cac66c0f421"},{url:"/_next/static/chunks/pages/profile/add-avatar-45f4ee07f4a171ab.js",revision:"45f4ee07f4a171ab"},{url:"/_next/static/chunks/pages/profile/add-contact-05e16844b9a6249a.js",revision:"05e16844b9a6249a"},{url:"/_next/static/chunks/pages/profile/add-free-request-249bdaa351f5b685.js",revision:"249bdaa351f5b685"},{url:"/_next/static/chunks/pages/profile/add-product-f24f0c9d2a5a0e4d.js",revision:"f24f0c9d2a5a0e4d"},{url:"/_next/static/chunks/pages/profile/add-product-images-4e3287c47efa58b4.js",revision:"4e3287c47efa58b4"},{url:"/_next/static/chunks/pages/profile/add-ticket-89ad7a84fedc2c68.js",revision:"89ad7a84fedc2c68"},{url:"/_next/static/chunks/pages/profile/all-products-e5f93ffa9ad86d17.js",revision:"e5f93ffa9ad86d17"},{url:"/_next/static/chunks/pages/profile/all-requests-67e20b799b08d4f5.js",revision:"67e20b799b08d4f5"},{url:"/_next/static/chunks/pages/profile/become-seller-c945f5303100c0f7.js",revision:"c945f5303100c0f7"},{url:"/_next/static/chunks/pages/profile/change-detaile-441a812ba2e53452.js",revision:"441a812ba2e53452"},{url:"/_next/static/chunks/pages/profile/change-detaile-uniqe-c81c858e996222bb.js",revision:"c81c858e996222bb"},{url:"/_next/static/chunks/pages/profile/change-free-requests-abf395323513b115.js",revision:"abf395323513b115"},{url:"/_next/static/chunks/pages/profile/change-password-a1047f18df723865.js",revision:"a1047f18df723865"},{url:"/_next/static/chunks/pages/profile/change-product-5e1eeed30c6696e9.js",revision:"5e1eeed30c6696e9"},{url:"/_next/static/chunks/pages/profile/legal-person-98989c76a5cce658.js",revision:"98989c76a5cce658"},{url:"/_next/static/chunks/pages/profile/natural-person-0d35361faf5a031d.js",revision:"0d35361faf5a031d"},{url:"/_next/static/chunks/pages/profile/single-product-0610c7cda84e1524.js",revision:"0610c7cda84e1524"},{url:"/_next/static/chunks/pages/requests-3b66a290494b83c2.js",revision:"3b66a290494b83c2"},{url:"/_next/static/chunks/pages/requests/%5Bid%5D-e1611acc2a8427cb.js",revision:"e1611acc2a8427cb"},{url:"/_next/static/chunks/pages/requests/%5Bid%5D/reply-b8179551e7ecb443.js",revision:"b8179551e7ecb443"},{url:"/_next/static/chunks/pages/search-ae3e0230cdbc1566.js",revision:"ae3e0230cdbc1566"},{url:"/_next/static/chunks/pages/sellers-80d3da357c4aa013.js",revision:"80d3da357c4aa013"},{url:"/_next/static/chunks/pages/sellers/%5Bid%5D-fb7c807c99197cc5.js",revision:"fb7c807c99197cc5"},{url:"/_next/static/chunks/pages/story/%5Bid%5D-d07d84e9aea8a531.js",revision:"d07d84e9aea8a531"},{url:"/_next/static/chunks/pages/users/%5Bid%5D-7d9bf93b3ad14b02.js",revision:"7d9bf93b3ad14b02"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-36d1d07f82c72767.js",revision:"36d1d07f82c72767"},{url:"/_next/static/css/869658586a6c9432.css",revision:"869658586a6c9432"},{url:"/_next/static/media/EventImage.418bdc94.jpg",revision:"11796562100231d3ffdf47f29471d126"},{url:"/_next/static/media/IndexImg.f4af4ed0.png",revision:"f0321fdd8d2860ec8155b465b2e8a67d"},{url:"/_next/static/media/NoImg.c27c83e1.png",revision:"f617ad7ddae874e7c8f4acc4fe0fdd0c"},{url:"/_next/static/media/icon.e0b6ee5c.png",revision:"1d9a515d627316e8643b64853dfd407f"},{url:"/_next/static/media/logo.fb63bfd5.png",revision:"6a36bad65d746a561183efc4151b9b2c"},{url:"/favicon-16x16.png",revision:"c4dc219584acda42ae644e57ebc01b5a"},{url:"/favicon-32x32.png",revision:"48d03fad94740eedf78725cca37c0c21"},{url:"/favicon.ico",revision:"fd7d0899a121c1674fa4ae2dac5841e7"},{url:"/icon-192x192.png",revision:"6b075cc81cb6a34a7f4bb6c15e0fb231"},{url:"/icon-256x256.png",revision:"5d425c48f71e20fba1cb434df1dccf85"},{url:"/icon-384x384.png",revision:"c83334a30d7529d05a07fb1ad24c9453"},{url:"/icon-512x512.png",revision:"ce4262ac09e32774cb6987be09778388"},{url:"/icon.png",revision:"1d9a515d627316e8643b64853dfd407f"},{url:"/manifest.webmanifest",revision:"1da9a65dac6ba668364409e2cc12e606"},{url:"/vercel.svg",revision:"4b4f1876502eb6721764637fe5c41702"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:c})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
