export const formattedDate = (date: any): string => date.toISOString().slice(0, 19).replace('T', ' ')
