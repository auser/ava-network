/**
 * Taken from https://kubernetes.io/docs/concepts/overview/working-with-objects/common-labels/#labels
 */
export enum AppLabels {
  Name = "app.kubernetes.io/name",
  Instance = "app.kubernetes.io/instance",
  Version = "app.kubernetes.io/version",
  Component = "app.kubernetes.io/component",
  PartOf = "app.kubernetes.io/part-of",
  ManagedBy = "app.kubernetes.io/managed-by",
}

/**
 * Create standard app name label object to use for selectors.
 * @param name App name
 */
export const appNameSelector = (name: string): { [prop: string]: string } => ({
  [AppLabels.Name]: name,
});
