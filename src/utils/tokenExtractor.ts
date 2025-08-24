// TEMPORARILY DISABLED - Token extractor functions are commented out in AuthProvider
export const extractTokenFromUrl = (): string | null => {
  try {
    const hash = window.location.hash;

    console.log("🔍 [Token Extractor] Full URL hash:", hash);

    if (!hash) {
      console.warn("⚠️ [Token Extractor] No hash found in URL");
      return null;
    }

    let hashContent = hash.substring(1);

    console.log("🔍 [Token Extractor] Raw hash content:", hashContent);

    const hashParts = hashContent.split("-");

    console.log("🔍 [Token Extractor] Hash parts (split by -):", hashParts);

    if (hashParts.length === 0 || !hashParts[0]) {
      console.warn("⚠️ [Token Extractor] No token found in first part");
      return null;
    }

    let token = hashParts[0];

    try {
      token = decodeURIComponent(token);
      console.log("🔍 [Token Extractor] Decoded token:", token);
    } catch (decodeError) {
      console.warn(
        "⚠️ [Token Extractor] Could not decode token, using raw:",
        decodeError
      );
    }

    token = token.split("%")[0];

    const allowedPattern = /^[A-Za-z0-9\-_\.]+$/;
    if (!allowedPattern.test(token)) {
      console.warn(
        "⚠️ [Token Extractor] Token contains invalid characters, cleaning..."
      );
      token = token.match(/[A-Za-z0-9\-_\.]+/g)?.[0] || "";
    }

    console.log("✅ [Token Extractor] Final cleaned token:", {
      length: token.length,
      preview: token.substring(0, 20) + "...",
      isValid: /^[A-Za-z0-9\-_\.]+$/.test(token),
      walletData: hashParts[1] ? hashParts[1].substring(0, 20) + "..." : "none",
      telegramId: hashParts[2] || "none",
    });

    return token.length > 0 ? token : null;
  } catch (error) {
    console.error("❌ [Token Extractor] Error extracting token:", error);
    return null;
  }
};

export const extractTelegramIdFromUrl = (): number | null => {
  try {
    const hash = window.location.hash;

    if (!hash) {
      console.warn(
        "⚠️ [Token Extractor] No hash found in URL for Telegram ID extraction"
      );
      return null;
    }

    const hashContent = hash.substring(1);
    const hashParts = hashContent.split("-");

    console.log(
      "🔍 [Token Extractor] Extracting Telegram ID from hash parts:",
      hashParts
    );

    if (hashParts.length < 3 || !hashParts[2]) {
      console.warn(
        "⚠️ [Token Extractor] No Telegram ID found in third part of URL"
      );
      return null;
    }

    const telegramIdString = hashParts[2];
    const telegramId = parseInt(telegramIdString, 10);

    if (isNaN(telegramId)) {
      console.warn(
        "⚠️ [Token Extractor] Telegram ID is not a valid number:",
        telegramIdString
      );
      return null;
    }

    console.log("✅ [Token Extractor] Extracted Telegram ID:", telegramId);
    return telegramId;
  } catch (error) {
    console.error("❌ [Token Extractor] Error extracting Telegram ID:", error);
    return null;
  }
};

export const extractDataFromUrl = (): {
  token: string | null;
  telegramId: number | null;
} => {
  try {
    const hash = window.location.hash;

    if (!hash) {
      console.warn("⚠️ [Token Extractor] No hash found in URL");
      return { token: null, telegramId: null };
    }

    const hashContent = hash.substring(1);
    const hashParts = hashContent.split("-");

    console.log(
      "🔍 [Token Extractor] Extracting all data from hash parts:",
      hashParts
    );

    let token: string | null = null;
    if (hashParts.length > 0 && hashParts[0]) {
      token = hashParts[0];
      try {
        token = decodeURIComponent(token);
      } catch (decodeError) {
        console.warn("⚠️ [Token Extractor] Could not decode token, using raw");
      }
      token = token.split("%")[0];

      const allowedPattern = /^[A-Za-z0-9\-_\.]+$/;
      if (!allowedPattern.test(token)) {
        token = token.match(/[A-Za-z0-9\-_\.]+/g)?.[0] || "";
      }

      if (token.length === 0) {
        token = null;
      }
    }

    let telegramId: number | null = null;
    if (hashParts.length >= 3 && hashParts[2]) {
      const telegramIdString = hashParts[2];
      const parsedId = parseInt(telegramIdString, 10);
      if (!isNaN(parsedId)) {
        telegramId = parsedId;
      }
    }

    console.log("✅ [Token Extractor] Extracted data:", {
      hasToken: !!token,
      tokenPreview: token ? token.substring(0, 20) + "..." : "none",
      telegramId: telegramId || "none",
      walletData: hashParts[1] ? hashParts[1].substring(0, 20) + "..." : "none",
    });

    return { token, telegramId };
  } catch (error) {
    console.error(
      "❌ [Token Extractor] Error extracting data from URL:",
      error
    );
    return { token: null, telegramId: null };
  }
};

export const clearTokenFromUrl = (): void => {
  try {
    if (window.location.hash) {
      const newUrl = window.location.href.split("#")[0];
      window.history.replaceState({}, document.title, newUrl);
      console.log("🧹 [Token Extractor] Cleared token from URL");
    }
  } catch (error) {
    console.error("❌ [Token Extractor] Error clearing token from URL:", error);
  }
};

export const hasTokenInUrl = (): boolean => {
  const token = extractTokenFromUrl();
  return token !== null && token.length > 0;
};
