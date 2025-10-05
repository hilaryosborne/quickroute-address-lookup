export const pathMatches = (pattern: string, actualPath: string): boolean => {
  const regexPattern = pattern.replace(/\./g, "\\.").replace(/\[\*\]/g, "\\[\\d+\\]");
  const regex = new RegExp(`^${regexPattern}$`);
  return regex.test(actualPath);
};

const sanitizeObject = (obj: any, currentPath: string = ""): any => {
  //   if (obj === null || obj === undefined) return obj;

  //   // Check if current path should be redacted
  //   for (const pattern of this.blacklistedPaths) {
  //     if (pathMatches(pattern, currentPath)) {
  //       return "[REDACTED]";
  //     }
  //   }

  //   // Handle arrays
  //   if (Array.isArray(obj)) {
  //     return obj.map((item, index) => {
  //       const newPath = currentPath ? `${currentPath}[${index}]` : `[${index}]`;
  //       return sanitizeObject(item, newPath);
  //     });
  //   }

  //   // Handle objects
  //   if (typeof obj === "object") {
  //     const sanitized: any = {};
  //     for (const [key, value] of Object.entries(obj)) {
  //       const newPath = currentPath ? `${currentPath}.${key}` : key;
  //       sanitized[key] = sanitizeObject(value, newPath);
  //     }
  //     return sanitized;
  //   }

  // Primitive values
  return obj;
};
