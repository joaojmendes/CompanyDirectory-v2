import { tokens } from "@fluentui/react-components";
import { useCallback } from "react";
import { useIndexedDBCache } from "@spteck/m365-hooks";

interface IUserColorCache {
  [userId: string]: string;
}

/**
 * Interface for parsed AI response
 */
export interface IParsedAIResponse {
  filter: string;
  description: string;
}

export interface IUtils {
  generateColorForManagers: (aadUserId: string) => Promise<string>;
  clearUserColors: () => Promise<void>;
  calculatePageSizeFromHeight: (height: number, itemHeight: number) => number;
  parseAIResponse: (results: string) => IParsedAIResponse;
  sanitizeUserData: <T>(data: T) => T;
  blobToBase64: (blob: Blob) => Promise<string | undefined>;
}




export const useUtils = (): IUtils => {
  // Cache user colors for 7 days with simplified configuration
  const { getData, setData, clearAllCache } =
    useIndexedDBCache<IUserColorCache>(7 * 24 * 60 * 60 * 1000);



/**
 * Helper function to safely convert blob to base64 data URL
 */
 const blobToBase64 = (blob: Blob): Promise<string | undefined> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      try {
        const result = reader.result as string;
        if (result?.startsWith("data:")) {
          // Validate base64 format
          const base64Part = result.split(",")[1];
          if (base64Part) {
            atob(base64Part); // Test if valid base64
            resolve(result);
          } else {
            resolve(undefined);
          }
        } else {
          resolve(undefined);
        }
      } catch {
        resolve(undefined);
      }
    };
    reader.onerror = () => resolve(undefined);
    reader.readAsDataURL(blob);
  });
};


/**
 * Sanitizes user data to prevent base64 decode errors in external libraries
 */
 const sanitizeUserData = <T>(data: T): T => {
  if (!data || typeof data !== "object") {
    return data;
  }

  // If it's an array, sanitize each item
  if (Array.isArray(data)) {
    return data.map(sanitizeUserData) as T;
  }

  // Clone the object to avoid mutations
  const sanitized = { ...data } as Record<string, unknown>;

  // Remove or sanitize any photo-related fields that might contain invalid base64
  if (sanitized.photoUrl) {
    try {
      // Check if it's a data URL with base64
      if (
        typeof sanitized.photoUrl === "string" &&
        sanitized.photoUrl.startsWith("data:")
      ) {
        const base64Part = sanitized.photoUrl.split(",")[1];
        if (base64Part) {
          // Test if the base64 string is valid
          atob(base64Part);
          // If we get here, it's valid
        }
      }
    } catch {
      // If base64 is invalid, remove the photoUrl to prevent errors
      console.warn(
        "Removing invalid photoUrl from user data to prevent decode errors"
      );
      delete sanitized.photoUrl;
    }
  }

  // Recursively sanitize nested objects
  Object.keys(sanitized).forEach((key) => {
    if (sanitized[key] && typeof sanitized[key] === "object") {
      sanitized[key] = sanitizeUserData(sanitized[key]);
    }
  });

  return sanitized as T;
};


/**
 * Parses AI response to extract filter and description
 * Handles various formats including JSON wrapped in code blocks
 */
 const parseAIResponse = (results: string): IParsedAIResponse => {
  if (!results || typeof results !== "string" || !results.trim()) {
    return {
      filter: "",
      description: "",
    };
  }

  try {
    let cleanResponse = results.trim();

    // Remove language prefixes (json, javascript, js)
    const prefixes = ["json", "javascript", "js"];
    for (const prefix of prefixes) {
      if (cleanResponse.toLowerCase().startsWith(prefix)) {
        cleanResponse = cleanResponse.substring(prefix?.length).trim();
      }
    }

    // Remove code block markers
    cleanResponse = cleanResponse
      .replace(/^```[\w]*\n?/, "")
      .replace(/\n?```$/, "");

    // Extract JSON object if present
    const jsonMatch = cleanResponse.match(/\{[\s\S]*?\}/);
    if (jsonMatch) {
      cleanResponse = jsonMatch[0];
    }

    // Try to parse as JSON
    const parsed = JSON.parse(cleanResponse);
    return {
      filter: parsed.filter || cleanResponse,
      description: parsed.description || "your search criteria",
    };
  } catch {
    // If parsing fails, treat the entire response as a filter
    return {
      filter: results,
      description: "your search criteria",
    };
  }
};



  const managerColors = [
    tokens.colorPaletteBerryBackground3,
    tokens.colorPaletteBlueBackground2,
    tokens.colorPaletteGreenBackground3,
    tokens.colorPaletteDarkOrangeBackground3,
    tokens.colorPaletteRedBackground3,
    tokens.colorPalettePurpleBackground2,
    tokens.colorPaletteTealBackground2,
    tokens.colorPaletteMagentaBackground2,
    tokens.colorPaletteBeigeBorderActive,
    tokens.colorPaletteLilacBorderActive,
    tokens.colorPaletteDarkOrangeBorderActive,
    tokens.colorPaletteRedBorderActive,
    tokens.colorPalettePurpleBorderActive,
    tokens.colorPaletteTealBorderActive,
    tokens.colorPaletteMagentaBorderActive,
    tokens.colorPaletteBeigeBorderActive,
    tokens.colorPaletteLilacBorderActive,
    tokens.colorPaletteDarkOrangeBorderActive,
    tokens.colorPaletteRedBorderActive,
    tokens.colorPalettePurpleBorderActive,
    tokens.colorPaletteTealBorderActive,
  ];

  const generateColorForManagers = useCallback(
    async (aadUserId: string): Promise<string> => {
      // Return neutral color if no user ID
      if (!aadUserId) return tokens.colorNeutralBackground1;

      const cacheKey = "user-colors-map";

      try {
        // Get existing color mappings from cache
        let colorMappings = await getData(cacheKey);
        if (!colorMappings) {
          colorMappings = {};
        }

        // Check if user already has a color assigned
        if (colorMappings[aadUserId]) {
          console.log(`Using cached color for user: ${aadUserId}`);
          return colorMappings[aadUserId];
        }

        // Get list of already used colors
        const usedColors = Object.values(colorMappings);

        // Find an available color (not already used)
        let availableColor: string;
        const availableColors = managerColors.filter(
          (color) => !usedColors.includes(color)
        );

        if (availableColors.length > 0) {
          // Use first available color
          availableColor = availableColors[0];
        } else {
          // If all colors are used, cycle through the colors based on user count
          const userCount = Object.keys(colorMappings).length;
          availableColor = managerColors[userCount % managerColors.length];
        }

        // Assign color to user and save to cache
        colorMappings[aadUserId] = availableColor;
        await setData(cacheKey, colorMappings);

        console.log(
          `Assigned new color to user ${aadUserId}: ${availableColor}`
        );
        return availableColor;
      } catch (error) {
        console.error("Error managing user colors cache:", error);
        // Fallback to random color if cache fails
        const randomIndex = Math.floor(Math.random() * managerColors.length);
        return managerColors[randomIndex];
      }
    },
    [managerColors]
  );

  const clearUserColors = useCallback(async (): Promise<void> => {
    try {
      await clearAllCache();
      console.log("User colors cache cleared");
    } catch (error) {
      console.error("Error clearing user colors cache:", error);
    }
  }, [clearAllCache]);

  const calculatePageSizeFromHeight = useCallback(
    (height: number, itemHeight: number): number => {
      return Math.floor(height / itemHeight);
    },
    []
  );

  return {
    generateColorForManagers,
    clearUserColors,
    calculatePageSizeFromHeight,
    parseAIResponse,
    sanitizeUserData,
    blobToBase64
  };
};
