import dayjs from "dayjs";
import "dayjs/locale/fr";
import "dayjs/locale/fr";
import weekday from "dayjs/plugin/weekday";
import isoWeek from "dayjs/plugin/isoWeek";
import type { DateValue } from "@mantine/dates";

dayjs.extend(weekday);
dayjs.extend(isoWeek);
dayjs.locale("fr");

type DateInput = string | Date;
type Period = "WEEK" | "MONTH";

// Utilitaire pour parser différents formats de date
function parseDate(d: DateInput): dayjs.Dayjs {
  const s = typeof d === "string" ? d : dayjs(d).format("YYYY-MM-DD");
  return dayjs(s, ["YYYY-MM-DD", "DD-MM-YYYY"]);
}

/**
 * Formate une ou deux dates au format lisible (ex: "08 jeu", "08 jeu - 10 sam 2023", etc.)
 * @param input Une date (string) ou un objet avec `start` et `end`
 */
export const formatVerboseDate = (
  input: string | { start: string; end: string }
) => {

  const parseDate = (str: string) => {
    if (/^\d{4}-\d{2}-\d{2}$/.test(str)) {
      // format AAAA-MM-JJ
      return dayjs(str, "YYYY-MM-DD");
    } else if (/^\d{2}-\d{2}-\d{4}$/.test(str)) {
      // format JJ-MM-AAAA
      return dayjs(str, "DD-MM-YYYY");
    } else {
      throw new Error("Format de date invalide");
    }
  };

  const formatSingle = (date: dayjs.Dayjs, showYear = false) =>
    date.format(`DD MMM${showYear ? " YYYY" : ""}`);

  if (typeof input === "string") {
    const d = parseDate(input);
    return formatSingle(d);
  }

  const start = parseDate(input.start);
  const end = parseDate(input.end);

  const sameYear = start.year() === end.year();

  const startStr = formatSingle(start, !sameYear);
  const endStr = formatSingle(end, true);

  return `${startStr} - ${endStr}`;
};

export type OutputDate = {
  drf: { start: string; end: string };
  verbose: string;
};

export function getPeriodFromDateOrRange(
  input?: DateValue | [DateInput, DateInput],
  period: Period = "WEEK"
): OutputDate {
  let start: dayjs.Dayjs;
  let end: dayjs.Dayjs;

  // Cas : plage de deux dates
  if (Array.isArray(input)) {
    const [d1, d2] = input;
    start = parseDate(d1);
    end = parseDate(d2);
  } else {
    const refDate = input ? parseDate(input) : dayjs();
    if (period === "WEEK") {
      start = refDate.startOf("week").add(1, "day"); // lundi
      end = refDate.endOf("week").add(1, "day"); // dimanche
    } else if (period === "MONTH") {
      start = refDate.startOf("month");
      end = refDate.endOf("month");
    } else {
      throw new Error("Période inconnue");
    }
  }

  return {
    drf: {
      start: start.format("YYYY-MM-DD"),
      end: end.format("YYYY-MM-DD"),
    },
    verbose: formatVerboseDate({
      start: start.format("YYYY-MM-DD"),
      end: end.format("YYYY-MM-DD"),
    }),
  };
}

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * Formats a given date or time string into a human-readable format.
 * 
 * @param input - The date or time string to format. Supported formats include
 *                "YYYY-MM-DD", "DD-MM-YYYY", "YYYY-MM-DDTHH:mm", and "DD-MM-YYYYTHH:mm".
 * @param type - Determines the output format. If "date", returns a formatted string
 *               with the day of the week, day number, month, and year. If "time",
 *               returns the formatted time in "HH[h]:mm" format. Defaults to "date".
 * 
 * @returns A string representing the formatted date or time.
 * 
 * @throws Will throw an error if the input string is not valid according to the
 *         supported formats.
 */

/*******  e5c65408-d129-4646-9480-9804ab9bdcb9  *******/
export function formatDateOrTime(
  input: string,
  type: "date" | "time" = "date"
): string {
  const formats = ["YYYY-MM-DD", "DD-MM-YYYY", "YYYY-MM-DDTHH:mm", "DD-MM-YYYYTHH:mm"];
  const d = dayjs(input, formats, true); // true = strict parsing

  if (!d.isValid()) {
    return input;
  }

  if (type === "time") {
    return d.format("HH[h]:mm");
  }

  const days = ["dim", "lun", "mar", "mer", "jeu", "ven", "sam"];
  const months = [
    "janv", "févr", "mars", "avr", "mai", "juin",
    "juil", "août", "sept", "oct", "nov", "déc"
  ];

  const dayName = days[d.day()];
  const dayNum = d.format("DD");
  const monthName = months[d.month()];
  const year = d.format("YYYY");

  return `${dayName} ${dayNum} ${monthName} ${year}`;
}
