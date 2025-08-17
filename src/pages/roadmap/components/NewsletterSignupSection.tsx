import React, { useState } from "react";
import { Icon } from "@iconify/react";

const NewsletterSignupSection: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [successToastVisible, setSuccessToastVisible] = useState(false);
  const [alreadySubscribedToastVisible, setAlreadySubscribedToastVisible] =
    useState(false);

  const handleNewsletterSubscribe = async (emailValue: string) => {
    if (!emailValue.trim()) {
      console.log("Email is required");
      return;
    }

    setIsSubscribing(true);
    try {
      const response = await fetch(
        "https://cherrytest-production.up.railway.app/email/newsletter",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: emailValue,
          }),
        }
      );

      const data = await response.json();
      console.log("Newsletter subscription response:", data);

      if (response.ok) {
        console.log("Successfully subscribed to newsletter");
        setSuccessToastVisible(true);
        setTimeout(() => setSuccessToastVisible(false), 3000);
        setEmail("");
      } else {
        console.log("Failed to subscribe:", data);
        // Check if email is already subscribed
        if (data.message === "Email already subscribed") {
          setAlreadySubscribedToastVisible(true);
          setTimeout(() => setAlreadySubscribedToastVisible(false), 3000);
        }
      }
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <div className="section_sniper_spotlight py-24 relative overflow-hidden">
      {/* Advanced Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_65%,rgba(67,103,201,0.14)_0%,transparent_55%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_35%,rgba(67,103,201,0.09)_0%,transparent_55%)]"></div>
      </div>

      {/* Success Toast for Newsletter */}
      <div
        className={`fixed top-10 right-10 z-50 bg-green-100 border-4 border-green-500 rounded-xl shadow-[4px_4px_0px_#22c55e] px-5 py-3 flex items-center gap-3 transition-all duration-300 transform ${
          successToastVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-10 pointer-events-none"
        }`}
      >
        <Icon
          icon="mdi:check-circle"
          className="text-green-600"
          width={24}
          height={24}
        />
        <div className="flex flex-col">
          <span className="winky-sans-font font-medium text-green-800">
            Success!
          </span>
          <span className="winky-sans-font text-sm text-green-700 opacity-90">
            Successfully subscribed to newsletter
          </span>
        </div>
      </div>

      {/* Already Subscribed Toast */}
      <div
        className={`fixed top-10 right-10 z-50 bg-orange-100 border-4 border-orange-500 rounded-xl shadow-[4px_4px_0px_#f97316] px-5 py-3 flex items-center gap-3 transition-all duration-300 transform ${
          alreadySubscribedToastVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-10 pointer-events-none"
        }`}
      >
        <Icon
          icon="mdi:information"
          className="text-orange-600"
          width={24}
          height={24}
        />
        <div className="flex flex-col">
          <span className="winky-sans-font font-medium text-orange-800">
            Already Subscribed!
          </span>
          <span className="winky-sans-font text-sm text-orange-700 opacity-90">
            This email is already subscribed to our newsletter
          </span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div
          id="newsletter-signup-roadmap"
          className="bg-[var(--color-glass)] border border-[var(--color-glass-border)] rounded-[4px] p-8 relative overflow-hidden hover:rotate-0 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(67,103,201,0.2)]"
        >
          <div className="absolute -top-16 -right-16 w-32 h-32 bg-[var(--color-accent)] opacity-10 rounded-full"></div>
          <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-[var(--color-accent)] opacity-10 rounded-full"></div>

          <div className="relative z-10 text-center">
            <img
              src="https://storage.cherrybot.ai/cherrySniper.webp"
              alt="Cherry AI"
              className="w-20 h-20 mx-auto mb-4"
            />
            <h3 className="maladroit-font md:text-3xl text-xl font-bold text-[var(--color-text-primary)] mb-4">
              Join the Cherry Trade Waitlist
            </h3>
            <p className="winky-sans-font md:text-lg text-sm text-[var(--color-text-secondary)] mb-8 max-w-2xl mx-auto">
              Be among the first to experience our revolutionary Web3 trading
              platform. Get early access, exclusive features, and priority
              support.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-grow py-3 px-4 rounded-xl border-2 border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)] focus:outline-none winky-sans-font"
              />
              <button
                onClick={() => handleNewsletterSubscribe(email)}
                disabled={isSubscribing}
                className="bg-[var(--color-accent)] text-white font-bold py-3 px-8 rounded-xl border border-b-4 border-r-4 border-[var(--color-accent)] hover:border-b-2 hover:border-r-2 hover:translate-y-1 hover:translate-x-1 transition-all duration-200 transform-gpu shadow-[4px_4px_0px_#321017] hover:shadow-[2px_2px_0px_#321017] winky-sans-font flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="text-white">
                  {isSubscribing ? "Joining..." : "Join Waitlist"}
                </span>
                <Icon
                  icon={isSubscribing ? "mdi:loading" : "mdi:rocket"}
                  width={20}
                  height={20}
                  className={`text-white ${
                    isSubscribing ? "animate-spin" : ""
                  }`}
                />
              </button>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center justify-center gap-2 text-[var(--color-text-secondary)]">
                <Icon
                  icon="mdi:flash"
                  className="text-[var(--color-accent)]"
                  width={16}
                  height={16}
                />
                <span className="winky-sans-font">Early Access</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-[var(--color-text-secondary)]">
                <Icon
                  icon="mdi:star"
                  className="text-[var(--color-accent)]"
                  width={16}
                  height={16}
                />
                <span className="winky-sans-font">Exclusive Features</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-[var(--color-text-secondary)]">
                <Icon
                  icon="mdi:headset"
                  className="text-[var(--color-accent)]"
                  width={16}
                  height={16}
                />
                <span className="winky-sans-font">Priority Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSignupSection;
