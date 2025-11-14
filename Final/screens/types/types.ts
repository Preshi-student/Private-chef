// types.ts
export type Course = 'Hors Oeuvres' | 'Soup' | 'Appetiser' | 'Cuisine';

export interface MenuItem {
  id: string;
  dishName: string;
  description: string;
  price: number;
  course: Course;
}