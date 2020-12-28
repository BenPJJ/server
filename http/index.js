const http = require('http');
const fs = require('fs');
const path = require('path');
const WebSocket = require('ws');

const wss = new WebSocket.Server({
  port: 8080
});

let arr = [];

wss.on('connection', (ws) => {
  console.log('server:receive connection.' + ws._ultron.id);
  ws.on('message', (message) => { // 接受到信息
    console.log('client:' + ws._ultron.id + 'send info')
    arr.push({clinet: ws._ultron.id, msg: message});

    wss.clients.forEach(item => {
      if (item._ultron.id == ws._ultron.id) return;
      item.send(JSON.stringify(arr))
    });
  });

  ws.on('pong', () => {
    console.log('server:received pong from client')
  })
});


const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.setHeader('Content-Type','text/html;charset=utf-8');
  }
});

server.listen(3000, (err) => {
  if (err) {
    console.log('服务器开启失败！');
  }
  console.log('服务器开启成功，在3000端口')
})


