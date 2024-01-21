import { BirthdayZodiacRange, DateRange, Sign } from "./types";
import {
  getAnimalZodiacFromDateRange,
  getBirthDateRange,
  getSignByName,
} from "./utils";

const getBirthdayZodiacRanges = (
  age: number,
  starSign: string = ""
): BirthdayZodiacRange[] => {
  let birthDateRanges: DateRange[];

  const sign: Sign = starSign
    ? getSignByName(starSign)
    : {
        name: "unknown",
        stone: "unknown",
        symbol: "unknown",
        element: "unknown",
        dateMin: new Date(Date.UTC(new Date().getFullYear(), 0, 1)),
        dateMax: new Date(Date.UTC(new Date().getFullYear(), 11, 31)),
      };
  birthDateRanges = getBirthDateRange(age, sign);

  const birthdayZodiacRange: BirthdayZodiacRange[] = [];

  for (const birthDateRange of birthDateRanges) {
    const zodiacAnimal = getAnimalZodiacFromDateRange(birthDateRange);

    birthdayZodiacRange.push({
      period: birthDateRange,
      zodiacAnimal: zodiacAnimal,
    });
  }

  return birthdayZodiacRange;
};

export { getBirthdayZodiacRanges };
export * from "./types";
