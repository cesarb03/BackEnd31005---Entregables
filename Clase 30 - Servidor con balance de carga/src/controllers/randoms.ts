import { Request, Response } from 'express'
import { fork } from 'child_process'

export const getRandomNumbers = (req: Request, res: Response) => {
  const { cant } = req.query
  let qty = Number(cant)
  if (!qty) qty = 100000000
  const child = fork("./src/utils/getRandom.js")
  child.send(qty)
  child.on("message", (msg) => {
    //res.send(msg)
    res.end(JSON.stringify(msg, null, 2))

  })

  child.on("exit", (code) => {
    console.log("Se ha cerrado el proceso", code)
  })
}