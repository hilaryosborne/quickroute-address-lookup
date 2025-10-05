export const pathMatches = (pattern: string, actualPath: string): boolean => {
  const regexPattern = pattern.replace(/\./g, "\\.").replace(/\[\*\]/g, "\\[\\d+\\]");
  const regex = new RegExp(`^${regexPattern}$`);
  return regex.test(actualPath);
};

export const sanitizeObject = (obj: any, currentPath: string = "", blacklisted: string[] = []): any => {
  if (obj === null || obj === undefined) return obj;
  for (const pattern of blacklisted) {
    if (pathMatches(pattern, currentPath)) return "[REDACTED]";
  }
  if (Array.isArray(obj)) {
    return obj.map((item, index) => {
      const newPath = currentPath ? `${currentPath}[${index}]` : `[${index}]`;
      return sanitizeObject(item, newPath);
    });
  }
  if (typeof obj === "object") {
    const sanitized: any = {};
    for (const [key, value] of Object.entries(obj)) {
      const newPath = currentPath ? `${currentPath}.${key}` : key;
      sanitized[key] = sanitizeObject(value, newPath, blacklisted);
    }
    return sanitized;
  }
  return obj;
};
