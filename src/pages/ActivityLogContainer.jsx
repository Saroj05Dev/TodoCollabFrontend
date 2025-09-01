// containers/ActivityLogContainer.jsx
import React from "react";
import { useActivityLog } from "../components/ActivityLog/useActivityLog";
import ActivityLogPresenter from "../components/ActivityLog/ActivityLogPresenter";

export default function ActivityLogContainer() {
  const { activities, loading, error, refreshing, fetchActivities } = useActivityLog();

  return (
    <ActivityLogPresenter
      activities={activities}
      loading={loading}
      error={error}
      refreshing={refreshing}
      onRefresh={() => fetchActivities(true)}
    />
  );
}
