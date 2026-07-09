import"./modulepreload-polyfill-B5Qt9EMX.js";import{r as Y,_ as J,C as Z,k as ee,E as Oe,H as Rt,F as _e,L as Lt,d as Be,b as Ot,I as _t,J as Bt,K as ke,m as Dt,n as Nt,M as jt,t as qt,u as $t,z as zt,A as Vt,B as Ut,x as Ht,v as Gt}from"./html2canvas.esm-BPpbleYv.js";const De="@firebase/installations",he="0.6.9";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ne=1e4,je=`w:${he}`,qe="FIS_v2",Kt="https://firebaseinstallations.googleapis.com/v1",Wt=60*60*1e3,Yt="installations",Jt="Installations";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zt={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},q=new Oe(Yt,Jt,Zt);function $e(e){return e instanceof _e&&e.code.includes("request-failed")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ze({projectId:e}){return`${Kt}/projects/${e}/installations`}function Ve(e){return{token:e.token,requestStatus:2,expiresIn:Xt(e.expiresIn),creationTime:Date.now()}}async function Ue(e,t){const r=(await t.json()).error;return q.create("request-failed",{requestName:e,serverCode:r.code,serverMessage:r.message,serverStatus:r.status})}function He({apiKey:e}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e})}function Qt(e,{refreshToken:t}){const a=He(e);return a.append("Authorization",en(t)),a}async function Ge(e){const t=await e();return t.status>=500&&t.status<600?e():t}function Xt(e){return Number(e.replace("s","000"))}function en(e){return`${qe} ${e}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function tn({appConfig:e,heartbeatServiceProvider:t},{fid:a}){const r=ze(e),o=He(e),s=t.getImmediate({optional:!0});if(s){const w=await s.getHeartbeatsHeader();w&&o.append("x-firebase-client",w)}const c={fid:a,authVersion:qe,appId:e.appId,sdkVersion:je},l={method:"POST",headers:o,body:JSON.stringify(c)},h=await Ge(()=>fetch(r,l));if(h.ok){const w=await h.json();return{fid:w.fid||a,registrationStatus:2,refreshToken:w.refreshToken,authToken:Ve(w.authToken)}}else throw await Ue("Create Installation",h)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ke(e){return new Promise(t=>{setTimeout(t,e)})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nn(e){return btoa(String.fromCharCode(...e)).replace(/\+/g,"-").replace(/\//g,"_")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const an=/^[cdef][\w-]{21}$/,ue="";function rn(){try{const e=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(e),e[0]=112+e[0]%16;const a=on(e);return an.test(a)?a:ue}catch{return ue}}function on(e){return nn(e).substr(0,22)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function te(e){return`${e.appName}!${e.appId}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const We=new Map;function Ye(e,t){const a=te(e);Je(a,t),sn(a,t)}function Je(e,t){const a=We.get(e);if(a)for(const r of a)r(t)}function sn(e,t){const a=cn();a&&a.postMessage({key:e,fid:t}),ln()}let N=null;function cn(){return!N&&"BroadcastChannel"in self&&(N=new BroadcastChannel("[Firebase] FID Change"),N.onmessage=e=>{Je(e.data.key,e.data.fid)}),N}function ln(){We.size===0&&N&&(N.close(),N=null)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const un="firebase-installations-database",dn=1,$="firebase-installations-store";let oe=null;function fe(){return oe||(oe=Rt(un,dn,{upgrade:(e,t)=>{switch(t){case 0:e.createObjectStore($)}}})),oe}async function Q(e,t){const a=te(e),o=(await fe()).transaction($,"readwrite"),s=o.objectStore($),c=await s.get(a);return await s.put(t,a),await o.done,(!c||c.fid!==t.fid)&&Ye(e,t.fid),t}async function Ze(e){const t=te(e),r=(await fe()).transaction($,"readwrite");await r.objectStore($).delete(t),await r.done}async function ne(e,t){const a=te(e),o=(await fe()).transaction($,"readwrite"),s=o.objectStore($),c=await s.get(a),l=t(c);return l===void 0?await s.delete(a):await s.put(l,a),await o.done,l&&(!c||c.fid!==l.fid)&&Ye(e,l.fid),l}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function me(e){let t;const a=await ne(e.appConfig,r=>{const o=hn(r),s=fn(e,o);return t=s.registrationPromise,s.installationEntry});return a.fid===ue?{installationEntry:await t}:{installationEntry:a,registrationPromise:t}}function hn(e){const t=e||{fid:rn(),registrationStatus:0};return Qe(t)}function fn(e,t){if(t.registrationStatus===0){if(!navigator.onLine){const o=Promise.reject(q.create("app-offline"));return{installationEntry:t,registrationPromise:o}}const a={fid:t.fid,registrationStatus:1,registrationTime:Date.now()},r=mn(e,a);return{installationEntry:a,registrationPromise:r}}else return t.registrationStatus===1?{installationEntry:t,registrationPromise:gn(e)}:{installationEntry:t}}async function mn(e,t){try{const a=await tn(e,t);return Q(e.appConfig,a)}catch(a){throw $e(a)&&a.customData.serverCode===409?await Ze(e.appConfig):await Q(e.appConfig,{fid:t.fid,registrationStatus:0}),a}}async function gn(e){let t=await Ae(e.appConfig);for(;t.registrationStatus===1;)await Ke(100),t=await Ae(e.appConfig);if(t.registrationStatus===0){const{installationEntry:a,registrationPromise:r}=await me(e);return r||a}return t}function Ae(e){return ne(e,t=>{if(!t)throw q.create("installation-not-found");return Qe(t)})}function Qe(e){return pn(e)?{fid:e.fid,registrationStatus:0}:e}function pn(e){return e.registrationStatus===1&&e.registrationTime+Ne<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function yn({appConfig:e,heartbeatServiceProvider:t},a){const r=vn(e,a),o=Qt(e,a),s=t.getImmediate({optional:!0});if(s){const w=await s.getHeartbeatsHeader();w&&o.append("x-firebase-client",w)}const c={installation:{sdkVersion:je,appId:e.appId}},l={method:"POST",headers:o,body:JSON.stringify(c)},h=await Ge(()=>fetch(r,l));if(h.ok){const w=await h.json();return Ve(w)}else throw await Ue("Generate Auth Token",h)}function vn(e,{fid:t}){return`${ze(e)}/${t}/authTokens:generate`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ge(e,t=!1){let a;const r=await ne(e.appConfig,s=>{if(!Xe(s))throw q.create("not-registered");const c=s.authToken;if(!t&&In(c))return s;if(c.requestStatus===1)return a=wn(e,t),s;{if(!navigator.onLine)throw q.create("app-offline");const l=Mn(s);return a=bn(e,l),l}});return a?await a:r.authToken}async function wn(e,t){let a=await Ce(e.appConfig);for(;a.authToken.requestStatus===1;)await Ke(100),a=await Ce(e.appConfig);const r=a.authToken;return r.requestStatus===0?ge(e,t):r}function Ce(e){return ne(e,t=>{if(!Xe(t))throw q.create("not-registered");const a=t.authToken;return kn(a)?Object.assign(Object.assign({},t),{authToken:{requestStatus:0}}):t})}async function bn(e,t){try{const a=await yn(e,t),r=Object.assign(Object.assign({},t),{authToken:a});return await Q(e.appConfig,r),a}catch(a){if($e(a)&&(a.customData.serverCode===401||a.customData.serverCode===404))await Ze(e.appConfig);else{const r=Object.assign(Object.assign({},t),{authToken:{requestStatus:0}});await Q(e.appConfig,r)}throw a}}function Xe(e){return e!==void 0&&e.registrationStatus===2}function In(e){return e.requestStatus===2&&!Tn(e)}function Tn(e){const t=Date.now();return t<e.creationTime||e.creationTime+e.expiresIn<t+Wt}function Mn(e){const t={requestStatus:1,requestTime:Date.now()};return Object.assign(Object.assign({},e),{authToken:t})}function kn(e){return e.requestStatus===1&&e.requestTime+Ne<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function An(e){const t=e,{installationEntry:a,registrationPromise:r}=await me(t);return r?r.catch(console.error):ge(t).catch(console.error),a.fid}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Cn(e,t=!1){const a=e;return await En(a),(await ge(a,t)).token}async function En(e){const{registrationPromise:t}=await me(e);t&&await t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xn(e){if(!e||!e.options)throw se("App Configuration");if(!e.name)throw se("App Name");const t=["projectId","apiKey","appId"];for(const a of t)if(!e.options[a])throw se(a);return{appName:e.name,projectId:e.options.projectId,apiKey:e.options.apiKey,appId:e.options.appId}}function se(e){return q.create("missing-app-config-values",{valueName:e})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const et="installations",Sn="installations-internal",Pn=e=>{const t=e.getProvider("app").getImmediate(),a=xn(t),r=ee(t,"heartbeat");return{app:t,appConfig:a,heartbeatServiceProvider:r,_delete:()=>Promise.resolve()}},Fn=e=>{const t=e.getProvider("app").getImmediate(),a=ee(t,et).getImmediate();return{getId:()=>An(a),getToken:o=>Cn(a,o)}};function Rn(){J(new Z(et,Pn,"PUBLIC")),J(new Z(Sn,Fn,"PRIVATE"))}Rn();Y(De,he);Y(De,he,"esm2017");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const X="analytics",Ln="firebase_id",On="origin",_n=60*1e3,Bn="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig",pe="https://www.googletagmanager.com/gtag/js";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const S=new Lt("@firebase/analytics");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dn={"already-exists":"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.","already-initialized":"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-initialized instance.","already-initialized-settings":"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.","interop-component-reg-failed":"Firebase Analytics Interop Component failed to instantiate: {$reason}","invalid-analytics-context":"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","indexeddb-unavailable":"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","fetch-throttle":"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.","config-fetch-failed":"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}","no-api-key":'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',"no-app-id":'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',"no-client-id":'The "client_id" field is empty.',"invalid-gtag-resource":"Trusted Types detected an invalid gtag resource: {$gtagURL}."},P=new Oe("analytics","Analytics",Dn);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Nn(e){if(!e.startsWith(pe)){const t=P.create("invalid-gtag-resource",{gtagURL:e});return S.warn(t.message),""}return e}function tt(e){return Promise.all(e.map(t=>t.catch(a=>a)))}function jn(e,t){let a;return window.trustedTypes&&(a=window.trustedTypes.createPolicy(e,t)),a}function qn(e,t){const a=jn("firebase-js-sdk-policy",{createScriptURL:Nn}),r=document.createElement("script"),o=`${pe}?l=${e}&id=${t}`;r.src=a?a==null?void 0:a.createScriptURL(o):o,r.async=!0,document.head.appendChild(r)}function $n(e){let t=[];return Array.isArray(window[e])?t=window[e]:window[e]=t,t}async function zn(e,t,a,r,o,s){const c=r[o];try{if(c)await t[c];else{const h=(await tt(a)).find(w=>w.measurementId===o);h&&await t[h.appId]}}catch(l){S.error(l)}e("config",o,s)}async function Vn(e,t,a,r,o){try{let s=[];if(o&&o.send_to){let c=o.send_to;Array.isArray(c)||(c=[c]);const l=await tt(a);for(const h of c){const w=l.find(F=>F.measurementId===h),E=w&&t[w.appId];if(E)s.push(E);else{s=[];break}}}s.length===0&&(s=Object.values(t)),await Promise.all(s),e("event",r,o||{})}catch(s){S.error(s)}}function Un(e,t,a,r){async function o(s,...c){try{if(s==="event"){const[l,h]=c;await Vn(e,t,a,l,h)}else if(s==="config"){const[l,h]=c;await zn(e,t,a,r,l,h)}else if(s==="consent"){const[l,h]=c;e("consent",l,h)}else if(s==="get"){const[l,h,w]=c;e("get",l,h,w)}else if(s==="set"){const[l]=c;e("set",l)}else e(s,...c)}catch(l){S.error(l)}}return o}function Hn(e,t,a,r,o){let s=function(...c){window[r].push(arguments)};return window[o]&&typeof window[o]=="function"&&(s=window[o]),window[o]=Un(s,e,t,a),{gtagCore:s,wrappedGtag:window[o]}}function Gn(e){const t=window.document.getElementsByTagName("script");for(const a of Object.values(t))if(a.src&&a.src.includes(pe)&&a.src.includes(e))return a;return null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kn=30,Wn=1e3;class Yn{constructor(t={},a=Wn){this.throttleMetadata=t,this.intervalMillis=a}getThrottleMetadata(t){return this.throttleMetadata[t]}setThrottleMetadata(t,a){this.throttleMetadata[t]=a}deleteThrottleMetadata(t){delete this.throttleMetadata[t]}}const nt=new Yn;function Jn(e){return new Headers({Accept:"application/json","x-goog-api-key":e})}async function Zn(e){var t;const{appId:a,apiKey:r}=e,o={method:"GET",headers:Jn(r)},s=Bn.replace("{app-id}",a),c=await fetch(s,o);if(c.status!==200&&c.status!==304){let l="";try{const h=await c.json();!((t=h.error)===null||t===void 0)&&t.message&&(l=h.error.message)}catch{}throw P.create("config-fetch-failed",{httpStatus:c.status,responseMessage:l})}return c.json()}async function Qn(e,t=nt,a){const{appId:r,apiKey:o,measurementId:s}=e.options;if(!r)throw P.create("no-app-id");if(!o){if(s)return{measurementId:s,appId:r};throw P.create("no-api-key")}const c=t.getThrottleMetadata(r)||{backoffCount:0,throttleEndTimeMillis:Date.now()},l=new ta;return setTimeout(async()=>{l.abort()},_n),at({appId:r,apiKey:o,measurementId:s},c,l,t)}async function at(e,{throttleEndTimeMillis:t,backoffCount:a},r,o=nt){var s;const{appId:c,measurementId:l}=e;try{await Xn(r,t)}catch(h){if(l)return S.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${l} provided in the "measurementId" field in the local Firebase config. [${h==null?void 0:h.message}]`),{appId:c,measurementId:l};throw h}try{const h=await Zn(e);return o.deleteThrottleMetadata(c),h}catch(h){const w=h;if(!ea(w)){if(o.deleteThrottleMetadata(c),l)return S.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${l} provided in the "measurementId" field in the local Firebase config. [${w==null?void 0:w.message}]`),{appId:c,measurementId:l};throw h}const E=Number((s=w==null?void 0:w.customData)===null||s===void 0?void 0:s.httpStatus)===503?ke(a,o.intervalMillis,Kn):ke(a,o.intervalMillis),F={throttleEndTimeMillis:Date.now()+E,backoffCount:a+1};return o.setThrottleMetadata(c,F),S.debug(`Calling attemptFetch again in ${E} millis`),at(e,F,r,o)}}function Xn(e,t){return new Promise((a,r)=>{const o=Math.max(t-Date.now(),0),s=setTimeout(a,o);e.addEventListener(()=>{clearTimeout(s),r(P.create("fetch-throttle",{throttleEndTimeMillis:t}))})})}function ea(e){if(!(e instanceof _e)||!e.customData)return!1;const t=Number(e.customData.httpStatus);return t===429||t===500||t===503||t===504}class ta{constructor(){this.listeners=[]}addEventListener(t){this.listeners.push(t)}abort(){this.listeners.forEach(t=>t())}}async function na(e,t,a,r,o){if(o&&o.global){e("event",a,r);return}else{const s=await t,c=Object.assign(Object.assign({},r),{send_to:s});e("event",a,c)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function aa(){if(_t())try{await Bt()}catch(e){return S.warn(P.create("indexeddb-unavailable",{errorInfo:e==null?void 0:e.toString()}).message),!1}else return S.warn(P.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;return!0}async function ia(e,t,a,r,o,s,c){var l;const h=Qn(e);h.then(O=>{a[O.measurementId]=O.appId,e.options.measurementId&&O.measurementId!==e.options.measurementId&&S.warn(`The measurement ID in the local Firebase config (${e.options.measurementId}) does not match the measurement ID fetched from the server (${O.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)}).catch(O=>S.error(O)),t.push(h);const w=aa().then(O=>{if(O)return r.getId()}),[E,F]=await Promise.all([h,w]);Gn(s)||qn(s,E.measurementId),o("js",new Date);const z=(l=c==null?void 0:c.config)!==null&&l!==void 0?l:{};return z[On]="firebase",z.update=!0,F!=null&&(z[Ln]=F),o("config",E.measurementId,z),E.measurementId}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ra{constructor(t){this.app=t}_delete(){return delete H[this.app.options.appId],Promise.resolve()}}let H={},Ee=[];const xe={};let ce="dataLayer",oa="gtag",Se,it,Pe=!1;function sa(){const e=[];if(Ot()&&e.push("This is a browser extension environment."),jt()||e.push("Cookies are not available."),e.length>0){const t=e.map((r,o)=>`(${o+1}) ${r}`).join(" "),a=P.create("invalid-analytics-context",{errorInfo:t});S.warn(a.message)}}function ca(e,t,a){sa();const r=e.options.appId;if(!r)throw P.create("no-app-id");if(!e.options.apiKey)if(e.options.measurementId)S.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${e.options.measurementId} provided in the "measurementId" field in the local Firebase config.`);else throw P.create("no-api-key");if(H[r]!=null)throw P.create("already-exists",{id:r});if(!Pe){$n(ce);const{wrappedGtag:s,gtagCore:c}=Hn(H,Ee,xe,ce,oa);it=s,Se=c,Pe=!0}return H[r]=ia(e,Ee,xe,t,Se,ce,a),new ra(e)}function la(e=Dt()){e=Be(e);const t=ee(e,X);return t.isInitialized()?t.getImmediate():ua(e)}function ua(e,t={}){const a=ee(e,X);if(a.isInitialized()){const o=a.getImmediate();if(Nt(t,a.getOptions()))return o;throw P.create("already-initialized")}return a.initialize({options:t})}function da(e,t,a,r){e=Be(e),na(it,H[e.app.options.appId],t,a,r).catch(o=>S.error(o))}const Fe="@firebase/analytics",Re="0.10.8";function ha(){J(new Z(X,(t,{options:a})=>{const r=t.getProvider("app").getImmediate(),o=t.getProvider("installations-internal").getImmediate();return ca(r,o,a)},"PUBLIC")),J(new Z("analytics-internal",e,"PRIVATE")),Y(Fe,Re),Y(Fe,Re,"esm2017");function e(t){try{const a=t.getProvider(X).getImmediate();return{logEvent:(r,o,s)=>da(a,r,o,s)}}catch(a){throw P.create("interop-component-reg-failed",{reason:a})}}}ha();var ye={};(function e(t,a,r,o){var s=!!(t.Worker&&t.Blob&&t.Promise&&t.OffscreenCanvas&&t.OffscreenCanvasRenderingContext2D&&t.HTMLCanvasElement&&t.HTMLCanvasElement.prototype.transferControlToOffscreen&&t.URL&&t.URL.createObjectURL),c=typeof Path2D=="function"&&typeof DOMMatrix=="function",l=function(){if(!t.OffscreenCanvas)return!1;try{var i=new OffscreenCanvas(1,1),n=i.getContext("2d");n.fillRect(0,0,1,1);var u=i.transferToImageBitmap();n.createPattern(u,"no-repeat")}catch{return!1}return!0}();function h(){}function w(i){var n=a.exports.Promise,u=n!==void 0?n:t.Promise;return typeof u=="function"?new u(i):(i(h,h),null)}var E=function(i,n){return{transform:function(u){if(i)return u;if(n.has(u))return n.get(u);var f=new OffscreenCanvas(u.width,u.height),m=f.getContext("2d");return m.drawImage(u,0,0),n.set(u,f),f},clear:function(){n.clear()}}}(l,new Map),F=function(){var i=Math.floor(16.666666666666668),n,u,f={},m=0;return typeof requestAnimationFrame=="function"&&typeof cancelAnimationFrame=="function"?(n=function(g){var p=Math.random();return f[p]=requestAnimationFrame(function d(y){m===y||m+i-1<y?(m=y,delete f[p],g()):f[p]=requestAnimationFrame(d)}),p},u=function(g){f[g]&&cancelAnimationFrame(f[g])}):(n=function(g){return setTimeout(g,i)},u=function(g){return clearTimeout(g)}),{frame:n,cancel:u}}(),z=function(){var i,n,u={};function f(m){function g(p,d){m.postMessage({options:p||{},callback:d})}m.init=function(d){var y=d.transferControlToOffscreen();m.postMessage({canvas:y},[y])},m.fire=function(d,y,b){if(n)return g(d,null),n;var T=Math.random().toString(36).slice(2);return n=w(function(I){function M(A){A.data.callback===T&&(delete u[T],m.removeEventListener("message",M),n=null,E.clear(),b(),I())}m.addEventListener("message",M),g(d,T),u[T]=M.bind(null,{data:{callback:T}})}),n},m.reset=function(){m.postMessage({reset:!0});for(var d in u)u[d](),delete u[d]}}return function(){if(i)return i;if(!r&&s){var m=["var CONFETTI, SIZE = {}, module = {};","("+e.toString()+")(this, module, true, SIZE);","onmessage = function(msg) {","  if (msg.data.options) {","    CONFETTI(msg.data.options).then(function () {","      if (msg.data.callback) {","        postMessage({ callback: msg.data.callback });","      }","    });","  } else if (msg.data.reset) {","    CONFETTI && CONFETTI.reset();","  } else if (msg.data.resize) {","    SIZE.width = msg.data.resize.width;","    SIZE.height = msg.data.resize.height;","  } else if (msg.data.canvas) {","    SIZE.width = msg.data.canvas.width;","    SIZE.height = msg.data.canvas.height;","    CONFETTI = module.exports.create(msg.data.canvas);","  }","}"].join(`
`);try{i=new Worker(URL.createObjectURL(new Blob([m])))}catch(g){return typeof console<"u"&&typeof console.warn=="function"&&console.warn("🎊 Could not load worker",g),null}f(i)}return i}}(),O={particleCount:50,angle:90,spread:45,startVelocity:45,decay:.9,gravity:1,drift:0,ticks:200,x:.5,y:.5,shapes:["square","circle"],zIndex:100,colors:["#26ccff","#a25afd","#ff5e7e","#88ff5a","#fcff42","#ffa62d","#ff36ff"],disableForReducedMotion:!1,scalar:1};function st(i,n){return n?n(i):i}function ct(i){return i!=null}function k(i,n,u){return st(i&&ct(i[n])?i[n]:O[n],u)}function lt(i){return i<0?0:Math.floor(i)}function ut(i,n){return Math.floor(Math.random()*(n-i))+i}function ae(i){return parseInt(i,16)}function dt(i){return i.map(ht)}function ht(i){var n=String(i).replace(/[^0-9a-f]/gi,"");return n.length<6&&(n=n[0]+n[0]+n[1]+n[1]+n[2]+n[2]),{r:ae(n.substring(0,2)),g:ae(n.substring(2,4)),b:ae(n.substring(4,6))}}function ft(i){var n=k(i,"origin",Object);return n.x=k(n,"x",Number),n.y=k(n,"y",Number),n}function mt(i){i.width=document.documentElement.clientWidth,i.height=document.documentElement.clientHeight}function gt(i){var n=i.getBoundingClientRect();i.width=n.width,i.height=n.height}function pt(i){var n=document.createElement("canvas");return n.style.position="fixed",n.style.top="0px",n.style.left="0px",n.style.pointerEvents="none",n.style.zIndex=i,n}function yt(i,n,u,f,m,g,p,d,y){i.save(),i.translate(n,u),i.rotate(g),i.scale(f,m),i.arc(0,0,1,p,d,y),i.restore()}function vt(i){var n=i.angle*(Math.PI/180),u=i.spread*(Math.PI/180);return{x:i.x,y:i.y,wobble:Math.random()*10,wobbleSpeed:Math.min(.11,Math.random()*.1+.05),velocity:i.startVelocity*.5+Math.random()*i.startVelocity,angle2D:-n+(.5*u-Math.random()*u),tiltAngle:(Math.random()*(.75-.25)+.25)*Math.PI,color:i.color,shape:i.shape,tick:0,totalTicks:i.ticks,decay:i.decay,drift:i.drift,random:Math.random()+2,tiltSin:0,tiltCos:0,wobbleX:0,wobbleY:0,gravity:i.gravity*3,ovalScalar:.6,scalar:i.scalar,flat:i.flat}}function wt(i,n){n.x+=Math.cos(n.angle2D)*n.velocity+n.drift,n.y+=Math.sin(n.angle2D)*n.velocity+n.gravity,n.velocity*=n.decay,n.flat?(n.wobble=0,n.wobbleX=n.x+10*n.scalar,n.wobbleY=n.y+10*n.scalar,n.tiltSin=0,n.tiltCos=0,n.random=1):(n.wobble+=n.wobbleSpeed,n.wobbleX=n.x+10*n.scalar*Math.cos(n.wobble),n.wobbleY=n.y+10*n.scalar*Math.sin(n.wobble),n.tiltAngle+=.1,n.tiltSin=Math.sin(n.tiltAngle),n.tiltCos=Math.cos(n.tiltAngle),n.random=Math.random()+2);var u=n.tick++/n.totalTicks,f=n.x+n.random*n.tiltCos,m=n.y+n.random*n.tiltSin,g=n.wobbleX+n.random*n.tiltCos,p=n.wobbleY+n.random*n.tiltSin;if(i.fillStyle="rgba("+n.color.r+", "+n.color.g+", "+n.color.b+", "+(1-u)+")",i.beginPath(),c&&n.shape.type==="path"&&typeof n.shape.path=="string"&&Array.isArray(n.shape.matrix))i.fill(It(n.shape.path,n.shape.matrix,n.x,n.y,Math.abs(g-f)*.1,Math.abs(p-m)*.1,Math.PI/10*n.wobble));else if(n.shape.type==="bitmap"){var d=Math.PI/10*n.wobble,y=Math.abs(g-f)*.1,b=Math.abs(p-m)*.1,T=n.shape.bitmap.width*n.scalar,I=n.shape.bitmap.height*n.scalar,M=new DOMMatrix([Math.cos(d)*y,Math.sin(d)*y,-Math.sin(d)*b,Math.cos(d)*b,n.x,n.y]);M.multiplySelf(new DOMMatrix(n.shape.matrix));var A=i.createPattern(E.transform(n.shape.bitmap),"no-repeat");A.setTransform(M),i.globalAlpha=1-u,i.fillStyle=A,i.fillRect(n.x-T/2,n.y-I/2,T,I),i.globalAlpha=1}else if(n.shape==="circle")i.ellipse?i.ellipse(n.x,n.y,Math.abs(g-f)*n.ovalScalar,Math.abs(p-m)*n.ovalScalar,Math.PI/10*n.wobble,0,2*Math.PI):yt(i,n.x,n.y,Math.abs(g-f)*n.ovalScalar,Math.abs(p-m)*n.ovalScalar,Math.PI/10*n.wobble,0,2*Math.PI);else if(n.shape==="star")for(var v=Math.PI/2*3,x=4*n.scalar,R=8*n.scalar,L=n.x,B=n.y,D=5,_=Math.PI/D;D--;)L=n.x+Math.cos(v)*R,B=n.y+Math.sin(v)*R,i.lineTo(L,B),v+=_,L=n.x+Math.cos(v)*x,B=n.y+Math.sin(v)*x,i.lineTo(L,B),v+=_;else i.moveTo(Math.floor(n.x),Math.floor(n.y)),i.lineTo(Math.floor(n.wobbleX),Math.floor(m)),i.lineTo(Math.floor(g),Math.floor(p)),i.lineTo(Math.floor(f),Math.floor(n.wobbleY));return i.closePath(),i.fill(),n.tick<n.totalTicks}function bt(i,n,u,f,m){var g=n.slice(),p=i.getContext("2d"),d,y,b=w(function(T){function I(){d=y=null,p.clearRect(0,0,f.width,f.height),E.clear(),m(),T()}function M(){r&&!(f.width===o.width&&f.height===o.height)&&(f.width=i.width=o.width,f.height=i.height=o.height),!f.width&&!f.height&&(u(i),f.width=i.width,f.height=i.height),p.clearRect(0,0,f.width,f.height),g=g.filter(function(A){return wt(p,A)}),g.length?d=F.frame(M):I()}d=F.frame(M),y=I});return{addFettis:function(T){return g=g.concat(T),b},canvas:i,promise:b,reset:function(){d&&F.cancel(d),y&&y()}}}function ve(i,n){var u=!i,f=!!k(n||{},"resize"),m=!1,g=k(n,"disableForReducedMotion",Boolean),p=s&&!!k(n||{},"useWorker"),d=p?z():null,y=u?mt:gt,b=i&&d?!!i.__confetti_initialized:!1,T=typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion)").matches,I;function M(v,x,R){for(var L=k(v,"particleCount",lt),B=k(v,"angle",Number),D=k(v,"spread",Number),_=k(v,"startVelocity",Number),kt=k(v,"decay",Number),At=k(v,"gravity",Number),Ct=k(v,"drift",Number),be=k(v,"colors",dt),Et=k(v,"ticks",Number),Ie=k(v,"shapes"),xt=k(v,"scalar"),St=!!k(v,"flat"),Te=ft(v),Me=L,re=[],Pt=i.width*Te.x,Ft=i.height*Te.y;Me--;)re.push(vt({x:Pt,y:Ft,angle:B,spread:D,startVelocity:_,color:be[Me%be.length],shape:Ie[ut(0,Ie.length)],ticks:Et,decay:kt,gravity:At,drift:Ct,scalar:xt,flat:St}));return I?I.addFettis(re):(I=bt(i,re,y,x,R),I.promise)}function A(v){var x=g||k(v,"disableForReducedMotion",Boolean),R=k(v,"zIndex",Number);if(x&&T)return w(function(_){_()});u&&I?i=I.canvas:u&&!i&&(i=pt(R),document.body.appendChild(i)),f&&!b&&y(i);var L={width:i.width,height:i.height};d&&!b&&d.init(i),b=!0,d&&(i.__confetti_initialized=!0);function B(){if(d){var _={getBoundingClientRect:function(){if(!u)return i.getBoundingClientRect()}};y(_),d.postMessage({resize:{width:_.width,height:_.height}});return}L.width=L.height=null}function D(){I=null,f&&(m=!1,t.removeEventListener("resize",B)),u&&i&&(document.body.contains(i)&&document.body.removeChild(i),i=null,b=!1)}return f&&!m&&(m=!0,t.addEventListener("resize",B,!1)),d?d.fire(v,L,D):M(v,L,D)}return A.reset=function(){d&&d.reset(),I&&I.reset()},A}var ie;function we(){return ie||(ie=ve(null,{useWorker:!0,resize:!0})),ie}function It(i,n,u,f,m,g,p){var d=new Path2D(i),y=new Path2D;y.addPath(d,new DOMMatrix(n));var b=new Path2D;return b.addPath(y,new DOMMatrix([Math.cos(p)*m,Math.sin(p)*m,-Math.sin(p)*g,Math.cos(p)*g,u,f])),b}function Tt(i){if(!c)throw new Error("path confetti are not supported in this browser");var n,u;typeof i=="string"?n=i:(n=i.path,u=i.matrix);var f=new Path2D(n),m=document.createElement("canvas"),g=m.getContext("2d");if(!u){for(var p=1e3,d=p,y=p,b=0,T=0,I,M,A=0;A<p;A+=2)for(var v=0;v<p;v+=2)g.isPointInPath(f,A,v,"nonzero")&&(d=Math.min(d,A),y=Math.min(y,v),b=Math.max(b,A),T=Math.max(T,v));I=b-d,M=T-y;var x=10,R=Math.min(x/I,x/M);u=[R,0,0,R,-Math.round(I/2+d)*R,-Math.round(M/2+y)*R]}return{type:"path",path:n,matrix:u}}function Mt(i){var n,u=1,f="#000000",m='"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "EmojiOne Color", "Android Emoji", "Twemoji Mozilla", "system emoji", sans-serif';typeof i=="string"?n=i:(n=i.text,u="scalar"in i?i.scalar:u,m="fontFamily"in i?i.fontFamily:m,f="color"in i?i.color:f);var g=10*u,p=""+g+"px "+m,d=new OffscreenCanvas(g,g),y=d.getContext("2d");y.font=p;var b=y.measureText(n),T=Math.ceil(b.actualBoundingBoxRight+b.actualBoundingBoxLeft),I=Math.ceil(b.actualBoundingBoxAscent+b.actualBoundingBoxDescent),M=2,A=b.actualBoundingBoxLeft+M,v=b.actualBoundingBoxAscent+M;T+=M+M,I+=M+M,d=new OffscreenCanvas(T,I),y=d.getContext("2d"),y.font=p,y.fillStyle=f,y.fillText(n,A,v);var x=1/u;return{type:"bitmap",bitmap:d.transferToImageBitmap(),matrix:[x,0,0,x,-T*x/2,-I*x/2]}}a.exports=function(){return we().apply(this,arguments)},a.exports.reset=function(){we().reset()},a.exports.create=ve,a.exports.shapeFromPath=Tt,a.exports.shapeFromText=Mt})(function(){return typeof window<"u"?window:typeof self<"u"?self:this||{}}(),ye,!1);const de=ye.exports;ye.exports.create;const fa={apiKey:"AIzaSyA_r_AmcyIQvPZILXPlG1cOUX8hwuVFLFk",authDomain:"graduinvitation.firebaseapp.com",projectId:"graduinvitation",storageBucket:"graduinvitation.firebasestorage.app",messagingSenderId:"751745147382",appId:"1:751745147382:web:a295ef879b93a299c3e7d7",measurementId:"G-2ZJ4LKCQYV"},rt=qt(fa),Le=$t(rt);try{la(rt)}catch(e){console.warn("Firebase Analytics could not be initialized:",e)}const ma=new Date("Jul 24, 2026 07:30:00").getTime();function ot(){const e=new Date().getTime(),t=ma-e,a=Math.floor(t/(1e3*60*60*24)),r=Math.floor(t%(1e3*60*60*24)/(1e3*60*60)),o=Math.floor(t%(1e3*60*60)/(1e3*60)),s=Math.floor(t%(1e3*60)/1e3);let c="";t<0?(c='<div class="text-2xl font-serif text-brand-secondary font-bold pulse-slow">Lễ Tốt Nghiệp Đang Diễn Ra!</div>',clearInterval(ga)):c=`
            <div class="flex flex-col items-center">
                <div class="w-16 h-16 sm:w-20 sm:h-20 bg-brand-primary rounded-xl flex items-center justify-center text-white text-2xl sm:text-3xl font-bold font-serif shadow-md mb-2">
                    ${a}
                </div>
                <span class="text-xs sm:text-sm uppercase font-semibold text-gray-500">Ngày</span>
            </div>
            <div class="flex flex-col items-center">
                <div class="w-16 h-16 sm:w-20 sm:h-20 bg-brand-primary rounded-xl flex items-center justify-center text-white text-2xl sm:text-3xl font-bold font-serif shadow-md mb-2">
                    ${r.toString().padStart(2,"0")}
                </div>
                <span class="text-xs sm:text-sm uppercase font-semibold text-gray-500">Giờ</span>
            </div>
            <div class="flex flex-col items-center">
                <div class="w-16 h-16 sm:w-20 sm:h-20 bg-brand-primary rounded-xl flex items-center justify-center text-white text-2xl sm:text-3xl font-bold font-serif shadow-md mb-2">
                    ${o.toString().padStart(2,"0")}
                </div>
                <span class="text-xs sm:text-sm uppercase font-semibold text-gray-500">Phút</span>
            </div>
            <div class="flex flex-col items-center">
                <div class="w-16 h-16 sm:w-20 sm:h-20 bg-brand-primary rounded-xl flex items-center justify-center text-white text-2xl sm:text-3xl font-bold font-serif shadow-md mb-2">
                    ${s.toString().padStart(2,"0")}
                </div>
                <span class="text-xs sm:text-sm uppercase font-semibold text-gray-500">Giây</span>
            </div>
        `;const l=document.getElementById("countdown");l&&(l.innerHTML=c)}ot();const ga=setInterval(ot,1e3);function pa(){const t=Date.now()+3e3,a={startVelocity:30,spread:360,ticks:60,zIndex:100};function r(s,c){return Math.random()*(c-s)+s}const o=setInterval(function(){const s=t-Date.now();if(s<=0)return clearInterval(o);const c=50*(s/3e3);de(Object.assign({},a,{particleCount:c,origin:{x:r(.1,.3),y:Math.random()-.2},colors:["#1a365d","#c5a059","#ffffff"]})),de(Object.assign({},a,{particleCount:c,origin:{x:r(.7,.9),y:Math.random()-.2},colors:["#1a365d","#c5a059","#ffffff"]}))},250)}setTimeout(()=>{de({particleCount:100,spread:70,origin:{y:.6},colors:["#1a365d","#c5a059"]})},1500);const U={a309:{name:"Anh em Phòng A309 (Hiện tại)",title:"Thân gửi {name} - Phòng A309,",titleFallback:"Gửi Anh Em Phòng Ký Túc Xá A309,",message:`"Bốn năm đại học trôi qua nhanh như một cái chớp mắt, và cuối cùng thì ngày này cũng đến.<br class="hidden sm:block"> Cảm ơn anh em đã cùng ăn, cùng ngủ, cùng 'cày' game và 'gánh' tui qua những kỳ thi sinh tử.<br class="hidden sm:block"> Đến chung vui cùng tui trong ngày trọng đại này nhé! Sự hiện diện của anh em là món quà tuyệt vời nhất."`},cuua309:{name:"Cựu thành viên Phòng A309",title:"Thân gửi {name} - Cựu Thành Viên A309,",titleFallback:"Gửi Anh Em Cựu Thành Viên Phòng A309,",message:'"Dù đã ra phòng và mỗi đứa một phương trời, nhưng những kỷ niệm thời ở chung phòng A309 vẫn là những năm tháng rực rỡ nhất.<br class="hidden sm:block"> Cảm ơn anh đã đồng hành cùng em. Đến chung vui cùng em trong ngày tốt nghiệp nhé!."'},giadinh:{name:"Gia đình ruột thịt",title:"Kính gửi {name},",titleFallback:"Kính gửi Bố Mẹ & Gia đình,",message:'"Con xin bày tỏ lòng biết ơn sâu sắc nhất đến bố mẹ và gia đình, những người đã luôn chăm sóc, dìu dắt và là điểm tựa vững chắc nhất của con suốt chặng đường học tập vừa qua.<br class="hidden sm:block"> Sự hiện diện của gia đình trong ngày tốt nghiệp là niềm hạnh phúc lớn lao nhất của con."'},dongho:{name:"Họ hàng / Dòng họ",title:"Kính gửi {name},",titleFallback:"Kính gửi Họ Hàng & Dòng Họ,",message:'"Con/cháu xin gửi lời cảm ơn chân thành nhất đến cô dì, chú bác và họ hàng đã luôn động viên, quan tâm và ủng hộ con/cháu trong suốt những năm tháng đi học.<br class="hidden sm:block"> Trân trọng kính mời mọi người đến chung vui cùng con/cháu trong ngày lễ tốt nghiệp này."'},nguoiyeu:{name:"Người yêu",title:"Gửi Bé Yêu {name},",titleFallback:"Gửi Bé Yêu Của Anh,",message:'"Cảm ơn em vì đã luôn ở bên cạnh, lắng nghe, chia sẻ và là nguồn động lực lớn lao giúp anh vượt qua những ngày học tập căng thẳng.<br class="hidden sm:block"> Ngày anh bước lên bục nhận bằng tốt nghiệp, anh muốn em là người đầu tiên chứng kiến khoảnh khắc này. Đến chung vui cùng anh nhé!"'},banbe:{name:"Bạn bè / Bạn học",title:"Thân gửi bạn {name},",titleFallback:"Thân gửi Bạn,",message:'"Cảm ơn bạn đã luôn đồng hành, chia sẻ tài liệu học tập, cùng cày deadline thức đêm làm bài tập lớn và tạo nên những kỷ niệm thời sinh viên thật đẹp.<br class="hidden sm:block"> Hãy đến chung vui cùng mình trong ngày trọng đại này nhé! Sự hiện diện của bạn là niềm vui lớn của mình."'},thayco:{name:"Thầy cô giáo",title:"Kính gửi Thầy/Cô {name},",titleFallback:"Kính gửi Quý Thầy Cô,",message:'"Em xin bày tỏ lòng biết ơn sâu sắc đến Thầy/Cô, những người lái đò tận tụy đã truyền dạy kiến thức, dìu dắt và định hướng cho em trong suốt thời gian học tập tại trường đại học.<br class="hidden sm:block"> Trân trọng kính mời Thầy/Cô đến chung vui cùng em trong buổi lễ tốt nghiệp này."'},khac:{name:"Khách mời khác",title:"Thân gửi {name},",titleFallback:"Thân gửi Bạn,",message:'"Bốn năm đại học trôi qua nhanh như một cái chớp mắt, và cuối cùng thì ngày này cũng đến.<br class="hidden sm:block"> Sự đồng hành và ủng hộ của bạn trong suốt chặng đường học tập vừa qua là niềm vinh hạnh lớn của mình.<br class="hidden sm:block"> Hãy đến chung vui cùng mình trong ngày trọng đại này nhé!"'}};let G={};async function ya(){try{const e=await Vt(Ut(Le,"templates"));if(e.empty){console.log("Firestore templates are empty. Initializing defaults..."),G={...U};for(const[t,a]of Object.entries(U))await Ht(Gt(Le,"templates",t),a)}else{const t={};e.forEach(a=>{t[a.id]=a.data()}),G=Object.assign({},U,t)}}catch(e){console.error("Lỗi khi tải mẫu câu chúc từ Firestore:",e),G={...U}}}function va(e,t){return e?t?e.title&&e.title.includes("{name}")?e.title.replace(/{name}/g,t):(e.title||"")+" "+t:e.titleFallback||(e.title?e.title.replace(/{name}/g,"").trim():""):""}function wa(e,t){let a="a309";t&&G[t]?a=t:e&&(a="khac");const r=G[a]||U[a]||U.khac,o=document.getElementById("invitation-title");o&&(o.textContent=va(r,e));const s=document.getElementById("invitation-message");s&&(s.innerHTML=r?r.message:"")}function ba(){const e=new URLSearchParams(window.location.search),t=e.get("name"),a=e.get("group"),r=e.get("admin")==="true";wa(t,a);const s=!(t||a)||r,c=document.getElementById("admin-button-container");c&&(s?c.classList.remove("hidden"):c.classList.add("hidden"));const l=document.getElementById("btn-download-image"),h=document.getElementById("btn-print-invitation");l&&h&&(s?(l.classList.remove("hidden"),h.classList.remove("hidden")):(l.classList.add("hidden"),h.classList.add("hidden")))}const V=document.getElementById("toast");function le(e){const t=document.getElementById("toast-message");t&&(t.textContent=e),V&&(V.classList.remove("pointer-events-none","opacity-0","translate-y-10"),V.classList.add("opacity-100","translate-y-0")),setTimeout(()=>{V&&(V.classList.add("pointer-events-none","opacity-0","translate-y-10"),V.classList.remove("opacity-100","translate-y-0"))},2500)}function Ia(){const e=document.querySelector("main.glass-card");if(!e)return;const t=e.querySelectorAll(".no-print");t.forEach(a=>{const r=a;r.dataset.originalDisplay=r.style.display,r.style.display="none"}),le("Đang tạo ảnh thiệp..."),setTimeout(()=>{zt(e,{scale:3,useCORS:!0,backgroundColor:"#fdfbf7",logging:!1,allowTaint:!0,onclone:a=>{const r=a.querySelector("main.glass-card");r&&(r.classList.remove("animate-fade-in"),r.style.animation="none",r.style.transition="none",r.style.opacity="1",r.style.transform="none",r.querySelectorAll("*").forEach(c=>{const l=c;l.classList.remove("animate-fade-in","animate-slide-up","pulse-slow"),l.style.animation="none",l.style.transition="none",l.style.transform="none",l.style.opacity!=="0"&&!l.classList.contains("no-print")&&(l.style.opacity="1")}),r.querySelectorAll(".gold-text").forEach(c=>{const l=c;l.style.webkitBackgroundClip="initial",l.style.webkitTextFillColor="initial",l.style.background="none",l.style.color="#c5a059"}))}}).then(a=>{t.forEach(c=>{const l=c;l.style.display=l.dataset.originalDisplay||""});const r=document.createElement("a"),o=new URLSearchParams(window.location.search).get("name")||"",s=o?`Thiep_Moi_Tot_Nghiep_${o.replace(/\s+/g,"_")}.png`:"Thiep_Moi_Tot_Nghiep.png";r.download=s,r.href=a.toDataURL("image/png"),r.click(),le("Đã tải hình thiệp thành công!")}).catch(a=>{console.error("Lỗi khi chụp hình thiệp:",a),t.forEach(r=>{const o=r;o.style.display=o.dataset.originalDisplay||""}),le("Không tải được ảnh. Hãy thử chụp màn hình nhé!")})},300)}let C=null,K=null,W=null;function Ta(){C=document.getElementById("bg-audio"),K=document.getElementById("music-btn"),W=document.getElementById("music-icon");const e=document.getElementById("volume-slider");if(!C||!K)return;const t=localStorage.getItem("music_volume"),a=t?parseFloat(t):.4;C.volume=a,e&&(e.value=a.toString()),localStorage.getItem("music_muted")==="true"||a===0?j(!1):C.play().then(()=>{j(!0)}).catch(o=>{console.log("Autoplay blocked, waiting for interaction:",o);const s=()=>{C&&C.play().then(()=>{j(!0)}).catch(c=>console.log("Play failed:",c)),["click","touchstart","scroll","mousemove","keydown"].forEach(c=>{window.removeEventListener(c,s)})};["click","touchstart","scroll","mousemove","keydown"].forEach(c=>{window.addEventListener(c,s,{passive:!0})})})}function j(e){!K||!W||(e?(K.classList.add("animate-spin-slow"),W.innerHTML=`
            <svg class="w-5 h-5 text-brand-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path>
            </svg>
        `):(K.classList.remove("animate-spin-slow"),W.innerHTML=`
            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"></path>
            </svg>
        `))}function Ma(){if(!C)return;const e=document.getElementById("volume-slider");C.paused?(C.volume===0&&(C.volume=.4,e&&(e.value="0.4"),localStorage.setItem("music_volume","0.4")),C.play().then(()=>{j(!0),localStorage.setItem("music_muted","false")}).catch(t=>console.error(t))):(C.pause(),j(!1),localStorage.setItem("music_muted","true"))}function ka(e){if(!C)return;const t=parseFloat(e);C.volume=t,localStorage.setItem("music_volume",e),t>0?(C.paused&&C.play().then(()=>{j(!0)}).catch(a=>console.error(a)),localStorage.setItem("music_muted","false")):(C.pause(),j(!1),localStorage.setItem("music_muted","true"))}async function Aa(){Ta(),await ya(),ba()}Aa();window.fireConfetti=pa;window.downloadCardAsImage=Ia;window.toggleMusic=Ma;window.changeVolume=ka;
