"use client";
import { useState } from "react";
import { IoChevronDown } from "react-icons/io5";

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    propertyType: "",
    source: "",
    manager: "",
    timeSlot: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = (e: any) => {
    e.preventDefault();
    if (step < 3) setStep((prev) => prev + 1);
    else {
      // Final submit action
      console.log("Submitting data:", formData);
      // Submit logic goes here (API call etc.)
    }
  };

  return (
    <form className="flex flex-col space-y-5 w-full" onSubmit={handleNext}>
      {step === 1 && (
        <>
          <input
            type="text"
            name="fullName"
            placeholder="Name"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md bg-transparent border border-[#A2A2A2] text-[#A2A2A2] placeholder-[#A2A2A2] text-sm sm:text-[16px] outline-none italic font-lato"
          />
          <input
            type="email"
            name="email"
            placeholder="Email ID"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md bg-transparent border border-[#A2A2A2] text-[#A2A2A2] placeholder-[#A2A2A2] text-sm sm:text-[16px] outline-none italic font-lato"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone No"
            value={formData.phone}
            onChange={handleChange}
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
            className="w-full px-4 py-2 rounded-md bg-transparent border border-[#A2A2A2] text-[#A2A2A2] placeholder-[#A2A2A2] text-sm sm:text-[16px] outline-none italic font-lato"
          />
          <div className="relative w-full">
            <select
              name="propertyType"
              value={formData.propertyType}
              onChange={handleChange}
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
          <div className="relative w-full">
            <select
              name="source"
              value={formData.source}
              onChange={handleChange}
              className="w-full appearance-none px-4 py-2 pr-10 rounded-md bg-transparent border border-[#A2A2A2] text-[#A2A2A2] text-sm sm:text-[16px] outline-none italic font-lato"
            >
              <option value="">How did you hear about us?</option>
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

      {/* Buttons */}
      <div className="flex justify-between items-center space-x-4">
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
          className="w-full px-4 py-2 sm:py-2.5 bg-white text-[#171A34] font-medium rounded-md hover:opacity-90 flex justify-center items-center gap-2 text-sm sm:text-[16px] font-lato italic"
        >
          {step < 3 ? "Next" : "Submit"}{" "}
          <span className="text-base sm:text-lg">➜</span>
        </button>
      </div>
    </form>
  );
};

export default MultiStepForm;
