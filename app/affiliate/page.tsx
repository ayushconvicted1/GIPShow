"use client";
import { useState } from "react";

export default function AffiliateLinkPage() {
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [referralLink, setReferralLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const generateLink = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/affiliate", {
        method: "POST",
        body: JSON.stringify({ userId, name }),
      });

      const data = await res.json();
      if (data.success) {
        setReferralLink(data.referralLink);
      } else {
        alert("Failed to generate referral link");
      }
    } catch (err) {
      alert("Something went wrong");
    }
    setLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#171A34] flex items-center justify-center px-4">
      <div className="bg-white bg-opacity-10 backdrop-blur-md p-6 sm:p-10 rounded-3xl w-full max-w-md text-white shadow-2xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
          Generate Affiliate Link
        </h1>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-white"
          />
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-white"
          />

          <button
            onClick={generateLink}
            disabled={loading || !userId || !name}
            className="w-full bg-white text-[#171A34] py-3 rounded-lg font-semibold hover:bg-opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Generating..." : "Generate Link"}
          </button>

          {referralLink && (
            <div className="mt-6 space-y-2">
              <p className="text-sm text-center">Your Affiliate Link:</p>
              <div className="flex items-center gap-2">
                <input
                  readOnly
                  value={referralLink}
                  className="flex-1 px-4 py-3 rounded-lg bg-white bg-opacity-20 text-white focus:outline-none"
                />
                <button
                  onClick={copyToClipboard}
                  className="bg-white text-[#171A34] px-3 py-2 rounded-lg font-semibold hover:bg-opacity-90 transition"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
