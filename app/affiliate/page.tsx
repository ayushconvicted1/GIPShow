"use client";
import { useState } from "react";
import Image from "next/image";

// --- Helper Icon Components ---
const CopyIcon = ({ className }: any) => (
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

const CheckIcon = ({ className }: any) => (
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
      // API call to the referral endpoint
      const res = await fetch("/api/referral", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, name }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // On success, set the referral link
        setReferralLink(data.referralLink);
      } else {
        // On failure, set an error message
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

    const textArea = document.createElement("textarea");
    textArea.value = referralLink;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand("copy");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error("Failed to copy text: ", err);
      setError("Failed to copy link.");
    }
    document.body.removeChild(textArea);
  };

  return (
    <div className="w-full min-h-screen overflow-x-hidden bg-[#171A34]">
      {/* Header styled like the Home component */}
      <header className="fixed top-0 left-0 w-full z-30 flex justify-center items-center h-[60px] sm:h-[85px] text-white bg-[#fff] bg-opacity-25 backdrop-blur-md">
        <Image
          src="/HeaderLogo.png"
          alt="Header Logo"
          width={80}
          height={60}
          className="my-[5px] w-[60px] sm:w-[80px] h-[45px] sm:h-[60px] sm:my-[7px]"
          onError={(e) => {
            e.currentTarget.src =
              "https://placehold.co/80x60/171A34/FFFFFF?text=Logo";
          }}
        />
      </header>

      {/* Main Content Area */}
      <main className="min-h-screen flex items-center justify-center px-4 pt-[85px]">
        <div className="w-full max-w-md text-white">
          <h1 className="text-3xl sm:text-4xl font-bold text-center mb-4 text-white font-chronicle">
            Generate Your Affiliate Link
          </h1>
          <p className="text-center text-gray-300 mb-8 text-sm sm:text-base font-lato italic">
            Create a unique link to share and earn rewards.
          </p>

          <div className="space-y-5 font-lato">
            {/* Input for User ID */}
            <input
              type="text"
              placeholder="Enter Your User ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full px-4 py-3 rounded-md bg-transparent border border-[#A2A2A2] text-white placeholder-[#A2A2A2] text-sm sm:text-[16px] outline-none italic transition duration-300 focus:ring-2 focus:ring-white/50"
            />
            {/* Input for Name */}
            <input
              type="text"
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-md bg-transparent border border-[#A2A2A2] text-white placeholder-[#A2A2A2] text-sm sm:text-[16px] outline-none italic transition duration-300 focus:ring-2 focus:ring-white/50"
            />

            {/* Generate Link Button with Gradient */}
            <button
              onClick={generateLink}
              disabled={loading || !userId || !name}
              className="w-full bg-gradient-to-r from-[#2597EF] to-[#A14EFF] text-white py-3 rounded-md font-bold text-lg hover:opacity-90 transition-transform transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? "Generating..." : "Generate Link"}
            </button>

            {/* Error Message Display */}
            {error && !referralLink && (
              <div className="bg-red-500/30 text-white text-center p-3 rounded-xl font-lato italic">
                {error}
              </div>
            )}

            {/* Result Display Area */}
            {referralLink && (
              <div className="mt-8 pt-6 border-t border-white/20 space-y-3 animate-fade-in">
                <p className="text-sm text-center text-gray-300 italic">
                  Your Affiliate Link is Ready:
                </p>
                <div className="flex items-center gap-3">
                  <input
                    readOnly
                    value={referralLink}
                    className="flex-1 px-4 py-3 rounded-md bg-black bg-opacity-30 border border-white/30 text-white focus:outline-none truncate italic"
                  />
                  <button
                    onClick={copyToClipboard}
                    className="bg-white text-[#171A34] p-3 rounded-md font-semibold hover:bg-opacity-90 transition-transform transform hover:scale-105"
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
      </main>

      {/* Animation styles */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,700;1,400&display=swap");

        /* A generic font-face for chronicle if you have the file */
        @font-face {
          font-family: "Chronicle";
          /* src: url('/fonts/Chronicle-Display-Bold.otf') format('opentype'); */
          font-weight: bold;
        }
        @font-face {
          font-family: "Chronicle";
          /* src: url('/fonts/Chronicle-Display-Roman.otf') format('opentype'); */
          font-weight: normal;
        }

        body {
          font-family: "Lato", sans-serif;
        }

        .font-lato {
          font-family: "Lato", sans-serif;
        }

        .font-chronicle {
          font-family: "Chronicle", serif; /* Fallback to serif */
        }

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
