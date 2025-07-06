
type Activity = {
    id: string;
    type: "ride" | "payment" | "review";
    description: string;
    date: string;
    status: "completed" | "pending";
};

export function setRecentActivity(activity: Activity) {
    localStorage.setItem(
        "recentActivity",
        JSON.stringify([activity, ...JSON.parse(localStorage.getItem("recentActivity") || "[]")])
    );
}

export function getRecentActivity(): Activity[] {
    return localStorage.getItem("recentActivity")
        ? JSON.parse(localStorage.getItem("recentActivity") || "{}")
        : [];
}

export function clearRecentActivity() {
    localStorage.removeItem("recentActivity");
}