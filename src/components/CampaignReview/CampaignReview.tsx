"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotate, faBullhorn } from "@fortawesome/free-solid-svg-icons";
import CampaignMeta from "../CampaignMeta/CampaignMeta";
import AdSetDetails from "../AdSetDetails/AdSetDetails";
import AdCreative from "../AdCreative/AdCreative";
import AdPreview from "../AdPreview/AdPreview";
import "./CampaignReview.css";

type Draft = any;

export default function CampaignReview() {
  const [draft, setDraft] = useState<Draft | null>(null);
  const router = useRouter();

  useEffect(() => {
    try {
      const raw = localStorage.getItem('adpatterns_last_campaign');
      if (raw) setDraft(JSON.parse(raw));
    } catch (e) {}
  }, []);

  function save(updated: Draft) {
    setDraft(updated);
    try { localStorage.setItem('adpatterns_last_campaign', JSON.stringify(updated)); } catch(e){}
  }

  function regenerateAll() {
    if (!draft) return;
    alert('Regenerating all campaign content...');
  }

  function publishCampaign() {
    if (!draft) return;
    alert('Publishing campaign... (UI demo only)');
  }

  if (!draft) return (
    <div className="cr-empty">
      No generated campaign found. Generate a campaign first.
    </div>
  );

  return (
    <div className="cr-root">
      {/* Header */}
      <div className="cr-header">
        <div className="cr-header-left">
          <h1 className="cr-title">Review Your Campaign</h1>
          <p className="cr-subtitle">Edit, regenerate, or approve before publishing</p>
        </div>
        <div className="cr-header-actions">
          <button className="cr-btn cr-btn--regen" onClick={regenerateAll}>
            <FontAwesomeIcon icon={faRotate} /> Regenerate All
          </button>
          <button className="cr-btn cr-btn--publish" onClick={publishCampaign}>
            <FontAwesomeIcon icon={faBullhorn} /> Publish Campaign
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="cr-body">
        {/* Left Column - Details */}
        <div className="cr-left">
          <CampaignMeta meta={draft} onEdit={(m:any)=>save({...draft, ...m})} />
          <AdSetDetails adset={draft.adset} onChange={(a:any)=>save({...draft, adset: a})} />
          <AdCreative creative={draft.creative} onChange={(c:any)=>save({...draft, creative: c})} />
        </div>

        {/* Right Column - Preview */}
        <aside className="cr-right">
          <AdPreview creative={draft.creative} campaignName={draft.campaignName} />
        </aside>
      </div>
    </div>
  );
}
