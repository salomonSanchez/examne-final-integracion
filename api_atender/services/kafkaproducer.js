const kafka = require('kafka-node')

var client = new kafka.KafkaClient({ kafkaHost: '168.63.41.72:9091' })
var producer = new kafka.Producer(client);

producer.on('ready', async function() {
    console.log('Producer is ready')
})

producer.send([{ topic: 'atender', messages: 'started' }], (error, result) => {
    if (error) {
        console.log('error send msg initial:', error)
    }
    console.log('producer send initial message')
})

producer.on('error', function(error) {
    throw error
})
producer.on('offsetOutOfRange', function(error) {
    throw error
})
module.exports = producer