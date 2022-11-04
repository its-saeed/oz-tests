const {ethers} = require("hardhat");

function chunk (array, size = 1) {
  return Array.range(Math.ceil(array.length / size)).map(i => array.slice(i * size, i * size + size));
}

function range (start, stop = undefined, step = 1) {
  if (!stop) { stop = start; start = 0; }
  return start < stop ? Array(Math.ceil((stop - start) / step)).fill().map((_, i) => start + i * step) : [];
}

function unique (array, op = x => x) {
  return array.filter((obj, i) => array.findIndex(entry => op(obj) === op(entry)) === i);
}

function zip (...args) {
  return Array(Math.max(...args.map(arg => arg.length))).fill(null).map((_, i) => args.map(arg => arg[i]));
}

async function sendEths(
  senderSigner,
  to,
  value,
  )
{
  const valueFromWeb3 = ethers.BigNumber.from(value.toString());
  const tx = await senderSigner.sendTransaction({
    to,
    value: valueFromWeb3
  })

  await ethers.provider.waitForTransaction(tx.hash);
};


module.exports = {
  chunk,
  range,
  unique,
  zip,
  sendEths,
};
