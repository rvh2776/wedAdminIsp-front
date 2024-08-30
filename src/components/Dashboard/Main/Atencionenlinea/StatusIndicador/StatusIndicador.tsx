'use client'
import React from "react";

interface StatusIndicatorProps {
  isConnected: boolean;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ isConnected }) => {
  return (
    <div className="px-4 pb-3">
      <small className={"opacity-55"}>
      {isConnected ? "🟢 " : "🔴 "}
      </small>
      <small className={isConnected ? "font-semibold text-green-700" : "font-semibold text-red-700"}>
      {isConnected ? "En línea" : "Chat cerrado"}
      </small>
    </div>
  );
};

export default StatusIndicator;


