
module.exports = {
  html : function(title, list, body) {
    return `
    <!doctype html>
    <html>
    <head>
      <title>WEB1 - ${title}</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h1><a href="/">WEB</a></h1>
      <ol>
        ${list}
      </ol>
        ${body}
    </body>
    </html>
    `
  },
  getlist : function(files) {
    var list = "";
    files.forEach(file => {
      list += `<li><a href="/?id=${file}">${file}</a></li>`
    })
    return list;
  },
  creat_listbody : function(title, description) {
    return `
    <a href="/create">Create</a>
    <a href="/update?id=${title}">update</a>
    <form action="/process_delete" method="post">
      <input type="hidden" name="title" value=${title}>
      <input type="submit" value="delete">
    </form>
    <h2>${title}</h2>
    <p>${description}</p>`
  },
  data_to_string : function(request) {
    var body = '';
    request.on('data', (data) => {
      body = data.toString('utf8')
    })
  }
}
