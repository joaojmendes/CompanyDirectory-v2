"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCardActions = void 0;
var m365_hooks_1 = require("@spteck/m365-hooks");
var ECardActions_1 = require("../constants/ECardActions");
var react_1 = require("react");
var useUtils_1 = require("./useUtils");
/**
 * Hook to handle card actions for person cards
 */
var useCardActions = function (_a) {
    var person = _a.person;
    var _b = (0, m365_hooks_1.useLogging)(), logInfo = _b.logInfo, logError = _b.logError;
    var sanitizeUserData = (0, useUtils_1.useUtils)().sanitizeUserData;
    /**
     * Start a Teams chat with the person
     */
    var startTeamsChat = (0, react_1.useCallback)(function (person) {
        try {
            var email = person.mail || person.userPrincipalName;
            if (!email) {
                throw new Error("No email address available for chat");
            }
            // Deep link to start Teams chat
            var teamsUrl = "https://teams.microsoft.com/l/chat/0/0?users=".concat(encodeURIComponent(email));
            window.open(teamsUrl, "_blank");
            logInfo("useCardActions", "Teams chat initiated", sanitizeUserData({
                operation: "startTeamsChat",
                userId: person.id,
                displayName: person.displayName,
                hasEmail: Boolean(email),
            }));
        }
        catch (error) {
            logError("useCardActions", "Failed to initiate Teams chat", error, m365_hooks_1.ErrorType.SYSTEM, sanitizeUserData({
                operation: "chatWithUser",
                userId: person.id,
                displayName: person.displayName,
                userPrincipalName: person.userPrincipalName,
                errorMessage: error === null || error === void 0 ? void 0 : error.message,
            }));
        }
    }, [logInfo, logError]);
    /**
     * Send an email to the person
     */
    var sendEmail = (0, react_1.useCallback)(function (person) {
        try {
            var email = person.mail || person.userPrincipalName;
            if (!email) {
                throw new Error("No email address available");
            }
            // Create mailto link
            var subject = encodeURIComponent("Message for ".concat(person.displayName));
            var mailtoUrl = "mailto:".concat(email, "?subject=").concat(subject);
            window.location.href = mailtoUrl;
            logInfo("useCardActions", "Email compose initiated", sanitizeUserData({
                operation: "sendEmail",
                userId: person.id,
                displayName: person.displayName,
                hasEmail: Boolean(email),
            }));
        }
        catch (error) {
            logError("useCardActions", "Failed to send email", error, m365_hooks_1.ErrorType.SYSTEM, sanitizeUserData({
                operation: "sendEmail",
                userId: person.id,
                displayName: person.displayName,
                userPrincipalName: person.userPrincipalName,
                errorMessage: error === null || error === void 0 ? void 0 : error.message,
            }));
        }
    }, [logInfo, logError]);
    /**
     * Make a phone call to the person
     */
    var callPerson = (0, react_1.useCallback)(function (person) {
        var phoneNumber;
        try {
            // Check if person has mobilePhone property
            if ("mobilePhone" in person && person.mobilePhone) {
                phoneNumber = person.mobilePhone;
            }
            if (!phoneNumber &&
                "businessPhones" in person &&
                person.businessPhones &&
                person.businessPhones.length > 0) {
                phoneNumber = person.businessPhones[0];
            }
            if (!phoneNumber) {
                throw new Error("No phone number available for this person");
            }
            // Use Teams calling or tel: protocol
            var cleanPhone = phoneNumber.replace(/[^0-9+]/g, "");
            var teamsCallUrl = "https://teams.microsoft.com/l/call/0/0?users=".concat(encodeURIComponent(person.mail || person.userPrincipalName || ""));
            // Try Teams first, fallback to tel: protocol
            try {
                window.open(teamsCallUrl, "_blank");
            }
            catch (_a) {
                window.location.href = "tel:".concat(cleanPhone);
            }
            logInfo("useCardActions", "Phone call initiated", sanitizeUserData({
                operation: "makeCall",
                userId: person.id,
                displayName: person.displayName,
                hasPhoneNumber: Boolean(phoneNumber),
                callMethod: "teams",
            }));
        }
        catch (error) {
            logError("useCardActions", "Failed to initiate phone call", error, m365_hooks_1.ErrorType.SYSTEM, sanitizeUserData({
                operation: "callPerson",
                userId: person.id,
                displayName: person.displayName,
                hasPhone: Boolean(phoneNumber),
                errorMessage: error === null || error === void 0 ? void 0 : error.message,
            }));
        }
    }, [logInfo, logError]);
    /**
     * Start a video call with the person
     */
    var startVideoCall = (0, react_1.useCallback)(function (person) {
        try {
            var email = person.mail || person.userPrincipalName;
            if (!email) {
                throw new Error("No email address available for video call");
            }
            // Deep link to start Teams video call
            var teamsVideoUrl = "https://teams.microsoft.com/l/call/0/0?users=".concat(encodeURIComponent(email), "&withVideo=true");
            window.open(teamsVideoUrl, "_blank");
            logInfo("useCardActions", "Video call initiated", sanitizeUserData({
                operation: "startVideoCall",
                userId: person.id,
                displayName: person.displayName,
                hasEmail: Boolean(email),
            }));
        }
        catch (error) {
            logError("useCardActions", "Failed to start video call", error, m365_hooks_1.ErrorType.SYSTEM, sanitizeUserData({
                operation: "videoCall",
                userId: person.id,
                displayName: person.displayName,
                userPrincipalName: person.userPrincipalName,
                errorMessage: error === null || error === void 0 ? void 0 : error.message,
            }));
        }
    }, [logInfo, logError]);
    /**
     * Open LinkedIn profile (if available)
     */
    var openLinkedIn = (0, react_1.useCallback)(function (person) {
        try {
            // Try to construct LinkedIn search URL based on name and company
            var name_1 = encodeURIComponent(person.displayName);
            var company = "";
            // Check if person has companyName property
            if ("companyName" in person && person.companyName) {
                company = encodeURIComponent(person.companyName);
            }
            var linkedInUrl = "https://www.linkedin.com/search/results/people/?keywords=".concat(name_1);
            if (company) {
                linkedInUrl += "%20".concat(company);
            }
            window.open(linkedInUrl, "_blank");
            logInfo("useCardActions", "LinkedIn search initiated", sanitizeUserData({
                operation: "openLinkedIn",
                userId: person.id,
                displayName: person.displayName,
                hasCompany: Boolean(company),
            }));
        }
        catch (error) {
            logError("useCardActions", "Failed to open LinkedIn", error, m365_hooks_1.ErrorType.SYSTEM, sanitizeUserData({
                operation: "openLinkedIn",
                userId: person.id,
                displayName: person.displayName,
                errorMessage: error === null || error === void 0 ? void 0 : error.message,
            }));
        }
    }, [logInfo, logError]);
    /**
     * Execute the specified action
     */
    var executeAction = (0, react_1.useCallback)(function (action) {
        if (!person) {
            logError("useCardActions", "No person data available for action", new Error("Person data is required"), m365_hooks_1.ErrorType.SYSTEM, sanitizeUserData({ operation: "executeAction", action: action }));
            return;
        }
        switch (action) {
            case ECardActions_1.ECardActions.Chat:
                startTeamsChat(person);
                break;
            case ECardActions_1.ECardActions.Mail:
                sendEmail(person);
                break;
            case ECardActions_1.ECardActions.Call:
                callPerson(person);
                break;
            case ECardActions_1.ECardActions.Video:
                startVideoCall(person);
                break;
            case ECardActions_1.ECardActions.LinkedIn:
                openLinkedIn(person);
                break;
            default:
                logError("useCardActions", "Unknown action requested", new Error("Unknown action: ".concat(action)), m365_hooks_1.ErrorType.SYSTEM, sanitizeUserData({
                    operation: "executeAction",
                    action: action,
                    userId: person.id,
                    displayName: person.displayName,
                }));
                break;
        }
    }, [
        person,
        startTeamsChat,
        sendEmail,
        callPerson,
        startVideoCall,
        openLinkedIn,
        logError,
    ]);
    return {
        executeAction: executeAction,
    };
};
exports.useCardActions = useCardActions;
//# sourceMappingURL=useCardActions.js.map