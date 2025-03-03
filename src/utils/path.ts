import path from 'path'
import { BASE_PATH } from '@/constants/config'

export const CATEGORY_PATH = (category: string): string => path.join(process.cwd(), BASE_PATH, category)
