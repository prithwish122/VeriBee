const path = require("path");
const express = require("express");
const app = express();
const __path = path.resolve();
const fs = require("fs");
const { runDeployTransfer } = require("./runDeploy");
// const cors = require("cors")
// app.use(cors({
  // origin: 'http://localhost:5000' // Allow requests only from this origin
// }));
console.log(__path);

app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(`${__path}/public/index.html`);
});

app.get("/create", (req, res) => {
  res.sendFile(`${__path}/public/p1.html`);
});

app.get("/view-polls", (req, res) => {
  res.sendFile(`${__path}/public/ren.html`);
});

app.get("/profile", (req, res) => {
  res.sendFile(`${__path}/public/profile.html`);
});

app.use(express.static(`${__path}/public`));

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});

app.post("/withdraw", async (req, res) => {
  console.log(req.body, "=============");
  const { clientAddress, claimAmt } = req.body;
  const template = `export const walletAddress = "${clientAddress}";
  export const claimableAmt = ${claimAmt};`;
  fs.writeFileSync("./receiver.ts", template);
  if(claimAmt > 0) {
    await runDeployTransfer();
  }
  console.log("023948,============");
  res.send(JSON.stringify({ transaction: "success" }));
});
