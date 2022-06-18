const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');
const template = require('./lib/template.js');

var app = http.createServer((request,response) => {
    var _url = request.url;
    var queryData = url.parse(_url,true).query;
    var pathname = url.parse(_url,true).pathname;
    var title = queryData.id;

    function bodyTemplate(title, body){
      fs.readdir("text/",(err,files) => {
        var list = template.getlist(files);
        var html = template.html(title, list, body);
        response.writeHead(200);
        response.end(html);
      })
    }

    if(pathname === '/'){
      if(title === undefined){
        title = "Welcome";
        var description = "hello";
        body = template.creat_listbody(title, description);
        bodyTemplate(title, body);
      } else {
        fs.readFile(`text/${title}`,'utf8', (err, description) => {
          body = template.creat_listbody(title, description);
          bodyTemplate(title, body);
        })
      }
    } else if(pathname === '/create') {
        body = `
        <form action= "http://localhost:3000/process_create" method="post">
          <p><input type="text" name="title" placeholder="title"></p>
          <p>
            <textarea name="description" placeholder="description"></textarea>
          </p>
          <p>
            <input type="submit">
          </p>
        </form>`
        bodyTemplate(title, body);
    } else if (pathname === '/process_create') {
      var body = '';
      request.on('data', (data) => {
        body = data.toString('utf8')
      })
      request.on('end', () => {
        var post = qs.parse(body);
        fs.writeFile(`text/${post.title}`,`${post.description}`,() => {
          response.writeHead(302, {Location: `/?id=${post.title}`});
          response.end('success');
        })
      })
    } else if(pathname === '/update' ) {
      fs.readFile(`text/${title}`,'utf8', (err, description) => {
        body = `
        <form action= "http://localhost:3000/process_update" method="post">
          <input type="hidden" name="id" value=${title}>
          <p><input type="text" name="title" value=${title}></p>
          <p>
            <textarea name="description" >${description}</textarea>
          </p>
          <p>
            <input type="submit">
          </p>
        </form>`
        bodyTemplate(title, body);
      })
    } else if(pathname === '/process_update') {
      template.data_to_string(request);
      request.on('end', () => {
        var post = qs.parse(body);
        fs.rename(`text/${post.id}`,`text/${post.title}`,() => {
          fs.writeFile(`text/${post.title}`,`${post.description}`,() => {
            response.writeHead(302, {Location: `/?id=${post.title}`});
            response.end('success');
          })
        })
      })
    } else if(pathname === '/process_delete') {
      template.data_to_string(request);
      request.on('end', () => {
        var post = qs.parse(body);
        fs.unlink(`text/${post.title}`,() => {
          response.writeHead(302, {Location: `/`});
          response.end('success');
        })
      })
    } else {
      response.writeHead(404);
      response.end("Not found");
    }

});

app.listen(3000);
