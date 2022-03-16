import buildCluster from "./cluster";

export default async function () {
  const cluster = await buildCluster();
  return [...cluster];
}
