// // 1. Simple GET request
// async function basicGet(){
//     try{
//         const response = await fetch("https://api.example.com/data")

//         // Check if response is ok ( status in 200-299 range)
//         if(!response.ok){
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();
//         return data;
//     } catch (error){
//         console.error(`Fetch error:`, error);
//         throw error;
//     }
// }

// // 2. POST request with headers 
// async function basicPost(){
//     try{
//         const response = await fetch("https://api.example.com/users",{
//             method:'POST',
//             headers:{
//                 'Content-Type':'application/json',
//                 'Authorization':'Bearer token123'
//             },
//             body:JSON.stringify({
//                 name:'Jone Doe',
//                 email:"john@gamil.com"
//             })
//         });

//         const data = await response.json()
//         return data
//     }catch(error){
//         console.log('Fetch error:',error);
//         throw error;
//     }
// }

// // HTTP Client Wrapper Implementation

// class HTTPClient {
//     constructor(config = {}){
//         this.baseURL = config.baseURL || '';
//         this.defaultHeaders = config.headers || {};
//         this.timeout = config.timeout || 30000; // 30 seconds default
//         this.retryCount = config.retryCount || 3;
//         this.retryDelay = config.retryDelay || 1000; // 1 second

//         // Interceptors storage
//         this.interceptors = {
//             request:[],
//             response:[]
//         }

//         // Cache storage
//         this.cache = new Map();
//         this.cacheConfig = config.cache || {
//             enabled:false,
//             ttl: 5 * 60 * 1000,  // 5 mintes default
//             storage: 'memory' // 'memory' or 'localStorage'
//         };
//     }

//     // Add request interceptor
//     addRequestInterceptor(interceptor){
//         this.interceptors.request.push(interceptor);
//         return () => {
//             const index = this.interceptors.request.indexOf(interceptor);
//             if(index !== -1){
//                 this.interceptors.request.splice(index,1);
//             }

//         };
//     }

//     // Add responseInterceptor
//     addResponseInterceptor(interceptor){
//         this.interceptors.response.push(interceptor);
//         return () => {
//             const index = this.interceptors.response.indexOf(interceptor);
//             if(index !== -1){
//                 this.interceptors.response.splice(index,1);
//             }
//         };
//     }

//     // Apply request interceptors
//     async applyRequestInterceptors(config){
//         let modifiedConfig = { ...config };

//         for(const interceptor of this.interceptors.request){
//             try{
//                 modifiedConfig = await interceptor(modifiedConfig);
//             } catch(error){
//                 throw new Error(`Request interceptor error: ${error.message}`);
//             }
//         }

//         return modifiedConfig;
//     }

//     // Apply response interceptors
//     async applyResponseInterceptors(response){
//         let modifiedResponse = response;

//         for( const interceptor of this.interceptors.response){
//             try{
//                 modifiedResponse = await interceptor(modifiedResponse);
//             }catch (error){
//                 throw new Error(`Response interceptor error: ${error.message}`);
//             }
//         }

//         return modifiedResponse;
//     }

//     // Cache key generator
//     getCacheKey(url, options = {}){
//         const method = options.method || 'GET';
//         const body = options.body ? JSON.stringify(options.body) : '';
//         return `${method}:${url}:${body}`;
//     }

//     // Get from cache
//     getFromCache(key){
//         if(!this.cacheConfig.enabled) return null;

//         if(this.cacheConfig.storage === 'localStorage'){
//             const item = localStorage.getItem(key);
//             if(!item) return null;

//             const { data, timestamp} = JSON.parse(item);
//             if(Date.now() - timestamp > this.cacheConfig.ttl){
//                 localStorage.removeItem(key);
//                 return null;
//             }
//             return data;
//         }

//         // Memory cache 
//         const cached = this.cache.get(key);
//         if(!cached) return null;

//         if(Date.now() - cached.timestamp > this.cacheConfig.ttl){
//             this.cache.delete(key);
//             return null;
//         }

//         return cached.data;
//     }

//     // Set cache
//     setCache(key, data){
//         if(!this.cacheConfig.enabled) return;

//         const cacheData = {
//             data,
//             timestamp:Date.now()
//         };

//         if(this.cacheConfig.storage === 'localStorage'){
//             try{
//                 localStorage.setItem(key, JSON.stringify(cacheData));
//             } catch (error){
//                 console.warn('Failed to cache in localStorage:', error);
//             }
//         }else {
//             this.getCacheKey.set(key, cacheData);
//         }
//     }
// }

