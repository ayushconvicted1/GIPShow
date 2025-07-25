"use client";
import { useState } from "react";

// --- Helper Icon Components for a better UI ---
const CopyIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
  </svg>
);

const CheckIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export default function AffiliateLinkPage() {
  // State hooks for managing component data and UI state
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [referralLink, setReferralLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /**
   * Generates the affiliate link by making a POST request to the API.
   * This is triggered when the user clicks the "Generate Link" button.
   */
  const generateLink = async () => {
    // Reset previous states for a clean experience
    setLoading(true);
    setError("");
    setReferralLink("");

    if (!userId || !name) {
      setError("User ID and Name are required.");
      setLoading(false);
      return;
    }

    try {
      // API call to the referral endpoint you've created
      const res = await fetch("/api/referral", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, name }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // On success, set the referral link, which will cause the results DIV to appear
        setReferralLink(data.referralLink);
      } else {
        // On failure, set an error message to be displayed
        setError(data.message || "Failed to generate referral link.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      // Stop the loading indicator
      setLoading(false);
    }
  };

  /**
   * Copies the generated referral link to the user's clipboard.
   */
  const copyToClipboard = () => {
    if (!referralLink) return;

    // A robust way to copy text that works in most environments
    const textArea = document.createElement("textarea");
    textArea.value = referralLink;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand("copy");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Show "Copied!" for 2 seconds
    } catch (err) {
      console.error("Failed to copy text: ", err);
      setError("Failed to copy link.");
    }
    document.body.removeChild(textArea);
  };

  return (
    <div className="min-h-screen bg-[#171A34] flex items-center justify-center px-4 font-sans">
      <div className="bg-white bg-opacity-10 backdrop-blur-lg p-6 sm:p-8 rounded-3xl w-full max-w-md text-white shadow-2xl border border-white/20">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4 text-white">
          Generate Your Affiliate Link
        </h1>
        <p className="text-center text-gray-300 mb-8 text-sm sm:text-base">
          Create a unique link to share and earn rewards.
        </p>

        <div className="space-y-5">
          {/* Input for User ID */}
          <input
            type="text"
            placeholder="Enter Your User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white bg-opacity-20 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-white/80 transition duration-300"
          />
          {/* Input for Name */}
          <input
            type="text"
            placeholder="Enter Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white bg-opacity-20 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-white/80 transition duration-300"
          />

          {/* Generate Link Button */}
          <button
            onClick={generateLink}
            disabled={loading || !userId || !name}
            className="w-full bg-white text-[#171A34] py-3 rounded-xl font-bold text-lg hover:bg-opacity-90 transition-transform transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? "Generating..." : "Generate Link"}
          </button>

          {/* Error Message Display */}
          {error && !referralLink && (
            <div className="bg-red-500/30 text-white text-center p-3 rounded-xl">
              {error}
            </div>
          )}

          {/* This is the DIV that appears after the link is generated */}
          {referralLink && (
            <div className="mt-8 pt-6 border-t border-white/20 space-y-3 animate-fade-in">
              <p className="text-sm text-center text-gray-300">
                Your Affiliate Link is Ready:
              </p>
              <div className="flex items-center gap-2">
                <input
                  readOnly
                  value={referralLink}
                  className="flex-1 px-4 py-3 rounded-lg bg-black bg-opacity-30 text-white focus:outline-none truncate"
                />
                <button
                  onClick={copyToClipboard}
                  className="bg-white text-[#171A34] p-3 rounded-lg font-semibold hover:bg-opacity-90 transition-transform transform hover:scale-105"
                  title="Copy to clipboard"
                >
                  {copied ? (
                    <CheckIcon className="w-5 h-5" />
                  ) : (
                    <CopyIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
