"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { IoChevronDown } from "react-icons/io5";

const MultiStepForm = () => {
  const searchParams = useSearchParams();
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

  // State for managing UI during submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  // State to hold the referrer's name if a valid code is found
  const [referrerName, setReferrerName] = useState<string | null>(null);

  // Effect to validate referral code from URL on component mount
  useEffect(() => {
    const referralCode = searchParams.get("referral");
    if (referralCode) {
      const validateReferral = async () => {
        try {
          const response = await fetch("/api/validate-referral", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ referralCode }),
          });
          const data = await response.json();

          if (data.success && data.referrerName) {
            setReferrerName(data.referrerName);
            // Auto-fill the "How did you hear about us?" field
            const sourceValue = `Referred by: ${data.referrerName}`;
            setFormData((prev) => ({ ...prev, source: sourceValue }));
          }
        } catch (err) {
          console.error("Failed to validate referral code:", err);
        }
      };
      validateReferral();
    }
  }, [searchParams]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handles form submission
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);
    try {
      // 1. Destructure fullName from formData and capture the rest
      const { fullName, ...otherFormData } = formData;

      // 2. Construct the payload cleanly
      const payload = {
        name: fullName, // Use fullName for the 'name' key
        referral: searchParams.get("referral"),
        ...otherFormData, // Spread the rest of the data (email, phone, etc.)
      };

      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setIsSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep((prev) => prev + 1);
    } else {
      // On the final step, call the submission handler
      handleSubmit();
    }
  };

  // If form is submitted successfully, show a thank you message
  if (isSuccess) {
    return (
      <div className="text-white p-4">
        <h2 className="text-2xl font-bold mb-2">Registration Successful!</h2>
        <p>
          Thank you for registering. A calendar invite has been sent to your
          email.
        </p>
      </div>
    );
  }

  return (
    <form className="flex flex-col space-y-5 w-full" onSubmit={handleNext}>
      {step === 1 && (
        <>
          {/* Step 1 Fields: Name, Email, Phone */}
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
          {/* Step 2 Fields: City, Property Type */}
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
            <IoChevronDown
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A2A2A2] pointer-events-none"
              size={20}
            />
          </div>
        </>
      )}

      {step === 3 && (
        <>
          {/* Step 3 Fields: Source, Time Slot */}
          <div className="relative w-full">
            <select
              name="source"
              value={formData.source}
              onChange={handleChange}
              required
              disabled={!!referrerName} // Disable if referred
              className="w-full appearance-none px-4 py-2 pr-10 rounded-md bg-transparent border border-[#A2A2A2] text-[#A2A2A2] text-sm sm:text-[16px] outline-none italic font-lato disabled:bg-gray-700/20 disabled:cursor-not-allowed"
            >
              <option value="">How did you hear about us?</option>
              {/* If referrer exists, add it as the selected option */}
              {referrerName && (
                <option value={`Referred by: ${referrerName}`}>
                  Referred by: {referrerName}
                </option>
              )}
              <option value="Instagram">Instagram</option>
              <option value="Google">Google</option>
              <option value="Website">Website</option>
              <option value="Friend">Friend</option>
              <option value="Other">Other</option>
            </select>
            <IoChevronDown
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A2A2A2] pointer-events-none"
              size={20}
            />
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
            <IoChevronDown
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A2A2A2] pointer-events-none"
              size={20}
            />
          </div>
        </>
      )}

      {/* Error Message */}
      {error && (
        <p className="text-red-400 text-sm text-center font-lato italic">
          {error}
        </p>
      )}

      {/* Buttons */}
      <div className="flex justify-between items-center space-x-4 pt-2">
        {step > 1 && (
          <button
            type="button"
            onClick={() => setStep((prev) => prev - 1)}
            disabled={isSubmitting}
            className="w-full px-4 py-2 sm:py-2.5 bg-transparent border border-white text-white font-medium rounded-md hover:opacity-90 flex justify-center items-center gap-2 text-sm sm:text-[16px] font-lato italic disabled:opacity-50"
          >
            ← Back
          </button>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-4 py-2 sm:py-2.5 bg-white text-[#171A34] font-medium rounded-md hover:opacity-90 flex justify-center items-center gap-2 text-sm sm:text-[16px] font-lato italic disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : step < 3 ? "Next" : "Submit"}
          {!isSubmitting && <span className="text-base sm:text-lg">➜</span>}
        </button>
      </div>
    </form>
  );
};

export default MultiStepForm;
