"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

// Self-contained Chevron Icon to avoid external dependencies
const IoChevronDown = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="currentColor"
    viewBox="0 0 512 512"
  >
    <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
  </svg>
);

export default function MultiStepSignUpForm() {
  const searchParams = useSearchParams();

  // State for multi-step logic
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    propertyType: "",
    source: "",
    timeSlot: "",
  });

  // State for referral validation and UI feedback
  const [referralCode, setReferralCode] = useState("");
  const [referrerName, setReferrerName] = useState("");
  const [isValidating, setIsValidating] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Effect to validate the referral code from the URL on page load
  useEffect(() => {
    const refCode = searchParams.get("referral");
    if (!refCode) {
      setIsValidating(false);
      return;
    }
    const validateReferral = async () => {
      try {
        const res = await fetch("/api/validate-referral", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ referralCode: refCode }),
        });
        const data = await res.json();
        if (res.ok && data.success) {
          setReferralCode(refCode);
          setReferrerName(data.referrerName);
        } else {
          setError(data.message || "Invalid referral code.");
        }
      } catch (err) {
        setError("Could not verify referral code.");
      } finally {
        setIsValidating(false);
      }
    };
    validateReferral();
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handles both "Next" and the final "Submit"
  const handleNextOrSubmit = async (e) => {
    e.preventDefault();

    if (step < 3) {
      setStep((prev) => prev + 1);
      return;
    }

    // --- Final Submit Logic ---
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const res = await fetch("/api/submit-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData, referralCode }), // Send form data and referral code
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setMessage(data.message);
        setStep(1); // Reset form to first step
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          city: "",
          propertyType: "",
          source: "",
          timeSlot: "",
        });
      } else {
        setError(data.message || "Submission failed.");
      }
    } catch (err) {
      setError("An unexpected error occurred during submission.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-lg p-8 rounded-3xl w-full max-w-md text-white shadow-2xl border border-white/20">
      <h1 className="text-3xl font-bold text-center mb-2">Get in Touch</h1>

      <div className="text-center mb-6 h-6">
        {isValidating && (
          <p className="text-gray-300 animate-pulse">Verifying referral...</p>
        )}
        {referrerName && !isValidating && (
          <p className="text-green-400">Referred by {referrerName}!</p>
        )}
        {error && !isValidating && <p className="text-red-400">{error}</p>}
        {message && <p className="text-green-400">{message}</p>}
      </div>

      <form
        className="flex flex-col space-y-5 w-full"
        onSubmit={handleNextOrSubmit}
      >
        {step === 1 && (
          <>
            <input
              type="text"
              name="fullName"
              placeholder="Name"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-md bg-transparent border border-[#A2A2A2] text-[#A2A2A2] placeholder-[#A2A2A2] text-sm sm:text-[16px] outline-none italic font-lato"
            />
            <input
              type="email"
              name="email"
              placeholder="Email ID"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-md bg-transparent border border-[#A2A2A2] text-[#A2A2A2] placeholder-[#A2A2A2] text-sm sm:text-[16px] outline-none italic font-lato"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone No"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-md bg-transparent border border-[#A2A2A2] text-[#A2A2A2] placeholder-[#A2A2A2] text-sm sm:text-[16px] outline-none italic font-lato"
            />
          </>
        )}
        {step === 2 && (
          <>
            <input
              type="text"
              name="city"
              placeholder="Which city are you looking to buy property in?"
              value={formData.city}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-md bg-transparent border border-[#A2A2A2] text-[#A2A2A2] placeholder-[#A2A2A2] text-sm sm:text-[16px] outline-none italic font-lato"
            />
            <div className="relative w-full">
              <select
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
                required
                className="w-full appearance-none px-4 py-2 pr-10 rounded-md bg-transparent border border-[#A2A2A2] text-[#A2A2A2] text-sm sm:text-[16px] outline-none italic font-lato"
              >
                <option value="">Type of Property</option>
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
                <option value="Flat">Flat</option>
                <option value="Commercial">Commercial</option>
                <option value="Other">Other</option>
              </select>
              <IoChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A2A2A2] pointer-events-none w-5 h-5" />
            </div>
          </>
        )}
        {step === 3 && (
          <>
            <div className="relative w-full">
              <select
                name="source"
                value={formData.source}
                onChange={handleChange}
                required
                className="w-full appearance-none px-4 py-2 pr-10 rounded-md bg-transparent border border-[#A2A2A2] text-[#A2A2A2] text-sm sm:text-[16px] outline-none italic font-lato"
              >
                <option value="">How did you hear about us?</option>
                <option value="Instagram">Instagram</option>
                <option value="Google">Google</option>
                <option value="Website">Website</option>
                <option value="Friend">Friend</option>
                <option value="Other">Other</option>
              </select>
              <IoChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A2A2A2] pointer-events-none w-5 h-5" />
            </div>
            <div className="relative w-full">
              <select
                name="timeSlot"
                value={formData.timeSlot}
                onChange={handleChange}
                required
                className="w-full appearance-none px-4 py-2 pr-10 rounded-md bg-transparent border border-[#A2A2A2] text-[#A2A2A2] text-sm sm:text-[16px] outline-none italic font-lato"
              >
                <option value="">Preferred Time</option>
                <option value="10AM - 12PM">10AM - 12PM</option>
                <option value="12PM - 2PM">12PM - 2PM</option>
                <option value="2PM - 4PM">2PM - 4PM</option>
                <option value="4PM - 6PM">4PM - 6PM</option>
              </select>
              <IoChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A2A2A2] pointer-events-none w-5 h-5" />
            </div>
          </>
        )}
        <div className="flex justify-between items-center space-x-4 pt-2">
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep((prev) => prev - 1)}
              className="w-full px-4 py-2 sm:py-2.5 bg-transparent border border-white text-white font-medium rounded-md hover:opacity-90 flex justify-center items-center gap-2 text-sm sm:text-[16px] font-lato italic"
            >
              ← Back
            </button>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 sm:py-2.5 bg-white text-[#171A34] font-medium rounded-md hover:opacity-90 flex justify-center items-center gap-2 text-sm sm:text-[16px] font-lato italic disabled:opacity-50"
          >
            {loading ? "Submitting..." : step < 3 ? "Next" : "Submit"}
            {!loading && <span className="text-base sm:text-lg">➜</span>}
          </button>
        </div>
      </form>
    </div>
  );
}
