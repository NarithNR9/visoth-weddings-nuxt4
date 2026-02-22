export function localized<T extends Record<string, unknown>>(obj: T, field: string, locale: string): string {
  const key = `${field}_${locale}` as keyof T
  return (obj[key] as string) ?? ''
}
