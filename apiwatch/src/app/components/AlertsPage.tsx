'use client";'
import { AlertTriangle, XCircle, ShieldAlert, Clock } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/batch";

interface Alert {
  id: string;
  type: "slow" | "broken" | "rate-limit";
  timestamp: string;
  endpoint: string;
  serviceName: string;
  severity: "high" | "medium";
  details: string;
}

export function AlertsPage() {
  const alerts: Alert[] = [
    {
      id: "1",
      type: "broken",
      timestamp: "2025-12-03 14:23:38",
      endpoint: "/api/v1/payments",
      serviceName: "Payment Service",
      severity: "high",
      details: "500 Internal Server Error - Database connection failed",
    },
    {
      id: "2",
      type: "slow",
      timestamp: "2025-12-03 14:23:45",
      endpoint: "/api/v1/users",
      serviceName: "User Service",
      severity: "medium",
      details: "Response time: 842ms (Threshold: 500ms)",
    },
    {
      id: "3",
      type: "rate-limit",
      timestamp: "2025-12-03 14:23:35",
      endpoint: "/api/v1/auth/login",
      serviceName: "Auth Service",
      severity: "medium",
      details: "429 Too Many Requests - Rate limit exceeded (100 req/min)",
    },
    {
      id: "4",
      type: "slow",
      timestamp: "2025-12-03 14:23:42",
      endpoint: "/api/v1/analytics",
      serviceName: "Analytics Service",
      severity: "medium",
      details: "Response time: 756ms (Threshold: 500ms)",
    },
    {
      id: "5",
      type: "broken",
      timestamp: "2025-12-03 14:23:10",
      endpoint: "/api/v1/search",
      serviceName: "Search Service",
      severity: "high",
      details: "500 Internal Server Error - Elasticsearch timeout",
    },
    {
      id: "6",
      type: "slow",
      timestamp: "2025-12-03 14:23:30",
      endpoint: "/api/v1/reports",
      serviceName: "Report Service",
      severity: "medium",
      details: "Response time: 689ms (Threshold: 500ms)",
    },
    {
      id: "7",
      type: "rate-limit",
      timestamp: "2025-12-03 14:22:15",
      endpoint: "/api/v1/notifications",
      serviceName: "Notification Service",
      severity: "medium",
      details: "429 Too Many Requests - Rate limit exceeded (50 req/min)",
    },
    {
      id: "8",
      type: "slow",
      timestamp: "2025-12-03 14:23:20",
      endpoint: "/api/v1/export",
      serviceName: "Export Service",
      severity: "medium",
      details: "Response time: 625ms (Threshold: 500ms)",
    },
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "slow":
        return <AlertTriangle className="w-5 h-5" />;
      case "broken":
        return <XCircle className="w-5 h-5" />;
      case "rate-limit":
        return <ShieldAlert className="w-5 h-5" />;
      default:
        return <AlertTriangle className="w-5 h-5" />;
    }
  };

  const getAlertTitle = (type: string) => {
    switch (type) {
      case "slow":
        return "Slow API Detected";
      case "broken":
        return "Broken API Detected";
      case "rate-limit":
        return "Rate Limit Hit";
      default:
        return "Alert";
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case "slow":
        return {
          bg: "bg-yellow-50",
          border: "border-yellow-200",
          icon: "text-yellow-600",
          iconBg: "bg-yellow-100",
        };
      case "broken":
        return {
          bg: "bg-red-50",
          border: "border-red-200",
          icon: "text-red-600",
          iconBg: "bg-red-100",
        };
      case "rate-limit":
        return {
          bg: "bg-orange-50",
          border: "border-orange-200",
          icon: "text-orange-600",
          iconBg: "bg-orange-100",
        };
      default:
        return {
          bg: "bg-gray-50",
          border: "border-gray-200",
          icon: "text-gray-600",
          iconBg: "bg-gray-100",
        };
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-gray-900 mb-2">Alerts</h1>
          <p className="text-gray-600">Monitor and manage active alerts</p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {alerts.map((alert) => {
            const colors = getAlertColor(alert.type);
            return (
              <Card
                key={alert.id}
                className={`border-0 shadow-sm hover:shadow-md transition-shadow ${colors.bg} border ${colors.border}`}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className={`${colors.iconBg} ${colors.icon} p-3 rounded-lg flex-shrink-0`}>
                      {getAlertIcon(alert.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h3 className="text-gray-900">{getAlertTitle(alert.type)}</h3>
                        <Badge
                          className={
                            alert.severity === "high"
                              ? "bg-red-100 text-red-700 hover:bg-red-100"
                              : "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
                          }
                        >
                          {alert.severity === "high" ? "High" : "Medium"}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>{alert.timestamp}</span>
                        </div>
                        <div className="text-sm text-gray-600">
                          <span className="text-gray-500">Service:</span> {alert.serviceName}
                        </div>
                        <div className="text-sm text-gray-600 font-mono truncate">
                          <span className="text-gray-500">Endpoint:</span> {alert.endpoint}
                        </div>
                      </div>
                      <p className="text-sm text-gray-700">{alert.details}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default AlertsPage;