"use client";

import { useState } from "react";
import Image from "next/image";

// --- Helper Icon Components (Omitted for brevity) ---
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
const WhatsAppIcon = ({ className }: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    fill="currentColor"
    className={className}
  >
    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 221.9-99.6 221.9-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.8 0-67.6-9.5-97.2-26.7l-7-4.1-72.5 19.1L48 358.3l-4.4-7.3c-18.5-30.4-28.2-65.3-28.2-101.7 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
  </svg>
);

export default function AffiliateLinkPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [referralLink, setReferralLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /**
   * Validates the email format using a simple regex.
   */
  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  /**
   * Generates the affiliate link by making a POST request to the API.
   */
  const generateLink = async () => {
    setLoading(true);
    setError("");
    setReferralLink("");

    if (!email || !name) {
      setError("Email and Name are required.");
      setLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/referral", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, name }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setReferralLink(data.referralLink);
      } else {
        setError(data.message || "Failed to generate referral link.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Copies the generated referral link to the user's clipboard.
   */
  const copyToClipboard = () => {
    if (!referralLink) return;

    // Use the modern navigator.clipboard API for better security and UX
    navigator.clipboard.writeText(referralLink).then(
      () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      },
      (err) => {
        console.error("Failed to copy text: ", err);
        setError("Failed to copy link.");
      }
    );
  };

  const shareText = `Check out The Great Indian Property Show! Join now: ${referralLink}`;

  return (
    <div className="w-full min-h-screen overflow-x-hidden bg-[#171A34]">
      {/* Header */}
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
            {/* Input for Email */}
            <input
              type="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

            {/* Generate Link Button */}
            <button
              onClick={generateLink}
              disabled={loading || !email || !name}
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
              <div className="mt-8 pt-6 border-t border-white/20 space-y-4 animate-fade-in">
                <p className="text-sm text-center text-gray-300 italic">
                  Your Affiliate Link is Ready:
                </p>
                <div className="flex flex-col items-center gap-3">
                  <div className="flex items-center gap-3 w-full">
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
                    <a
                      href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                        shareText
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white bg-green-500 p-3 rounded-md hover:bg-green-600 transition-colors transform hover:scale-105"
                      title="Share on WhatsApp"
                    >
                      <WhatsAppIcon className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Animation styles (Omitted for brevity) */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,700;1,400&display=swap");
        @font-face {
          font-family: "Chronicle";
          font-weight: bold;
        }
        @font-face {
          font-family: "Chronicle";
          font-weight: normal;
        }
        body {
          font-family: "Lato", sans-serif;
        }
        .font-lato {
          font-family: "Lato", sans-serif;
        }
        .font-chronicle {
          font-family: "Chronicle", serif;
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
