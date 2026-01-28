"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWandMagicSparkles, faPenToSquare, faRotate, faImage, faUpload } from "@fortawesome/free-solid-svg-icons";
import "./AdCreative.css";

type Props = { creative: any; onChange: (c:any)=>void };

const headlineTemplates = [
  "Transform Your Life with Our Amazing Product",
  "Don't Miss Out - Limited Time Offer Inside",
  "Discover the Secret to Better Living Today",
  "Join Thousands of Happy Customers Worldwide",
  "Experience Innovation Like Never Before",
  "Your Journey to Excellence Starts Here"
];

const descriptionTemplates = [
  "Experience unparalleled quality and innovation with our cutting-edge product. Designed with your needs in mind, we bring you the perfect solution that combines functionality, style, and reliability. Join thousands of satisfied customers who have already made the switch.",
  "Elevate your lifestyle with our premium offering that delivers exceptional results every single time. Our commitment to excellence ensures you get the best value, outstanding performance, and unmatched customer satisfaction. Transform the way you live, work, and play.",
  "Discover the difference that true quality makes in your daily routine. Our expertly crafted solution provides seamless integration, superior durability, and remarkable efficiency. Whether you're a beginner or an expert, you'll love the results you achieve.",
  "Step into a world of possibilities with our revolutionary product that's changing the game. Backed by years of research and development, we deliver innovation that matters. Experience the perfect blend of technology, design, and user-friendly features."
];

export default function AdCreative({ creative, onChange }: Props) {
  const [local, setLocal] = useState<any>(creative || {});
  const [isEditingHeadline, setIsEditingHeadline] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);

  function update(changes: any) {
    const next = { ...local, ...changes };
    setLocal(next);
    onChange(next);
  }

  function regenerateHeadline() {
    const randomHeadline = headlineTemplates[Math.floor(Math.random() * headlineTemplates.length)];
    update({ headline: randomHeadline });
  }

  function regenerateDescription() {
    const randomDescription = descriptionTemplates[Math.floor(Math.random() * descriptionTemplates.length)];
    update({ description: randomDescription });
  }

  function simulateImage() {
    update({ image: 'https://via.placeholder.com/600x314.png?text=AI+Generated+Image' });
  }

  return (
    <div className="ac-card">
      <div className="ac-header">
        <div className="ac-header-left">
          <span className="ac-icon"><FontAwesomeIcon icon={faWandMagicSparkles} /></span>
          <h3 className="ac-title">Ad Creative</h3>
        </div>
        <span className="ac-badge">Editable</span>
      </div>

      <div className="ac-grid">
        <div className="ac-field ac-field-full">
          <div className="ac-label-row">
            <label className="ac-label">Headline</label>
            <div className="ac-btn-group">
              <button 
                className={`ac-regen-btn ${isEditingHeadline ? 'ac-regen-btn--active' : ''}`}
                onClick={() => setIsEditingHeadline(!isEditingHeadline)}
              >
                <FontAwesomeIcon icon={faPenToSquare} /> Edit
              </button>
              <button className="ac-regen-btn" onClick={regenerateHeadline}>
                <FontAwesomeIcon icon={faRotate} /> Regenerate
              </button>
            </div>
          </div>
          <input 
            className="ac-input" 
            value={local.headline || ''} 
            onChange={(e)=>update({ headline: e.target.value })}
            placeholder="Enter headline..."
            disabled={!isEditingHeadline}
            readOnly={!isEditingHeadline}
          />
        </div>

        <div className="ac-field ac-field-full">
          <div className="ac-label-row">
            <label className="ac-label">Description</label>
            <div className="ac-btn-group">
              <button 
                className={`ac-regen-btn ${isEditingDescription ? 'ac-regen-btn--active' : ''}`}
                onClick={() => setIsEditingDescription(!isEditingDescription)}
              >
                <FontAwesomeIcon icon={faPenToSquare} /> Edit
              </button>
              <button className="ac-regen-btn" onClick={regenerateDescription}>
                <FontAwesomeIcon icon={faRotate} /> Regenerate
              </button>
            </div>
          </div>
          <textarea 
            className="ac-textarea" 
            value={local.description || ''} 
            onChange={(e)=>update({ description: e.target.value })}
            rows={4}
            placeholder="Enter description..."
            disabled={!isEditingDescription}
            readOnly={!isEditingDescription}
          />
        </div>

        <div className="ac-field">
          <label className="ac-label">Call to Action</label>
          <div className="ac-cta-group">
            {['Shop Now', 'Learn More', 'Sign Up', 'Get Offer', 'Contact Us', 'Book Now'].map((cta) => (
              <button
                key={cta}
                className={`ac-cta-btn ${local.cta === cta ? 'ac-cta-btn--active' : ''}`}
                onClick={() => update({ cta })}
              >
                {cta}
              </button>
            ))}
          </div>
        </div>

        <div className="ac-field ac-field-full">
          <label className="ac-label">Ad Image</label>
          <div className="ac-image-grid">
            <div className="ac-image-box">
              {local.image ? (
                <img src={local.image} alt="ad creative" className="ac-image" />
              ) : (
                <div className="ac-image-placeholder">
                  <span className="ac-placeholder-icon"><FontAwesomeIcon icon={faImage} /></span>
                  <span className="ac-placeholder-text">AI-generated image will appear here</span>
                </div>
              )}
            </div>
            <div className="ac-image-box">
              <div className="ac-image-placeholder">
                <button className="ac-upload-btn" onClick={()=>document.getElementById('ac-upload')?.click()}>
                  <FontAwesomeIcon icon={faUpload} /> Upload
                </button>
                <input 
                  id="ac-upload" 
                  type="file" 
                  accept="image/*" 
                  style={{ display: 'none' }} 
                  onChange={(e)=>{ 
                    const f = (e.target as HTMLInputElement).files?.[0]; 
                    if(f){ 
                      const url = URL.createObjectURL(f); 
                      update({ image: url }); 
                    } 
                  }} 
                />
              </div>
            </div>
            <div className="ac-image-box">
              <div className="ac-image-placeholder ac-image-placeholder--clickable" onClick={simulateImage}>
                <span className="ac-placeholder-icon"><FontAwesomeIcon icon={faRotate} /></span>
                <span className="ac-placeholder-text">Regenerate</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
