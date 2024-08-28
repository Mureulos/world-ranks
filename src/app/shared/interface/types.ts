export interface CountryType {
  name: {
    common: string;
    official: string;
    nativeName: {
      nno: {
        official: string;
        common: string;
      };
      nob: {
        official: string;
        common: string;
      };
      smi: {
        official: string;
        common: string;
      };
    };
  };
  tld: string[];
  cca2: string;
  ccn3: string;
  cca3: string;
  cioc: string;
  independent: boolean;
  status: string;
  unMember: boolean;
  currencies: {
    [key: string]: {
      name: string;
      symbol: string;
    }
  };
  idd: {
    root: string;
    suffixes: string[];
  };
  capital: string[];
  altSpellings: string[];
  region: string;
  subregion: string;
  languages: string[];
  translations: {
    ara: Translation;
    bre: Translation;
    ces: Translation;
    cym: Translation;
    deu: Translation;
    est: Translation;
    fin: Translation;
    fra: Translation;
    hrv: Translation;
    hun: Translation;
    ita: Translation;
    jpn: Translation;
    kor: Translation;
    nld: Translation;
    per: Translation;
    pol: Translation;
    por: Translation;
    rus: Translation;
    slk: Translation;
    spa: Translation;
    srp: Translation;
    swe: Translation;
    tur: Translation;
    urd: Translation;
    zho: Translation;
  };
  latlng: number[];
  landlocked: boolean;
  borders: string[];
  area: number;
  demonyms: {
    eng: Demonym;
    fra: Demonym;
  };
  flag: string;
  maps: {
    googleMaps: string;
    openStreetMaps: string;
  };
  population: number;
  gini: {
    '2018': number;
  };
  fifa: string;
  car: {
    signs: string[];
    side: string;
  };
  timezones: string[];
  continents: string[];
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
  coatOfArms: {
    png: string;
    svg: string;
  };
  startOfWeek: string;
  capitalInfo: {
    latlng: number[];
  };
  postalCode: {
    format: string;
    regex: string;
  };
}

export interface Translation {
  official: string;
  common: string;
}

export interface Demonym {
  f: string;
  m: string;
}

export interface searchType {

}