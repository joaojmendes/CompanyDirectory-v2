"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useUtils = void 0;
var tslib_1 = require("tslib");
var react_components_1 = require("@fluentui/react-components");
var react_1 = require("react");
var m365_hooks_1 = require("@spteck/m365-hooks");
var useUtils = function () {
    // Cache user colors for 7 days with simplified configuration
    var _a = (0, m365_hooks_1.useIndexedDBCache)(7 * 24 * 60 * 60 * 1000), getData = _a.getData, setData = _a.setData, clearAllCache = _a.clearAllCache;
    /**
     * Helper function to safely convert blob to base64 data URL
     */
    var blobToBase64 = function (blob) {
        return new Promise(function (resolve) {
            var reader = new FileReader();
            reader.onloadend = function () {
                try {
                    var result = reader.result;
                    if (result === null || result === void 0 ? void 0 : result.startsWith("data:")) {
                        // Validate base64 format
                        var base64Part = result.split(",")[1];
                        if (base64Part) {
                            atob(base64Part); // Test if valid base64
                            resolve(result);
                        }
                        else {
                            resolve(undefined);
                        }
                    }
                    else {
                        resolve(undefined);
                    }
                }
                catch (_a) {
                    resolve(undefined);
                }
            };
            reader.onerror = function () { return resolve(undefined); };
            reader.readAsDataURL(blob);
        });
    };
    /**
     * Sanitizes user data to prevent base64 decode errors in external libraries
     */
    var sanitizeUserData = function (data) {
        if (!data || typeof data !== "object") {
            return data;
        }
        // If it's an array, sanitize each item
        if (Array.isArray(data)) {
            return data.map(sanitizeUserData);
        }
        // Clone the object to avoid mutations
        var sanitized = tslib_1.__assign({}, data);
        // Remove or sanitize any photo-related fields that might contain invalid base64
        if (sanitized.photoUrl) {
            try {
                // Check if it's a data URL with base64
                if (typeof sanitized.photoUrl === "string" &&
                    sanitized.photoUrl.startsWith("data:")) {
                    var base64Part = sanitized.photoUrl.split(",")[1];
                    if (base64Part) {
                        // Test if the base64 string is valid
                        atob(base64Part);
                        // If we get here, it's valid
                    }
                }
            }
            catch (_a) {
                // If base64 is invalid, remove the photoUrl to prevent errors
                console.warn("Removing invalid photoUrl from user data to prevent decode errors");
                delete sanitized.photoUrl;
            }
        }
        // Recursively sanitize nested objects
        Object.keys(sanitized).forEach(function (key) {
            if (sanitized[key] && typeof sanitized[key] === "object") {
                sanitized[key] = sanitizeUserData(sanitized[key]);
            }
        });
        return sanitized;
    };
    /**
     * Parses AI response to extract filter and description
     * Handles various formats including JSON wrapped in code blocks
     */
    var parseAIResponse = function (results) {
        if (!results || typeof results !== "string" || !results.trim()) {
            return {
                filter: "",
                description: "",
            };
        }
        try {
            var cleanResponse = results.trim();
            // Remove language prefixes (json, javascript, js)
            var prefixes = ["json", "javascript", "js"];
            for (var _i = 0, prefixes_1 = prefixes; _i < prefixes_1.length; _i++) {
                var prefix = prefixes_1[_i];
                if (cleanResponse.toLowerCase().startsWith(prefix)) {
                    cleanResponse = cleanResponse.substring(prefix === null || prefix === void 0 ? void 0 : prefix.length).trim();
                }
            }
            // Remove code block markers
            cleanResponse = cleanResponse
                .replace(/^```[\w]*\n?/, "")
                .replace(/\n?```$/, "");
            // Extract JSON object if present
            var jsonMatch = cleanResponse.match(/\{[\s\S]*?\}/);
            if (jsonMatch) {
                cleanResponse = jsonMatch[0];
            }
            // Try to parse as JSON
            var parsed = JSON.parse(cleanResponse);
            return {
                filter: parsed.filter || cleanResponse,
                description: parsed.description || "your search criteria",
            };
        }
        catch (_a) {
            // If parsing fails, treat the entire response as a filter
            return {
                filter: results,
                description: "your search criteria",
            };
        }
    };
    var managerColors = [
        react_components_1.tokens.colorPaletteBerryBackground3,
        react_components_1.tokens.colorPaletteBlueBackground2,
        react_components_1.tokens.colorPaletteGreenBackground3,
        react_components_1.tokens.colorPaletteDarkOrangeBackground3,
        react_components_1.tokens.colorPaletteRedBackground3,
        react_components_1.tokens.colorPalettePurpleBackground2,
        react_components_1.tokens.colorPaletteTealBackground2,
        react_components_1.tokens.colorPaletteMagentaBackground2,
        react_components_1.tokens.colorPaletteBeigeBorderActive,
        react_components_1.tokens.colorPaletteLilacBorderActive,
        react_components_1.tokens.colorPaletteDarkOrangeBorderActive,
        react_components_1.tokens.colorPaletteRedBorderActive,
        react_components_1.tokens.colorPalettePurpleBorderActive,
        react_components_1.tokens.colorPaletteTealBorderActive,
        react_components_1.tokens.colorPaletteMagentaBorderActive,
        react_components_1.tokens.colorPaletteBeigeBorderActive,
        react_components_1.tokens.colorPaletteLilacBorderActive,
        react_components_1.tokens.colorPaletteDarkOrangeBorderActive,
        react_components_1.tokens.colorPaletteRedBorderActive,
        react_components_1.tokens.colorPalettePurpleBorderActive,
        react_components_1.tokens.colorPaletteTealBorderActive,
    ];
    var generateColorForManagers = (0, react_1.useCallback)(function (aadUserId) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var cacheKey, colorMappings, usedColors_1, availableColor, availableColors, userCount, error_1, randomIndex;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // Return neutral color if no user ID
                    if (!aadUserId)
                        return [2 /*return*/, react_components_1.tokens.colorNeutralBackground1];
                    cacheKey = "user-colors-map";
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, getData(cacheKey)];
                case 2:
                    colorMappings = _a.sent();
                    if (!colorMappings) {
                        colorMappings = {};
                    }
                    // Check if user already has a color assigned
                    if (colorMappings[aadUserId]) {
                        return [2 /*return*/, colorMappings[aadUserId]];
                    }
                    usedColors_1 = Object.values(colorMappings);
                    availableColor = void 0;
                    availableColors = managerColors.filter(function (color) { return !usedColors_1.includes(color); });
                    if (availableColors.length > 0) {
                        // Use first available color
                        availableColor = availableColors[0];
                    }
                    else {
                        userCount = Object.keys(colorMappings).length;
                        availableColor = managerColors[userCount % managerColors.length];
                    }
                    // Assign color to user and save to cache
                    colorMappings[aadUserId] = availableColor;
                    return [4 /*yield*/, setData(cacheKey, colorMappings)];
                case 3:
                    _a.sent();
                    return [2 /*return*/, availableColor];
                case 4:
                    error_1 = _a.sent();
                    console.error("Error managing user colors cache:", error_1);
                    randomIndex = Math.floor(Math.random() * managerColors.length);
                    return [2 /*return*/, managerColors[randomIndex]];
                case 5: return [2 /*return*/];
            }
        });
    }); }, [managerColors]);
    var clearUserColors = (0, react_1.useCallback)(function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var error_2;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, clearAllCache()];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    console.error("Error clearing user colors cache:", error_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); }, [clearAllCache]);
    var calculatePageSizeFromHeight = (0, react_1.useCallback)(function (height, itemHeight) {
        return Math.floor(height / itemHeight);
    }, []);
    return {
        generateColorForManagers: generateColorForManagers,
        clearUserColors: clearUserColors,
        calculatePageSizeFromHeight: calculatePageSizeFromHeight,
        parseAIResponse: parseAIResponse,
        sanitizeUserData: sanitizeUserData,
        blobToBase64: blobToBase64
    };
};
exports.useUtils = useUtils;
//# sourceMappingURL=useUtils.js.map