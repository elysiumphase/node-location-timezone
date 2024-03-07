# node-location-timezone <!-- omit in toc -->

## Table of Contents <!-- omit in toc -->

- [Presentation](#presentation)
- [Installation](#installation)
- [Technical information](#technical-information)
  - [Stack](#stack)
  - [Code quality](#code-quality)
  - [Tests](#tests)
  - [Security](#security)
- [Requirements](#requirements)
- [Usage](#usage)
  - [Import](#import)
  - [Lib](#lib)
    - [Capitals and Countries](#capitals-and-countries)
      - [Capital interface](#capital-interface)
      - [Country interface](#country-interface)
      - [findCapitalOfCountryIso(code: string)](#findcapitalofcountryisocode-string)
      - [findCapitalOfCountryName(name: string)](#findcapitalofcountrynamename-string)
      - [findCountryByCapitalName(name: string)](#findcountrybycapitalnamename-string)
      - [findCountryByIso(code: string)](#findcountrybyisocode-string)
      - [findCountryByName(name: string)](#findcountrybynamename-string)
      - [getCapitals()](#getcapitals)
      - [getCountries()](#getcountries)
      - [getCountryIso2CodeByIso3(iso3: string)](#getcountryiso2codebyiso3iso3-string)
      - [getCountryIso2Codes()](#getcountryiso2codes)
      - [getCountryIso3CodeByIso2(iso2: string)](#getcountryiso3codebyiso2iso2-string)
      - [getCountryIso3Codes()](#getcountryiso3codes)
      - [isValidCountryIso(code: string)](#isvalidcountryisocode-string)
    - [Locations](#locations)
      - [Location interface](#location-interface)
      - [findLocationsByCoordinates(coordinates: object)](#findlocationsbycoordinatescoordinates-object)
      - [findLocationsByCountryIso(code: string)](#findlocationsbycountryisocode-string)
      - [findLocationsByCountryName(name: string, partialMatch: boolean)](#findlocationsbycountrynamename-string-partialmatch-boolean)
      - [findLocationsByProvince(name: string, partialMatch: boolean)](#findlocationsbyprovincename-string-partialmatch-boolean)
      - [findLocationsByState(name: string, partialMatch: boolean)](#findlocationsbystatename-string-partialmatch-boolean)
      - [getLocations()](#getlocations)
    - [States ANSI](#states-ansi)
      - [StateAnsi interface](#stateansi-interface)
      - [findStateAnsiByFipsCode(code: string)](#findstateansibyfipscodecode-string)
      - [findStateAnsiByGnisid(id: string)](#findstateansibygnisidid-string)
      - [findStateAnsiByName(name: string)](#findstateansibynamename-string)
      - [findStateAnsiByUspsCode(code: string)](#findstateansibyuspscodecode-string)
      - [getStatesAnsi()](#getstatesansi)
    - [Timezones](#timezones)
      - [findTimezoneByCapitalOfCountryIso(code: string)](#findtimezonebycapitalofcountryisocode-string)
      - [findTimezoneByCapitalOfCountryName(name: string)](#findtimezonebycapitalofcountrynamename-string)
      - [findTimezoneByCityName(name: string)](#findtimezonebycitynamename-string)
      - [findTimezonesByCountryIso(code: string)](#findtimezonesbycountryisocode-string)
      - [findTimezonesByCountryName(name: string)](#findtimezonesbycountrynamename-string)
      - [getTimezones()](#gettimezones)
  - [Errors](#errors)
  - [Development](#development)
    - [Linting](#linting)
    - [Unit test](#unit-test)
    - [Building lib files from data](#building-lib-files-from-data)
- [Known issues](#known-issues)
- [Code of Conduct](#code-of-conduct)
- [Contributing](#contributing)
- [Support](#support)
- [Security](#security-1)
- [License](#license)

## Presentation

A performant library to get information about capitals, countries, locations (cities), states ANSI (USA) and get the timezone of a city, capital, coordinates, country, province or even state.

Inspired by [city-timezones](https://github.com/kevinroberts/city-timezones) and [countries-capitals](https://github.com/chgasparoto/countries-capitals).

What differentiates this library from the ones mentioned above is:

- data compressed using [zipson](https://github.com/jgranstrom/zipson)
- its quality of data controlled and updated:
  - country names and list come from [the United Nations](https://unterm.un.org/unterm2/en/country) and [the World Factbook](https://www.cia.gov/the-world-factbook/)
  - all alpha-2 and alpha-3 ISO 3166-1 country codes are referenced and fixed from original data
  - all ANSI (American National Standards Institute) codes are referenced in the data
  - only `Intl` native library's supported timezones are used and fixed from original data (please see `Intl.supportedValuesOf('timeZone')` using the latest version of Node.js)
- multiple ways of getting information about:
  - capitals
  - countries and ISO codes
  - locations (cities)
  - states ANSI (USA)
- the different ways of getting a timezone, by:
  - city
  - capital
  - coordinates
  - country
  - province
  - state
- using TypeScript, clear interfaces and documentation
- tested.

**Important notes**:

- 3 non-official countries have been added special codes not referenced in the ISO 3166-1:
  - `Northern Cyprus`: `XC`/`CYN`
  - `Kosovo`: `XK`/`KOS`
  - `Somaliland`: `XS`/`SOL`
- coordinates are in decimals.

Please feel free to contribute by adding or fixing [locations](docs/locations.json), [country ISO 3166 alpha-2 codes](docs/countries-iso2.js), [country ISO 3166-1 alpha-3 codes](docs/countries-iso3.js) or [capitals](docs/countries-capital.json) in the corresponding file.

## Installation

`npm install --save node-location-timezone`

## Technical information

### Stack

- Language: JavaScript ES6/ES7
- Node.js >= 14.5.0
- TypeScript >= 5 (for development)

### Code quality

Code style follows [Airbnb JavaScript Best Practices](https://github.com/airbnb/javascript) using ESLint.

### Tests

Jest for unit testing.

### Security

- [Code security](https://docs.npmjs.com/packages-and-modules/securing-your-code) and most precisely module dependencies can be audited running `npm audit`.

## Requirements

- See [Stack](#stack)

## Usage

### Import

```javascript
import locationTimezone from 'node-location-timezone';

const locationTimezone = require('node-location-timezone');
```

### Lib

- `locationTimezone` **<Object\>** with the following properties.

NOTE:

- each attribute as defined in the interfaces has the empty string `''` set if the data is unavailable meaning no `null` values can be found.

#### Capitals and Countries

##### Capital interface

- `name` **<String\>**
- `nameAscii` **<String\>**
- `latitude` **<Number\>**
- `longitude` **<Number\>**
- `province` **<String\>**
- `state` **<String\>** Official United States Postal Service (USPS) code for the US.
- `timezone` **<String\>**
- `country?` **<Country\>**

##### Country interface

- `name` **<String\>**
- `officialName` **<String\>**
- `iso2` **<String\>**
- `iso3` **<String\>**
- `timezones` **<String[]\>**
- `capital?` **<Capital\>**

##### findCapitalOfCountryIso(code: string)

Find the capital of a country by its country ISO 3166-1 alpha-2 or alpha-3 code.

- `code` **<String\>** Country ISO code (case insensitive).
- Returns: **<Capital\>** | **undefined**

Examples:

```javascript
locationTimezone.findCapitalOfCountryIso('US');

/*{
  name: 'Washington, D.C.',
  nameAscii: 'Washington, D.C.',
  country: {
    name: 'United States of America',
    officialName: 'The United States of America',
    iso2: 'US',
    iso3: 'USA',
    timezones: [
      'America/Adak',         'America/Anchorage',
      'America/Boise',        'America/Chicago',
      'America/Denver',       'America/Detroit',
      'America/Indianapolis', 'America/Juneau',
      'America/Los_Angeles',  'America/Louisville',
      'America/Menominee',    'America/New_York',
      'America/Nome',         'America/Phoenix',
      'America/Sitka',        'America/Yakutat',
      'Pacific/Honolulu'
    ]
  },
  latitude: 38.89954938,
  longitude: -77.00941858,
  province: 'District of Columbia',
  state: 'DC',
  timezone: 'America/New_York'
*/

locationTimezone.findCapitalOfCountryIso('Jpn');

/*{
  name: 'Tokyo',
  nameAscii: 'Tokyo',
  country: {
    name: 'Japan',
    officialName: 'Japan',
    iso2: 'JP',
    iso3: 'JPN',
    timezones: [ 'Asia/Tokyo' ]
  },
  latitude: 35.68501691,
  longitude: 139.7514074,
  province: 'Tokyo',
  state: '',
  timezone: 'Asia/Tokyo'
}*/

locationTimezone.findCapitalOfCountryIso(); // undefined
```

##### findCapitalOfCountryName(name: string)

Find the capital of a country by its name.

- `name` **<String\>** Country name (case insensitive).
- Returns: **<Capital\>** | **undefined**

Examples:

```javascript
locationTimezone.findCapitalOfCountryName('Türkiye');

/*{
  name: 'Ankara',
  nameAscii: 'Ankara',
  country: {
    name: 'Türkiye',
    officialName: 'The Republic of Türkiye',
    iso2: 'TR',
    iso3: 'TUR',
    timezones: [ 'Europe/Istanbul' ]
  },
  latitude: 39.92723859,
  longitude: 32.86439164,
  province: 'Ankara',
  state: '',
  timezone: 'Europe/Istanbul'
}*/

locationTimezone.findCapitalOfCountryName('the Republic of Tunisia');

/*{
  name: 'Tunis',
  nameAscii: 'Tunis',
  country: {
    name: 'Tunisia',
    officialName: 'The Republic of Tunisia',
    iso2: 'TN',
    iso3: 'TUN',
    timezones: [ 'Africa/Tunis' ]
  },
  latitude: 36.80277814,
  longitude: 10.1796781,
  province: 'Tunis',
  state: '',
  timezone: 'Africa/Tunis'
}*/

locationTimezone.findCapitalOfCountryName(); // undefined
```

##### findCountryByCapitalName(name: string)

Find a country by its capital name.

- `name` **<String\>** Capital name (case insensitive, utf-8 or ascii).
- Returns: **<Country\>** | **undefined**

Examples:

```javascript
locationTimezone.findCountryByCapitalName('Lomé');

/*{
  name: 'Togo',
  officialName: 'The Togolese Republic',
  iso2: 'TG',
  iso3: 'TGO',
  timezones: [ 'Africa/Lome' ],
  capital: {
    name: 'Lomé',
    nameAscii: 'Lome',
    latitude: 6.131937072,
    longitude: 1.222757119,
    province: 'Maritime',
    state: '',
    timezone: 'Africa/Lome'
  }
}*/

locationTimezone.findCountryByCapitalName('lome');

/*{
  name: 'Togo',
  officialName: 'The Togolese Republic',
  iso2: 'TG',
  iso3: 'TGO',
  timezones: [ 'Africa/Lome' ],
  capital: {
    name: 'Lomé',
    nameAscii: 'Lome',
    latitude: 6.131937072,
    longitude: 1.222757119,
    province: 'Maritime',
    state: '',
    timezone: 'Africa/Lome'
  }
}*/

locationTimezone.findCountryByCapitalName(); // undefined
```

##### findCountryByIso(code: string)

Find a country by its country ISO 3166-1 alpha-2 or alpha-3 code.

- `code` **<String\>** Country ISO code (case insensitive).
- Returns: **<Country\>** | **undefined**

Examples:

```javascript
locationTimezone.findCountryByIso('th');

/*{
  name: 'Thailand',
  officialName: 'The Kingdom of Thailand',
  iso2: 'TH',
  iso3: 'THA',
  timezones: [ 'Asia/Bangkok' ],
  capital: {
    name: 'Bangkok',
    nameAscii: 'Bangkok',
    latitude: 13.74999921,
    longitude: 100.5166447,
    province: 'Bangkok Metropolis',
    state: '',
    timezone: 'Asia/Bangkok'
  }
}*/

locationTimezone.findCountryByIso('Gab');

/*{
  name: 'Gabon',
  officialName: 'The Gabonese Republic',
  iso2: 'GA',
  iso3: 'GAB',
  timezones: [ 'Africa/Libreville', 'Africa/Malabo' ],
  capital: {
    name: 'Libreville',
    nameAscii: 'Libreville',
    latitude: 0.38538861,
    longitude: 9.457965046,
    province: 'Estuaire',
    state: '',
    timezone: 'Africa/Libreville'
  }
}*/

locationTimezone.findCountryByIso(); // undefined
```

##### findCountryByName(name: string)

Find a country by its name.

- `name` **<String\>** Country name (case insensitive).
- Returns: **<Country\>** | **undefined**

Examples:

```javascript
locationTimezone.findCountryByName('Haiti');

/*{
  name: 'Haiti',
  officialName: 'The Republic of Haiti',
  iso2: 'HT',
  iso3: 'HTI',
  timezones: [ 'America/Port-au-Prince' ],
  capital: {
    name: 'Port-au-Prince',
    nameAscii: 'Port-au-Prince',
    latitude: 18.5410246,
    longitude: -72.33603459,
    province: 'Ouest',
    state: '',
    timezone: 'America/Port-au-Prince'
  }
}*/

locationTimezone.findCountryByName('iceland');

/*{
  name: 'Iceland',
  officialName: 'Iceland',
  iso2: 'IS',
  iso3: 'ISL',
  timezones: [ 'Atlantic/Reykjavik' ],
  capital: {
    name: 'Reykjavík',
    nameAscii: 'Reykjavik',
    latitude: 64.15002362,
    longitude: -21.95001449,
    province: 'Suðurnes',
    state: '',
    timezone: 'Atlantic/Reykjavik'
  }
}*/

locationTimezone.findCountryByName(); // undefined
```

##### getCapitals()

Get all country capitals.

**NOTE:**

- Countries without a capital have `city` and `cityAscii` set to the empty string.

- Returns: **<Capital[]\>** Sorted by country name ascendant.

Examples:

```javascript
locationTimezone.getCapitals();

/*
[
  // ...
  {
    name: 'Bissau',
    nameAscii: 'Bissau',
    country: {
      name: 'Guinea-Bissau',
      officialName: 'The Republic of Guinea-Bissau',
      iso2: 'GW',
      iso3: 'GNB',
      timezones: [ 'Africa/Bissau' ]
    },
    latitude: 11.86502382,
    longitude: -15.59836084,
    province: 'Bissau',
    state: '',
    timezone: 'Africa/Bissau'
  },
  {
    name: 'Georgetown',
    nameAscii: 'Georgetown',
    country: {
      name: 'Guyana',
      officialName: 'The Co-operative Republic of Guyana',
      iso2: 'GY',
      iso3: 'GUY',
      timezones: [ 'America/Guyana' ]
    },
    latitude: 6.801973693,
    longitude: -58.16702865,
    province: 'Demerara-Mahaica',
    state: '',
    timezone: 'America/Guyana'
  },
  // ...
]
*/
```

##### getCountries()

Get all countries.

**NOTE:**

- Countries without a capital have the capital `capital.name` and `capital.nameAscii` set to the empty string and the `capital.latitude` and `capital.longitude` representing the country's coordinates.

- Returns: **<Country[]\>** Sorted by country name ascendant.

Examples:

```javascript
locationTimezone.getCountries();

/*
[
  // ...
  {
    name: 'Faroe Islands',
    officialName: 'The Faroe Islands',
    iso2: 'FO',
    iso3: 'FRO',
    timezones: [ 'Atlantic/Faeroe' ],
    capital: {
      name: 'Tórshavn',
      nameAscii: 'Torshavn',
      latitude: 62.03002382,
      longitude: -6.820033611,
      province: 'Eysturoyar',
      state: '',
      timezone: 'Atlantic/Faeroe'
    }
  },
  {
    name: 'Fiji',
    officialName: 'The Republic of Fiji',
    iso2: 'FJ',
    iso3: 'FJI',
    timezones: [ 'Pacific/Fiji' ],
    capital: {
      name: 'Suva',
      nameAscii: 'Suva',
      latitude: -18.13301593,
      longitude: 178.4417073,
      province: 'Central',
      state: '',
      timezone: 'Pacific/Fiji'
    }
  },
  // ...
]
*/
```

##### getCountryIso2CodeByIso3(iso3: string)

Get the country ISO 3166-1 alpha-2 code related to an alpha-3 code.

- `iso3` **<String\>** Country ISO 3166-1 alpha-3 code (case insensitive).
- Returns: **<String\>** | **undefined**

Examples:

```javascript
locationTimezone.getCountryIso2CodeByIso3('usa'); // US

locationTimezone.getCountryIso2CodeByIso3('GEO'); // GE

locationTimezone.getCountryIso2CodeByIso3('And'); // AD

locationTimezone.getCountryIso2CodeByIso3(); // undefined
```

##### getCountryIso2Codes()

Get all country ISO 3166-1 alpha-2 codes.

- Returns: **<String[]\>** Sorted by code ascendant.

Examples:

```javascript
locationTimezone.getCountryIso2Codes();

/*
[
  'AD', 'AE', 'AF', 'AG', 'AI', 'AL', 'AM', 'AO', 'AQ', 'AR',
  'AS', 'AT', 'AU', 'AW', 'AX', 'AZ', 'BA', 'BB', 'BD', 'BE',
  // ...
]
*/
```

##### getCountryIso3CodeByIso2(iso2: string)

Get the country ISO 3166-1 alpha-3 code related to an alpha-2 code.

- `iso2` **<String\>** Country ISO 3166-1 alpha-2 code (case insensitive).
- Returns: **<String\>** | **undefined**

Examples:

```javascript
locationTimezone.getCountryIso3CodeByIso2('us'); // USA

locationTimezone.getCountryIso3CodeByIso2('GE'); // GEO

locationTimezone.getCountryIso3CodeByIso2('Ad'); // AND

locationTimezone.getCountryIso3CodeByIso2(); // undefined
```

##### getCountryIso3Codes()

Get all country ISO 3166-1 alpha-3 codes.

- Returns: **<String[]\>** Sorted by code ascendant.

Examples:

```javascript
locationTimezone.getCountryIso3Codes();

/*
[
  'AFG', 'ALA', 'ALB', 'DZA', 'ASM', 'AND', 'AGO', 'AIA',
  'ATA', 'ATG', 'ARG', 'ARM', 'ABW', 'AUS', 'AUT', 'AZE',
  // ...
]
*/
```

##### isValidCountryIso(code: string)

Whether the country ISO code is a valid ISO 3166-1 alpha-2 or alpha-3 code.

- `code` **<String\>** ISO code (case sensitive).
- Returns: **<Boolean\>**

Examples:

```javascript
locationTimezone.isValidCountryIso('us'); // false
locationTimezone.isValidCountryIso('usa'); // false
locationTimezone.isValidCountryIso(''); // false
locationTimezone.isValidCountryIso(); // false

locationTimezone.isValidCountryIso('US'); // true
locationTimezone.isValidCountryIso('USA'); // true
```

#### Locations

##### Location interface

- `city` **<String\>**
- `cityAscii` **<String\>**
- `country` **<Country\>**
- `latitude` **<Number\>**
- `longitude` **<Number\>**
- `province` **<String\>**
- `state` **<String\>** Official United States Postal Service (USPS) code for the US.
- `timezone` **<String\>**

##### findLocationsByCoordinates(coordinates: object)

Find locations based on coordinates.

NOTE:

- At least one of each latitude/longitude boundary value is necessary.

- `coordinates` **<Object\>**
  - `latitudeFrom?` **<Number\>** *Default*: `Number.NEGATIVE_INFINITY`.
  - `latitudeTo?` **<Number\>** *Default*: `Number.POSITIVE_INFINITY`.
  - `longitudeFrom?` **<Number\>** *Default*: `Number.NEGATIVE_INFINITY`.
  - `longitudeTo?` **<Number\>** *Default*: `Number.POSITIVE_INFINITY`.
- Returns: **<Location[]\>** Sorted by city name ascendant.

Examples:

```javascript
locationTimezone.findLocationsByCoordinates({
  latitudeFrom: 5,
  latitudeTo: 8,
  longitudeFrom: 0,
  longitudeTo: 1,
});

/*
[
  {
    city: 'Ho',
    cityAscii: 'Ho',
    country: {
      name: 'Ghana',
      officialName: 'The Republic of Ghana',
      iso2: 'GH',
      iso3: 'GHA',
      timezones: [
        'Africa/Accra'
      ]
    },
    latitude: 6.600409769,
    longitude: 0.46998653,
    province: 'Volta',
    state: '',
    timezone: 'Africa/Accra'
  },
  {
    city: 'Tema',
    cityAscii: 'Tema',
    country: {
      name: 'Ghana',
      officialName: 'The Republic of Ghana',
      iso2: 'GH',
      iso3: 'GHA',
      timezones: [
        'Africa/Accra'
      ]
    },
    latitude: 5.640365009,
    longitude: 0.010014606,
    province: 'Greater Accra',
    state: '',
    timezone: 'Africa/Accra'
  },
  {
    city: 'Kpalime',
    cityAscii: 'Kpalime',
    country: {
      name: 'Togo',
      officialName: 'The Togolese Republic',
      iso2: 'TG',
      iso3: 'TGO',
      timezones: [
        'Africa/Lome'
      ]
    },
    latitude: 6.900391458,
    longitude: 0.630028441,
    province: 'Platitudeeaux',
    state: '',
    timezone: 'Africa/Lome'
  }
]
*/

// valid
locationTimezone.findLocationsByCoordinates({
  latitudeFrom: 5,
  longitudeTo: 1,
});

locationTimezone.findLocationsByCoordinates({}); // []
```

##### findLocationsByCountryIso(code: string)

Find locations based on a country ISO 3166-1 alpha-2 or alpha-3 code.

- `code` **<String\>** Country ISO code (case insensitive).
- Returns: **<Location[]\>** Sorted by city name ascendant.

Examples:

```javascript
locationTimezone.findLocationsByCountryIso('US');

/*
[
  // ...
  {
    city: 'Wheeling',
    cityAscii: 'Wheeling',
    country: {
      name: 'United States of America',
      officialName: 'The United States of America',
      iso2: 'US',
      iso3: 'USA',
      timezones: [
        'America/Adak',
        'America/Anchorage',
        'America/Boise',
        'America/Chicago',
        'America/Denver',
        'America/Detroit',
        'America/Indianapolis',
        'America/Juneau',
        'America/Los_Angeles',
        'America/Louisville',
        'America/Menominee',
        'America/New_York',
        'America/Nome',
        'America/Phoenix',
        'America/Sitka',
        'America/Yakutat',
        'Pacific/Honolulu'
      ]
    },
    latitude: 40.06431032,
    longitude: -80.72107833,
    province: 'West Virginia',
    state: 'WV',
    timezone: 'America/New_York'
  },
  {
    city: 'White Sulphur Springs',
    cityAscii: 'White Sulphur Springs',
    country: {
      name: 'United States of America',
      officialName: 'The United States of America',
      iso2: 'US',
      iso3: 'USA',
      timezones: [
        'America/Adak',
        'America/Anchorage',
        'America/Boise',
        'America/Chicago',
        'America/Denver',
        'America/Detroit',
        'America/Indianapolis',
        'America/Juneau',
        'America/Los_Angeles',
        'America/Louisville',
        'America/Menominee',
        'America/New_York',
        'America/Nome',
        'America/Phoenix',
        'America/Sitka',
        'America/Yakutat',
        'Pacific/Honolulu'
      ]
    },
    latitude: 37.79388043,
    longitude: -80.30348108,
    province: 'West Virginia',
    state: 'WV',
    timezone: 'America/New_York'
  },
  // ...
]
*/

locationTimezone.findLocationsByCountryIso(''); // []
```

##### findLocationsByCountryName(name: string, partialMatch: boolean)

Find locations based on a country name.

- `name` **<String\>** Country name (case insensitive).
- `partialMatch` **<Boolean\>** Whether to include partial matches. *Default*: `false`
- Returns: **<Location[]\>** Sorted by city name ascendant.

Examples:

```javascript
locationTimezone.findLocationsByCountryName('French polynesia', true);

/*
[
  {
    city: 'Papeete',
    cityAscii: 'Papeete',
    country: {
      name: 'French Polynesia',
      officialName: 'French Polynesia',
      iso2: 'PF',
      iso3: 'PYF',
      timezones: [ 'Pacific/Tahiti' ]
    },
    latitude: -17.53336261,
    longitude: -149.5666694,
    province: 'Tahiti',
    state: '',
    timezone: 'Pacific/Tahiti'
  }
]
*/

locationTimezone.findLocationsByCountryName('Arab', true);

/*
[
  // ...
  {
    city: 'Tartus',
    cityAscii: 'Tartus',
    country: {
      name: 'Syrian Arab Republic',
      officialName: 'The Syrian Arab Republic',
      iso2: 'SY',
      iso3: 'SYR',
      timezones: [ 'Asia/Damascus' ]
    },
    latitude: 34.88463448,
    longitude: 35.88658405,
    province: 'Tartus',
    state: '',
    timezone: 'Asia/Damascus'
  },
  {
    city: 'Abu Dhabi',
    cityAscii: 'Abu Dhabi',
    country: {
      name: 'United Arab Emirates',
      officialName: 'The United Arab Emirates',
      iso2: 'AE',
      iso3: 'ARE',
      timezones: [ 'Asia/Dubai' ]
    },
    latitude: 24.46668357,
    longitude: 54.36659338,
    province: 'Abu Dhabi',
    state: '',
    timezone: 'Asia/Dubai'
  },
  // ...
]
*/

locationTimezone.findLocationsByCountryName(''); // []
```

##### findLocationsByProvince(name: string, partialMatch: boolean)

Find locations based on a province (not recommended, unreliable data).

- `name` **<String\>** Province name (case insensitive).
- `partialMatch` **<Boolean\>** Whether to include partial matches. *Default*: `false`
- Returns: **<Location[]\>** Sorted by city name ascendant.

Examples:

```javascript
locationTimezone.findLocationsByProvince('Hokkaido', false);

/*
[
  {
    city: 'Asahikawa',
    cityAscii: 'Asahikawa',
    country: {
      name: 'Japan',
      officialName: 'Japan',
      iso2: 'JP',
      iso3: 'JPN',
      timezones: [ 'Asia/Tokyo' ]
    },
    latitude: 43.75501528,
    longitude: 142.3799808,
    province: 'Hokkaido',
    state: '',
    timezone: 'Asia/Tokyo'
  },
  {
    city: 'Hakodate',
    cityAscii: 'Hakodate',
    country: {
      name: 'Japan',
      officialName: 'Japan',
      iso2: 'JP',
      iso3: 'JPN',
      timezones: [ 'Asia/Tokyo' ]
    },
    latitude: 41.79497988,
    longitude: 140.7399776,
    province: 'Hokkaido',
    state: '',
    timezone: 'Asia/Tokyo'
  },
  // ...
]
*/

locationTimezone.findLocationsByProvince(''); // []
```

##### findLocationsByState(name: string, partialMatch: boolean)

Find locations based on the state name.

- `name` **<String\>** State name (case insensitive, official United States Postal Service (USPS) code for the US).
- `partialMatch` **<Boolean\>** Whether to include partial matches. *Default*: `false`
- Returns: **<Location[]\>** Sorted by city name ascendant.

Examples:

```javascript
locationTimezone.findLocationsByState('ct', true);

/*
[
  {
    city: 'Bridgeport',
    cityAscii: 'Bridgeport',
    country: {
      name: 'United States of America',
      officialName: 'The United States of America',
      iso2: 'US',
      iso3: 'USA',
      timezones: [
        'America/Adak',         'America/Anchorage',
        'America/Boise',        'America/Chicago',
        'America/Denver',       'America/Detroit',
        'America/Indianapolis', 'America/Juneau',
        'America/Los_Angeles',  'America/Louisville',
        'America/Menominee',    'America/New_York',
        'America/Nome',         'America/Phoenix',
        'America/Sitka',        'America/Yakutat',
        'Pacific/Honolulu'
      ]
    },
    latitude: 41.17997866,
    longitude: -73.19996118,
    province: 'Connecticut',
    state: 'CT',
    timezone: 'America/New_York'
  },
  {
    city: 'Hartford',
    cityAscii: 'Hartford',
    country: {
      name: 'United States of America',
      officialName: 'The United States of America',
      iso2: 'US',
      iso3: 'USA',
      timezones: [
        'America/Adak',         'America/Anchorage',
        'America/Boise',        'America/Chicago',
        'America/Denver',       'America/Detroit',
        'America/Indianapolis', 'America/Juneau',
        'America/Los_Angeles',  'America/Louisville',
        'America/Menominee',    'America/New_York',
        'America/Nome',         'America/Phoenix',
        'America/Sitka',        'America/Yakutat',
        'Pacific/Honolulu'
      ]
    },
    latitude: 41.77002016,
    longitude: -72.67996708,
    province: 'Connecticut',
    state: 'CT',
    timezone: 'America/New_York'
  },
  // ...
]
*/

locationTimezone.findLocationsByState(''); // []
```

##### getLocations()

Get all locations.

- Returns: **<Location[]\>** Sorted by city name ascendant.

Examples:

```javascript
locationTimezone.getLocations();

/*
[
  // ...
  {
    city: 'Vlore',
    cityAscii: 'Vlore',
    country: {
      name: 'Albania',
      officialName: 'The Republic of Albania',
      iso2: 'AL',
      iso3: 'ALB',
      timezones: [ 'Europe/Tirane' ]
    },
    latitude: 40.47736005,
    longitude: 19.49823075,
    province: 'Vlorë',
    state: '',
    timezone: 'Europe/Tirane'
  },
  {
    city: 'Abadla',
    cityAscii: 'Abadla',
    country: {
      name: 'Algeria',
      officialName: "The People's Democratic Republic of Algeria",
      iso2: 'DZ',
      iso3: 'DZA',
      timezones: [ 'Africa/Algiers' ]
    },
    latitude: 31.01708478,
    longitude: -2.733306317,
    province: 'Béchar',
    state: '',
    timezone: 'Africa/Algiers'
  },
  // ...
]
*/
```

#### States ANSI

##### StateAnsi interface

American National Standards Institute (ANSI), USA states only.

- `fipsCode` **<String\>** Federal Information Processing Standard (FIPS) code.
- `gnisid` **<String\>** Geographic Names Information System Identifier (GNISID).
- `name` **<String\>**
- `uspsCode` **<String\>** Official United States Postal Service (USPS) code.

##### findStateAnsiByFipsCode(code: string)

Find the state's information based on the Federal Information Processing Standard (FIPS) State Code ANSI (American National Standards Institute, USA states only).

- `code` **<String\>** FIPS ANSI code (case insensitive, 2 chars).
- Returns: **<StateAnsi\>** | **undefined**

Examples:

```javascript
locationTimezone.findStateAnsiByFipsCode('05');

/*
{
  fipsCode: '05',
  uspsCode: 'AR',
  name: 'Arkansas',
  gnisid: '00068085'
}
*/

locationTimezone.findStateAnsiByFipsCode(''); // undefined
```

##### findStateAnsiByGnisid(id: string)

Find the state's information based on the Geographic Names Information System Identifier (GNISID) ANSI (American National Standards Institute, USA states only).

- `id` **<String\>** GNISID ANSI (case insensitive).
- Returns: **<StateAnsi\>** | **undefined**

Examples:

```javascript
locationTimezone.findStateAnsiByGnisid('01779779');

/*
{
  fipsCode: '08',
  uspsCode: 'CO',
  name: 'Colorado',
  gnisid: '01779779'
}
*/

locationTimezone.findStateAnsiByGnisid(''); // undefined
```

##### findStateAnsiByName(name: string)

Find the state's information by its name ANSI (American National Standards Institute, USA states only).

- `name` **<String\>** Name ANSI (case insensitive).
- Returns: **<StateAnsi\>** | **undefined**

Examples:

```javascript
locationTimezone.findStateAnsiByName('Wyoming');

/*
{
  fipsCode: '56',
  uspsCode: 'WY',
  name: 'Wyoming',
  gnisid: '01779807'
}
*/

locationTimezone.findStateAnsiByName(''); // undefined
```

##### findStateAnsiByUspsCode(code: string)

Find the state's information based on the official United States Postal Service (USPS) Code ANSI (American National Standards Institute, USA states only).

- `code` **<String\>** USPS ANSI code (case insensitive, 2 chars).
- Returns: **<StateAnsi\>** | **undefined**

Examples:

```javascript
locationTimezone.findStateAnsiByUspsCode('NY');

/*
{
  fipsCode: '36',
  uspsCode: 'NY',
  name: 'New York',
  gnisid: '01779796'
}
*/

locationTimezone.findStateAnsiByUspsCode(''); // undefined
```

##### getStatesAnsi()

Get all states ANSI (American National Standards Institute, USA states only).

- Returns: **<StateAnsi[]\>** Sorted by name ascendant.

Examples:

```javascript
locationTimezone.getStatesAnsi();

/*
[
  // ...
  {
    fipsCode: '69',
    uspsCode: 'MP',
    name: 'Northern Mariana Islands',
    gnisid: '01779809'
  },
  {
    fipsCode: '72',
    uspsCode: 'PR',
    name: 'Puerto Rico',
    gnisid: '01779808'
  },
  {
    fipsCode: '74',
    uspsCode: 'UM',
    name: 'U.S. Minor Outlying Islands',
    gnisid: '01878752'
  },
  {
    fipsCode: '78',
    uspsCode: 'VI',
    name: 'U.S. Virgin Islands',
    gnisid: '01802710'
  }
]
*/
```

#### Timezones

##### findTimezoneByCapitalOfCountryIso(code: string)

Find a timezone based on the capital of a country ISO 3166-1 alpha-2 or alpha-3 code.

- `code` **<String\>** Country ISO code (case insensitive).
- Returns: **<String\>** | **undefined**

Examples:

```javascript
locationTimezone.findTimezoneByCapitalOfCountryIso('mx'); // 'America/Mexico_City'

locationTimezone.findTimezoneByCapitalOfCountryIso(''); // undefined
```

##### findTimezoneByCapitalOfCountryName(name: string)

Find a timezone based on the capital of a country (name).

- `name` **<String\>** Country name (case insensitive).
- Returns: **<String\>** | **undefined**

Examples:

```javascript
locationTimezone.findTimezoneByCapitalOfCountryName('new zealand'); // 'Pacific/Auckland'

locationTimezone.findTimezoneByCapitalOfCountryName(''); // undefined
```

##### findTimezoneByCityName(name: string)

Find a timezone based on a city name.

- `name` **<String\>** City name (case insensitive, utf-8 or ascii).
- Returns: **<String\>** | **undefined**

Examples:

```javascript
locationTimezone.findTimezoneByCityName('moscow'); // 'Europe/Moscow'

locationTimezone.findTimezoneByCityName('Göteborg'); // 'Europe/Stockholm'
locationTimezone.findTimezoneByCityName('goteborg'); // 'Europe/Stockholm'

locationTimezone.findTimezoneByCityName(''); // undefined
```

##### findTimezonesByCountryIso(code: string)

Find timezones based on a country ISO 3166-1 alpha-2 or alpha-3 code.

- `code` **<String\>** Country ISO code (case insensitive).
- Returns: **<String[]\>** Sorted by name ascendant.

Examples:

```javascript
locationTimezone.findTimezonesByCountryIso('mr');

/*
[
  'Africa/Dakar',
  'Africa/Nouakchott'
]
*/

locationTimezone.findTimezonesByCountryIso('KAZ');

/*
[
  'Asia/Almaty',
  'Asia/Aqtau',
  'Asia/Aqtobe',
  'Asia/Atyrau',
  'Asia/Oral',
  'Asia/Qyzylorda'
]
*/

locationTimezone.findTimezonesByCountryIso(''); // []
```

##### findTimezonesByCountryName(name: string)

Find timezones based on a country name.

- `name` **<String\>** Country name (case insensitive).
- Returns: **<String[]\>** Sorted by name ascendant.

Examples:

```javascript
locationTimezone.findTimezonesByCountryName('Nepal'); // [ 'Asia/Katmandu' ]

locationTimezone.findTimezonesByCountryName('The Republic of Peru');

/*
[
  'America/Guayaquil',
  'America/Lima'
]
*/

locationTimezone.findTimezonesByCountryName(''); // []
```

##### getTimezones()

Get all timezones as per `Intl` native library.

- Returns: **<String[]\>** Sorted by name ascendant.

Examples:

```javascript
locationTimezone.getTimezones();

/*
[
  'Africa/Abidjan',
  'Africa/Accra',
  'Africa/Addis_Ababa',
  'Africa/Algiers',
  'Africa/Asmera',
  'Africa/Bamako',
  'Africa/Bangui',
  'Africa/Banjul',
  'Africa/Bissau',
  'Africa/Blantyre',
  'Africa/Brazzaville',
  // ...
]
*/
```

### Errors

None.

### Development

#### Linting

`npm run lint`

#### Unit test

`npm test`

#### Building lib files from data

It is highly recommended to use the latest version of Node.js.

`npm run build:files`

## Known issues

/

## Code of Conduct

This project has a [Code of Conduct](.github/CODE_OF_CONDUCT.md). By interacting with this repository, organization, or community you agree to abide by its terms.

## Contributing

Please take a moment to read our [Contributing Guidelines](.github/CONTRIBUTING.md) if you haven't done so yet.

Some help is needed to improve the data:

- regarding the locations' province and state.

## Support

Please see our [Support](.github/SUPPORT.md) page if you have any questions or for any help needed.

## Security

For any security concerns or issues, please visit our [Security Policy](.github/SECURITY.md) page.

## License

[MIT](LICENSE.md).
