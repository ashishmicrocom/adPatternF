"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "./ProductForm.css";

// Progress Steps Component
interface Step {
  label: string;
  component: React.ComponentType<StepProps>;
  validationFields: string[];
}

interface ProgressStepsProps {
  steps: Step[];
  currentStep: number;
}

const ProgressSteps: React.FC<ProgressStepsProps> = ({ steps, currentStep }) => {
  return (
    <div className="pf-progress-wrapper">
      <div className="pf-progress-steps">
        {steps.map((step, i) => (
          <React.Fragment key={i}>
            {/* Step circle */}
            <div className="pf-step-item">
              <div
                className={`pf-step-circle ${
                  i < currentStep
                    ? "pf-step-circle--complete"
                    : i === currentStep
                    ? "pf-step-circle--active"
                    : "pf-step-circle--inactive"
                }`}
              >
                {i < currentStep ? (
                  <FontAwesomeIcon icon={faCheck} className="pf-step-check" />
                ) : (
                  <span className="pf-step-number">{i + 1}</span>
                )}
              </div>
              
              {/* Step label */}
              <div className="pf-step-label-wrapper">
                <span 
                  className={`pf-step-label ${
                    i <= currentStep ? 'pf-step-label--active' : 'pf-step-label--inactive'
                  }`}
                >
                  {step.label}
                </span>
              </div>
            </div>

            {/* Connector line */}
            {i < steps.length - 1 && (
              <div 
                className={`pf-step-connector ${
                  i < currentStep ? "pf-step-connector--complete" : "pf-step-connector--inactive"
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

// Step Props Interface
interface StepProps {
  formData: Record<string, string>;
  updateFormData: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  errors: Record<string, string>;
}

// Step 1: Product/Service Information
const ProductInfoStep: React.FC<StepProps> = ({ formData, updateFormData, errors }) => (
  <div className="pf-step-content">
    <div className="pf-field">
      <label htmlFor="productType" className="pf-label-new">
        What are you advertising?
      </label>
      <select
        id="productType"
        name="productType"
        value={formData.productType || 'Product'}
        onChange={updateFormData}
        className={`pf-input-new ${errors.productType ? 'pf-input-error' : ''}`}
      >
        <option value="Product">Product</option>
        <option value="Service">Service</option>
      </select>
      {errors.productType && <p className="pf-error-text">{errors.productType}</p>}
    </div>
    
    <div className="pf-field">
      <label htmlFor="name" className="pf-label-new">
        Product / Service Name
      </label>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name || ''}
        onChange={updateFormData}
        className={`pf-input-new ${errors.name ? 'pf-input-error' : ''}`}
        placeholder="e.g. QuickClean Laundry Service"
      />
      {errors.name && <p className="pf-error-text">{errors.name}</p>}
    </div>
    
    <div className="pf-field">
      <label htmlFor="category" className="pf-label-new">
        Category
      </label>
      <select
        id="category"
        name="category"
        value={formData.category || 'Clothing'}
        onChange={updateFormData}
        className="pf-input-new"
      >
        <option value="Clothing">Clothing</option>
        <option value="Education">Education</option>
        <option value="Restaurant">Restaurant</option>
        <option value="Software">Software</option>
        <option value="Health">Health & Fitness</option>
        <option value="Beauty">Beauty & Wellness</option>
        <option value="Home">Home & Garden</option>
        <option value="Electronics">Electronics</option>
      </select>
    </div>
  </div>
);

// Step 2: Description & Details
const DescriptionStep: React.FC<StepProps> = ({ formData, updateFormData, errors }) => (
  <div className="pf-step-content">
    <div className="pf-field">
      <label htmlFor="description" className="pf-label-new">
        Product / Service Description
      </label>
      <textarea
        id="description"
        name="description"
        value={formData.description || ''}
        onChange={updateFormData}
        className={`pf-textarea-new ${errors.description ? 'pf-input-error' : ''}`}
        placeholder="Describe what you offer in simple words. Keep it short — 2-3 lines."
        maxLength={280}
        rows={4}
      />
      {errors.description && <p className="pf-error-text">{errors.description}</p>}
      <p className="pf-field-hint">{formData.description?.length || 0} / 280 characters</p>
    </div>
    
    <div className="pf-field">
      <label htmlFor="price" className="pf-label-new">
        Price or Price Range
      </label>
      <input
        type="text"
        id="price"
        name="price"
        value={formData.price || ''}
        onChange={updateFormData}
        className={`pf-input-new ${errors.price ? 'pf-input-error' : ''}`}
        placeholder="e.g. ₹999 or ₹999-₹4999"
      />
      {errors.price && <p className="pf-error-text">{errors.price}</p>}
    </div>
  </div>
);

// Step 3: Target Audience & Location
const AudienceStep: React.FC<StepProps> = ({ formData, updateFormData, errors }) => (
  <div className="pf-step-content">
    <div className="pf-field">
      <label htmlFor="location" className="pf-label-new">
        Target Location
      </label>
      <input
        type="text"
        id="location"
        name="location"
        value={formData.location || ''}
        onChange={updateFormData}
        className={`pf-input-new ${errors.location ? 'pf-input-error' : ''}`}
        placeholder="e.g. Mumbai, Maharashtra, India"
      />
      {errors.location && <p className="pf-error-text">{errors.location}</p>}
    </div>
    
    <div className="pf-field-grid">
      <div className="pf-field">
        <label htmlFor="ageMin" className="pf-label-new">
          Min Age
        </label>
        <input
          type="number"
          id="ageMin"
          name="ageMin"
          value={formData.ageMin || ''}
          onChange={updateFormData}
          className="pf-input-new"
          placeholder="18"
          min="13"
          max="100"
        />
      </div>
      
      <div className="pf-field">
        <label htmlFor="ageMax" className="pf-label-new">
          Max Age
        </label>
        <input
          type="number"
          id="ageMax"
          name="ageMax"
          value={formData.ageMax || ''}
          onChange={updateFormData}
          className="pf-input-new"
          placeholder="65"
          min="13"
          max="100"
        />
      </div>
    </div>
    
    <div className="pf-field">
      <label htmlFor="target" className="pf-label-new">
        Target Customer Type (Optional)
      </label>
      <input
        type="text"
        id="target"
        name="target"
        value={formData.target || ''}
        onChange={updateFormData}
        className="pf-input-new"
        placeholder="e.g. Students, Working professionals, Parents"
      />
    </div>
  </div>
);

// Step 4: Review
interface ReviewStepProps {
  formData: Record<string, string>;
}

const ReviewStep: React.FC<ReviewStepProps> = ({ formData }) => (
  <div className="pf-step-content">
    <div className="pf-review-section pf-review-section--product">
      <h3 className="pf-review-title">Product / Service Information</h3>
      <div className="pf-review-grid">
        <div className="pf-review-item">
          <p className="pf-review-label">Type</p>
          <p className="pf-review-value">{formData.productType || 'Product'}</p>
        </div>
        <div className="pf-review-item">
          <p className="pf-review-label">Name</p>
          <p className="pf-review-value">{formData.name || '—'}</p>
        </div>
        <div className="pf-review-item">
          <p className="pf-review-label">Category</p>
          <p className="pf-review-value">{formData.category || 'Clothing'}</p>
        </div>
      </div>
    </div>
    
    <div className="pf-review-section pf-review-section--description">
      <h3 className="pf-review-title">Description & Pricing</h3>
      <div className="pf-review-grid">
        <div className="pf-review-item pf-review-item--full">
          <p className="pf-review-label">Description</p>
          <p className="pf-review-value">{formData.description || '—'}</p>
        </div>
        <div className="pf-review-item">
          <p className="pf-review-label">Price</p>
          <p className="pf-review-value">{formData.price || '—'}</p>
        </div>
      </div>
    </div>
    
    <div className="pf-review-section pf-review-section--audience">
      <h3 className="pf-review-title">Target Audience</h3>
      <div className="pf-review-grid">
        <div className="pf-review-item pf-review-item--full">
          <p className="pf-review-label">Location</p>
          <p className="pf-review-value">{formData.location || '—'}</p>
        </div>
        <div className="pf-review-item">
          <p className="pf-review-label">Age Range</p>
          <p className="pf-review-value">
            {formData.ageMin || formData.ageMax 
              ? `${formData.ageMin || '—'} - ${formData.ageMax || '—'}` 
              : 'Not specified'}
          </p>
        </div>
        <div className="pf-review-item">
          <p className="pf-review-label">Customer Type</p>
          <p className="pf-review-value">{formData.target || 'Not specified'}</p>
        </div>
      </div>
    </div>
    
    <div className="pf-terms-wrapper">
      <label className="pf-terms-label">
        <input type="checkbox" className="pf-terms-checkbox" required />
        <span className="pf-terms-text">
          I agree to the <a href="/terms" className="pf-terms-link">Terms of Service</a> and <a href="/privacy" className="pf-terms-link">Privacy Policy</a>
        </span>
      </label>
    </div>
  </div>
);

// Step 5: Success
const SuccessStep: React.FC = () => {
  const router = useRouter();
  
  return (
    <div className="pf-success-wrapper">
      <div className="pf-success-icon-wrapper">
        <FontAwesomeIcon icon={faCheck} className="pf-success-icon" />
      </div>
      <h3 className="pf-success-title">Your Details Submitted Successfully!</h3>
      <p className="pf-success-text">
        Your ad campaign has been created. Our AI will now generate compelling ad copy and visuals for you.
      </p>
      <button
        type="button"
        className="pf-success-button"
        onClick={() => router.push('/ads-dashboard')}
      >
        Go to Dashboard <FontAwesomeIcon icon={faArrowRight} />
      </button>
    </div>
  );
};

// Main ProductForm Component
export default function ProductForm(): React.JSX.Element {
  const router = useRouter();
  
  const steps: Step[] = [
    { label: "Product", component: ProductInfoStep, validationFields: ['productType', 'name'] },
    { label: "Description", component: DescriptionStep, validationFields: ['description', 'price'] },
    { label: "Audience", component: AudienceStep, validationFields: ['location'] },
    { label: "Review", component: ReviewStep, validationFields: [] },
    { label: "Complete", component: SuccessStep, validationFields: [] }
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({
    productType: 'Product',
    category: 'Clothing'
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [direction, setDirection] = useState<"right" | "left">("right");

  const validateStep = (): boolean => {
    const currentValidationFields = steps[currentStep].validationFields;
    const newErrors: Record<string, string> = {};
    
    currentValidationFields.forEach(field => {
      if (!formData[field] || !formData[field].trim()) {
        newErrors[field] = 'This field is required';
      }
      
      // Email validation (if needed in future)
      if (field === 'email' && formData.email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
          newErrors.email = 'Please enter a valid email address';
        }
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      if (validateStep()) {
        setDirection("right");
        setCurrentStep(prev => prev + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setDirection("left");
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep()) {
      setIsSubmitting(true);
      
      // Save to localStorage
      try {
        localStorage.setItem('adpatterns_last_payload', JSON.stringify(formData));
      } catch (err) {
        // ignore
      }
      
      // Simulate API submission
      setTimeout(() => {
        setIsSubmitting(false);
        setDirection("right");
        setCurrentStep(steps.length - 1);
      }, 1500);
    }
  };

  const CurrentStepComponent = steps[currentStep].component;

  // Animation variants
  const slideVariants = {
    hidden: (direction: "right" | "left") => ({
      x: direction === "right" ? 100 : -100,
      opacity: 0,
    }),
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30,
      }
    },
    exit: (direction: "right" | "left") => ({
      x: direction === "right" ? -100 : 100,
      opacity: 0,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30,
      }
    })
  };

  return (
    <div className="pf-main-wrapper">
      <div className="pf-form-card">
        <div className="pf-form-header">
          <h2 className="pf-form-title">Create Your Ad Campaign</h2>
          <p className="pf-form-subtitle">Fill out the form below to get started with AI-powered advertising.</p>
          
          <ProgressSteps steps={steps} currentStep={currentStep} />
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="pf-form-body">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentStep}
                custom={direction}
                variants={slideVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <CurrentStepComponent
                  formData={formData}
                  updateFormData={handleInputChange}
                  errors={errors}
                />
              </motion.div>
            </AnimatePresence>
          </div>
          
          {currentStep !== steps.length - 1 && (
            <div className="pf-form-footer">
              <button
                type="button"
                className={`pf-btn-secondary ${currentStep === 0 ? 'pf-btn-disabled' : ''}`}
                onClick={handlePrevious}
                disabled={currentStep === 0}
              >
                Previous
              </button>
              
              {currentStep === steps.length - 2 ? (
                <button
                  type="submit"
                  className="pf-btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="pf-spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="pf-spinner-track" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="pf-spinner-path" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    'Submit & Continue'
                  )}
                </button>
              ) : (
                <button
                  type="button"
                  className="pf-btn-primary"
                  onClick={handleNext}
                >
                  Next <FontAwesomeIcon icon={faArrowRight} />
                </button>
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
