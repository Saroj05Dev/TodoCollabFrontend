import { useState, useEffect, useCallback } from "react";
import axiosInstance from "../../helpers/axiosInstance";

export function useActivityLog() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchActivities = useCallback(async (showRefreshLoader = false) => {
    if (showRefreshLoader) setRefreshing(true);
    else setLoading(true);

    try {
      const res = await axiosInstance.get("/actions");
      if (res.data.success) {
        setActivities(res.data.data);
        setError(null);
      } else {
        throw new Error(res.data.message || "Failed to fetch activities");
      }
    } catch (err) {
      setError(err.message || "Failed to fetch activities");
      console.error("Error fetching activities:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  return { activities, loading, error, refreshing, fetchActivities };
}
