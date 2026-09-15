const DATA_FILE = "../data/cardekho_dataset.csv";
const AGE_GROUPS = ["0–3", "4–7", "8–12", "13–20", "21+"];
const AXIS = { gridcolor: "#eef0f2", zeroline: false };
const PRICE_AXIS = { title: "Selling Price (₹ Lakhs)", ...AXIS };
const CONFIG = { displayModeBar: false, responsive: true };

let allData = [];

const $ = id => document.getElementById(id);

function median(values) {
  const numbers = values.map(Number).filter(Number.isFinite).sort((a, b) => a - b);
  if (!numbers.length) return 0;

  const middle = Math.floor(numbers.length / 2);
  return numbers.length % 2 ? numbers[middle] : (numbers[middle - 1] + numbers[middle]) / 2;
}

function mean(values) {
  const numbers = values.map(Number).filter(Number.isFinite);
  if (!numbers.length) return 0;

  return numbers.reduce((a, b) => a + b, 0) / numbers.length;
}

function formatLakhs(value) {
  return "₹" + (value / 100000).toFixed(2) + " L";
}

function formatNumber(value) {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(value);
}

function uniqueSorted(rows, column) {
  return [...new Set(rows.map(row => row[column]).filter(Boolean))].sort();
}

function ageGroup(age) {
  age = Number(age);
  if (age <= 3) return AGE_GROUPS[0];
  if (age <= 7) return AGE_GROUPS[1];
  if (age <= 12) return AGE_GROUPS[2];
  if (age <= 20) return AGE_GROUPS[3];
  return AGE_GROUPS[4];
}

function filteredData() {
  const brand = $("brandFilter").value;
  const fuel = $("fuelFilter").value;
  const transmission = $("transmissionFilter").value;

  return allData.filter(row =>
    (brand === "All" || row.brand === brand) &&
    (fuel === "All" || row.fuel_type === fuel) &&
    (transmission === "All" || row.transmission_type === transmission)
  );
}

function sample(rows, limit = 5000) {
  if (rows.length <= limit) return rows;

  const step = Math.ceil(rows.length / limit);
  return rows.filter((_, index) => index % step === 0);
}

function groupPrices(rows, keyOf) {
  const groups = {};

  rows.forEach(row => {
    const key = keyOf(row);
    if (!key) return;

    (groups[key] ||= []).push(Number(row.selling_price));
  });

  return groups;
}

function layout(options) {
  return {
    margin: { l: 58, r: 18, t: 8, b: 52 },
    font: { family: "-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif", size: 11 },
    paper_bgcolor: "white",
    plot_bgcolor: "white",
    showlegend: false,
    xaxis: AXIS,
    yaxis: AXIS,
    ...options
  };
}

function updateKPIs(rows) {
  $("carsKpi").textContent = formatNumber(rows.length);
  $("priceKpi").textContent = formatLakhs(median(rows.map(row => row.selling_price)));
  $("ageKpi").textContent = mean(rows.map(row => row.vehicle_age)).toFixed(1) + " yrs";
  $("mileageKpi").textContent = formatNumber(mean(rows.map(row => row.km_driven))) + " km";
}

function plotAge(rows) {
  const groups = groupPrices(rows, row => ageGroup(row.vehicle_age));
  const ages = AGE_GROUPS.filter(age => groups[age]);
  const prices = ages.map(age => median(groups[age]));

  Plotly.newPlot("ageChart", [{
    x: ages,
    y: prices.map(price => price / 100000),
    type: "bar",
    text: prices.map(formatLakhs),
    textposition: "outside",
    hovertemplate: "Age: %{x}<br>Median price: ₹%{y:.2f} L<extra></extra>"
  }], layout({ yaxis: PRICE_AXIS }), CONFIG);
}

function plotMedianBar(rows, column, chartId, title, minCount = 0) {
  const groups = groupPrices(rows, row => row[column]);

  const items = Object.entries(groups)
    .filter(([, values]) => values.length >= minCount)
    .map(([name, values]) => ({ name, price: median(values), count: values.length }))
    .sort((a, b) => b.price - a.price);

  Plotly.newPlot(chartId, [{
    x: items.map(item => item.name),
    y: items.map(item => item.price / 100000),
    type: "bar",
    text: items.map(item => formatLakhs(item.price)),
    textposition: "outside",
    customdata: items.map(item => item.count),
    hovertemplate: "%{x}<br>Median price: ₹%{y:.2f} L<br>Cars: %{customdata}<extra></extra>"
  }], layout({ xaxis: { title, ...AXIS }, yaxis: PRICE_AXIS }), CONFIG);
}

function plotBrand(rows) {
  const groups = groupPrices(rows, row => row.brand);

  const items = Object.entries(groups)
    .filter(([, values]) => values.length >= 50)
    .map(([name, values]) => ({ name, price: median(values), count: values.length }))
    .sort((a, b) => a.price - b.price);

  Plotly.newPlot("brandChart", [{
    x: items.map(item => item.price / 100000),
    y: items.map(item => item.name),
    type: "bar",
    orientation: "h",
    customdata: items.map(item => item.count),
    hovertemplate: "%{y}<br>Median price: ₹%{x:.2f} L<br>Cars: %{customdata}<extra></extra>"
  }], layout({
    margin: { l: 95, r: 20, t: 8, b: 52 },
    xaxis: { title: "Median Selling Price (₹ Lakhs)", ...AXIS }
  }), CONFIG);
}

function plotScatter(rows, column, chartId, title, hoverX = "%{x}") {
  const points = sample(rows);

  Plotly.newPlot(chartId, [{
    x: points.map(row => Number(row[column])),
    y: points.map(row => Number(row.selling_price) / 100000),
    mode: "markers",
    type: "scattergl",
    marker: { size: 5, opacity: 0.35 },
    hovertemplate: `${title}: ${hoverX}<br>Price: ₹%{y:.2f} L<extra></extra>`
  }], layout({ xaxis: { title, ...AXIS }, yaxis: PRICE_AXIS }), CONFIG);
}

function updateDashboard() {
  const rows = filteredData();

  updateKPIs(rows);
  plotAge(rows);
  plotScatter(rows, "km_driven", "mileageChart", "Kilometers Driven", "%{x:,.0f} km");
  plotBrand(rows);
  plotMedianBar(rows, "fuel_type", "fuelChart", "Fuel Type");
  plotMedianBar(rows, "transmission_type", "transmissionChart", "Transmission");
  plotScatter(rows, "engine", "engineChart", "Engine (cc)");
  plotScatter(rows, "max_power", "powerChart", "Max Power (bhp)");
}

function fillFilters() {
  const filters = [
    ["brandFilter", "brand"],
    ["fuelFilter", "fuel_type"],
    ["transmissionFilter", "transmission_type"]
  ];

  filters.forEach(([filterId, column]) => {
    const select = $(filterId);

    uniqueSorted(allData, column).forEach(value => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = value;
      select.appendChild(option);
    });
  });
}

function showLoadError(error) {
  console.error(error);

  document.body.innerHTML = `
    <div style="font-family:system-ui;padding:40px">
      <h2>Dashboard could not load the data.</h2>
      <p>Run the project using a local server:</p>
      <pre>cd dashboard
python3 -m http.server 8000</pre>
      <p>Then open <b>http://localhost:8000</b></p>
    </div>
  `;
}

["brandFilter", "fuelFilter", "transmissionFilter"].forEach(id => {
  $(id).addEventListener("change", updateDashboard);
});

$("resetBtn").addEventListener("click", () => {
  $("brandFilter").value = "All";
  $("fuelFilter").value = "All";
  $("transmissionFilter").value = "All";
  updateDashboard();
});

Papa.parse(DATA_FILE, {
  download: true,
  header: true,
  skipEmptyLines: true,
  dynamicTyping: true,

  complete(results) {
    allData = results.data.filter(row =>
      row.selling_price != null &&
      row.vehicle_age != null &&
      row.km_driven != null
    );

    fillFilters();
    updateDashboard();
  },

  error: showLoadError
});