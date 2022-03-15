import buildCluster from "./cluster";

global.exports = null;

export default async function () {
  const cluster = await buildCluster();
  return [...cluster];
}
