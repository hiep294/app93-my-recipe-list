require('dotenv').config()
require('hiep294-mongoose')(process.env.MONGOURI)
const express = require('express')
const app = express()
const path = require('path')

// body parser
app.use(express.json())
app.use('/api/recipes', require('./routes/api/recipes'))

// serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // set static folder
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server is ready at port ${PORT}`))
