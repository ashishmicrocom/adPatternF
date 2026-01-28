"use client";

import React, { useEffect, useState, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWandMagicSparkles } from "@fortawesome/free-solid-svg-icons";
import "./CampaignSummary.css";

type Payload = { 
  productType?: string; 
  name?: string; 
  category?: string; 
  description?: string; 
  price?: string; 
  location?: string; 
  target?: string 
};

function inferAgeRange(target?: string) {
  if (!target) return "25-45";
  const match = target.match(/(\d+)[-–](\d+)/);
  if (match) return `${match[1]}-${match[2]}`;
  return "25-45";
}

function inferInterests(category?: string, target?: string) {
  const interests: string[] = [];
  
  if (target) {
    const lower = target.toLowerCase();
    if (lower.includes("tech")) interests.push("Technology");
    if (lower.includes("fitness") || lower.includes("health")) interests.push("Fitness");
    if (lower.includes("professional") || lower.includes("business")) interests.push("Productivity");
  }
  
  if (category) {
    const cat = category.toLowerCase();
    if (cat.includes("technology") || cat.includes("software")) interests.push("Technology");
    if (cat.includes("fitness") || cat.includes("health")) interests.push("Fitness");
  }
  
  if (interests.length === 0) interests.push("General");
  
  return [...new Set(interests)];
}

function makeHeadline(name?: string) {
  if (!name) return "Transform Your Daily Routine with This Product";
  return `Transform Your Daily Routine with ${name}`;
}

function makeDescription(description?: string, name?: string) {
  if (description) return description;
  return `Experience the future of personal technology. Track. Monitor. Achieve.`;
}

export default function CampaignSummary() {
  const [data, setData] = useState<Payload | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('adpatterns_last_payload');
      if (raw) setData(JSON.parse(raw));
    } catch (e) {}
  }, []);

  const ageRange = useMemo(() => inferAgeRange(data?.target), [data?.target]);
  const interests = useMemo(() => inferInterests(data?.category, data?.target), [data?.category, data?.target]);
  const headline = useMemo(() => makeHeadline(data?.name), [data?.name]);
  const description = useMemo(() => makeDescription(data?.description, data?.name), [data?.description, data?.name]);

  if (!data) {
    return (
      <div className="cs-empty">
        No product data found. Complete the Product/Service form first.
      </div>
    );
  }

  return (
    <div className="cs-root">
      {/* Product Summary Section */}
      <div className="cs-section">
        <div className="cs-section-header">
          <h3 className="cs-section-title">Product Summary</h3>
          <span className="cs-badge">Read-only</span>
        </div>
        <div className="cs-grid">
          <div className="cs-field">
            <div className="cs-label">Name</div>
            <div className="cs-value">{data.name || '—'}</div>
          </div>
          <div className="cs-field">
            <div className="cs-label">Category</div>
            <div className="cs-value">{data.category || '—'}</div>
          </div>
          <div className="cs-field">
            <div className="cs-label">Price</div>
            <div className="cs-value">{data.price || '—'}</div>
          </div>
          <div className="cs-field">
            <div className="cs-label">Location</div>
            <div className="cs-value">{data.location || '—'}</div>
          </div>
          <div className="cs-field cs-field-full">
            <div className="cs-label">Audience</div>
            <div className="cs-value">{data.target || '—'}</div>
          </div>
        </div>
      </div>

      {/* AI Suggestions Section */}
      <div className="cs-section">
        <div className="cs-section-header">
          <div className="cs-section-header-left">
            <span className="cs-ai-icon"><FontAwesomeIcon icon={faWandMagicSparkles} /></span>
            <h3 className="cs-section-title">AI Suggestions Preview</h3>
          </div>
          <span className="cs-badge cs-badge--ai">Auto-Generated</span>
        </div>

        <div className="cs-ai-content">
          <div className="cs-ai-field">
            <div className="cs-ai-label">Headline:</div>
            <div className="cs-ai-value">"{headline}"</div>
          </div>

          <div className="cs-ai-field">
            <div className="cs-ai-label">Description:</div>
            <div className="cs-ai-value">{description}</div>
          </div>

          <div className="cs-ai-row">
            <div className="cs-ai-mini">
              <div className="cs-ai-label">Age Group:</div>
              <div className="cs-ai-value-sm">{ageRange}</div>
            </div>
            <div className="cs-ai-mini">
              <div className="cs-ai-label">Interests:</div>
              <div className="cs-ai-value-sm">{interests.join(", ")}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
