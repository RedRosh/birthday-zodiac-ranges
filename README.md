# birthday-zodiac-ranges

This simple utility allows you to explore all possible birthday date ranges and their associated zodiac animals based on age and zodiac sign.

## Installation

```bash
npm install birthday-zodiac-ranges
```

## Usage

```javascript
import { getBirthdayZodiacRanges } from "birthday-zodiac-ranges";

const age = 25;
const starSign = "Leo";

const birthdayZodiacRange = getBirthdayZodiacRanges(age, starSign);
```

## API

getBirthdayZodiacRanges(age: number, starSign: string): BirthdayZodiacRange[]

Parameters

- `age` (number): The age for which you want to retrieve astrology information.
- `starSign` (string, optional): The star sign (e.g., 'Leo'). If not provided, the utility will not consider the zodiac sign.

Returns

An array of objects with the following structure:

- `period` (DateRange): An object representing the date range.
- `zodiacAnimal` (Object | null ): An object containing the index and name of the zodiac animal corresponding to the date range. If the dateMin and dateMax are not in the same zodiac animal, this field will be null.

Throws if

- the zodiac sign is incorrect.
- the age is less than or equal to 0.

## Note

- The zodiacAnimal field will be null if the dateMin and dateMax are not in the same zodiac animal.

## Example

```javascript
const birthdayZodiacRange = getBirthdayZodiacRanges(36, "Taurus");
// Output :
[
  {
    period: {
      dateMax: 1987-05-21T00:00:00.000Z,
      dateMin: 1987-04-21T00:00:00.000Z
    },
    zodiacAnimal: { index: 3, name: 'Rabbit' }
  }
]

```
