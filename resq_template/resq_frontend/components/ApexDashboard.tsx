import React, { FC } from "react";
import { Platform, View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

interface ApexDashboardProps {}

const ApexDashboard: FC<ApexDashboardProps> = () => {
  const chartHTML = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
        <style>
          html, body {
            margin: 0;
            padding: 0;
            height: 100%;
            width: 100%;
            font-family: Arial, sans-serif;
          }

          .chart-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            padding: 10px;
            box-sizing: border-box;
          }

          .chart-box {
            flex: 1 1 calc(33.333% - 10px); /* 3 columns like col-md-4 */
            min-width: 250px; /* responsive on smaller screens */
            height: 300px;
          }

          @media (max-width: 768px) {
            .chart-box {
              flex: 1 1 100%; /* stack on small screens */
            }
          }
        </style>
      </head>
      <body>
        <div class="chart-grid">
          <div id="lineChart" class="chart-box"></div>
          <div id="barChart" class="chart-box"></div>
          <div id="pieChart" class="chart-box"></div>
        </div>

        <script>
          // Line Chart
          new ApexCharts(document.querySelector("#lineChart"), {
            chart: { type: 'line', height: '100%' },
            series: [{ name: 'Monthly Ops', data: [10, 25, 40, 35, 50, 60] }],
            xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] },
            title: { text: 'Line Chart', align: 'center' },
            stroke: { curve: 'smooth', width: 3 },
            colors: ['#008FFB'],
            dataLabels: { enabled: false }
          }).render();

          // Bar Chart
          new ApexCharts(document.querySelector("#barChart"), {
            chart: { type: 'bar', height: '100%' },
            series: [{ name: 'Rescue Ops', data: [12, 15, 25, 30, 40, 50] }],
            xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] },
            title: { text: 'Bar Chart', align: 'center' },
            colors: ['#00E396']
          }).render();

          // Pie Chart
          new ApexCharts(document.querySelector("#pieChart"), {
            chart: { type: 'pie', height: '100%' },
            series: [44, 33, 23],
            labels: ['Mogpog', 'Boac', 'Gasan'],
            title: { text: 'Pie Chart', align: 'center' },
            colors: ['#FEB019', '#FF4560', '#775DD0']
          }).render();
        </script>
      </body>
    </html>
  `;

  if (Platform.OS === "web") {
    return (
      <iframe
        src={`data:text/html,${encodeURIComponent(chartHTML)}`}
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          borderRadius: 8,
        }}
        title="Apex Dashboard"
      />
    );
  }

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={["*"]}
        source={{ html: chartHTML }}
        style={styles.webview}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  webview: { flex: 1 },
});

export default ApexDashboard;
