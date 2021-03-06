import { NextApiRequest, NextApiResponse } from 'next'
import request from "request";

const handler = (req: NextApiRequest, res: NextApiResponse<Blob>) => {
  const filePath = req.query.filePath as string;

  const fileName = filePath.substring(filePath.lastIndexOf("/") + 1);

  res.setHeader("Content-Disposition", "attachment; filename* = UTF-8''" + fileName);

  request
    .get(process.env.REMOTE_URL + filePath)
    .on("error", function() {
      res.status(404)
      res.writeHead(404, { "Content-Type": "text/html" });
      res.write("<h1>404 Not Found</h1>");
      res.end();
      return;
    })
    .pipe(res); 

}

export default handler