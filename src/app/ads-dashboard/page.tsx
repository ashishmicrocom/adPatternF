"use client";

import React from "react";
import DashboardLayout from "../../components/DashboardLayout/DashboardLayout";
import SummaryCard from "../../components/SummaryCard/SummaryCard";
import AISuggestions from "../../components/AISuggestions/AISuggestions";
import "./page.css";

export default function Page() {
  return (
    <DashboardLayout>
      <div className="ads-page-grid">
        <div className="ads-col-left">
          <SummaryCard />
        </div>
        <div className="ads-col-right">
          <AISuggestions />
        </div>
      </div>
    </DashboardLayout>
  );
}
