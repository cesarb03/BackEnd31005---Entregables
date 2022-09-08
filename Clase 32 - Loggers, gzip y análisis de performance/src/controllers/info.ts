import { Request, Response } from 'express';
import os from 'os'


const renderInfo = (req: Request, res: Response) => {
  // const { name, email } = req.user as any;
  const cpuQty: Number = os.cpus().length

  const infoDisplayed = {
    title: process.argv,
    arguments: process.argv,
    system: process.platform,
    version: process.version,
    memory: process.memoryUsage.rss(),
    path: process.execPath,
    id: process.pid,
    folder: process.cwd(),
    processNumber: cpuQty,
    // name,
    // email,
  }
  // console.log(infoDisplayed)
  return res.render('info', infoDisplayed)
}

export default renderInfo