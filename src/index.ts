import { BirthdayZodiacRange, DateRange, Sign } from "./types";
import {
  getAnimalZodiacFromDateRange,
  getBirthDateRange,
  getSignByName,
} from "./utils";

const getBirthdayZodiacRanges = (
  age: number,
  starSign: string
): BirthdayZodiacRange[] => {
  const sign: Sign = getSignByName(starSign);
  const birthDateRanges: DateRange[] = getBirthDateRange(age, sign);

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
