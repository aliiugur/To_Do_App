import { twMerge } from 'tailwind-merge';
import { clsx, type ClassValue } from 'clsx';

// tailwind sınıflarını birleştirme yardımcı fonksiyonu
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}