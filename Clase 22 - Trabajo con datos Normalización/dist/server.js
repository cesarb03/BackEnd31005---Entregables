(()=>{"use strict";var t={514:t=>{t.exports=require("knex")}},e={};function r(i){var o=e[i];if(void 0!==o)return o.exports;var n=e[i]={exports:{}};return t[i](n,n.exports,r),n.exports}r.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return r.d(e,{a:e}),e},r.d=(t,e)=>{for(var i in e)r.o(e,i)&&!r.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})},r.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{const t=require("express");var e=r.n(t),i=function(t,e,r,i){return new(r||(r=Promise))((function(o,n){function s(t){try{d(i.next(t))}catch(t){n(t)}}function c(t){try{d(i.throw(t))}catch(t){n(t)}}function d(t){var e;t.done?o(t.value):(e=t.value,e instanceof r?e:new r((function(t){t(e)}))).then(s,c)}d((i=i.apply(t,e||[])).next())}))};const o=new class{constructor(t,e){this.productList=[],this.db=r(514)(t),this.table=e,this.createTableIfNotExists()}createTableIfNotExists(){return i(this,void 0,void 0,(function*(){if(!(yield this.db.schema.hasTable(this.table)))try{yield this.db.schema.createTableIfNotExists(this.table,(t=>{t.increments("id").primary(),t.string("title"),t.integer("price"),t.string("thumbnail"),t.integer("timestamp")}))}catch(t){console.error(t)}}))}getAll(){return i(this,void 0,void 0,(function*(){return yield this.db.select("*").from(this.table)}))}getById(t){return i(this,void 0,void 0,(function*(){try{return(yield this.db.select("*").where("id",t).from(this.table))||{error:"Product not found."}}catch(t){console.log("Method getById: ",t)}return{error:"Fetch item method failed"}}))}addProduct(t){return i(this,void 0,void 0,(function*(){try{const e=Date.now();yield this.db.insert(Object.assign(Object.assign({},t),{timestamp:e})).into(this.table)}catch(t){console.log("Method save: ",t)}}))}updateProductById(t,e){return i(this,void 0,void 0,(function*(){try{yield this.db.where("id",t).update({title:e.name,price:e.price,thumbnail:e.photoURL}).from(this.table)}catch(t){console.log("Method update: ",t)}}))}deleteProductById(t){return i(this,void 0,void 0,(function*(){try{yield this.db.delete("*").where("id",t).from(this.table)}catch(t){console.log("Method deleteById: ",t)}}))}}({client:"mysql",connection:{host:"127.0.0.1",port:3306,user:"root",password:"",database:"Clase_16"},pool:{min:0,max:7}},"products");var n=function(t,e,r,i){return new(r||(r=Promise))((function(o,n){function s(t){try{d(i.next(t))}catch(t){n(t)}}function c(t){try{d(i.throw(t))}catch(t){n(t)}}function d(t){var e;t.done?o(t.value):(e=t.value,e instanceof r?e:new r((function(t){t(e)}))).then(s,c)}d((i=i.apply(t,e||[])).next())}))};const s=require("fs");var c=r.n(s),d=function(t,e,r,i){return new(r||(r=Promise))((function(o,n){function s(t){try{d(i.next(t))}catch(t){n(t)}}function c(t){try{d(i.throw(t))}catch(t){n(t)}}function d(t){var e;t.done?o(t.value):(e=t.value,e instanceof r?e:new r((function(t){t(e)}))).then(s,c)}d((i=i.apply(t,e||[])).next())}))};class a{constructor(t){this.writeFile=t=>d(this,void 0,void 0,(function*(){try{yield c().promises.writeFile(a.fileName,JSON.stringify(t,null,2))}catch(t){console.log("Method: writeFile, ",t)}})),this.readCartFile=()=>d(this,void 0,void 0,(function*(){try{return(yield c().promises.readFile(a.fileName,"utf8"))?JSON.parse(yield c().promises.readFile(a.fileName,"utf8")):[]}catch(t){if(-2===t.errno)try{return yield c().promises.writeFile(a.fileName,JSON.stringify([])),[]}catch(t){console.error("Method: readFile: could not create file in such directory.",t)}else console.log("Method readFile: ",t);return[]}})),this.readProductsFile=()=>d(this,void 0,void 0,(function*(){try{return(yield c().promises.readFile(this.productFilePath,"utf8"))?JSON.parse(yield c().promises.readFile(this.productFilePath,"utf8")):[]}catch(t){if(-2===t.errno)try{return yield c().promises.writeFile(this.productFilePath,JSON.stringify([])),[]}catch(t){console.error("Could not create file in such directory. ",t)}else console.log("Method readFile: ",t);return[]}})),this.createNewCart=()=>d(this,void 0,void 0,(function*(){try{const t=yield this.readCartFile(),e=(new Date).toLocaleString("es-AR");if(0===t.length||void 0===t)return yield this.writeFile([{cartId:1,timestamp:e,products:[]}]),1;{const r=Math.max(...t.map((t=>t.cartId)))+1;return yield this.writeFile([...t,{cartId:r,timestamp:e,products:[]}]),r}}catch(t){return console.error(t),t}})),this.cartDeleteById=t=>d(this,void 0,void 0,(function*(){try{const e=yield this.readCartFile();if(0===e.length||void 0===e)return-1;{const r=e.filter((e=>e.cartId!==t));return r.length===e.length?-2:(yield this.writeFile(r),200)}}catch(t){return console.error(t),t}})),this.getProductsByCartId=t=>d(this,void 0,void 0,(function*(){try{const e=(yield this.readCartFile()).find((e=>e.cartId===t));if(void 0!==e){const t=e.products;return 0===t.length?new Error("Cart has no products."):t}return new Error("Cart not found")}catch(t){return console.error(t),t}})),this.addToCartById=(t,e)=>d(this,void 0,void 0,(function*(){try{const r=Number(e.id),i=yield this.readCartFile(),o=i.find((e=>e.cartId===t)),n=(yield this.readProductsFile()).filter((t=>{if(t.id===r)return t}));if(0===n.length)return new Error(`There is no such product with id= ${r}`);if(void 0!==o&&void 0!==n){const e=[...o.products,...n],r=i.map((r=>r.cartId===t?Object.assign(Object.assign({},r),{products:e}):r));return yield this.writeFile(r),n}}catch(t){return console.error(t),t}})),this.deleteProductByCartId=(t,e)=>d(this,void 0,void 0,(function*(){try{const r=yield this.readCartFile(),i=r.find((e=>e.cartId===t));if(void 0===i)return new Error(`Cart id=${t} not found.`);{const o=i.products.filter((t=>t.id!==e));if(o.length===i.products.length)return new Error(`Product id=${e} not found in cart id=${t}.`);{const e=r.map((e=>e.cartId===t?Object.assign(Object.assign({},e),{products:o}):e));yield this.writeFile(e)}}}catch(t){return console.error(t),t}})),a.fileName=t,this.productFilePath="./src/db/products.txt",c().existsSync(`./${a.fileName}`)||c().promises.writeFile(`./${a.fileName}`,"").then((()=>console.log(`${a.fileName} created`)))}}const u=new a("./src/db/cart.txt");var l=function(t,e,r,i){return new(r||(r=Promise))((function(o,n){function s(t){try{d(i.next(t))}catch(t){n(t)}}function c(t){try{d(i.throw(t))}catch(t){n(t)}}function d(t){var e;t.done?o(t.value):(e=t.value,e instanceof r?e:new r((function(t){t(e)}))).then(s,c)}d((i=i.apply(t,e||[])).next())}))};const h=require("@faker-js/faker");h.faker.locale="es";const f=(0,t.Router)();f.get("/products",((t,e)=>n(void 0,void 0,void 0,(function*(){const t=yield o.getAll();e.json(t)})))),f.get("/products/:id",((t,e)=>n(void 0,void 0,void 0,(function*(){const{id:r}=t.params,i=yield o.getById(Number(r));e.json(i)})))),f.post("/products",((t,e)=>n(void 0,void 0,void 0,(function*(){const r=t.body,i=yield o.addProduct(r);e.json(i)})))),f.put("/products/:id",((t,e)=>n(void 0,void 0,void 0,(function*(){const{id:r}=t.params,i=t.body;yield o.updateProductById(Number(r),i),e.json({msg:`Product ${r} updated.`})})))),f.delete("/products/:id",((t,e)=>n(void 0,void 0,void 0,(function*(){const{id:r}=t.params,i=yield o.deleteProductById(Number(r));e.json({deletedProduct:i})})))),f.post("/cart",((t,e)=>l(void 0,void 0,void 0,(function*(){const t=yield u.createNewCart();if("number"!=typeof t)return e.status(500).json({error:-1,msg:"Error creating cart",cartId:t});e.json(t)})))),f.delete("/cart/:id",((t,e)=>l(void 0,void 0,void 0,(function*(){const{id:r}=t.params,i=yield u.cartDeleteById(Number(r));return i instanceof Error?e.status(500).json({error:-1,msg:i.message}):-1===i?e.status(500).json({error:-1,msg:"Cart file is empty!"}):-2===i?e.status(500).json({error:-2,msg:`There is no cart with id= ${r}`}):void e.json(`Cart id: ${r} deleted.`)})))),f.get("/cart/:id/products",((t,e)=>l(void 0,void 0,void 0,(function*(){const{id:r}=t.params,i=yield u.getProductsByCartId(Number(r));if(i instanceof Error)return e.status(500).json({error:-1,msg:i.message});e.json(i)})))),f.post("/cart/:id/products",((t,e)=>l(void 0,void 0,void 0,(function*(){const{id:r}=t.params,i=t.body,o=yield u.addToCartById(Number(r),i);if(o instanceof Error)return e.status(500).json({error:-1,msg:o.message});e.json(o)})))),f.delete("/cart/:id/products/:id_prod",((t,e)=>l(void 0,void 0,void 0,(function*(){const{id:r,id_prod:i}=t.params,o=yield u.deleteProductByCartId(Number(r),Number(i));if(o instanceof Error)return e.status(500).json({error:-1,msg:o.message});e.json(o)})))),f.get("/products-test",((t,e)=>{return r=void 0,i=void 0,n=function*(){try{const t=new class{constructor(){this.memoryProducts=[]}listFakerProducts(t=5){const e=[];for(let r=0;r<t;r++){const t={code:h.faker.random.word(),name:h.faker.commerce.productName(),price:Number(h.faker.commerce.price()),stock:Number(h.faker.random.numeric()),description:h.faker.commerce.productDescription(),photoURL:h.faker.image.imageUrl()};e.push(t)}return e}},r=yield t.listFakerProducts();return console.log("Result",r),e.json(r)}catch(t){console.log(`Han error has ocurred; ${t}`)}},new((o=void 0)||(o=Promise))((function(t,e){function s(t){try{d(n.next(t))}catch(t){e(t)}}function c(t){try{d(n.throw(t))}catch(t){e(t)}}function d(e){var r;e.done?t(e.value):(r=e.value,r instanceof o?r:new o((function(t){t(r)}))).then(s,c)}d((n=n.apply(r,i||[])).next())}));var r,i,o,n}));const v=f,m=require("socket.io"),y=require("path");var p=r.n(y);const g=require("dotenv");var b=r.n(g),w=function(t,e,r,i){return new(r||(r=Promise))((function(o,n){function s(t){try{d(i.next(t))}catch(t){n(t)}}function c(t){try{d(i.throw(t))}catch(t){n(t)}}function d(t){var e;t.done?o(t.value):(e=t.value,e instanceof r?e:new r((function(t){t(e)}))).then(s,c)}d((i=i.apply(t,e||[])).next())}))};const x=new class{constructor(t,e){this.addMessage=({email:t,message:e})=>w(this,void 0,void 0,(function*(){const r=(new Date).toLocaleString("es-AR");yield this.db.insert({email:t,message:e,date:r}).into(this.table)})),this.db=r(514)(t),this.table=e,this.createTableIfNotExists()}createTableIfNotExists(){return w(this,void 0,void 0,(function*(){if(!(yield this.db.schema.hasTable(this.table)))try{yield this.db.schema.createTableIfNotExists(this.table,(t=>{t.increments("id").primary(),t.string("email"),t.string("message"),t.string("date")}))}catch(t){console.error(t)}}))}getAllMessages(){return w(this,void 0,void 0,(function*(){return yield this.db.select("*").from(this.table)}))}}({client:"sqlite3",connection:{filename:"./src/db/ecommerce.sqlite"},useNullAsDefault:!0},"chat");var N=function(t,e,r,i){return new(r||(r=Promise))((function(o,n){function s(t){try{d(i.next(t))}catch(t){n(t)}}function c(t){try{d(i.throw(t))}catch(t){n(t)}}function d(t){var e;t.done?o(t.value):(e=t.value,e instanceof r?e:new r((function(t){t(e)}))).then(s,c)}d((i=i.apply(t,e||[])).next())}))};b().config();const P=process.env.PORT,F=e()(),I=F.listen(P,(()=>{console.log(`Server listening on port: ${P}`)}));F.use(e().json()),F.use(e().urlencoded({extended:!0})),F.use(((t,e,r)=>{const{isAdmin:i}=t.query;if(!t.originalUrl.includes("/api/cart")&&"true"!==i&&"GET"!==t.method)return e.status(401).json({error:-1,msg:`${t.method}: ${t.originalUrl} --\x3e Unauthorized`});r()})),F.use("/api",v),F.use(e().static(p().join(__dirname,"../public")));const j=new m.Server(I);j.on("connection",(t=>N(void 0,void 0,void 0,(function*(){console.log(`Se conectó un usuario: ${t.id}`),t.emit("server:product",yield o.getAll()),t.emit("server:message",yield x.getAllMessages()),t.on("client:product",(t=>N(void 0,void 0,void 0,(function*(){o.addProduct(t),j.emit("server:product",yield o.getAll())})))),t.on("client:message",(t=>N(void 0,void 0,void 0,(function*(){x.addMessage(t),j.emit("server:message",yield x.getAllMessages())}))))}))))})()})();