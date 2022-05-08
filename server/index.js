const express = require('express')
const app = express()
const port = 30003

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get(`/api/login`,(req,res)=>{
    let data = {
        token:'token'
    }
    res.send(JSON.stringify)
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}) 