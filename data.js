const clientId = 'mqttjs_' + Math.random().toString(16).substr(2, 8);
const host = 'ws://test.mosquitto.org:8080';

const options = {
    keepalive: 30,
    clientId: clientId,
    protocolId: 'MQTT',
    protocolVersion: 3,
    clean: true,
    reconnectPeriod: 1000,
    connectTimeout: 30 * 1000,
    will: {
      topic: 'WillMsg',
      payload: 'Connection Closed abnormally..!',
      qos: 0,
      retain: false
    },
    rejectUnauthorized: false
  }

  console.log('menghubungkan ke broker');
  const client = mqtt.connect(host, options);

  client.on('connect', function(){
    console.log('terhubung, clientId:' + clientId);
    client.subscribe('nusabot/#', {qos: 0})
  })

  client.on('error', function(err){
    console.log(err);
    client.end();
  })
  
  client.on('message', function(topic, message, packet){
    console.log('Received Message:= ' + message.toString() + '\nOn topic:= ' + topic)
  })