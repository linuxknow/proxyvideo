

/*
* proxy.js - A Bash Implementation
* proxy.js
 * Copyright (C) 2017 linuxknow@gmail.com
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

//  Install npm dependencies first
//  npm init
//  npm install --save url@0.10.3
//  npm install --save http-proxy@1.11.1

var httpProxy = require("http-proxy");
var http = require("http");
var url = require("url");
var net = require('net');
var fs = require('fs');

try{
  fs.appendFile('/tmp/url/url.txt','', function(err) {
    if (err) throw new Error('Error al escribir realizar append al archivo.');;
  });
}catch(ex){
  console.log("Ocurrio una exception al abrir el archivo: "+ex.message);
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



var server = http.createServer(function (req, res) {
  var urlObj = url.parse(req.url);
  var target = urlObj.protocol + "//" + urlObj.host;

  console.log("Proxy HTTP request for:", target);

  //Cambios
  
  var urlParse = require("url-parse")
  , urlLocal = urlParse(req.url,true);
  var hrefRequestCompleted = urlLocal.href;
  var pathRequestCompleted = urlLocal.pathname;
  var query = urlLocal.query || null;
  var url_string = urlLocal.toString();
  var search = urlLocal.search || null;
  var webhost = urlLocal.host;
  var Path = require("path");
  var tipoExtension = Path.extname(pathRequestCompleted);

  console.log("Search str: "+JSON.stringify(query)+"\n");

  console.log("Href str: "+hrefRequestCompleted+"\n");

  console.log("Host: "+webhost+" search: "+search+" tipo extension: "+tipoExtension+"\n");


  if (pathRequestCompleted != null || String(pathRequestCompleted) === "null") {
   console.log("Path url: "+pathRequestCompleted+"\n");
  }else{
   pathRequestCompleted="";
  }

  var tipoExt = url_string.split(';');
  console.log("tipoExt: "+tipoExt);
  var ExtensionVideo = '';
  if (tipoExt.length>0){
    console.log("Tipo ext: "+tipoExt[0]+"\n");
    ExtensionVideo=tipoExt[0];
  }

  if ( query === null ||  query === "null" || query.length < 1 || JSON.stringify(query) === '{}'){
     console.log("Objeto nulo");
  }else{
    console.log("Query completa: "+JSON.stringify(query));
    console.log("Query E:"+query.e+" Query.ri:"+query.ri+" Query.rs:"+query.rs+" Query.h:"+query.h);
  }

//Parametros para videos
   if ( hrefRequestCompleted && tipoExtension == ".flv"){
     fs.appendFile('/tmp/url/url.txt', hrefRequestCompleted+"\n", function (err) {
     if (err) throw new Error('Error al escribir datos en el archivo.');;
       console.log('Datos guardados');
     });
   }

   if ( hrefRequestCompleted && tipoExtension == ".ts"){
     fs.appendFile('/tmp/url/url.txt', hrefRequestCompleted+"\n", function (err) {
     if (err) throw new Error('Error al escribir datos en el archivo.');;
       console.log('Datos guardados');
     });
   }

  if ( hrefRequestCompleted && tipoExtension == ".mp4"){
    fs.appendFile('/tmp/url/url.txt', hrefRequestCompleted+"\n", function (err) {
    if (err) throw new Error('Error al escribir datos en el archivo.');;
      console.log('Datos guardados');
    });
   }

  if ( hrefRequestCompleted && tipoExtension == ".am4"){
    fs.appendFile('/tmp/url/url.txt', hrefRequestCompleted+"\n", function (err) {
    if (err) throw new Error('Error al escribir datos en el archivo.');;
      console.log('Datos guardados');
    });
   }

  //Agregando m3u8
  if (ExtensionVideo == ".m3u8" && hrefRequestCompleted){
    fs.appendFile('/tmp/url/url.txt', hrefRequestCompleted+"\n", function (err) {
    if (err) throw new Error('Error al escribir datos en el archivo.');;
      console.log('Datos guardados');
    });
  }

  //http://hentaistream.com
  if (JSON.stringify(query) && query.mu && query.pu){
    fs.appendFile('/tmp/url/url.txt', query.mu+"\n", function (err) {
    if (err) throw new Error('Error al escribir datos en el archivo.');;
      console.log('Datos guardados');
    });
  }

  //fin

  var proxy = httpProxy.createProxyServer({});

  proxy.on("error", function (err, req, res) {
    console.log("proxy error", err);
    res.end();
  });

  proxy.web(req, res, {target: target});
}).listen(8000);  //this is the port your clients will connect to

var regex_hostport = /^([^:]+)(:([0-9]+))?$/;

var getHostPortFromString = function (hostString, defaultPort) {
  var host = hostString;
  var port = defaultPort;

  var result = regex_hostport.exec(hostString);
  if (result != null) {
    host = result[1];
    if (result[2] != null) {
      port = result[3];
    }
  }

  return ( [host, port] );
};

server.addListener('connect', function (req, socket, bodyhead) {
  var hostPort = getHostPortFromString(req.url, 443);
  var hostDomain = hostPort[0];
  var port = parseInt(hostPort[1]);
  console.log("Proxying HTTPS request for:", hostDomain, port);

  var proxySocket = new net.Socket();
  proxySocket.connect(port, hostDomain, function () {
      proxySocket.write(bodyhead);
      socket.write("HTTP/" + req.httpVersion + " 200 Connection established\r\n\r\n");
    }
  );

  proxySocket.on('data', function (chunk) {
    socket.write(chunk);
  });

  proxySocket.on('end', function () {
    socket.end();
  });

  proxySocket.on('error', function () {
    socket.write("HTTP/" + req.httpVersion + " 500 Connection error\r\n\r\n");
    socket.end();
  });

  socket.on('data', function (chunk) {
    proxySocket.write(chunk);
  });

  socket.on('end', function () {
    proxySocket.end();
  });

  socket.on('error', function () {
    proxySocket.end();
  });

});
