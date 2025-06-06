const WebSocket = require('ws');
const net = require('net');
const http = require('http');
const url = require('url');

// --- VLESS Configuration ---
// This UUID should be kept secret. You can use an environment variable for better security.
const userID = process.env.UUID || '89b3cbba-e6ac-485a-9481-976a0415eab9';
const proxyIP = process.env.PROXYIP || "64.68.192." + Math.floor(Math.random() * 255);
const credit = 'kzl'; // You can customize this name

// Create an HTTP server to handle both web requests and WebSocket upgrades.
const server = http.createServer();

// --- HTTP Server to Display VLESS Config ---
server.on('request', (req, res) => {
    // This handler serves the HTML configuration page for any non-WebSocket request.
    const reqUrl = url.parse(req.url).pathname;

    // Log the incoming request to help with debugging if issues persist.
    console.log(`Received HTTP request for URL: ${req.url}, Pathname: ${reqUrl}`);
    
    // Serve the VLESS config page for any standard HTTP GET request.
    const hostName = req.headers.host || 'your-domain.com'; // Dynamically get hostname from request
    const port = 443; // Standard port for WebSocket over TLS

    // VLESS configuration link
    const vlessMain = `vless://${userID}@${hostName}:${port}?encryption=none&security=tls&sni=${hostName}&fp=randomized&type=ws&host=${hostName}&path=%2F%3Fed%3D2048#${credit}`;

    // Clash-Meta configuration block
    const clashMetaConfig = `
- type: vless
  name: ${credit}-${hostName}
  server: ${hostName}
  port: ${port}
  uuid: ${userID}
  network: ws
  tls: true
  udp: false
  sni: ${hostName}
  client-fingerprint: chrome
  ws-opts:
    path:
    headers:
      host: ${hostName}
`;

    // HTML page to display the configurations
    const htmlConfigContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>VLESS Configuration</title>
    <style>
        body { font-family: 'Segoe UI', sans-serif; display: flex; flex-direction: column; justify-content: center; align-items: center; min-height: 100vh; margin: 0; background-color: #f0f2f5; color: #333; text-align: center; padding: 20px; }
        .container { background-color: #ffffff; padding: 30px 40px; border-radius: 12px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); max-width: 800px; width: 90%; margin-bottom: 20px; }
        h1 { color: #2c3e50; }
        h2 { color: #34495e; border-bottom: 2px solid #eee; padding-bottom: 5px; }
        .config-block { background-color: #e9ecef; border-left: 5px solid #007bff; padding: 15px 20px; margin: 15px 0; border-radius: 8px; text-align: left; position: relative; }
        pre { white-space: pre-wrap; word-wrap: break-word; font-family: 'Cascadia Code', monospace; font-size: 0.95em; color: #36454F; }
        .copy-button { position: absolute; top: 10px; right: 10px; background-color: #28a745; color: white; border: none; padding: 8px 15px; border-radius: 5px; cursor: pointer; transition: background-color 0.3s ease; }
        .copy-button:hover { background-color: #218838; }
        .footer { margin-top: 15px; font-size: 0.9em; color: #888; }
        .footer a { color: #007bff; text-decoration: none; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🔑 Your VLESS Configuration</h1>
        <p>Click the "Copy" button to easily transfer settings to your client.</p>
        <h2>VLESS URI (v2rayN, V2RayNG, etc.)</h2>
        <div class="config-block">
            <pre id="vless-uri-config">${vlessMain}</pre>
            <button class="copy-button" onclick="copyToClipboard('vless-uri-config', this)">Copy</button>
        </div>
        <h2>Clash-Meta Configuration</h2>
        <div class="config-block">
            <pre id="clash-meta-config">${clashMetaConfig.trim()}</pre>
            <button class="copy-button" onclick="copyToClipboard('clash-meta-config', this)">Copy</button>
        </div>
    </div>
    <script>
        function copyToClipboard(elementId, buttonElement) {
            const textToCopy = document.getElementById(elementId).innerText;
            navigator.clipboard.writeText(textToCopy).then(() => {
                buttonElement.innerText = 'Copied!';
                buttonElement.style.backgroundColor = '#007bff';
                setTimeout(() => {
                    buttonElement.innerText = 'Copy';
                    buttonElement.style.backgroundColor = '#28a745';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy: ', err);
                alert('Failed to copy. Please do it manually.');
            });
        }
    </script>
    <div class="footer">
        Powered by Node.js. For support, contact <a href="https://t.me/modsbots_tech" target="_blank">@modsbots_tech</a>.
    </div>
</body>
</html>`;
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(htmlConfigContent);
});


// --- WebSocket Server Setup ---
// Attach the WebSocket server to the HTTP server.
const wss = new WebSocket.Server({ server });

let address = '';
let portWithRandomLog = '';
const log = (/** @type {string} */ info, /** @type {string | undefined} */ event) => {
    console.log(`[${address}:${portWithRandomLog}] ${info}`, event || '');
};

// --- WebSocket VLESS Logic (Restored to original structure) ---
wss.on('connection', (ws) => {
    log("WebSocket connection established");
  
    ws.once('message', (chunk) => {
        let webSocket = ws;
        let remoteSocketWapper = {
            value: null,
        };

        const {
            hasError,
            message,
            portRemote = 443,
            addressRemote = '',
            rawDataIndex,
            vlessVersion = new Uint8Array([0, 0]),
            isUDP,
        } = processVlessHeader(chunk, userID);

        address = addressRemote;
        portWithRandomLog = `${portRemote}--${Math.random()} ${isUDP ? 'udp' : 'tcp'}`;

        if (hasError) {
            log('VLESS Header Error:', message);
            ws.close();
            return;
        }

        const vlessResponseHeader = new Uint8Array([vlessVersion[0], 0]);
        const rawClientData = chunk.slice(rawDataIndex);

        handleTCPOutBound(remoteSocketWapper, addressRemote, portRemote, rawClientData, webSocket, vlessResponseHeader, log);
    });

    ws.on('error', (err) => {
        log('WebSocket error:', err.message);
    });

    ws.on('close', () => {
        log('WebSocket connection closed');
    });
});

async function handleTCPOutBound(remoteSocketWapper, addressRemote, portRemote, rawClientData, webSocket, vlessResponseHeader, log) {
    
    async function connectAndWrite(address, port) {
        return new Promise((resolve, reject) => {
            const remoteSocket = net.createConnection({ host: address, port: port }, () => {
                log(`Connected to remote: ${address}:${port}`);
                remoteSocketWapper.value = remoteSocket;
                remoteSocket.write(rawClientData);
                resolve(remoteSocket);
            });
            remoteSocket.on('error', (err) => {
                reject(err);
            });
        });
    }

    async function retry() {
        try {
            log(`Retrying with proxyIP: ${proxyIP}`);
            const tcpSocket = await connectAndWrite(proxyIP, portRemote);
            remoteSocketToWS(tcpSocket, webSocket, vlessResponseHeader, null, log);
        } catch (error) {
            log(`Fallback connection to proxyIP failed:`, error.message);
            safeCloseWebSocket(webSocket);
        }
    }
    
    try {
        const tcpSocket = await connectAndWrite(addressRemote, portRemote);
        remoteSocketToWS(tcpSocket, webSocket, vlessResponseHeader, retry, log);
    } catch(error) {
        log(`Initial connection to ${addressRemote} failed:`, error.message);
        retry();
    }
}

function remoteSocketToWS(remoteSocket, webSocket, vlessResponseHeader, retry, log) {
    let vlessHeader = vlessResponseHeader;
    let isSocketClosed = false;

    remoteSocket.on('data', (data) => {
        if (webSocket.readyState === WebSocket.OPEN) {
            if (vlessHeader) {
                // Node.js Buffer is used here instead of Blob for server-side environments.
                const combinedData = Buffer.concat([vlessHeader, data]);
                webSocket.send(combinedData);
                vlessHeader = null;
            } else {
                webSocket.send(data);
            }
        }
    });

    remoteSocket.on('end', () => {
        log('Remote socket ended');
        isSocketClosed = true;
        safeCloseWebSocket(webSocket);
    });

    remoteSocket.on('error', (err) => {
        log(`Remote socket error:`, err.message);
        isSocketClosed = true;
        safeCloseWebSocket(webSocket);
        // Fallback retry logic is now handled in handleTCPOutBound's catch block
    });
}


function processVlessHeader(vlessBuffer, userID) {
    if (vlessBuffer.byteLength < 24) {
        return { hasError: true, message: 'invalid data: too short' };
    }
    const version = new Uint8Array(vlessBuffer.slice(0, 1));
    const receivedUserID = stringify(new Uint8Array(vlessBuffer.slice(1, 17)));
    if (receivedUserID !== userID) {
        return { hasError: true, message: 'invalid user' };
    }

    const optLength = vlessBuffer[17];
    const command = vlessBuffer[18 + optLength];
    let isUDP = command === 2;

    const portIndex = 18 + optLength + 1;
    const portRemote = vlessBuffer.readUInt16BE(portIndex);

    let addressIndex = portIndex + 2;
    const addressType = vlessBuffer[addressIndex];
    let addressLength = 0;
    let addressValueIndex = addressIndex + 1;
    let addressValue = '';

    switch (addressType) {
        case 1: // IPv4
            addressLength = 4;
            addressValue = Array.from(vlessBuffer.slice(addressValueIndex, addressValueIndex + addressLength)).join('.');
            break;
        case 2: // Domain
            addressLength = vlessBuffer[addressValueIndex];
            addressValueIndex += 1;
            addressValue = new TextDecoder().decode(vlessBuffer.slice(addressValueIndex, addressValueIndex + addressLength));
            break;
        case 3: // IPv6
            addressLength = 16;
            const ipv6 = [];
            for (let i = 0; i < 8; i++) {
                ipv6.push(vlessBuffer.readUInt16BE(addressValueIndex + i * 2).toString(16));
            }
            addressValue = ipv6.join(':');
            break;
        default:
            return { hasError: true, message: `invalid addressType: ${addressType}` };
    }

    if (!addressValue) {
        return { hasError: true, message: 'empty addressValue' };
    }

    return {
        hasError: false,
        addressRemote: addressValue,
        portRemote,
        rawDataIndex: addressValueIndex + addressLength,
        vlessVersion: version,
        isUDP,
    };
}

const byteToHex = [];
for (let i = 0; i < 256; ++i) {
    byteToHex.push((i + 256).toString(16).slice(1));
}

function stringify(arr) {
    const uuid = (
        byteToHex[arr[0]] + byteToHex[arr[1]] + byteToHex[arr[2]] + byteToHex[arr[3]] + "-" +
        byteToHex[arr[4]] + byteToHex[arr[5]] + "-" +
        byteToHex[arr[6]] + byteToHex[arr[7]] + "-" +
        byteToHex[arr[8]] + byteToHex[arr[9]] + "-" +
        byteToHex[arr[10]] + byteToHex[arr[11]] + byteToHex[arr[12]] + byteToHex[arr[13]] + byteToHex[arr[14]] + byteToHex[arr[15]]
    ).toLowerCase();
    return uuid;
}

function safeCloseWebSocket(socket) {
    try {
        if (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CLOSING) {
            socket.close();
        }
    } catch (error) {
        console.error('safeCloseWebSocket error', error);
    }
}


// --- Start Server ---
// Platforms like lide.io, Heroku, or Render set the PORT environment variable.
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    console.log('Access your domain to get the VLESS configuration link.');
});

