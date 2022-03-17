export const Namespace = (name: string) => ({
  apiVersion: "v1",
  kind: "Namespace",
  metadata: {
    name,
  },
});

export const ConfigMap = (name: string, { data, ...metadata }: any) => ({
  apiVersion: "v1",
  kind: "ConfigMap",
  metadata: { name, ...metadata },
  data,
});
