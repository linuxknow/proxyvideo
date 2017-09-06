
/*
* proxy.js - A Bash Implementation
* proxy.js
 * Copyright (C) 2014 linuxknow@gmail.com
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 */



var http = require("http");
var http_2 = require("http");
var httpsServer = require('https');
var httpsClient = require('https');
var crypto = require('crypto');
var fs = require('fs');
var video_flv=-1;


try{
  fs.appendFile('/tmp/url/url.txt','', function(err) {
    if (err) throw new Error('Error al escribir realizar append al archivo.');;
  });  
}catch(ex){
  console.log("Ocurrio una exception al abrir el archivo: "+ex.message);
}


process.on('uncaughtException', function(err) {
    console.log(err);
});

function callbackRequest(err){
  console.log("Ocurrio un error con el request async: "+err);
}

function parseCookies (request) {
    var list = {},
    rc = request.headers.cookie;
    rc && rc.split(';').forEach(function( cookie ) {
        var parts = cookie.split('=');
        console.log("Parts: "+parts+"\n");
        var key = parts.shift().trim();
        console.log("Parts shift trim: "+key+"\n");
        list[key] = decodeURI(parts.join('='));
    });
    return list;
}

function findParamInCookie(cookie,param){
  try{
      if (cookie[param]){
        return 0;
      }
      return 1;
  }catch(ex){
    console.log("Error findParamInCookie: "+ex.message);
    return 1;
  }
}


function generateCookie(cookie,total){
  try{
      cadena="";
      cantidad = 0;
      console.log("Dim: "+total+"\n");
      for (var i in cookie){
        if (cantidad < total){
          cadena=cadena+i.toString()+"="+cookie[i].toString();
          cantidad=cantidad+1;
        }
        if (cantidad < total){
          cadena=cadena+"\;";
        }
      }
      return cadena;
  }catch(ex){
    console.log("Error generateCookie: "+ex.message);
  }
}

function countCookie(cookie){
  try{
      cantidad = 0;
      for (var i in cookie){
        cantidad=cantidad + 1;
      }
      return cantidad;
  }catch(ex){
    console.log("Error countCookie: "+ex.message);
  }
}



http.createServer(function(request, response){
  console.log('STATUS: ' + response.statusCode);
  if (request.method == 'GET' ){
  	console.log("Metodo de recepcion GET");
  }
  if (request.method == "POST"){
  	console.log("Metodo de recepcion POST");
  }
  console.log("Url: "+request.url+"\n");
  testPath = require('path');
  console.log("Headers: "+request.headers['host']+" Agent: "+request.headers['user-agent']+" Cookie: "+request.headers['cookie']+"\n");
  var shasum = crypto.createHash('sha1');
  shasum.update(request.url);
  var hex_number = shasum.digest('hex');
  request.headers['user-agent']=hex_number;

  console.log("Headers: "+request.headers['host']+" Agent: "+request.headers['user-agent']+" Cookie: "+request.headers['cookie']+" content-type:"+request.headers['content-type']+"\n");

  var cookies = parseCookies(request);

  if (findParamInCookie(cookies,'country_code')==0){
      cookies['country_code']='CH';
  }
  //request.headers['cookie']='country_code=CH';
  //
  cookie_new = generateCookie(cookies,countCookie(cookies));
  request.headers['cookie']=cookie_new;
  console.log(" Modificado Cookie: "+request.headers['cookie']+"\n");
  //console.log(cookie_new+"\n");
  //console.log("Modificado: "+JSON.stringify(cookies)+"\n");

  //cookie_new
  var url = require("url")
  ,parsedRequest = url.parse("http://"+request.headers['host'])
  ,hostnameRequest = parsedRequest.hostname
  ,searchRequest = parsedRequest.search
  ,protocolRequest = parsedRequest.protocol
  ,pathRequest = parsedRequest.pathname
  ,unionPatchSearch = parsedRequest.path
  ,portRequest = +parsedRequest.port || 80

  var urlClean = require("url");
  parseUrlClean = urlClean.parse(request.url,true)
  ,hrefRequestCompleted = parseUrlClean.href
  ,pathRequestCompleted = parseUrlClean.pathname

  console.log("URL Clean: "+hrefRequestCompleted+"\n");

  var url_parts = url.parse(request.url, true);
  var query = url_parts.query

  console.log("Search str: "+JSON.stringify(query)+"\n");

  console.log("Href str: "+hrefRequestCompleted+"\n");

  console.log("Path url: "+pathRequestCompleted+"\n");

  //cambios al 17/02/2015 parsea la extension
  var tipoExt = (testPath.extname(pathRequestCompleted)).split(';');
  console.log("tipoExt: "+tipoExt);
  var ExtensionVideo = '';
  if (tipoExt.length>0){
    console.log("Tipo ext: "+tipoExt[0]+"\n");
    ExtensionVideo=tipoExt[0];
  }

  if ( query === null ||  query === "null" || query.length < 1 || JSON.stringify(query) === '{}'){
     console.log("Objeto nulo");
  }else{
    console.log("Query completa: "+query);

    console.log("Query E:"+query.e+" Query.ri:"+query.ri+" Query.rs:"+query.rs+" Query.h:"+query.h);
  }
  //Parametros para xvideos
  if (query.e && query.ri && query.rs && query.h && ExtensionVideo == ".flv"){
    fs.appendFile('/tmp/url/url.txt', hrefRequestCompleted+"\n", function (err) {
      if (err) throw new Error('Error al escribir datos en el archivo.');;
      console.log('Datos guardados');
    });
  }

  if (query.e && query.ri && query.rs && query.h && ExtensionVideo == ".mp4"){
    fs.appendFile('/tmp/url/url.txt', hrefRequestCompleted+"\n", function (err) {
      if (err) throw new Error('Error al escribir datos en el archivo.');;
      console.log('Datos guardados');
    });
  }

  if (query.e && query.ri && query.rs && query.h && ExtensionVideo == ".am4"){
    fs.appendFile('/tmp/url/url.txt', hrefRequestCompleted+"\n", function (err) {
      if (err) throw new Error('Error al escribir datos en el archivo.');;
      console.log('Datos guardados');
    });
  }

  //Agregando m3u8
  if (ExtensionVideo == ".m3u8" && query.e && query.ri && query.rs){
    fs.appendFile('/tmp/url/url.txt', hrefRequestCompleted+"\n", function (err) {
      if (err) throw new Error('Error al escribir datos en el archivo.');;
      console.log('Datos guardados');
    });
  }


  var options = {
    hostname: hostnameRequest,
    port: portRequest,
    path: pathRequest+searchRequest,
    headers: request.headers,
    method: request.method
  };

  //var dns = require('dns');
  //var sigue=0;

  /*
  try{
    dns.resolve4(hostname, function (err, addresses) {
      if (err){
        sigue=1;
        //var err = new Error('Error al realizar dns resolve4');
        //throw err;
      }else{
          console.log('addresses: ' + JSON.stringify(addresses));
          addresses.forEach(function (a) {
          try{
              dns.reverse(a, function (err, domains) {
              if (err) {
                sigue=1;
                //var err = new Error('Error al realizar dns reverso');
                //throw err
              }else{
                console.log('reverse for ' + a + ': ' + JSON.stringify(domains));  
              }
            });
          }catch(err){
            console.log("Error:", err)
          }
        });
      }
    });
  }catch(err){
    console.log("Dns Error:", err)
  }
  */

      //var proxy = http_2.createClient(80, request.headers['host']);
      //
      
      var proxy = http_2.createClient(portRequest, hostnameRequest);

      var proxy_request = proxy.request(request.method, request.url, request.headers);

      proxy_request.addListener('response', function(proxy_response) {
        try{
            proxy_response.addListener('data', function(chunk) {
            response.write(chunk, 'binary');
          });
        }catch(ex){
          console.log("Error al response.write(chunk, 'binary')" + ex);
          throw new Error('Proxy server error request evento => proxy_request on data!.');
        }
        try{
            proxy_response.addListener('end', function() {
            response.end();
          });
        }catch(ex){
          console.log("Error al response.end();" + ex);
          throw new Error('Proxy server error request evento => proxy_request on end!.');
        }

        try{
            proxy_response.addListener('error', function(e) {
          });
        }catch(ex){
          console.log("Error al proxy_response.addListener('error', function(e)" + ex);
          throw new Error('Proxy server error request evento => proxy_request on error!.');
        }
        response.writeHead(proxy_response.statusCode, proxy_response.headers);
        console.log('HEADERS: ' + JSON.stringify(proxy_response.headers));
      });

      proxy_request.on('error', function(e) {
        console.log('Existe problemas con el request: '+e.message+"\n");
        throw new Error('Proxy server error request evento => proxy_request on error!.');
      });
      

      request.addListener('data', function(chunk) {
        proxy_request.write(chunk, 'binary');
      });

      request.addListener('end', function() {
        proxy_request.end();
      });
  //response.writeHead(200, {"Content-Type": "text/html"});
  //response.write("Hello World");
  //response.end();
  
}).listen(8000);
