import { CalendarChinese } from "date-chinese";
import { ChineseZodiacAnimal, DateRange, Sign } from "../types";
import zodiac from "zodiac-signs";
import { chineseZodiacAnimals } from "../data/chinese-zodiac-animals";

export const getSignByName = (name: string): Sign => {
  const signInformation = zodiac().getSignByName(name);
  if (signInformation == -2) throw new Error("Invalid name: " + name);
  signInformation.dateMax = new Date(signInformation.dateMax);
  signInformation.dateMin = new Date(signInformation.dateMin);
  return signInformation;
};

export const getBirthDateRange = (age: number, sign: Sign): DateRange[] => {
  const birthDateRanges: DateRange[] = [];
  const dateRanges: DateRange[] = getDateRanges(sign);
  const currentDate = new Date();
  for (const { dateMin, dateMax } of dateRanges) {
    if (dateMin > currentDate || dateMax < currentDate) {
      dateMax.setUTCFullYear(
        getBirthYear(age, dateMax.getUTCMonth(), dateMax.getUTCDate())
      );

      dateMin.setUTCFullYear(
        getBirthYear(age, dateMin.getUTCMonth(), dateMin.getUTCDate())
      );

      birthDateRanges.push({
        dateMax,
        dateMin,
      });
    } else {
      dateMin.setUTCFullYear(
        getBirthYear(age, dateMin.getUTCMonth(), dateMin.getUTCDate())
      );

      dateMax.setUTCFullYear(
        getBirthYear(age, dateMax.getUTCMonth(), dateMax.getUTCDate())
      );

      birthDateRanges.push(
        ...[
          {
            dateMin,
            dateMax: new Date(
              Date.UTC(
                dateMin.getUTCFullYear(),
                currentDate.getUTCMonth(),
                currentDate.getUTCDate()
              )
            ),
          },
          {
            dateMin: new Date(
              Date.UTC(
                dateMax.getUTCFullYear(),
                currentDate.getUTCMonth(),
                currentDate.getUTCDate() + 1
              )
            ),
            dateMax,
          },
        ]
      );
    }
  }

  return birthDateRanges;
};

export const getAnimalZodiacFromDateRange = (
  dateRange: DateRange
): ChineseZodiacAnimal | null => {
  const zodiacAnimalDateMin = getAnimalZodiac(dateRange.dateMin);
  const zodiacAnimalDateMax = getAnimalZodiac(dateRange.dateMax);

  if (zodiacAnimalDateMin.index != zodiacAnimalDateMax.index) return null;
  return zodiacAnimalDateMin;
};

const getAnimalZodiac = (date: Date): ChineseZodiacAnimal => {
  const cal = new CalendarChinese();
  const chineseNewYear = cal.newYear(date.getUTCFullYear());
  cal.fromJDE(chineseNewYear);
  const gregorianChineseNewYear = cal.toGregorian(date.getUTCFullYear());
  const dGregorianChineseNewYear = new Date(
    Date.UTC(
      gregorianChineseNewYear.year,
      gregorianChineseNewYear.month - 1,
      gregorianChineseNewYear.day
    )
  );

  let index = (dGregorianChineseNewYear.getFullYear() - 1900) % 12;
  if (dGregorianChineseNewYear > date) index--;
  return {
    index,
    name: chineseZodiacAnimals[index],
  };
};

const getBirthYear = (
  age: number,
  birthMonth: number,
  birthDay: number
): number => {
  const currentDate = new Date();
  const currentYear = currentDate.getUTCFullYear();
  const birthYear = currentYear - age;

  const birthdayThisYear = new Date(
    Date.UTC(currentYear, birthMonth, birthDay)
  );

  if (currentDate < birthdayThisYear) return birthYear - 1;

  return birthYear;
};

const getDateRanges = (sign: Sign): DateRange[] => {
  const dateRanges: DateRange[] = [];

  const dateMin = new Date(sign.dateMin);
  const dateMax = new Date(sign.dateMax);
  const currentDate = new Date();
  dateMax.setUTCFullYear(currentDate.getUTCFullYear());
  dateMin.setUTCFullYear(currentDate.getUTCFullYear());
  if (sign.name == "Capricorn") {
    dateRanges.push(
      ...[
        {
          dateMin,
          dateMax: new Date(
            Date.UTC(dateMin.getUTCFullYear(), dateMin.getUTCMonth(), 31)
          ),
        },
        {
          dateMin: new Date(
            Date.UTC(dateMax.getUTCFullYear(), dateMax.getUTCMonth(), 1)
          ),
          dateMax,
        },
      ]
    );
  } else {
    dateRanges.push({
      dateMax: sign.dateMax,
      dateMin: sign.dateMin,
    });
  }

  return dateRanges;
};
