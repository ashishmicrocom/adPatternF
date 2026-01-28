"use client";

import React, { useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWandMagicSparkles, faTag, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "./AISuggestions.css";

type Props = {};

type Payload = {
  productType?: string;
  name?: string;
  category?: string;
  description?: string;
  price?: string;
  location?: string;
  target?: string;
};

function inferAudience(category?: string, productType?: string, target?: string) {
  if (target) return target;
  if (!category) return "General audience";
  const cat = category.toLowerCase();
  if (cat.includes("clothing")) return "Fashion shoppers, 18-45";
  if (cat.includes("education")) return "Students & lifelong learners, 16-35";
  if (cat.includes("restaurant")) return "Local diners, food lovers, 18-50";
  if (cat.includes("software") || cat.includes("technology")) return "Tech-savvy professionals aged 25-45";
  if (cat.includes("health")) return "Health-conscious adults, 25-60";
  if (productType === "Service") return "Local customers looking for services";
  return "Online shoppers, interested in related categories";
}

function pickCTA(price?: string, productType?: string) {
  if (!price) return productType === "Service" ? "Book Now" : "Learn More";
  if (price.match(/\d/)) return "Shop Now";
  return "Get Started";
}

function makeHeadlines(p: Payload) {
  const base = p.name || p.category || "This offering";
  return [
    `Transform Your Daily Routine with ${base}`,
    `The Smart Device That Actually Gets Things Done`,
    `Track. Monitor. Achieve. All in One Device.`
  ];
}

function makeDescriptions(p: Payload) {
  if (p.description) return [p.description];
  return [`Experience the future of personal technology. ${p.name || 'This product'} seamlessly integrates into your lifestyle, helping you stay healthy, productive, and connected.`];
}

function inferAgeRange(target?: string) {
  if (!target) return "25-45";
  const match = target.match(/(\d+)[-–](\d+)/);
  if (match) return `${match[1]}-${match[2]}`;
  return "25-45";
}

function inferAudienceTags(category?: string, target?: string) {
  const tags: string[] = [];
  
  if (target) {
    const lower = target.toLowerCase();
    if (lower.includes("fitness") || lower.includes("health")) tags.push("Fitness Enthusiasts", "Health-Conscious Individuals");
    if (lower.includes("tech") || lower.includes("professional")) tags.push("Tech Early Adopters", "Busy Professionals");
    if (lower.includes("student")) tags.push("Students");
  }
  
  if (category) {
    const cat = category.toLowerCase();
    if (cat.includes("technology") || cat.includes("software")) {
      tags.push("Tech Early Adopters", "Busy Professionals");
    }
    if (cat.includes("fitness") || cat.includes("health")) {
      tags.push("Fitness Enthusiasts", "Health-Conscious Individuals");
    }
  }
  
  if (tags.length === 0) {
    tags.push("General Audience");
  }
  
  return [...new Set(tags)]; // Remove duplicates
}

export default function AISuggestions(_: Props) {
  const [payload, setPayload] = useState<Payload | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("adpatterns_last_payload");
      if (raw) setPayload(JSON.parse(raw));
    } catch (e) {
      // ignore
    }
  }, []);

  const headlines = useMemo(() => (payload ? makeHeadlines(payload) : []), [payload]);
  const descriptions = useMemo(() => (payload ? makeDescriptions(payload) : []), [payload]);
  const audience = useMemo(() => (payload ? inferAudience(payload.category, payload.productType, payload.target) : "—"), [payload]);
  const cta = useMemo(() => (payload ? pickCTA(payload.price, payload.productType) : "Learn More"), [payload]);
  const ageRange = useMemo(() => (payload ? inferAgeRange(payload.target) : "25-45"), [payload]);
  const audienceTags = useMemo(() => (payload ? inferAudienceTags(payload.category, payload.target) : []), [payload]);

  if (!payload) {
    return (
      <div className="ai-card">
        <div className="ai-header">
          <div className="ai-header-icon"><FontAwesomeIcon icon={faWandMagicSparkles} /></div>
          <div>
            <h2 className="ai-title">AI Suggestions</h2>
            <p className="ai-subtitle">Based on your product details</p>
          </div>
          <span className="ai-badge">Auto-Generated</span>
        </div>
        <div className="ai-empty">
          No product data found. Submit the Product/Service form to get AI-powered suggestions.
        </div>
      </div>
    );
  }

  return (
    <div className="ai-card">
      <div className="ai-header">
        <div className="ai-header-icon"><FontAwesomeIcon icon={faWandMagicSparkles} /></div>
        <div>
          <h2 className="ai-title">AI Suggestions</h2>
          <p className="ai-subtitle">Based on your product details</p>
        </div>
        <span className="ai-badge">Auto-Generated</span>
      </div>

      <div className="ai-content">
        {/* Suggested Headlines */}
        <div className="ai-section">
          <h3 className="ai-section-title">Suggested Headlines</h3>
          <div className="ai-headlines">
            {headlines.map((h, i) => (
              <div key={i} className="ai-headline-item">"{h}"</div>
            ))}
          </div>
        </div>

        {/* Suggested Description */}
        <div className="ai-section">
          <h3 className="ai-section-title">Suggested Description</h3>
          <div className="ai-description">
            {descriptions.map((d, i) => (
              <p key={i}>{d}</p>
            ))}
          </div>
        </div>

        {/* Target Age and CTA */}
        <div className="ai-row">
          <div className="ai-detail-box">
            <h4 className="ai-detail-title">Target Age</h4>
            <div className="ai-detail-value">{ageRange}</div>
          </div>
          <div className="ai-detail-box">
            <h4 className="ai-detail-title">Suggested CTA</h4>
            <div className="ai-cta-btn">{cta}</div>
          </div>
        </div>

        {/* Target Audience Tags */}
        <div className="ai-section">
          <h3 className="ai-section-title">Target Audience</h3>
          <div className="ai-tags">
            {audienceTags.map((tag, i) => (
              <span key={i} className="ai-tag">{tag}</span>
            ))}
          </div>
        </div>

        {/* Campaign Goal */}
        <div className="ai-section">
          <h3 className="ai-section-title">Campaign Goal</h3>
          <div className="ai-goal">Drive online sales and product awareness</div>
        </div>

        {/* CTA Button */}
        <button className="ai-create-btn">
          Create Campaign with These Suggestions <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </div>
  );
}
