export const TALUKAS = [
  'Nanded City',
  'Ardhapur',
  'Bhokar',
  'Biloli',
  'Deglur',
  'Dharmabad',
  'Hadgaon',
  'Himayatnagar',
  'Kandhar',
  'Kinwat',
  'Loha',
  'Mahur',
  'Mudkhed',
  'Mukhed',
  'Naigaon (Khairgaon)',
  'Nanded Rural',
  'Umri',
] as const;

export type Taluka = (typeof TALUKAS)[number];

export const FREE_TALUKA: Taluka = 'Nanded City';
