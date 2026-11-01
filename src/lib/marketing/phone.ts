/**
 * Phone numbers for the lead forms: the country list behind the dial-code
 * picker, reading what a visitor typed into E.164, and guessing a sensible
 * default country.
 *
 * Pure — no React, no server-only imports — so the picker, the server actions
 * and the unit tests share one definition. Deliberately not libphonenumber:
 * the backend re-reads the number in the chosen country, so the site only
 * needs the dial code and a 7–15 digit check, not per-country number plans.
 */

export type Country = {
  /** ISO 3166-1 alpha-2, upper case. */
  iso2: string;
  name: string;
  /** Dial code digits, without "+". */
  dial: string;
  /**
   * Leading digits after the dial code that identify this country when it
   * shares a dial code with others (NANP area codes, Kazakhstan's 6/7 under
   * +7, Åland under +358 …). Only used to recognise a pasted number.
   */
  areaCodes?: readonly string[];
};

// [iso2, name, dial, area codes (comma separated)?] — sorted by name.
const RAW: ReadonlyArray<readonly [string, string, string, string?]> = [
  ["AF", "Afghanistan", "93"],
  ["AX", "Åland Islands", "358", "18"],
  ["AL", "Albania", "355"],
  ["DZ", "Algeria", "213"],
  ["AS", "American Samoa", "1", "684"],
  ["AD", "Andorra", "376"],
  ["AO", "Angola", "244"],
  ["AI", "Anguilla", "1", "264"],
  ["AG", "Antigua and Barbuda", "1", "268"],
  ["AR", "Argentina", "54"],
  ["AM", "Armenia", "374"],
  ["AW", "Aruba", "297"],
  ["AU", "Australia", "61"],
  ["AT", "Austria", "43"],
  ["AZ", "Azerbaijan", "994"],
  ["BS", "Bahamas", "1", "242"],
  ["BH", "Bahrain", "973"],
  ["BD", "Bangladesh", "880"],
  ["BB", "Barbados", "1", "246"],
  ["BY", "Belarus", "375"],
  ["BE", "Belgium", "32"],
  ["BZ", "Belize", "501"],
  ["BJ", "Benin", "229"],
  ["BM", "Bermuda", "1", "441"],
  ["BT", "Bhutan", "975"],
  ["BO", "Bolivia", "591"],
  ["BA", "Bosnia and Herzegovina", "387"],
  ["BW", "Botswana", "267"],
  ["BR", "Brazil", "55"],
  ["IO", "British Indian Ocean Territory", "246"],
  ["VG", "British Virgin Islands", "1", "284"],
  ["BN", "Brunei", "673"],
  ["BG", "Bulgaria", "359"],
  ["BF", "Burkina Faso", "226"],
  ["BI", "Burundi", "257"],
  ["KH", "Cambodia", "855"],
  ["CM", "Cameroon", "237"],
  ["CA", "Canada", "1"],
  ["CV", "Cape Verde", "238"],
  ["BQ", "Caribbean Netherlands", "599", "3,4,7"],
  ["KY", "Cayman Islands", "1", "345"],
  ["CF", "Central African Republic", "236"],
  ["TD", "Chad", "235"],
  ["CL", "Chile", "56"],
  ["CN", "China", "86"],
  ["CX", "Christmas Island", "61", "89164"],
  ["CC", "Cocos (Keeling) Islands", "61", "89162"],
  ["CO", "Colombia", "57"],
  ["KM", "Comoros", "269"],
  ["CG", "Congo - Brazzaville", "242"],
  ["CD", "Congo - Kinshasa", "243"],
  ["CK", "Cook Islands", "682"],
  ["CR", "Costa Rica", "506"],
  ["CI", "Côte d’Ivoire", "225"],
  ["HR", "Croatia", "385"],
  ["CU", "Cuba", "53"],
  ["CW", "Curaçao", "599"],
  ["CY", "Cyprus", "357"],
  ["CZ", "Czechia", "420"],
  ["DK", "Denmark", "45"],
  ["DJ", "Djibouti", "253"],
  ["DM", "Dominica", "1", "767"],
  ["DO", "Dominican Republic", "1", "809,829,849"],
  ["EC", "Ecuador", "593"],
  ["EG", "Egypt", "20"],
  ["SV", "El Salvador", "503"],
  ["GQ", "Equatorial Guinea", "240"],
  ["ER", "Eritrea", "291"],
  ["EE", "Estonia", "372"],
  ["SZ", "Eswatini", "268"],
  ["ET", "Ethiopia", "251"],
  ["FK", "Falkland Islands", "500"],
  ["FO", "Faroe Islands", "298"],
  ["FJ", "Fiji", "679"],
  ["FI", "Finland", "358"],
  ["FR", "France", "33"],
  ["GF", "French Guiana", "594"],
  ["PF", "French Polynesia", "689"],
  ["GA", "Gabon", "241"],
  ["GM", "Gambia", "220"],
  ["GE", "Georgia", "995"],
  ["DE", "Germany", "49"],
  ["GH", "Ghana", "233"],
  ["GI", "Gibraltar", "350"],
  ["GR", "Greece", "30"],
  ["GL", "Greenland", "299"],
  ["GD", "Grenada", "1", "473"],
  ["GP", "Guadeloupe", "590"],
  ["GU", "Guam", "1", "671"],
  ["GT", "Guatemala", "502"],
  ["GG", "Guernsey", "44", "1481,7781,7839,7911"],
  ["GN", "Guinea", "224"],
  ["GW", "Guinea-Bissau", "245"],
  ["GY", "Guyana", "592"],
  ["HT", "Haiti", "509"],
  ["HN", "Honduras", "504"],
  ["HK", "Hong Kong", "852"],
  ["HU", "Hungary", "36"],
  ["IS", "Iceland", "354"],
  ["IN", "India", "91"],
  ["ID", "Indonesia", "62"],
  ["IR", "Iran", "98"],
  ["IQ", "Iraq", "964"],
  ["IE", "Ireland", "353"],
  ["IM", "Isle of Man", "44", "1624,7524,7624,7924"],
  ["IL", "Israel", "972"],
  ["IT", "Italy", "39"],
  ["JM", "Jamaica", "1", "876,658"],
  ["JP", "Japan", "81"],
  ["JE", "Jersey", "44", "1534,7509,7700,7797,7829,7937"],
  ["JO", "Jordan", "962"],
  ["KZ", "Kazakhstan", "7", "6,7"],
  ["KE", "Kenya", "254"],
  ["KI", "Kiribati", "686"],
  ["XK", "Kosovo", "383"],
  ["KW", "Kuwait", "965"],
  ["KG", "Kyrgyzstan", "996"],
  ["LA", "Laos", "856"],
  ["LV", "Latvia", "371"],
  ["LB", "Lebanon", "961"],
  ["LS", "Lesotho", "266"],
  ["LR", "Liberia", "231"],
  ["LY", "Libya", "218"],
  ["LI", "Liechtenstein", "423"],
  ["LT", "Lithuania", "370"],
  ["LU", "Luxembourg", "352"],
  ["MO", "Macao", "853"],
  ["MG", "Madagascar", "261"],
  ["MW", "Malawi", "265"],
  ["MY", "Malaysia", "60"],
  ["MV", "Maldives", "960"],
  ["ML", "Mali", "223"],
  ["MT", "Malta", "356"],
  ["MH", "Marshall Islands", "692"],
  ["MQ", "Martinique", "596"],
  ["MR", "Mauritania", "222"],
  ["MU", "Mauritius", "230"],
  ["YT", "Mayotte", "262", "269,639"],
  ["MX", "Mexico", "52"],
  ["FM", "Micronesia", "691"],
  ["MD", "Moldova", "373"],
  ["MC", "Monaco", "377"],
  ["MN", "Mongolia", "976"],
  ["ME", "Montenegro", "382"],
  ["MS", "Montserrat", "1", "664"],
  ["MA", "Morocco", "212"],
  ["MZ", "Mozambique", "258"],
  ["MM", "Myanmar", "95"],
  ["NA", "Namibia", "264"],
  ["NR", "Nauru", "674"],
  ["NP", "Nepal", "977"],
  ["NL", "Netherlands", "31"],
  ["NC", "New Caledonia", "687"],
  ["NZ", "New Zealand", "64"],
  ["NI", "Nicaragua", "505"],
  ["NE", "Niger", "227"],
  ["NG", "Nigeria", "234"],
  ["NU", "Niue", "683"],
  ["NF", "Norfolk Island", "672"],
  ["KP", "North Korea", "850"],
  ["MK", "North Macedonia", "389"],
  ["MP", "Northern Mariana Islands", "1", "670"],
  ["NO", "Norway", "47"],
  ["OM", "Oman", "968"],
  ["PK", "Pakistan", "92"],
  ["PW", "Palau", "680"],
  ["PS", "Palestine", "970"],
  ["PA", "Panama", "507"],
  ["PG", "Papua New Guinea", "675"],
  ["PY", "Paraguay", "595"],
  ["PE", "Peru", "51"],
  ["PH", "Philippines", "63"],
  ["PL", "Poland", "48"],
  ["PT", "Portugal", "351"],
  ["PR", "Puerto Rico", "1", "787,939"],
  ["QA", "Qatar", "974"],
  ["RE", "Réunion", "262"],
  ["RO", "Romania", "40"],
  ["RU", "Russia", "7"],
  ["RW", "Rwanda", "250"],
  ["BL", "Saint Barthélemy", "590"],
  ["SH", "Saint Helena", "290"],
  ["KN", "Saint Kitts and Nevis", "1", "869"],
  ["LC", "Saint Lucia", "1", "758"],
  ["MF", "Saint Martin", "590"],
  ["PM", "Saint Pierre and Miquelon", "508"],
  ["VC", "Saint Vincent and the Grenadines", "1", "784"],
  ["WS", "Samoa", "685"],
  ["SM", "San Marino", "378"],
  ["ST", "São Tomé and Príncipe", "239"],
  ["SA", "Saudi Arabia", "966"],
  ["SN", "Senegal", "221"],
  ["RS", "Serbia", "381"],
  ["SC", "Seychelles", "248"],
  ["SL", "Sierra Leone", "232"],
  ["SG", "Singapore", "65"],
  ["SX", "Sint Maarten", "1", "721"],
  ["SK", "Slovakia", "421"],
  ["SI", "Slovenia", "386"],
  ["SB", "Solomon Islands", "677"],
  ["SO", "Somalia", "252"],
  ["ZA", "South Africa", "27"],
  ["KR", "South Korea", "82"],
  ["SS", "South Sudan", "211"],
  ["ES", "Spain", "34"],
  ["LK", "Sri Lanka", "94"],
  ["SD", "Sudan", "249"],
  ["SR", "Suriname", "597"],
  ["SJ", "Svalbard and Jan Mayen", "47", "79"],
  ["SE", "Sweden", "46"],
  ["CH", "Switzerland", "41"],
  ["SY", "Syria", "963"],
  ["TW", "Taiwan", "886"],
  ["TJ", "Tajikistan", "992"],
  ["TZ", "Tanzania", "255"],
  ["TH", "Thailand", "66"],
  ["TL", "Timor-Leste", "670"],
  ["TG", "Togo", "228"],
  ["TK", "Tokelau", "690"],
  ["TO", "Tonga", "676"],
  ["TT", "Trinidad and Tobago", "1", "868"],
  ["TN", "Tunisia", "216"],
  ["TR", "Türkiye", "90"],
  ["TM", "Turkmenistan", "993"],
  ["TC", "Turks and Caicos Islands", "1", "649"],
  ["TV", "Tuvalu", "688"],
  ["VI", "U.S. Virgin Islands", "1", "340"],
  ["UG", "Uganda", "256"],
  ["UA", "Ukraine", "380"],
  ["AE", "United Arab Emirates", "971"],
  ["GB", "United Kingdom", "44"],
  ["US", "United States", "1"],
  ["UY", "Uruguay", "598"],
  ["UZ", "Uzbekistan", "998"],
  ["VU", "Vanuatu", "678"],
  ["VA", "Vatican City", "39", "06698"],
  ["VE", "Venezuela", "58"],
  ["VN", "Vietnam", "84"],
  ["WF", "Wallis and Futuna", "681"],
  ["EH", "Western Sahara", "212", "5288,5289"],
  ["YE", "Yemen", "967"],
  ["ZM", "Zambia", "260"],
  ["ZW", "Zimbabwe", "263"],
];

export const COUNTRIES: readonly Country[] = RAW.map(([iso2, name, dial, areas]) =>
  areas ? { iso2, name, dial, areaCodes: areas.split(",") } : { iso2, name, dial }
);

const BY_ISO = new Map(COUNTRIES.map((c) => [c.iso2, c]));

/** Where several countries share a dial code, the one a bare number belongs to. */
const MAIN_FOR_DIAL: Record<string, string> = {
  "1": "US",
  "7": "RU",
  "39": "IT",
  "44": "GB",
  "47": "NO",
  "61": "AU",
  "212": "MA",
  "262": "RE",
  "358": "FI",
  "590": "GP",
  "599": "CW",
};

/** Countries whose national numbers keep their leading 0 after the dial code. */
const KEEPS_LEADING_ZERO = new Set(["IT", "SM", "VA"]);

/** The country for an ISO code (any case), or undefined. */
export function countryByIso(iso2: string | null | undefined): Country | undefined {
  return iso2 ? BY_ISO.get(iso2.trim().toUpperCase()) : undefined;
}

/** "PK" → 🇵🇰 (regional indicator symbols). Empty for anything that is not two letters. */
export function flagEmoji(iso2: string): string {
  const code = iso2.trim().toUpperCase();
  if (!/^[A-Z]{2}$/.test(code)) return "";
  return String.fromCodePoint(...[...code].map((ch) => 0x1f1e6 + ch.charCodeAt(0) - 65));
}

/** Lower-case, accent-free, for searching ("Curaçao" → "curacao"). */
export function searchKey(s: string): string {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
}

/**
 * Countries matching a search: by name (word starts first), ISO code or dial
 * code ("+92", "92"). An empty query returns the whole list.
 */
export function searchCountries(query: string, list: readonly Country[] = COUNTRIES): Country[] {
  const q = searchKey(query);
  if (!q) return [...list];
  const digits = q.replace(/^\+/, "");
  const isDial = /^\d+$/.test(digits);
  const first: Country[] = [];
  const rest: Country[] = [];
  for (const c of list) {
    if (isDial) {
      if (c.dial.startsWith(digits)) (c.dial === digits ? first : rest).push(c);
      continue;
    }
    const name = searchKey(c.name);
    if (name.startsWith(q) || c.iso2.toLowerCase() === q) first.push(c);
    else if (name.includes(q)) rest.push(c);
  }
  return [...first, ...rest];
}

/**
 * The country an international number (digits only, no "+") belongs to.
 * Longest dial code wins; where a dial code is shared, area codes decide, then
 * `preferred` (the country already chosen in the picker), then the main one.
 */
export function countryForDigits(digits: string, preferred?: string): Country | undefined {
  const d = digits.replace(/\D/g, "");
  if (!d) return undefined;
  let best = 0;
  for (const c of COUNTRIES) if (c.dial.length > best && d.startsWith(c.dial)) best = c.dial.length;
  if (!best) return undefined;
  const dial = d.slice(0, best);
  const rest = d.slice(best);
  const sharing = COUNTRIES.filter((c) => c.dial === dial);

  let byArea: Country | undefined;
  let areaLen = 0;
  for (const c of sharing) {
    for (const a of c.areaCodes ?? []) {
      if (a.length > areaLen && rest.startsWith(a)) {
        byArea = c;
        areaLen = a.length;
      }
    }
  }
  if (byArea) return byArea;

  const pref = countryByIso(preferred);
  if (pref && pref.dial === dial && !pref.areaCodes) return pref;
  const main = MAIN_FOR_DIAL[dial];
  return (main && BY_ISO.get(main)) || sharing.find((c) => !c.areaCodes) || sharing[0];
}

/** The country of an E.164 number ("+923001234567" → Pakistan). */
export function countryForE164(e164: string, preferred?: string): Country | undefined {
  return /^\+\d/.test(e164.trim()) ? countryForDigits(e164, preferred) : undefined;
}

const E164 = /^\+[1-9]\d{6,14}$/;

/** True for "+" and 7–15 digits, the first not 0. */
export function isE164(value: string): boolean {
  return E164.test(value);
}

/** True when the visitor typed or pasted a full international number. */
export function isInternational(raw: string): boolean {
  return /^\s*(\+|00)/.test(raw);
}

/**
 * Normalise an explicitly international number ("+92 344 680 0893",
 * "0092 344 6800893") to E.164; "" when it is not one. Never guesses a country.
 */
export function normalizePhone(input: string): string {
  const raw = input.trim();
  if (!/^(\+|00)[\d\s().-]+$/.test(raw)) return "";
  const cleaned = raw.replace(/\D/g, "");
  const digits = raw.startsWith("00") ? cleaned.slice(2) : cleaned;
  return /^[1-9]\d{6,14}$/.test(digits) ? `+${digits}` : "";
}

/**
 * A local number in a chosen country to E.164: digits only, the trunk 0
 * dropped (kept for Italy, San Marino, Vatican), and a 7-digit number in a
 * single-area NANP country given its area code. "" when it cannot be built.
 */
export function toE164(iso2: string, local: string): string {
  const country = countryByIso(iso2);
  if (!country || /[^\d\s().\-/]/.test(local.trim())) return "";
  let national = local.replace(/\D/g, "");
  if (!KEEPS_LEADING_ZERO.has(country.iso2)) national = national.replace(/^0+/, "");
  if (country.dial === "1" && country.areaCodes?.length === 1 && national.length === 7) {
    national = `${country.areaCodes[0]}${national}`;
  }
  if (national.length < 4) return "";
  const e164 = `+${country.dial}${national}`;
  return isE164(e164) ? e164 : "";
}

export type ParsedPhone = {
  /** E.164, or "" when the input is not a usable number yet. */
  e164: string;
  /** ISO2 of the number's country ("" when unknown). */
  country: string;
  /** The number without the dial code, digits only. */
  national: string;
};

/**
 * What the visitor typed, read against the country they picked. A number that
 * starts with "+" or "00" is taken as it is and its own country wins.
 */
export function parsePhoneInput(raw: string, pickedIso: string): ParsedPhone {
  const picked = countryByIso(pickedIso);
  if (isInternational(raw)) {
    const e164 = normalizePhone(raw);
    const digits = e164 ? e164.slice(1) : raw.replace(/\D/g, "").replace(/^00/, "");
    const country = countryForDigits(digits, picked?.iso2);
    return {
      e164,
      country: country?.iso2 ?? "",
      national: country ? digits.slice(country.dial.length) : digits,
    };
  }
  const e164 = picked ? toE164(picked.iso2, raw) : "";
  return {
    e164,
    country: picked?.iso2 ?? "",
    national: e164 && picked ? e164.slice(1 + picked.dial.length) : raw.replace(/\D/g, ""),
  };
}

/**
 * The phone and country a lead form posted. The picker's own fields
 * (`phone_country` + `phone_local`, present with or without JavaScript) win;
 * a post carrying only `phone` (+ `country`) is read the same way.
 * `phone` is E.164 when it could be built, else the raw text — so the form's
 * schema reports it instead of silently dropping it.
 */
export function phoneFromForm(form: FormData): { phone: string; country: string } {
  const s = (k: string) => {
    const v = form.get(k);
    return typeof v === "string" ? v : "";
  };
  const hasPicker = form.has("phone_local");
  const raw = hasPicker ? s("phone_local") : s("phone");
  const picked = hasPicker ? s("phone_country") || s("country") : s("country");
  const parsed = parsePhoneInput(raw, picked);
  return { phone: parsed.e164 || raw.trim(), country: parsed.country };
}

/**
 * Single-country time zones in the markets we sell to — a stronger hint than
 * the browser language, which is "en-US" on most phones everywhere.
 */
const ZONE_COUNTRY: Record<string, string> = {
  "Asia/Karachi": "PK",
  "Asia/Dubai": "AE",
  "Asia/Riyadh": "SA",
  "Asia/Qatar": "QA",
  "Asia/Kuwait": "KW",
  "Asia/Bahrain": "BH",
  "Asia/Muscat": "OM",
  "Asia/Kolkata": "IN",
  "Asia/Calcutta": "IN",
  "Asia/Dhaka": "BD",
  "Asia/Kathmandu": "NP",
  "Asia/Colombo": "LK",
  "Asia/Kabul": "AF",
  "Asia/Baghdad": "IQ",
  "Asia/Amman": "JO",
  "Asia/Beirut": "LB",
  "Asia/Tehran": "IR",
  "Asia/Singapore": "SG",
  "Asia/Kuala_Lumpur": "MY",
  "Asia/Manila": "PH",
  "Europe/London": "GB",
  "Europe/Dublin": "IE",
  "Europe/Istanbul": "TR",
  "Africa/Cairo": "EG",
  "Africa/Lagos": "NG",
  "Africa/Nairobi": "KE",
  "Africa/Johannesburg": "ZA",
  "Africa/Casablanca": "MA",
};

/**
 * A default for the picker: the time zone when it names one country, else the
 * region of the first browser language that has one ("en-PK" → PK), else "".
 */
export function guessCountry(hints: { timeZone?: string; languages?: readonly string[] }): string {
  const zone = hints.timeZone ? ZONE_COUNTRY[hints.timeZone] : undefined;
  if (zone) return zone;
  for (const tag of hints.languages ?? []) {
    const region = tag
      .split(/[-_]/)
      .slice(1)
      .find((part) => /^[A-Za-z]{2}$/.test(part));
    const c = countryByIso(region);
    if (c) return c.iso2;
  }
  return "";
}
