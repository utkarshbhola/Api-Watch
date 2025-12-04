'use client";'
import { AlertTriangle, XCircle, ShieldAlert, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export function DashboardPage() {
  const summaryData = [
    {
      title: "Slow APIs",
      value: "24",
      icon: AlertTriangle,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
      change: "+12%",
    },
    {
      title: "Broken APIs",
      value: "7",
      icon: XCircle,
      color: "text-red-600",
      bgColor: "bg-red-100",
      change: "+3",
    },
    {
      title: "Rate Limit Violations",
      value: "15",
      icon: ShieldAlert,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      change: "+8%",
    },
  ];

  const latencyData = [
    { time: "00:00", latency: 120 },
    { time: "04:00", latency: 145 },
    { time: "08:00", latency: 280 },
    { time: "12:00", latency: 420 },
    { time: "16:00", latency: 380 },
    { time: "20:00", latency: 245 },
    { time: "23:59", latency: 180 },
  ];

  const slowEndpointsData = [
    { endpoint: "/api/v1/users", latency: 842 },
    { endpoint: "/api/v1/analytics", latency: 756 },
    { endpoint: "/api/v1/reports", latency: 689 },
    { endpoint: "/api/v1/export", latency: 625 },
    { endpoint: "/api/v1/dashboard", latency: 543 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Monitor your API performance in real-time</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {summaryData.map((item) => (
            <Card key={item.title} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-gray-600 text-sm mb-2">{item.title}</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-gray-900 text-3xl">{item.value}</span>
                      <span className="text-gray-500 text-sm">{item.change}</span>
                    </div>
                  </div>
                  <div className={`${item.bgColor} ${item.color} p-3 rounded-lg`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>API Latency Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={latencyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="time" 
                      stroke="#94a3b8"
                      style={{ fontSize: '12px' }}
                    />
                    <YAxis 
                      stroke="#94a3b8"
                      style={{ fontSize: '12px' }}
                      label={{ value: 'Latency (ms)', angle: -90, position: 'insideLeft', style: { fontSize: '12px', fill: '#64748b' } }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        fontSize: '12px'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="latency" 
                      stroke="#4f46e5" 
                      strokeWidth={2}
                      dot={{ fill: '#4f46e5', r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Total Requests Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-8">
                <div className="text-indigo-600 p-4 bg-indigo-50 rounded-full mb-4">
                  <TrendingUp className="w-8 h-8" />
                </div>
                <span className="text-gray-900 text-4xl mb-2">1,284,392</span>
                <span className="text-gray-500 text-sm">+18.2% from yesterday</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Slow Endpoints */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Top 5 Slow Endpoints</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={slowEndpointsData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  type="number"
                  stroke="#94a3b8"
                  style={{ fontSize: '12px' }}
                  label={{ value: 'Latency (ms)', position: 'insideBottom', offset: -5, style: { fontSize: '12px', fill: '#64748b' } }}
                />
                <YAxis 
                  type="category"
                  dataKey="endpoint" 
                  stroke="#94a3b8"
                  style={{ fontSize: '11px' }}
                  width={150}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Bar 
                  dataKey="latency" 
                  fill="#4f46e5"
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
export default DashboardPage;