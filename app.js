const http = require('http');
const net = require('net');
const { WebSocket, createWebSocketStream } = require('ws');
const { TextDecoder } = require('util');

// --- Configuration ---
const userID = process.env.UUID || '89b3cbba-e6ac-485a-9481-976a0415eab9';
const port = process.env.PORT || 3000;
const credit = 'kayzal';
const uuid_no_hyphen = userID.replace(/-/g, "");

// --- Logging Functions ---
const logcb = (...args) => console.log.bind(this, ...args);
const errcb = (...args) => console.error.bind(this, ...args);

// 1. Create the HTTP server
const server = http.createServer();

// 2. Set up the HTTP request handler
server.on('request', (req, res) => {
    // Use the modern WHATWG URL API to avoid deprecation warnings
    const reqUrl = new URL(req.url, `http://${req.headers.host}`);
    console.log(`Received HTTP request for URL: ${reqUrl}`);
    
    const hostName = reqUrl.hostname;
    const wsPort = 443;
    const vlessMain = `vless://${userID}@${hostName}:${wsPort}?encryption=none&security=tls&sni=${hostName}&fp=randomized&type=ws&host=${hostName}&path=%2F#${credit}`;
    
   
    const hackerMaskASCII = `


                                               ░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░                                     
                                            ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░                                
                                          ░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒                               
                                          ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░ 
                                          ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ 
                                          ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ 
                                         ░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ 
                                         ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ 
                                         ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░
                                         ▒▒▒▒▒▒▒▒▒░░░░░░ ░░░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░░░░▒▒▒▒▒▒▒▒▒▒▒░
                                         ▒▒▒▒▒▒▒░░░▒▒▒▒░░░        ░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░        ░░ ░░░░░▒▒▒▒▒▒▒░
                                         ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░       ░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░       ░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░
                                         ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░       ░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░       ░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░
                                         ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░       ░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░      ░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░
                                         ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░     ░▒▒▒▒▒▒▒▒▒▒▒░     ░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░
                                         ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░▒▒▒▒▒▒▒▒▒▒░ ░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
                                         ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
                                        ░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
                                         ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ 
                                         ▒▒▒▒▒▒▒▒▒▒▒▒▒▒░              ░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░▒▒▒▒▒░             ░▒▒▒▒▒▒▒▒▒▒▒▒▒▒ 
                                         ▒▒▒▒▒▒▒▒▒▒▒▒▒                    ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░                   ░▒▒▒▒▒▒▒▒▒▒▒▒ 
                                         ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░               ░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░                 ░▒▒▒▒▒▒▒▒▒▒▒▒▒▒ 
                                         ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░
                                         ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░
                                         ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ 
                                         ░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ 
                                         ░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░ 
                                          ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░ 
                                          ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░▒▒▒▒▒▒  
                                          ░▒▒▒░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░▒▒▒▒▒▒▒  
                                           ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒   
                                           ░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒   
                                           ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒    
                                           ░▒▒▒▒▒▒▒░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░░░░▒▒▒▒▒▒▒░    
                                             ▒▒▒▒▒▒▒▒░ ░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒  ░▒▒▒▒▒▒▒▒     
                                             ░▒▒▒▒▒▒▒▒░ ░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░  ░▒▒▒▒▒▒▒▒▒▒▒▒▒▒░  ░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░ ░▒▒▒▒▒▒▒▒░     
                                              ▒▒▒▒▒▒▒▒▒░  ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░▒░▒░░░░░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░  ░▒▒▒▒▒▒▒▒▒      
                                              ▒▒▒▒▒▒▒▒▒░  ░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░               ░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░  ░▒▒▒▒▒▒▒▒▒░      
                                              ░▒▒▒▒▒▒▒▒▒▒   ░░▒▒▒▒▒▒▒▒▒▒▒░ ░      ░░░        ░▒▒▒▒▒▒▒▒▒▒▒▒░    ▒▒▒▒▒▒▒▒▒▒▒       
                                                ▒▒▒▒▒▒▒▒▒▒▒░      ░░▒░▒▒░ ░      ░░▒▒▒░░        ░░▒░░░░       ░▒▒▒▒▒▒▒▒▒▒▒        
                                                ▒▒▒▒▒▒▒▒▒▒▒▒▒░░                ░▒▒▒▒▒▒▒░                  ░░▒▒▒▒▒▒▒▒▒▒▒▒         
                                                  ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░░    ░▒▒▒▒▒▒▒▒▒▒░░       ░░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒          
                                                  ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░               ░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒           
                                                    ░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒            
                                                      ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░▒▒▒▒▒▒▒▒▒▒▒▒▒▒░             
                                                      ░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░░▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒               
                                                         ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░         ░▒░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░                
                                                          ░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░        ▒░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░                  
                                                            ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░       ░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒                    
                                                              ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒       ░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░                     
                                                              ░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒       ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░                       
                                                                 ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒       ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒                         
                                                                  ░▒▒▒▒▒▒▒▒▒▒▒▒▒▒       ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒                                                        
                                                                    ░▒▒▒▒▒▒▒▒▒▒▒▒░      ▒▒▒▒▒▒▒▒▒▒▒▒▒░                                                         
                                                                      ░▒▒▒▒▒▒▒▒▒▒░     ░▒▒▒▒▒▒▒▒▒▒▒░                                                           
                                                                         ▒▒▒▒▒▒▒▒▒     ░▒▒▒▒▒▒▒▒▒                                                              
                                                                            ░▒▒▒▒▒     ▒░░░░░░                                                                 
                                                                                  ░   ░                                                               
                                                             

`;

    const htmlConfigContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>VLESS Configuration</title>
    <style>
        body { margin: 0; background-color: #000; overflow: hidden; font-family: 'Courier New', Courier, monospace; }
        canvas#matrix-bg { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 1; }

        .hacker-mask-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 2;
            opacity: 0.3;
            pointer-events: none;
        }
        
        .main-content { 
            position: relative; 
            z-index: 3;
            display: flex; 
            flex-direction: column; 
            justify-content: center; 
            align-items: center; 
            min-height: 100vh; 
            padding: 20px; 
            text-align: center; 
        }

        pre#hacker-mask {
            position: relative;
            white-space: pre;
            text-align: left;
            padding: 0;
            border: none;
            background: transparent;

            /* Right side is now blue */
            color: #4D94FF; 
            font-family: 'Courier New', Courier, monospace;
            font-size: 23px; /
            line-height: 0.7;
        }

        pre#hacker-mask::before {
            content: attr(data-text);
            position: absolute;
            top: 0;
            left: 0;
            overflow: hidden;
            width: 50%;
            
            /* Left side is now red */
            color: #FF4D4D; 
            -webkit-text-stroke: 0.5px #4D94FF;
        }

        /* Styles for the simplified config display */
        .config-display {
            background: rgba(10, 10, 10, 0.4);
            border: 1px solid #0f0;
            box-shadow: 0 0 20px #0f0;
            padding: 20px 30px;
            max-width: 800px;
            width: 90%;
            color: #0f0;
        }

        pre#vless-uri-config { 
            color: #fff; 
            white-space: pre-wrap; 
            word-wrap: break-word; 
            background-color: #050505;
            border-left: 5px solid #0f0;
            padding: 15px;
            margin: 0 0 15px 0;
            text-align: left;
        }
        .copy-button { 
            background-color: #0f0; 
            color: #000; 
            border: 1px solid #0f0; 
            padding: 8px 15px; 
            cursor: pointer; 
            font-family: 'Courier New', Courier, monospace; 
            font-weight: bold; 
            transition: background-color 0.3s, color 0.3s; 
            width: 100%;
        }
        .copy-button:hover { background-color: #000; color: #0f0; }
    </style>
</head>
<body>
    <canvas id="matrix-bg"></canvas>

    <div class="hacker-mask-container">
        <pre id="hacker-mask" data-text="${hackerMaskASCII}">${hackerMaskASCII}</pre>
    </div>

    <div class="main-content">
        <!-- Removed the old container -->
        <div class="config-display">
            <pre id="vless-uri-config">${vlessMain}</pre>
            <button class="copy-button" onclick="copyToClipboard('vless-uri-config', this)">Copy_Config</button>
        </div>
    </div>
    <script>
        function copyToClipboard(elementId, buttonElement) {
            const textToCopy = document.getElementById(elementId).innerText;
            navigator.clipboard.writeText(textToCopy).then(() => {
                buttonElement.innerText = 'Copied_OK!';
                setTimeout(() => {
                    buttonElement.innerText = 'Copy_Config';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy: ', err);
            });
        }
        
        window.addEventListener('load', () => {
            const matrixCanvas = document.getElementById('matrix-bg');
            const matrixCtx = matrixCanvas.getContext('2d');
            matrixCanvas.width = window.innerWidth;
            matrixCanvas.height = window.innerHeight;
            const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
            const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            const nums = '0123456789';
            const alphabet = katakana + latin + nums;
            const fontSize = 16;
            const columns = matrixCanvas.width / fontSize;
            const rainDrops = [];
            for (let x = 0; x < columns; x++) { rainDrops[x] = 1; }
            const drawMatrix = () => {
                matrixCtx.fillStyle = 'rgba(0, 0, 0, 0.05)';
                matrixCtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
                matrixCtx.fillStyle = '#0F0';
                matrixCtx.font = fontSize + 'px monospace';
                for (let i = 0; i < rainDrops.length; i++) {
                    const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
                    matrixCtx.fillText(text, i * fontSize, rainDrops[i] * fontSize);
                    if (rainDrops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
                        rainDrops[i] = 0;
                    }
                    rainDrops[i]++;
                }
            };
            setInterval(drawMatrix, 30);
            window.addEventListener('resize', () => {
                matrixCanvas.width = window.innerWidth;
                matrixCanvas.height = window.innerHeight;
            });
        });
    </script>
</body>
</html>`;
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(htmlConfigContent);
});

// 3. Create the WebSocket server
const wss = new WebSocket.Server({ server });

// 4. WebSocket connection logic
wss.on('connection', ws => {
    console.log("WebSocket connection established");
    ws.once('message', msg => {
        const [VERSION] = msg;
        const id = msg.slice(1, 17);
        if (!id.every((v, i) => v === parseInt(uuid_no_hyphen.substr(i * 2, 2), 16))) {
            return;
        }
        let i = msg.slice(17, 18).readUInt8() + 19;
        const port = msg.slice(i, i += 2).readUInt16BE(0);
        const ATYP = msg.slice(i, i += 1).readUInt8();
        const host = ATYP === 1 ? msg.slice(i, i += 4).join('.') :
            (ATYP === 2 ? new TextDecoder().decode(msg.slice(i + 1, i += 1 + msg.slice(i, i + 1).readUInt8())) :
                (ATYP === 3 ? msg.slice(i, i += 16).reduce((s, b, i, a) => (i % 2 ? s.concat(a.slice(i - 1, i + 1)) : s), []).map(b => b.readUInt16BE(0).toString(16)).join(':') : ''));
        logcb('Connecting to:', host, port)();
        ws.send(new Uint8Array([VERSION, 0]));
        const duplex = createWebSocketStream(ws);
        net.connect({ host, port }, function() {
            this.write(msg.slice(i));
            duplex.on('error', errcb('E1:')).pipe(this).on('error', errcb('E2:')).pipe(duplex);
        }).on('error', errcb('Connection-Error:', { host, port }));
    }).on('error', errcb('WebSocket-Error:'));
});

// 5. Start the server
server.listen(port, '0.0.0.0', () => {
    console.log(`Server is listening on port ${port}`);
});

