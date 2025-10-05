"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { DateRangePicker } from "@/components/ui/date-range-picker"
import { DateRange } from "react-day-picker"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

// Mock data for monthly charts
const netSaleMarginData = [
  { month: "Jan", netSale: 450000, margin: 67500 },
  { month: "Feb", netSale: 520000, margin: 78000 },
  { month: "Mar", netSale: 480000, margin: 72000 },
  { month: "Apr", netSale: 550000, margin: 82500 },
  { month: "May", netSale: 600000, margin: 90000 },
  { month: "Jun", netSale: 580000, margin: 87000 },
]

// Mock data for daily charts (last 30 days)
const netSaleMarginDataDaily = [
  { day: "Day 1", netSale: 15000, margin: 2250 },
  { day: "Day 2", netSale: 16000, margin: 2400 },
  { day: "Day 3", netSale: 14500, margin: 2175 },
  { day: "Day 4", netSale: 17000, margin: 2550 },
  { day: "Day 5", netSale: 15500, margin: 2325 },
  { day: "Day 6", netSale: 18000, margin: 2700 },
  { day: "Day 7", netSale: 16500, margin: 2475 },
  { day: "Day 8", netSale: 15200, margin: 2280 },
  { day: "Day 9", netSale: 17500, margin: 2625 },
  { day: "Day 10", netSale: 16800, margin: 2520 },
  { day: "Day 11", netSale: 15800, margin: 2370 },
  { day: "Day 12", netSale: 17200, margin: 2580 },
  { day: "Day 13", netSale: 16300, margin: 2445 },
  { day: "Day 14", netSale: 18500, margin: 2775 },
  { day: "Day 15", netSale: 17800, margin: 2670 },
  { day: "Day 16", netSale: 16000, margin: 2400 },
  { day: "Day 17", netSale: 15500, margin: 2325 },
  { day: "Day 18", netSale: 17000, margin: 2550 },
  { day: "Day 19", netSale: 16500, margin: 2475 },
  { day: "Day 20", netSale: 18200, margin: 2730 },
  { day: "Day 21", netSale: 17500, margin: 2625 },
  { day: "Day 22", netSale: 16800, margin: 2520 },
  { day: "Day 23", netSale: 15300, margin: 2295 },
  { day: "Day 24", netSale: 17600, margin: 2640 },
  { day: "Day 25", netSale: 16200, margin: 2430 },
  { day: "Day 26", netSale: 18000, margin: 2700 },
  { day: "Day 27", netSale: 17300, margin: 2595 },
  { day: "Day 28", netSale: 16700, margin: 2505 },
  { day: "Day 29", netSale: 15900, margin: 2385 },
  { day: "Day 30", netSale: 17400, margin: 2610 },
]

const brandedVsPrivateData = [
  { month: "Jan", branded: 300000, privateLabel: 150000 },
  { month: "Feb", branded: 350000, privateLabel: 170000 },
  { month: "Mar", branded: 320000, privateLabel: 160000 },
  { month: "Apr", branded: 370000, privateLabel: 180000 },
  { month: "May", branded: 400000, privateLabel: 200000 },
  { month: "Jun", branded: 390000, privateLabel: 190000 },
]

const brandedVsPrivateDataDaily = [
  { day: "Day 1", branded: 10000, privateLabel: 5000 },
  { day: "Day 2", branded: 11000, privateLabel: 5500 },
  { day: "Day 3", branded: 9500, privateLabel: 4800 },
  { day: "Day 4", branded: 11500, privateLabel: 5700 },
  { day: "Day 5", branded: 10200, privateLabel: 5100 },
  { day: "Day 6", branded: 12000, privateLabel: 6000 },
  { day: "Day 7", branded: 11000, privateLabel: 5500 },
  { day: "Day 8", branded: 10100, privateLabel: 5050 },
  { day: "Day 9", branded: 11800, privateLabel: 5900 },
  { day: "Day 10", branded: 11200, privateLabel: 5600 },
  { day: "Day 11", branded: 10500, privateLabel: 5250 },
  { day: "Day 12", branded: 11500, privateLabel: 5750 },
  { day: "Day 13", branded: 10800, privateLabel: 5400 },
  { day: "Day 14", branded: 12300, privateLabel: 6150 },
  { day: "Day 15", branded: 11900, privateLabel: 5950 },
  { day: "Day 16", branded: 10700, privateLabel: 5350 },
  { day: "Day 17", branded: 10300, privateLabel: 5150 },
  { day: "Day 18", branded: 11300, privateLabel: 5650 },
  { day: "Day 19", branded: 11000, privateLabel: 5500 },
  { day: "Day 20", branded: 12100, privateLabel: 6050 },
  { day: "Day 21", branded: 11700, privateLabel: 5850 },
  { day: "Day 22", branded: 11200, privateLabel: 5600 },
  { day: "Day 23", branded: 10200, privateLabel: 5100 },
  { day: "Day 24", branded: 11700, privateLabel: 5850 },
  { day: "Day 25", branded: 10800, privateLabel: 5400 },
  { day: "Day 26", branded: 12000, privateLabel: 6000 },
  { day: "Day 27", branded: 11500, privateLabel: 5750 },
  { day: "Day 28", branded: 11100, privateLabel: 5550 },
  { day: "Day 29", branded: 10600, privateLabel: 5300 },
  { day: "Day 30", branded: 11600, privateLabel: 5800 },
]

const salesByCategoryData = [
  { category: "Medicines", sales: 250000, margin: 37500 },
  { category: "Supplements", sales: 150000, margin: 22500 },
  { category: "Personal Care", sales: 100000, margin: 15000 },
  { category: "Baby Care", sales: 80000, margin: 12000 },
]

const onlineOfflineData = [
  { name: "Offline Sale", value: 420000 },
  { name: "Online Sale", value: 180000 },
]

const orderCountData = [
  { month: "Jan", saleOrders: 450, webOrders: 120 },
  { month: "Feb", saleOrders: 520, webOrders: 145 },
  { month: "Mar", saleOrders: 480, webOrders: 135 },
  { month: "Apr", saleOrders: 550, webOrders: 160 },
  { month: "May", saleOrders: 600, webOrders: 180 },
  { month: "Jun", saleOrders: 580, webOrders: 170 },
]

const orderCountDataDaily = [
  { day: "Day 1", saleOrders: 15, webOrders: 4 },
  { day: "Day 2", saleOrders: 17, webOrders: 5 },
  { day: "Day 3", saleOrders: 16, webOrders: 4 },
  { day: "Day 4", saleOrders: 18, webOrders: 5 },
  { day: "Day 5", saleOrders: 17, webOrders: 5 },
  { day: "Day 6", saleOrders: 20, webOrders: 6 },
  { day: "Day 7", saleOrders: 19, webOrders: 6 },
  { day: "Day 8", saleOrders: 16, webOrders: 4 },
  { day: "Day 9", saleOrders: 18, webOrders: 5 },
  { day: "Day 10", saleOrders: 19, webOrders: 6 },
  { day: "Day 11", saleOrders: 17, webOrders: 5 },
  { day: "Day 12", saleOrders: 18, webOrders: 5 },
  { day: "Day 13", saleOrders: 17, webOrders: 5 },
  { day: "Day 14", saleOrders: 20, webOrders: 6 },
  { day: "Day 15", saleOrders: 19, webOrders: 6 },
  { day: "Day 16", saleOrders: 17, webOrders: 5 },
  { day: "Day 17", saleOrders: 16, webOrders: 4 },
  { day: "Day 18", saleOrders: 18, webOrders: 5 },
  { day: "Day 19", saleOrders: 17, webOrders: 5 },
  { day: "Day 20", saleOrders: 19, webOrders: 6 },
  { day: "Day 21", saleOrders: 18, webOrders: 5 },
  { day: "Day 22", saleOrders: 19, webOrders: 6 },
  { day: "Day 23", saleOrders: 16, webOrders: 4 },
  { day: "Day 24", saleOrders: 18, webOrders: 5 },
  { day: "Day 25", saleOrders: 17, webOrders: 5 },
  { day: "Day 26", saleOrders: 20, webOrders: 6 },
  { day: "Day 27", saleOrders: 19, webOrders: 6 },
  { day: "Day 28", saleOrders: 18, webOrders: 5 },
  { day: "Day 29", saleOrders: 17, webOrders: 5 },
  { day: "Day 30", saleOrders: 19, webOrders: 6 },
]

const abvBillsData = [
  { month: "Jan", abv: 1200, bills: 375 },
  { month: "Feb", abv: 1250, bills: 416 },
  { month: "Mar", abv: 1180, bills: 407 },
  { month: "Apr", abv: 1300, bills: 423 },
  { month: "May", abv: 1350, bills: 444 },
  { month: "Jun", abv: 1320, bills: 439 },
]

const abvBillsDataDaily = [
  { day: "Day 1", abv: 1200, bills: 12 },
  { day: "Day 2", abv: 1250, bills: 13 },
  { day: "Day 3", abv: 1180, bills: 12 },
  { day: "Day 4", abv: 1300, bills: 14 },
  { day: "Day 5", abv: 1220, bills: 13 },
  { day: "Day 6", abv: 1350, bills: 15 },
  { day: "Day 7", abv: 1280, bills: 13 },
  { day: "Day 8", abv: 1200, bills: 12 },
  { day: "Day 9", abv: 1320, bills: 14 },
  { day: "Day 10", abv: 1270, bills: 13 },
  { day: "Day 11", abv: 1230, bills: 13 },
  { day: "Day 12", abv: 1290, bills: 14 },
  { day: "Day 13", abv: 1250, bills: 13 },
  { day: "Day 14", abv: 1360, bills: 15 },
  { day: "Day 15", abv: 1310, bills: 14 },
  { day: "Day 16", abv: 1240, bills: 13 },
  { day: "Day 17", abv: 1190, bills: 12 },
  { day: "Day 18", abv: 1270, bills: 13 },
  { day: "Day 19", abv: 1250, bills: 13 },
  { day: "Day 20", abv: 1330, bills: 14 },
  { day: "Day 21", abv: 1300, bills: 14 },
  { day: "Day 22", abv: 1260, bills: 13 },
  { day: "Day 23", abv: 1210, bills: 12 },
  { day: "Day 24", abv: 1280, bills: 14 },
  { day: "Day 25", abv: 1240, bills: 13 },
  { day: "Day 26", abv: 1340, bills: 14 },
  { day: "Day 27", abv: 1290, bills: 14 },
  { day: "Day 28", abv: 1270, bills: 13 },
  { day: "Day 29", abv: 1220, bills: 12 },
  { day: "Day 30", abv: 1300, bills: 14 },
]

const discountData = [
  { month: "Jan", discount: 5.2 },
  { month: "Feb", discount: 4.8 },
  { month: "Mar", discount: 5.5 },
  { month: "Apr", discount: 4.5 },
  { month: "May", discount: 4.2 },
  { month: "Jun", discount: 4.7 },
]

const discountDataDaily = [
  { day: "Day 1", discount: 5.2 },
  { day: "Day 2", discount: 4.8 },
  { day: "Day 3", discount: 5.5 },
  { day: "Day 4", discount: 4.5 },
  { day: "Day 5", discount: 5.0 },
  { day: "Day 6", discount: 4.2 },
  { day: "Day 7", discount: 4.7 },
  { day: "Day 8", discount: 5.3 },
  { day: "Day 9", discount: 4.6 },
  { day: "Day 10", discount: 4.9 },
  { day: "Day 11", discount: 5.1 },
  { day: "Day 12", discount: 4.4 },
  { day: "Day 13", discount: 4.8 },
  { day: "Day 14", discount: 4.3 },
  { day: "Day 15", discount: 4.6 },
  { day: "Day 16", discount: 5.0 },
  { day: "Day 17", discount: 5.4 },
  { day: "Day 18", discount: 4.7 },
  { day: "Day 19", discount: 4.9 },
  { day: "Day 20", discount: 4.4 },
  { day: "Day 21", discount: 4.6 },
  { day: "Day 22", discount: 4.8 },
  { day: "Day 23", discount: 5.2 },
  { day: "Day 24", discount: 4.5 },
  { day: "Day 25", discount: 4.9 },
  { day: "Day 26", discount: 4.3 },
  { day: "Day 27", discount: 4.7 },
  { day: "Day 28", discount: 4.8 },
  { day: "Day 29", discount: 5.1 },
  { day: "Day 30", discount: 4.6 },
]

const bounceProductsData = [
  { month: "Jan", count: 45 },
  { month: "Feb", count: 38 },
  { month: "Mar", count: 52 },
  { month: "Apr", count: 35 },
  { month: "May", count: 30 },
  { month: "Jun", count: 42 },
]

const bounceProductsDataDaily = [
  { day: "Day 1", count: 2 },
  { day: "Day 2", count: 1 },
  { day: "Day 3", count: 3 },
  { day: "Day 4", count: 1 },
  { day: "Day 5", count: 2 },
  { day: "Day 6", count: 1 },
  { day: "Day 7", count: 2 },
  { day: "Day 8", count: 3 },
  { day: "Day 9", count: 1 },
  { day: "Day 10", count: 2 },
  { day: "Day 11", count: 2 },
  { day: "Day 12", count: 1 },
  { day: "Day 13", count: 2 },
  { day: "Day 14", count: 1 },
  { day: "Day 15", count: 2 },
  { day: "Day 16", count: 2 },
  { day: "Day 17", count: 3 },
  { day: "Day 18", count: 1 },
  { day: "Day 19", count: 2 },
  { day: "Day 20", count: 1 },
  { day: "Day 21", count: 2 },
  { day: "Day 22", count: 2 },
  { day: "Day 23", count: 3 },
  { day: "Day 24", count: 1 },
  { day: "Day 25", count: 2 },
  { day: "Day 26", count: 1 },
  { day: "Day 27", count: 2 },
  { day: "Day 28", count: 2 },
  { day: "Day 29", count: 3 },
  { day: "Day 30", count: 1 },
]

const skuData = [
  { month: "Jan", ordered: 850, replenished: 820 },
  { month: "Feb", ordered: 920, replenished: 900 },
  { month: "Mar", ordered: 880, replenished: 860 },
  { month: "Apr", ordered: 950, replenished: 930 },
  { month: "May", ordered: 1000, replenished: 980 },
  { month: "Jun", ordered: 980, replenished: 960 },
]

const skuDataDaily = [
  { day: "Day 1", ordered: 30, replenished: 28 },
  { day: "Day 2", ordered: 32, replenished: 30 },
  { day: "Day 3", ordered: 29, replenished: 27 },
  { day: "Day 4", ordered: 33, replenished: 31 },
  { day: "Day 5", ordered: 31, replenished: 29 },
  { day: "Day 6", ordered: 35, replenished: 33 },
  { day: "Day 7", ordered: 32, replenished: 30 },
  { day: "Day 8", ordered: 30, replenished: 28 },
  { day: "Day 9", ordered: 34, replenished: 32 },
  { day: "Day 10", ordered: 33, replenished: 31 },
  { day: "Day 11", ordered: 31, replenished: 29 },
  { day: "Day 12", ordered: 33, replenished: 31 },
  { day: "Day 13", ordered: 32, replenished: 30 },
  { day: "Day 14", ordered: 36, replenished: 34 },
  { day: "Day 15", ordered: 34, replenished: 32 },
  { day: "Day 16", ordered: 31, replenished: 29 },
  { day: "Day 17", ordered: 30, replenished: 28 },
  { day: "Day 18", ordered: 33, replenished: 31 },
  { day: "Day 19", ordered: 32, replenished: 30 },
  { day: "Day 20", ordered: 35, replenished: 33 },
  { day: "Day 21", ordered: 34, replenished: 32 },
  { day: "Day 22", ordered: 33, replenished: 31 },
  { day: "Day 23", ordered: 30, replenished: 28 },
  { day: "Day 24", ordered: 34, replenished: 32 },
  { day: "Day 25", ordered: 32, replenished: 30 },
  { day: "Day 26", ordered: 35, replenished: 33 },
  { day: "Day 27", ordered: 33, replenished: 31 },
  { day: "Day 28", ordered: 32, replenished: 30 },
  { day: "Day 29", ordered: 31, replenished: 29 },
  { day: "Day 30", ordered: 34, replenished: 32 },
]

const COLORS = ["#0e7490", "#7c3aed"]

export default function PerformanceReportsPage() {
  const [selectedStore, setSelectedStore] = useState("all")
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [viewMode, setViewMode] = useState<"day" | "month">("month")

  // Get the appropriate data based on viewMode
  const currentNetSaleMarginData = viewMode === "day" ? netSaleMarginDataDaily : netSaleMarginData
  const currentBrandedVsPrivateData = viewMode === "day" ? brandedVsPrivateDataDaily : brandedVsPrivateData
  const currentOrderCountData = viewMode === "day" ? orderCountDataDaily : orderCountData
  const currentAbvBillsData = viewMode === "day" ? abvBillsDataDaily : abvBillsData
  const currentDiscountData = viewMode === "day" ? discountDataDaily : discountData
  const currentBounceProductsData = viewMode === "day" ? bounceProductsDataDaily : bounceProductsData
  const currentSkuData = viewMode === "day" ? skuDataDaily : skuData

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-cyan-900">Performance Reports</h1>
        <p className="text-gray-600 mt-2">Visual dashboard of key performance indicators</p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-cyan-900">Filters</CardTitle>
          <CardDescription>Customize your report view</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="store">Store</Label>
              <Select value={selectedStore} onValueChange={setSelectedStore}>
                <SelectTrigger id="store">
                  <SelectValue placeholder="Select store" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Stores</SelectItem>
                  <SelectItem value="store1">Store 1 - Mumbai Main</SelectItem>
                  <SelectItem value="store2">Store 2 - Mumbai East</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateRange">Date Range</Label>
              <DateRangePicker
                date={dateRange}
                onDateChange={setDateRange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="viewMode">View Mode</Label>
              <Select value={viewMode} onValueChange={(value: "day" | "month") => setViewMode(value)}>
                <SelectTrigger id="viewMode">
                  <SelectValue placeholder="Select view" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="day">Day wise</SelectItem>
                  <SelectItem value="month">Month over Month</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charts Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Net Sale vs Margin */}
        <Card>
          <CardHeader>
            <CardTitle className="text-cyan-900">Net Sale vs. Margin Amount</CardTitle>
            <CardDescription>{viewMode === "day" ? "Daily" : "Monthly"} comparison of sales and margins</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={currentNetSaleMarginData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={viewMode === "day" ? "day" : "month"} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="netSale" fill="#0e7490" name="Net Sale" />
                <Bar dataKey="margin" fill="#7c3aed" name="Margin" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Branded vs Private Label */}
        <Card>
          <CardHeader>
            <CardTitle className="text-cyan-900">Branded vs. Private Label Sale</CardTitle>
            <CardDescription>Product type sales comparison</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={currentBrandedVsPrivateData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={viewMode === "day" ? "day" : "month"} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="branded" fill="#0e7490" name="Branded" />
                <Bar dataKey="privateLabel" fill="#7c3aed" name="Private Label" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Sales by Category */}
        <Card>
          <CardHeader>
            <CardTitle className="text-cyan-900">Sales & Margin by Category</CardTitle>
            <CardDescription>Category-wise breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesByCategoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" fill="#0e7490" name="Sales" />
                <Bar dataKey="margin" fill="#7c3aed" name="Margin" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Online vs Offline */}
        <Card>
          <CardHeader>
            <CardTitle className="text-cyan-900">Offline vs. Online Sale</CardTitle>
            <CardDescription>Sales channel distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={onlineOfflineData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {onlineOfflineData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Order Counts */}
        <Card>
          <CardHeader>
            <CardTitle className="text-cyan-900">Sale Orders vs. Web Orders Count</CardTitle>
            <CardDescription>Order volume trends</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={currentOrderCountData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={viewMode === "day" ? "day" : "month"} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="saleOrders" stroke="#0e7490" name="Sale Orders" strokeWidth={2} />
                <Line type="monotone" dataKey="webOrders" stroke="#7c3aed" name="Web Orders" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* ABV vs Bills */}
        <Card>
          <CardHeader>
            <CardTitle className="text-cyan-900">Average Bill Value vs. No. of Bills</CardTitle>
            <CardDescription>Transaction metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={currentAbvBillsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={viewMode === "day" ? "day" : "month"} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="abv" fill="#0e7490" name="Avg Bill Value" />
                <Bar dataKey="bills" fill="#7c3aed" name="No. of Bills" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Discount Percentage */}
        <Card>
          <CardHeader>
            <CardTitle className="text-cyan-900">Total Discount Percentage</CardTitle>
            <CardDescription>Discount trends over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={currentDiscountData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={viewMode === "day" ? "day" : "month"} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="discount" stroke="#0e7490" name="Discount %" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Bounce Products */}
        <Card>
          <CardHeader>
            <CardTitle className="text-cyan-900">Bounce (Returned) Products Count</CardTitle>
            <CardDescription>Product return trends</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={currentBounceProductsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={viewMode === "day" ? "day" : "month"} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="count" stroke="#0e7490" name="Bounce Count" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* SKU Ordered vs Replenished */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-cyan-900">SKU Ordered vs. SKU Replenished</CardTitle>
            <CardDescription>Inventory fulfillment tracking</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={currentSkuData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={viewMode === "day" ? "day" : "month"} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="ordered" stroke="#0e7490" name="SKU Ordered" strokeWidth={2} />
                <Line type="monotone" dataKey="replenished" stroke="#7c3aed" name="SKU Replenished" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}