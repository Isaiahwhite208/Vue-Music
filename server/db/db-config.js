let mongoose = require("mongoose")
const connectionStr = `mongodb://student:!Q2w#E4r@ds062339.mlab.com:62339/vue-music`
let connection = mongoose.connection

mongoose.connect(connectionStr, {
  useNewUrlParser: true
})

connection.on('error', err => {
  console.log("DB ERROR:", err)
})

connection.once('open', () => {
  console.log("connected to db")
})