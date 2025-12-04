'use client";'
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Select, SelectItem } from "../ui/select";
import SelectValue from "../ui/select";
import SelectContent from "../ui/select";
import SelectTrigger from "../ui/select";

import { Badge } from "../ui/batch";

interface LogEntry {
  id: string;
  timestamp: string;
  serviceName: string;
  endpoint: string;
  method: string;
  statusCode: number;
  latency: number;
}

export function LogsPage() {
  const [serviceFilter, setServiceFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("today");
  const [slowApiFilter, setSlowApiFilter] = useState("all");
  const [rateLimitFilter, setRateLimitFilter] = useState("all");

  const mockLogs: LogEntry[] = [
    {
      id: "1",
      timestamp: "2025-12-03 14:23:45",
      serviceName: "User Service",
      endpoint: "/api/v1/users",
      method: "GET",
      statusCode: 200,
      latency: 842,
    },
    {
      id: "2",
      timestamp: "2025-12-03 14:23:42",
      serviceName: "Analytics Service",
      endpoint: "/api/v1/analytics",
      method: "POST",
      statusCode: 200,
      latency: 756,
    },
    {
      id: "3",
      timestamp: "2025-12-03 14:23:38",
      serviceName: "Payment Service",
      endpoint: "/api/v1/payments",
      method: "POST",
      statusCode: 500,
      latency: 1240,
    },
    {
      id: "4",
      timestamp: "2025-12-03 14:23:35",
      serviceName: "Auth Service",
      endpoint: "/api/v1/auth/login",
      method: "POST",
      statusCode: 429,
      latency: 120,
    },
    {
      id: "5",
      timestamp: "2025-12-03 14:23:30",
      serviceName: "Report Service",
      endpoint: "/api/v1/reports",
      method: "GET",
      statusCode: 200,
      latency: 689,
    },
    {
      id: "6",
      timestamp: "2025-12-03 14:23:25",
      serviceName: "User Service",
      endpoint: "/api/v1/users/profile",
      method: "GET",
      statusCode: 404,
      latency: 95,
    },
    {
      id: "7",
      timestamp: "2025-12-03 14:23:20",
      serviceName: "Export Service",
      endpoint: "/api/v1/export",
      method: "POST",
      statusCode: 200,
      latency: 625,
    },
    {
      id: "8",
      timestamp: "2025-12-03 14:23:15",
      serviceName: "Dashboard Service",
      endpoint: "/api/v1/dashboard",
      method: "GET",
      statusCode: 200,
      latency: 543,
    },
    {
      id: "9",
      timestamp: "2025-12-03 14:23:10",
      serviceName: "Notification Service",
      endpoint: "/api/v1/notifications",
      method: "GET",
      statusCode: 200,
      latency: 180,
    },
    {
      id: "10",
      timestamp: "2025-12-03 14:23:05",
      serviceName: "Search Service",
      endpoint: "/api/v1/search",
      method: "GET",
      statusCode: 500,
      latency: 2340,
    },
  ];

  const getStatusBadge = (status: number) => {
    if (status >= 200 && status < 300) {
      return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">{status}</Badge>;
    } else if (status >= 400 && status < 500) {
      return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">{status}</Badge>;
    } else {
      return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">{status}</Badge>;
    }
  };

  const getMethodBadge = (method: string) => {
    const colors: { [key: string]: string } = {
      GET: "bg-blue-100 text-blue-700",
      POST: "bg-green-100 text-green-700",
      PUT: "bg-yellow-100 text-yellow-700",
      DELETE: "bg-red-100 text-red-700",
    };
    return (
      <Badge className={`${colors[method] || "bg-gray-100 text-gray-700"} hover:${colors[method] || "bg-gray-100"}`}>
        {method}
      </Badge>
    );
  };

  const filteredLogs = mockLogs.filter((log) => {
    if (serviceFilter !== "all" && log.serviceName !== serviceFilter) return false;
    if (statusFilter !== "all") {
      if (statusFilter === "2xx" && (log.statusCode < 200 || log.statusCode >= 300)) return false;
      if (statusFilter === "4xx" && (log.statusCode < 400 || log.statusCode >= 500)) return false;
      if (statusFilter === "5xx" && (log.statusCode < 500 || log.statusCode >= 600)) return false;
    }
    if (slowApiFilter === "slow" && log.latency <= 500) return false;
    if (rateLimitFilter === "rate-limit" && log.statusCode !== 429) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-gray-900 mb-2">Logs</h1>
          <p className="text-gray-600">View and filter API request logs</p>
        </div>

        {/* Filter Panel */}
        <Card className="border-0 shadow-sm mb-6">
          <CardHeader>
            <CardTitle className="text-base">Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div>
                <label className="text-sm text-gray-600 mb-2 block">Service</label>
                <Select value={serviceFilter} onValueChange={setServiceFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Services" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Services</SelectItem>
                    <SelectItem value="User Service">User Service</SelectItem>
                    <SelectItem value="Analytics Service">Analytics Service</SelectItem>
                    <SelectItem value="Payment Service">Payment Service</SelectItem>
                    <SelectItem value="Auth Service">Auth Service</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm text-gray-600 mb-2 block">Date Range</label>
                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Today" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="yesterday">Yesterday</SelectItem>
                    <SelectItem value="last7days">Last 7 Days</SelectItem>
                    <SelectItem value="last30days">Last 30 Days</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm text-gray-600 mb-2 block">Status Code</label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="2xx">2xx (Success)</SelectItem>
                    <SelectItem value="4xx">4xx (Client Error)</SelectItem>
                    <SelectItem value="5xx">5xx (Server Error)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm text-gray-600 mb-2 block">Slow APIs</label>
                <Select value={slowApiFilter} onValueChange={setSlowApiFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="slow">&gt; 500ms</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm text-gray-600 mb-2 block">Rate Limit</label>
                <Select value={rateLimitFilter} onValueChange={setRateLimitFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="rate-limit">Rate Limit Hit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Logs Table */}
        <Card className="border-0 shadow-sm">
          <CardContent className="pt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Service Name</TableHead>
                  <TableHead>Endpoint</TableHead>
                  <TableHead>HTTP Method</TableHead>
                  <TableHead>Status Code</TableHead>
                  <TableHead>Latency (ms)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="text-gray-600 text-sm">{log.timestamp}</TableCell>
                    <TableCell className="text-gray-900">{log.serviceName}</TableCell>
                    <TableCell className="text-gray-600 text-sm font-mono">{log.endpoint}</TableCell>
                    <TableCell>{getMethodBadge(log.method)}</TableCell>
                    <TableCell>{getStatusBadge(log.statusCode)}</TableCell>
                    <TableCell>
                      <span className={log.latency > 500 ? "text-red-600" : "text-gray-900"}>
                        {log.latency}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
export default LogsPage;