# birthday-zodiac-ranges

This simple utility allows you to explore all possible birthday date ranges and their associated zodiac animals based on age and zodiac sign.

## Installation

```bash
npm install birthday-zodiac-ranges
```

## Usage

```javascript
const { getBirthdayZodiacRanges } = require("birthday-zodiac-ranges");

const age = 25;
const starSign = "Leo";

const birthdayZodiacRange = getBirthdayZodiacRanges(age, starSign);

console.log(birthdayZodiacRange);
```

## API

getBirthdayZodiacRanges(age: number, starSign: string): BirthdayZodiacRange[]

Parameters

- `age` (number): The age for which you want to retrieve astrology information.
- `starSign` (string): The star sign (e.g., 'Leo').

Returns

An array of objects with the following structure:

- `period` (DateRange): An object representing the date range.
- `zodiacAnimal` (string): The zodiac animal corresponding to the date range.

## Example

```javascript
const birthdayZodiacRange = getBirthdayZodiacRanges(30, "Virgo");
console.log(birthdayZodiacRange);
```
