// types.ts
export const COURSES = ['Hors Oeuvres', 'Cuisine', 'Soup', 'Appetiser'] as const;
export type Course = typeof COURSES[number];

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  course: Course;
}

export type RootStackParamList = {
  Home: undefined;
  ViewManagement: undefined;
  MenuManagement: undefined;
  Filter: undefined;
};
