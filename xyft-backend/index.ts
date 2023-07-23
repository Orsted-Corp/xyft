import express from 'express'
// import { proposeTransaction } from './safe.js'
import { createSafe, addMoneyToSafe, proposeTransaction, getTransactions, confirmTransaction } from './safe'

const app = express()

app.get('/createSafe', (req, res) => {
    createSafe("0xC340b2c55d705CB4D1fb3a5D28399C7BC6FC6f37", "0xCfE5f32428494b60be1bBB86f71e59Cfb139Ea73", "")

    res.send('Safe created!')
}
)

app.get('/addMoneyToSafe', (req, res) => {
    addMoneyToSafe("0xC340b2c55d705CB4D1fb3a5D28399C7BC6FC6f37", "", "0.04", "0x8E517DCFE07B2f6D340416d1308635970094E798")

    res.send('Safe created!')
}
)

app.get('/proposeTransaction', (req, res) => {
    proposeTransaction("", "0x8E517DCFE07B2f6D340416d1308635970094E798", "0xCfE5f32428494b60be1bBB86f71e59Cfb139Ea73", "0.01")

    res.send('Safe created!')
}
)

app.get('/confirmTransaction', (req, res) => {
    confirmTransaction("0xC340b2c55d705CB4D1fb3a5D28399C7BC6FC6f37", "", "0x8E517DCFE07B2f6D340416d1308635970094E798", "0xCfE5f32428494b60be1bBB86f71e59Cfb139Ea73", "30000000000000000", "0xffddbee0dabebbb04004398c6e0170ff4175120d87213b6e0525ebf3d447069e")

    res.send('Safe created!')
}
)

app.listen(5555, () => {
    console.log('Server is up on port 5555.')
})
