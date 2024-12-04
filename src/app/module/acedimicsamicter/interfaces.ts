export type MonthName =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type SamesterName = 'Autom' | 'Summer' | 'Fall';
export type SamesterCod = '01' | '02' | '03';

export interface TAcademicsamester {
  name: SamesterName;
  code: SamesterCod;
  year: string;
  statindMonth: MonthName;
  endingMonth: MonthName;
}
