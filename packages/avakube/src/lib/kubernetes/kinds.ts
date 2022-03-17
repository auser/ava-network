const topLevel = {
  version: "apiVersion",
  // `kind` is not transformed here, rather used as the dispatch
  // mechanism, and supplied by the specific API resource constructor
};

const objectMeta = {
  // ObjectMeta
  name: "metadata.name",
  namespace: "metadata.namespace",
  labels: "metadata.labels",
  annotations: "metadata.annotations",
};

const portRe =
  /(?:(tcp|udp):\/\/)?(?:(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}):)?(?:(\d{1,5}):)?(\d{1,5})/;

export function ports(pp) {
  function parseContainerPort(p) {
    let spec = p;
    let name;
    if (typeof p === "object") {
      for (name of Object.keys(p)) {
        spec = p[name];
        break;
      }
    } else {
      spec = String(p);
    }
    const [, /* scheme */ protocol, hostIP, hostPort, containerPort] =
      spec.match(portRe);
    const port = {
      name,
      protocol: protocol && protocol.toUpperCase(),
      hostIP,
      hostPort,
      containerPort,
    };
    Object.keys(port).forEach((k) => port[k] === undefined && delete port[k]);
    return port;
  }
  return { ports: pp.map(parseContainerPort) };
}
