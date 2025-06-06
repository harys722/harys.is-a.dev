module.exports = async (req, res) => {
  try {
    const offsetStr = req.query.timezone;

    // Validate input
    if (!offsetStr) {
      return res.status(400).json({ error: "Missing 'timezone' parameter." });
    }
    if (offsetStr.includes(':') || offsetStr.includes(',')) {
      return res.status(400).json({ error: "Invalid format. Use decimal notation." });
    }

    const offsetNum = parseFloat(offsetStr);
    if (isNaN(offsetNum) || offsetNum < -12 || offsetNum > 14) {
      return res.status(400).json({ error: "Invalid 'timezone' range." });
    }

    // Map timezone to location
    const timezoneToLocation = {
      "-12": { city: "Anywhere on Earth", lat: -27.4698, lon: -109.5336 },
      "-11": { city: "Midway Atoll", lat: 28.2076, lon: -177.3819 },
      "-10": { city: "Honolulu", lat: 21.3069, lon: -157.8583 },
      "-9": { city: "Anchorage", lat: 61.2181, lon: -149.9003 },
      "-8": { city: "Los Angeles", lat: 34.0522, lon: -118.2437 },
      "-7": { city: "Denver", lat: 39.7392, lon: -104.9903 },
      "-6": { city: "Mexico City", lat: 19.4326, lon: -99.1332 },
      "-5": { city: "New York", lat: 40.7128, lon: -74.0060 },
      "-4": { city: "Santiago", lat: -33.4489, lon: -70.6693 },
      "-3": { city: "Buenos Aires", lat: -34.6037, lon: -58.3816 },
      "-2": { city: "South Georgia", lat: -54.4286, lon: -36.5879 },
      "-1": { city: "Azores", lat: 38.7169, lon: -27.2116 },
      "0": { city: "London", lat: 51.5074, lon: -0.1278 },
      "1": { city: "Berlin", lat: 52.52, lon: 13.405 },
      "2": { city: "Johannesburg", lat: -26.2041, lon: 28.0473 },
      "3": { city: "Moscow", lat: 55.7558, lon: 37.6173 },
      "3.5": { city: "Tehran", lat: 35.6892, lon: 51.3890 },
      "4": { city: "Dubai", lat: 25.276987, lon: 55.296249 },
      "5": { city: "Karachi", lat: 24.8607, lon: 67.0011 },
      "5.5": { city: "New Delhi", lat: 28.6139, lon: 77.2090 },
      "6": { city: "Dhaka", lat: 23.8103, lon: 90.4125 },
      "6.5": { city: "Yangon", lat: 16.8409, lon: 96.1735 },
      "7": { city: "Bangkok", lat: 13.7563, lon: 100.5018 },
      "8": { city: "Singapore", lat: 1.3521, lon: 103.8198 },
      "8.75": { city: "Kimberley", lat: -17.927, lon: 122.215 },
      "9": { city: "Seoul", lat: 37.5665, lon: 126.9780 },
      "9.5": { city: "Adelaide", lat: -34.9285, lon: 138.6007 },
      "10": { city: "Sydney", lat: -33.8688, lon: 151.2093 },
      "10.5": { city: "Lord Howe Island", lat: -31.556, lon: 159.077 },
      "11": { city: "Solomon Islands", lat: -9.6458, lon: 160.1562 },
      "11.5": { city: "Norfolk Island", lat: -29.0408, lon: 167.9547 },
      "12": { city: "Wellington", lat: -41.2867, lon: 174.7762 },
      "12.75": { city: "Chatham Islands", lat: -43.9566, lon: -176.5402 },
      "13": { city: "Nuku'alofa", lat: -21.1394, lon: -175.2048 },
      "14": { city: "Kiritimati", lat: 1.8700, lon: -157.4291 },
    };

    const location = timezoneToLocation[offsetStr] || timezoneToLocation["0"];

    // Get current server time
    const now = new Date();

    // Convert server time to UTC
    const utcTime = new Date(now.getTime() + now.getTimezoneOffset() * 60000);

    // Convert UTC to local time based on offset
    const localTime = new Date(utcTime.getTime() + offsetNum * 3600000);

    // Extract local date components
    const year = localTime.getFullYear();
    const monthNum = localTime.getMonth() + 1;
    const day = localTime.getDate();

    // Format date as DD-MM-YYYY
    const dateStr = `${String(day).padStart(2, '0')}-${String(monthNum).padStart(2, '0')}-${year}`;
    const dateParam = dateStr;

    // Fetch Hijri date safely
    let hijriDay, hijriMonthEn, hijriYear;
    let hijriDateStr = "N/A couldn't fetch"; // fallback
    try {
      const apiUrl = `https://api.aladhan.com/v1/gToH/${dateStr}?date=${dateParam}&latitude=${location.lat}&longitude=${location.lon}`;
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (
        data &&
        data.data &&
        data.data.hijri &&
        data.data.hijri.day &&
        data.data.hijri.month &&
        data.data.hijri.year
      ) {
        hijriDay = data.data.hijri.day;
        hijriMonthEn = data.data.hijri.month.en;
        hijriYear = data.data.hijri.year;
        hijriDateStr = `${hijriDay} ${hijriMonthEn} ${hijriYear}`;
      }
    } catch (err) {
      console.error("Hijri API fetch error:", err);
    }

    // Format local time
    const hours24 = localTime.getHours();
    const minutes = localTime.getMinutes();
    const seconds = localTime.getSeconds();
    const ampm = hours24 >= 12 ? "PM" : "AM";
    const hours12 = hours24 % 12 || 12;
    const timeStr = `${String(hours12).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")} ${ampm}`;

    const unixSeconds = Math.floor(localTime.getTime() / 1000);

    // Day of Year
    const startOfYear = new Date(localTime.getFullYear(), 0, 0);
    const diff = localTime - startOfYear;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);

    // Week number
    function getWeekNumber(d) {
      d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
      d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
      const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
      return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
    }
    const weekNumber = getWeekNumber(localTime);

    // Timezone abbreviation
    const dtf = new Intl.DateTimeFormat('en-US', { timeZone: 'UTC', timeZoneName: 'short' });
    const parts = dtf.formatToParts(localTime);
    const timezoneNamePart = parts.find(p => p.type === 'timeZoneName');
    const timezoneAbbr = timezoneNamePart ? timezoneNamePart.value : "";

    // Human-readable Gregorian date in format "28 May, 2025"
    const gregorianFormatter = new Intl.DateTimeFormat('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
    const gregorianParts = gregorianFormatter.formatToParts(localTime);
    const dayPart = gregorianParts.find(p => p.type === 'day')?.value;
    const monthPart = gregorianParts.find(p => p.type === 'month')?.value;
    const yearPart = gregorianParts.find(p => p.type === 'year')?.value;
    const friendlyGregorianDate = `${dayPart} ${monthPart}, ${yearPart}`; // no comma in month

    // Respond
    res.setHeader("Content-Type", "application/json");
    res.status(200).json({
      time: {
        formatted: timeStr,
        unix: unixSeconds,
        UTC: new Date().toISOString(),
        timezone: {
          offset: offsetNum,
          name: timezoneAbbr,
          region: location.city || "Unknown",
        },
      },
      gregorian: {
        date: dateStr,
        dayOfYear: dayOfYear,
        weekNumber: weekNumber,
        humanReadable: friendlyGregorianDate,
      },
      hijri: {
        date: hijriDateStr,
        day: hijriDay,
        month: hijriMonthEn,
        year: hijriYear,
      },
      credits: "Made by harys722, available only for cool people!",
      website: "https://harys.is-a.dev/"
    });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
