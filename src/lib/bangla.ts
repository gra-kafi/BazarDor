// Bangla utilities for numerals, date, and currency formatting

const banglaDigits: { [key: string]: string } = {
  "0": "০",
  "1": "১",
  "2": "২",
  "3": "৩",
  "4": "৪",
  "5": "৫",
  "6": "৬",
  "7": "৭",
  "8": "৮",
  "9": "৯",
};

const englishDigits: { [key: string]: string } = {
  "০": "0",
  "১": "1",
  "২": "2",
  "৩": "3",
  "৪": "4",
  "৫": "5",
  "৬": "6",
  "৭": "7",
  "৮": "8",
  "৯": "9",
};

export function toBanglaNumber(value: number | string | null | undefined): string {
  if (value === null || value === undefined || value === "") return "০";
  const str = String(value);
  return str.replace(/[0-9]/g, (char) => banglaDigits[char] || char);
}

export function fromBanglaNumber(value: string | number): number {
  if (typeof value === "number") return value;
  const str = String(value);
  const eng = str.replace(/[০-৯]/g, (char) => englishDigits[char] || char);
  const num = parseFloat(eng.replace(/,/g, ""));
  return isNaN(num) ? 0 : num;
}

export function formatPrice(price: number | string): string {
  return `${toBanglaNumber(price)} ৳`;
}

export function formatUnit(unit: string | undefined): string {
  if (!unit) return "প্রতি একক";
  const lower = unit.toLowerCase();
  if (lower.includes("kg") || lower.includes("কেজি")) return "প্রতি কেজি";
  if (lower.includes("liter") || lower.includes("litre") || lower.includes("লিটার")) return "প্রতি লিটার";
  if (lower.includes("dozen") || lower.includes("ডজন")) return "প্রতি ডজন";
  if (lower.includes("piece") || lower.includes("পিস") || lower.includes("টি")) return "প্রতি পিস";
  if (lower.includes("gram") || lower.includes("গ্রাম")) return `প্রতি ${unit}`;
  return `প্রতি ${unit}`;
}

export function getTodayBanglaDate(): string {
  const date = new Date();
  const days = ["রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার", "শনিবার"];
  const months = [
    "জানুয়ারি",
    "ফেব্রুয়ারি",
    "মার্চ",
    "এপ্রিল",
    "মে",
    "জুন",
    "জুলাই",
    "আগস্ট",
    "সেপ্টেম্বর",
    "অক্টোবর",
    "নভেম্বর",
    "ডিসেম্বর",
  ];

  const dayName = days[date.getDay()];
  const day = toBanglaNumber(date.getDate());
  const monthName = months[date.getMonth()];
  const year = toBanglaNumber(date.getFullYear());

  return `${dayName}, ${day} ${monthName} ${year}`;
}
