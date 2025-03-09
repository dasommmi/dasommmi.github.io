export const formattedDate = (date: string): string => new Date(date).toISOString().slice(0, 19).replace('T', ' ')
