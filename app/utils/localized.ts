export function localized(obj: object, field: string, locale: string): string {
  const key = `${field}_${locale}`
  return ((obj as Record<string, unknown>)[key] as string) ?? ''
}
