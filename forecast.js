/* =========================================================
   forecast.js  -  7-day forecast for the Forecast Summary page
   NOTE: all temperatures below are SAMPLE (dummy) values.
   ========================================================= */

/* ---------- 1. Sample data ----------
   temps = predicted maximum temperature in °C for 7 days,
   starting from today.                                   */
const FORECAST_DATA = [
    {
        id: "north",
        name: "North India",
        covers: "Jammu & Kashmir, Ladakh, Himachal Pradesh, Punjab, Haryana, Delhi, Uttarakhand, Uttar Pradesh",
        temps: [39, 41, 43, 44, 45, 43, 40]
    },
    {
        id: "northwest",
        name: "Northwest India",
        covers: "Rajasthan, Gujarat",
        temps: [44, 45, 46, 45, 44, 43, 42]
    },
    {
        id: "central",
        name: "Central India",
        covers: "Madhya Pradesh, Chhattisgarh",
        temps: [42, 43, 44, 45, 44, 42, 41]
    },
    {
        id: "east",
        name: "East India",
        covers: "Bihar, Jharkhand, West Bengal, Odisha",
        temps: [38, 39, 41, 42, 40, 38, 37]
    },
    {
        id: "northeast",
        name: "Northeast India",
        covers: "Assam, Arunachal Pradesh, Meghalaya, Manipur, Mizoram, Nagaland, Tripura, Sikkim",
        temps: [31, 32, 33, 32, 34, 33, 31]
    },
    {
        id: "west",
        name: "West India",
        covers: "Maharashtra, Goa",
        temps: [36, 37, 39, 40, 38, 37, 35]
    },
    {
        id: "south",
        name: "Southern Peninsula",
        covers: "Andhra Pradesh, Telangana, Karnataka, Tamil Nadu, Kerala",
        temps: [35, 36, 38, 39, 37, 36, 34]
    }
];

/* ---------- 2. Alert levels ----------
   Checked from top to bottom; the first one whose "min"
   the temperature reaches is used. Change the numbers here
   if you want different cut-offs.                         */
const LEVELS = [
    { key: "severe",  label: "Severe",  min: 45 },
    { key: "warning", label: "Warning", min: 40 },
    { key: "watch",   label: "Watch",   min: 37 },
    { key: "normal",  label: "Normal",  min: -Infinity }
];

function getLevel(temp) {
    return LEVELS.find(function (level) {
        return temp >= level.min;
    });
}

function dayLabel(index) {
    return index === 0 ? "Today" : "Day " + (index + 1);
}

/* ---------- 3. Page elements ---------- */
const regionSelect = document.getElementById("region-select");
const coversText   = document.getElementById("region-covers");
const grid         = document.getElementById("forecast-grid");
const summary      = document.getElementById("forecast-summary");

/* ---------- 4. Fill the dropdown ---------- */
FORECAST_DATA.forEach(function (region) {
    const option = document.createElement("option");
    option.value = region.id;
    option.textContent = region.name;
    regionSelect.appendChild(option);
});

/* ---------- 5. Draw the cards + summary for one region ---------- */
function renderForecast(regionId) {
    const region = FORECAST_DATA.find(function (r) {
        return r.id === regionId;
    });
    if (!region) return;

    coversText.textContent = "Covers: " + region.covers;

    // Day cards
    grid.innerHTML = "";
    region.temps.forEach(function (temp, index) {
        const level = getLevel(temp);

        const card = document.createElement("div");
        card.className = "forecast-card";
        card.innerHTML =
            '<p class="forecast-day">' + dayLabel(index) + "</p>" +
            '<p class="forecast-temp">' + temp + "°C</p>" +
            '<span class="forecast-pill level-' + level.key + '">' + level.label + "</span>";

        grid.appendChild(card);
    });

    // Summary
    const peak      = Math.max.apply(null, region.temps);
    const peakIndex = region.temps.indexOf(peak);
    const peakWhen  = peakIndex === 0 ? "today" : "on <strong>" + dayLabel(peakIndex) + "</strong>";

    const hotDays = region.temps.filter(function (temp) {
        return temp >= 40;   // heatwave level or above
    }).length;

    const hotDaysText = hotDays === 0
        ? "No days at Warning level this week."
        : hotDays + " of " + region.temps.length + " days at Warning level or above.";

    summary.innerHTML =
        "<p>Peak of <strong>" + peak + "°C</strong> expected " + peakWhen + ".</p>" +
        "<p>" + hotDaysText +
        ' Check the <a href="alerts.html">advisories</a> and ' +
        '<a href="subscribe.html">subscribe</a> for alerts.</p>';
}

/* ---------- 6. Wire it up ---------- */
regionSelect.addEventListener("change", function () {
    renderForecast(regionSelect.value);
});

// Show the first region when the page loads
renderForecast(regionSelect.value);