import React, { useEffect, useState } from "react";
import { CheckSquare, Users, TrendingUp } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  createTeam,
  fetchTeamById,
  inviteMember,
} from "../../redux/slices/quickActionSlice";

const QuickActions = () => {
  const dispatch = useDispatch();
  const quickActions = useSelector((state) => state.quickActions);
  const { currentTeamId, members, loading, successMessage } =
    quickActions || {};

  const [teamName, setTeamName] = useState("");
  const [description, setDescription] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");

  useEffect(() => {
    const storedTeamId = localStorage.getItem("currentTeamId");
    if(storedTeamId) {
      dispatch(fetchTeamById(storedTeamId));
    } else if (currentTeamId) {
      dispatch(fetchTeamById(currentTeamId));
    }
  }, [dispatch, currentTeamId]);

  const handleCreateTeam = async () => {
    if (!teamName) return;
    const resultAction = await dispatch(
      createTeam({ name: teamName, description })
    );
    if (createTeam.fulfilled.match(resultAction)) {
      // The fetchTeamById will be triggered by the useEffect on currentTeamId change.
    }
    setTeamName("");
    setDescription("");
  };

  const handleInviteMember = () => {
    if (!inviteEmail || !currentTeamId) return;
    dispatch(inviteMember({ teamId: currentTeamId, email: inviteEmail }));
    setInviteEmail("");
  };

  const handleViewReports = () => {
    if (!currentTeamId) return;
    dispatch(fetchTeamById(currentTeamId));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Quick Actions
        </h2>
      </div>
      <div className="p-6 space-y-3">
        {/* Create Team */}
        <div>
          <input
            type="text"
            placeholder="Team Name"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            className="w-full mb-2 px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full mb-2 px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
          />
          <button
            onClick={handleCreateTeam}
            disabled={loading}
            className="w-full flex items-center gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
          >
            <CheckSquare className="h-5 w-5" />
            <span className="font-medium">
              {loading ? "Creating..." : "Create Team"}
            </span>
          </button>
        </div>

        {/* Invite Member */}
        <div>
          <input
            type="email"
            placeholder="Enter member email"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            className="w-full mb-2 px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
          />
          <button
            onClick={handleInviteMember}
            disabled={!currentTeamId || loading}
            className="w-full flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          >
            <Users className="h-5 w-5" />
            <span className="font-medium">
              {loading ? "Inviting..." : "Invite Member"}
            </span>
          </button>
        </div>

        {/* View Reports */}
        <button
          onClick={handleViewReports}
          disabled={!currentTeamId || loading}
          className="w-full flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
        >
          <TrendingUp className="h-5 w-5" />
          <span className="font-medium">
            {loading ? "Loading..." : "View Reports"}
          </span>
        </button>
      </div>

      {/* Team Info */}
      <div className="p-6 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
            Team Status
          </span>
          <Users className="h-4 w-4 text-gray-400" />
        </div>
        <p className="text-lg font-semibold text-gray-900 dark:text-white">
          {members?.length || 0} {members?.length === 1 ? "Member" : "Members"}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {members?.length > 0
            ? "Collaborate and manage tasks together"
            : "Invite team members to collaborate"}
        </p>

        {/* {error && (
          <p className="text-sm text-red-500 mt-2">{error.message || error}</p>
        )} */}
        {successMessage && (
          <p className="text-sm text-green-500 mt-2">{successMessage}</p>
        )}
      </div>
    </div>
  );
};

export default QuickActions;