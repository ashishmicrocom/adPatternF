"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWandMagicSparkles } from "@fortawesome/free-solid-svg-icons";
import "./GenerateCampaign.css";

type Draft = {
  campaignName: string;
  objective: string;
  budgetDaily: string;
  adset: {
    ageMin: number;
    ageMax: number;
    gender: string;
    location: string;
    interests: string[];
    keywords: string[];
    url: string;
  };
  creative: {
    headline: string;
    description: string;
    cta: string;
    image?: string;
  };
};

export default function GenerateCampaign() {
  const [state, setState] = useState<'idle'|'loading'|'done'>('idle');
  const router = useRouter();

  function buildDraft(): Draft {
    // base from last product payload
    let base: any = {};
    try { base = JSON.parse(localStorage.getItem('adpatterns_last_payload') || '{}'); } catch(e){}

    const name = base.name ? `${base.name} — Campaign` : 'New Campaign';
    const headline = base.name ? `${base.name}: Special Offer` : 'Great product — Try now';
    const description = base.description || 'High quality, reliable and designed for you.';

    return {
      campaignName: name,
      objective: 'Sales',
      budgetDaily: '₹500',
      adset: {
        ageMin: 18,
        ageMax: 45,
        gender: 'All',
        location: base.location || 'All locations',
        interests: base.target ? [base.target] : ['General'],
        keywords: base.category ? [base.category] : [],
        url: 'https://example.com'
      },
      creative: {
        headline,
        description,
        cta: 'Shop Now',
        image: undefined
      }
    };
  }

  function generate() {
    setState('loading');
    // simulate AI generation
    setTimeout(() => {
      const draft = buildDraft();
      try { localStorage.setItem('adpatterns_last_campaign', JSON.stringify(draft)); } catch(e){}
      setState('done');
      // navigate to campaign review
      router.push('/campaign-review');
    }, 1200);
  }

  return (
    <div className="gc-root">
      <div className="gc-panel-header">
        <h2 className="gc-panel-title">Generate Your Campaign</h2>
        <p className="gc-panel-subtitle">Our AI will create a complete campaign based on your product</p>
      </div>

      {state === 'idle' && (
        <div className="gc-content">
          <div className="gc-icon-wrap">
            <div className="gc-icon"><FontAwesomeIcon icon={faWandMagicSparkles} /></div>
          </div>
          <h3 className="gc-ready-title">Ready to Generate</h3>
          <p className="gc-ready-text">Click below to create your AI-powered ad campaign</p>
          <button className="gc-btn gc-btn--primary" onClick={generate}>
            Generate Campaign with AI <FontAwesomeIcon icon={faWandMagicSparkles} />
          </button>
        </div>
      )}

      {state === 'loading' && (
        <div className="gc-content gc-content-loading">
          <div className="gc-spinner"></div>
          <h3 className="gc-loading-title">Generating Your Campaign...</h3>
          <p className="gc-loading-text">Our AI is analyzing your product and creating optimized ad content</p>
        </div>
      )}

      {state === 'done' && (
        <div className="gc-content">
          <div className="gc-icon-wrap gc-icon-wrap--success">
            <div className="gc-icon">✓</div>
          </div>
          <h3 className="gc-success-title">Campaign Generated Successfully!</h3>
          <p className="gc-success-text">Redirecting to campaign review...</p>
        </div>
      )}
    </div>
  );
}
