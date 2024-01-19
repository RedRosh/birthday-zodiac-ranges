import { CalendarChinese } from "date-chinese";

export type Sign = {
  name: string;
  element: string;
  stone: string;
  symbol: string;
  dateMin: Date;
  dateMax: Date;
};

export type DateRange = {
  dateMin: Date;
  dateMax: Date;
};

export type ChineseDateRange = {
  dateMin: CalendarChinese;
  dateMax: CalendarChinese;
};

export type ChineseZodiacAnimal = {
  index: number;
  name: string;
};

export type BirthdayZodiacRange = {
  period: DateRange;
  zodiacAnimal: ChineseZodiacAnimal;
};
