import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "../lib/axios";
import { Users, Package, ShoppingCart, DollarSign } from "lucide-react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

const AnalyticsTab = () => {
    const [analyticsData, setAnalyticsData] = useState({
        users: 0,
        products: 0,
        totalSales: 0,
        totalRevenue: 0,
    });
    const [isLoading, setIsLoading] = useState(true);
    const [dailySalesData, setDailySalesData] = useState([]);

    useEffect(() => {
        const fetchAnalyticsData = async () => {
            try {
                const response = await axios.get("/analytics");
                setAnalyticsData(response.data.analyticsData);
                setDailySalesData(response.data.dailySalesData);
            } catch (error) {
                console.error("Error fetching analytics data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchAnalyticsData();
    }, []);

    if (isLoading) {
        return (
            <div className="text-sm text-gray-400 text-center py-8">
                Loading…
            </div>
        );
    }

    return (
        <motion.div
            className="max-w-4xl mx-auto py-2"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            {/* Metrics grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                <AnalyticsCard
                    title="Total users"
                    value={analyticsData.users.toLocaleString()}
                    icon={Users}
                    color="emerald"
                />
                <AnalyticsCard
                    title="Total products"
                    value={analyticsData.products.toLocaleString()}
                    icon={Package}
                    color="emerald"
                />
                <AnalyticsCard
                    title="Total sales"
                    value={analyticsData.totalSales.toLocaleString()}
                    icon={ShoppingCart}
                    color="emerald"
                />
                <AnalyticsCard
                    title="Total revenue"
                    value={`$${analyticsData.totalRevenue.toLocaleString()}`}
                    icon={DollarSign}
                    color="emerald"
                />
            </div>

            {/* Chart */}
            <motion.div
                className="bg-white rounded-2xl border-[1.5px] border-gray-100 p-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
            >
                <h3 className="text-sm font-semibold text-gray-800 mb-4">
                    Sales & revenue
                </h3>
                <ResponsiveContainer width="100%" height={320}>
                    <LineChart data={dailySalesData}>
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#f3f4f6"
                            vertical={false}
                        />
                        <XAxis
                            dataKey="date"
                            stroke="#9ca3af"
                            style={{ fontSize: "12px" }}
                        />
                        <YAxis
                            yAxisId="left"
                            stroke="#9ca3af"
                            style={{ fontSize: "12px" }}
                        />
                        <YAxis
                            yAxisId="right"
                            orientation="right"
                            stroke="#9ca3af"
                            style={{ fontSize: "12px" }}
                        />
                        <Tooltip
                            contentStyle={{
                                background: "#fff",
                                border: "1px solid #e5e7eb",
                                borderRadius: "8px",
                            }}
                            labelStyle={{ color: "#111827" }}
                        />
                        <Legend
                            wrapperStyle={{
                                fontSize: "12px",
                                paddingTop: "16px",
                            }}
                        />
                        <Line
                            yAxisId="left"
                            type="monotone"
                            dataKey="sales"
                            stroke="#10b981"
                            strokeWidth={2}
                            activeDot={{ r: 6 }}
                            name="Sales"
                            dot={false}
                        />
                        <Line
                            yAxisId="right"
                            type="monotone"
                            dataKey="revenue"
                            stroke="#db2777"
                            strokeWidth={2}
                            activeDot={{ r: 6 }}
                            name="Revenue"
                            dot={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </motion.div>
        </motion.div>
    );
};

export default AnalyticsTab;

const AnalyticsCard = ({ title, value, icon: Icon, color }) => {
    const colorMap = {
        emerald: {
            bg: "bg-emerald-50",
            border: "border-emerald-100",
            text: "text-emerald-700",
            icon: "text-emerald-500",
        },
    };

    const styles = colorMap[color];

    return (
        <motion.div
            className={`${styles.bg} rounded-xl border-[1.5px] ${styles.border} p-3 flex flex-col justify-between`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="flex items-start justify-between">
                <div>
                    <p
                        className={`text-[11px] font-medium ${styles.text} mb-1`}
                    >
                        {title}
                    </p>
                    <h3 className="text-lg font-bold text-gray-800">{value}</h3>
                </div>
                <Icon size={18} className={styles.icon} />
            </div>
        </motion.div>
    );
};
