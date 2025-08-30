"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { IoChevronDown } from "react-icons/io5";
// Import the necessary libraries and hooks
import { useDebounce } from "@/hooks/useDebounce"; // Adjust path if needed
// Define a type for city suggestions
type CitySuggestion = {
  id: number;
  city: string;
  country: string;
};
// ✨ HELPER HOOK: Detects clicks outside of a specified component.
// This makes the city suggestion dropdown robust.
const useClickOutside = (handler: () => void) => {
  const domNode = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const maybeHandler = (event: MouseEvent) => {
      if (domNode.current && !domNode.current.contains(event.target as Node)) {
        handler();
      }
    };
    document.addEventListener("mousedown", maybeHandler);
    return () => {
      document.removeEventListener("mousedown", maybeHandler);
    };
  }, [handler]); // Re-run if handler changes

  return domNode;
};

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

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  // Referral state
  const [referrerName, setReferrerName] = useState<string | null>(null);

  // State for city autocomplete
  const [citySearch, setCitySearch] = useState("");
  const [suggestions, setSuggestions] = useState<CitySuggestion[]>([]);
  const [isCityLoading, setIsCityLoading] = useState(false);
  const [cityError, setCityError] = useState<string | null>(null);

  // Debounce the city search input
  const debouncedCitySearch = useDebounce(citySearch, 500);

  // Effect for fetching city suggestions
  useEffect(() => {
    // Only fetch if user has typed more than 2 characters
    if (debouncedCitySearch.length > 2) {
      setIsCityLoading(true);
      setCityError(null);
      const fetchCities = async () => {
        try {
          const response = await fetch(
            `/api/cities?prefix=${debouncedCitySearch}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch cities. Check API key.");
          }
          const data = await response.json();
          setSuggestions(data || []);
        } catch (err: any) {
          console.error(err);
          setCityError(err.message);
          setSuggestions([]);
        } finally {
          setIsCityLoading(false);
        }
      };
      fetchCities();
    } else {
      setSuggestions([]); // Clear suggestions if input is too short
    }
  }, [debouncedCitySearch]);

  // Hook to handle closing the suggestion box when clicking outside
  const citySearchRef = useClickOutside(() => {
    setSuggestions([]);
    setCityError(null);
  });

  // Effect for validating referral code
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

  const handleCitySelect = (city: CitySuggestion) => {
    const fullCityName = `${city.city}, ${city.country}`;
    setFormData((prev) => ({ ...prev, city: fullCityName }));
    setCitySearch(fullCityName);
    setSuggestions([]); // Hide suggestions after selection
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);
    try {
      const { fullName, ...otherFormData } = formData;
      const payload = {
        name: fullName,
        referral: searchParams.get("referral"),
        ...otherFormData,
      };
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Something went wrong");
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
      handleSubmit();
    }
  };

  if (isSuccess) {
    return (
      <div className="text-white text-center">
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
          <input
            type="text"
            name="fullName"
            placeholder="Name"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-md bg-transparent border border-[#fff] text-[#fff] placeholder-[#fff] text-sm sm:text-[16px] outline-none italic font-lato"
          />
          <input
            type="email"
            name="email"
            placeholder="Email ID"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-md bg-transparent border border-[#fff] text-[#fff] placeholder-[#fff] text-sm sm:text-[16px] outline-none italic font-lato"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone No"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-md bg-transparent border border-[#fff] text-[#fff] placeholder-[#fff] text-sm sm:text-[16px] outline-none italic font-lato"
          />
        </>
      )}

      {step === 2 && (
        <>
          <div ref={citySearchRef} className="relative w-full">
            <input
              type="text"
              name="city"
              placeholder="Which city are you looking to buy property in?"
              value={citySearch}
              onChange={(e) => setCitySearch(e.target.value)}
              required
              autoComplete="off"
              className="w-full px-4 py-2 rounded-md bg-transparent border border-[#fff] text-[#fff] placeholder-[#fff] text-sm sm:text-[16px] outline-none italic font-lato"
            />
            {(isCityLoading || cityError || suggestions.length > 0) && (
              <ul className="absolute z-10 w-full mt-1 bg-[#171a34] border border-[#fff] rounded-md max-h-60 overflow-y-auto text-sm">
                {isCityLoading && (
                  <li className="px-4 py-2 text-gray-400 italic">
                    Loading cities...
                  </li>
                )}
                {cityError && (
                  <li className="px-4 py-2 text-red-400 italic">{cityError}</li>
                )}
                {suggestions.map((s) => (
                  <li
                    key={s.id}
                    onClick={() => handleCitySelect(s)}
                    className="px-4 py-2 text-white hover:bg-white/10 cursor-pointer"
                  >
                    {s.city}, {s.country}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="relative w-full">
            <select
              name="propertyType"
              value={formData.propertyType}
              onChange={handleChange}
              required
              className={`w-full appearance-none px-4 py-2 pr-10 rounded-md border border-[#fff] text-[#fff] text-sm sm:text-[16px] outline-none italic font-lato transition-colors ${"bg-transparent"}`}
            >
              <option value="">Type of Property</option>
              <option value="Apartment">Apartment</option>
              <option value="Villa">Villa</option>
              <option value="Flat">Flat</option>
              <option value="Commercial">Commercial</option>
              <option value="Other">Other</option>
            </select>
            <IoChevronDown
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#fff] pointer-events-none"
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
              required
              disabled={!!referrerName}
              className="w-full appearance-none px-4 py-2 pr-10 rounded-md bg-black border border-[#fff] text-[#fff] text-sm sm:text-[16px] outline-none italic font-lato disabled:bg-gray-700/20 disabled:cursor-not-allowed"
            >
              <option value="">How did you hear about us?</option>
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
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#fff] pointer-events-none"
              size={20}
            />
          </div>
          <div className="relative w-full">
            <select
              name="timeSlot"
              value={formData.timeSlot}
              onChange={handleChange}
              required
              className="w-full appearance-none px-4 py-2 pr-10 rounded-md bg-black border border-[#fff] text-[#fff] text-sm sm:text-[16px] outline-none italic font-lato"
            >
              <option value="">Preferred Time</option>
              <option value="10AM - 12PM">10AM - 12PM</option>
              <option value="12PM - 2PM">12PM - 2PM</option>
              <option value="2PM - 4PM">2PM - 4PM</option>
              <option value="4PM - 6PM">4PM - 6PM</option>
            </select>
            <IoChevronDown
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#fff] pointer-events-none"
              size={20}
            />
          </div>
        </>
      )}

      {error && (
        <p className="text-red-400 text-sm text-center font-lato italic">
          {error}
        </p>
      )}

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
