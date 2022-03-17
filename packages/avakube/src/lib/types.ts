// TODO
export type ObjectMeta = any;
export interface StringObject {
  [prop: string]: string;
}

export type Selector = StringObject | SetBasedSelector;
export interface MatchExpression {
  key: string;
  operator: "In" | "NotIn" | "Exists" | "DoesNotExist";
  values?: string[];
}
export interface SetBasedSelector {
  matchLabels: { [prop: string]: string };
  matchExpressions: Array<MatchExpression>;
}

export interface KubernetesObject {
  apiVersion?: string;
  kind?: string;
  metadata?: ObjectMeta;
  spec?: any;
}

export interface CommonMetadata {
  labels?: null | StringObject;
  annotations?: null | StringObject;
  namespace?: null | string;
}
