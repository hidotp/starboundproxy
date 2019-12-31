const http = require('http')
const proxy = require('http-proxy')
const winston = require('winston')

const server_ = process.env.STARBOUND_SERVER
const port_ = process.env.STARBOUND_PORT

const {format} = require('winston');
const { combine, timestamp, printf } = format;
const logFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
  });

const logger = winston.createLogger({
    format: combine(
        timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        logFormat
      ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'proxylog.log' })
    ]
});

logger.info("Starting up Rocket for the following server: " + server_  + ":" + port_)

proxyServer= proxy.createProxyServer({target:'http://127.0.0.1:9000'})

proxyServer.listen(8000)

server = http.createServer(function (req, res) {
    logger.info("Proxy Request through Rocket: " + req.url)

    res.writeHead(200, { 'Content-Type': 'text/plain' });
  
    res.write('Proxy Request was Successful!' + '\n' + JSON.stringify(req.headers, true, 2));
  
    res.end();
  });
  
  server.listen(9000);
