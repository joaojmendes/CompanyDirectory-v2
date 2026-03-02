import { ErrorType, useLogging } from "@spteck/m365-hooks";
import {
  IManager,
  IOrganizationNode,
  IUserProfile,
} from "../models/IUserData";

import { ECardActions } from "../constants/ECardActions";
import { useCallback } from "react";
import { useUtils } from "./useUtils";

export interface IUseCardActionsProps {
  person: IOrganizationNode | IManager | IUserProfile;
}

export interface IUseCardActionsResult {
  executeAction: (action: string) => void;
}

/**
 * Hook to handle card actions for person cards
 */
export const useCardActions = ({
  person,
}: IUseCardActionsProps): IUseCardActionsResult => {
  const { logInfo, logError } = useLogging();
  const { sanitizeUserData } = useUtils();
  /**
   * Start a Teams chat with the person
   */
  const startTeamsChat = useCallback(
    (person: IOrganizationNode | IManager | IUserProfile) => {
      try {
        const email = person.mail || person.userPrincipalName;
        if (!email) {
          throw new Error("No email address available for chat");
        }

        // Deep link to start Teams chat
        const teamsUrl = `https://teams.microsoft.com/l/chat/0/0?users=${encodeURIComponent(
          email
        )}`;
        window.open(teamsUrl, "_blank");

        logInfo(
          "useCardActions",
          "Teams chat initiated",
          sanitizeUserData({
            operation: "startTeamsChat",
            userId: person.id,
            displayName: person.displayName,
            hasEmail: Boolean(email),
          })
        );
      } catch (error) {
        logError(
          "useCardActions",
          "Failed to initiate Teams chat",
          error as Error,
          ErrorType.SYSTEM,
          sanitizeUserData({
            operation: "chatWithUser",
            userId: person.id,
            displayName: person.displayName,
            userPrincipalName: person.userPrincipalName,
            errorMessage: (error as Error)?.message,
          })
        );
      }
    },
    [logInfo, logError]
  );

  /**
   * Send an email to the person
   */
  const sendEmail = useCallback(
    (person: IOrganizationNode | IManager | IUserProfile) => {
      try {
        const email = person.mail || person.userPrincipalName;
        if (!email) {
          throw new Error("No email address available");
        }

        // Create mailto link
        const subject = encodeURIComponent(`Message for ${person.displayName}`);
        const mailtoUrl = `mailto:${email}?subject=${subject}`;
        window.location.href = mailtoUrl;

        logInfo(
          "useCardActions",
          "Email compose initiated",
          sanitizeUserData({
            operation: "sendEmail",
            userId: person.id,
            displayName: person.displayName,
            hasEmail: Boolean(email),
          })
        );
      } catch (error) {
        logError(
          "useCardActions",
          "Failed to send email",
          error as Error,
          ErrorType.SYSTEM,
          sanitizeUserData({
            operation: "sendEmail",
            userId: person.id,
            displayName: person.displayName,
            userPrincipalName: person.userPrincipalName,
            errorMessage: (error as Error)?.message,
          })
        );
      }
    },
    [logInfo, logError]
  );

  /**
   * Make a phone call to the person
   */
  const callPerson = useCallback(
    (person: IOrganizationNode | IManager | IUserProfile) => {
      let phoneNumber: string | undefined;

      try {
        // Check if person has mobilePhone property
        if ("mobilePhone" in person && person.mobilePhone) {
          phoneNumber = person.mobilePhone;
        }

        if (
          !phoneNumber &&
          "businessPhones" in person &&
          person.businessPhones &&
          person.businessPhones.length > 0
        ) {
          phoneNumber = person.businessPhones[0];
        }

        if (!phoneNumber) {
          throw new Error("No phone number available for this person");
        }

        // Use Teams calling or tel: protocol
        const cleanPhone = phoneNumber.replace(/[^0-9+]/g, "");
        const teamsCallUrl = `https://teams.microsoft.com/l/call/0/0?users=${encodeURIComponent(
          person.mail || person.userPrincipalName || ""
        )}`;

        // Try Teams first, fallback to tel: protocol
        try {
          window.open(teamsCallUrl, "_blank");
        } catch {
          window.location.href = `tel:${cleanPhone}`;
        }

        logInfo(
          "useCardActions",
          "Phone call initiated",
          sanitizeUserData({
            operation: "makeCall",
            userId: person.id,
            displayName: person.displayName,
            hasPhoneNumber: Boolean(phoneNumber),
            callMethod: "teams",
          })
        );
      } catch (error) {
        logError(
          "useCardActions",
          "Failed to initiate phone call",
          error as Error,
          ErrorType.SYSTEM,
          sanitizeUserData({
            operation: "callPerson",
            userId: person.id,
            displayName: person.displayName,
            hasPhone: Boolean(phoneNumber),
            errorMessage: (error as Error)?.message,
          })
        );
      }
    },
    [logInfo, logError]
  );

  /**
   * Start a video call with the person
   */
  const startVideoCall = useCallback(
    (person: IOrganizationNode | IManager | IUserProfile) => {
      try {
        const email = person.mail || person.userPrincipalName;
        if (!email) {
          throw new Error("No email address available for video call");
        }

        // Deep link to start Teams video call
        const teamsVideoUrl = `https://teams.microsoft.com/l/call/0/0?users=${encodeURIComponent(
          email
        )}&withVideo=true`;
        window.open(teamsVideoUrl, "_blank");

        logInfo(
          "useCardActions",
          "Video call initiated",
          sanitizeUserData({
            operation: "startVideoCall",
            userId: person.id,
            displayName: person.displayName,
            hasEmail: Boolean(email),
          })
        );
      } catch (error) {
        logError(
          "useCardActions",
          "Failed to start video call",
          error as Error,
          ErrorType.SYSTEM,
          sanitizeUserData({
            operation: "videoCall",
            userId: person.id,
            displayName: person.displayName,
            userPrincipalName: person.userPrincipalName,
            errorMessage: (error as Error)?.message,
          })
        );
      }
    },
    [logInfo, logError]
  );

  /**
   * Open LinkedIn profile (if available)
   */
  const openLinkedIn = useCallback(
    (person: IOrganizationNode | IManager | IUserProfile) => {
      try {
        // Try to construct LinkedIn search URL based on name and company
        const name = encodeURIComponent(person.displayName);
        let company = "";

        // Check if person has companyName property
        if ("companyName" in person && person.companyName) {
          company = encodeURIComponent(person.companyName);
        }

        let linkedInUrl = `https://www.linkedin.com/search/results/people/?keywords=${name}`;
        if (company) {
          linkedInUrl += `%20${company}`;
        }

        window.open(linkedInUrl, "_blank");

        logInfo(
          "useCardActions",
          "LinkedIn search initiated",
          sanitizeUserData({
            operation: "openLinkedIn",
            userId: person.id,
            displayName: person.displayName,
            hasCompany: Boolean(company),
          })
        );
      } catch (error) {
        logError(
          "useCardActions",
          "Failed to open LinkedIn",
          error as Error,
          ErrorType.SYSTEM,
          sanitizeUserData({
            operation: "openLinkedIn",
            userId: person.id,
            displayName: person.displayName,
            errorMessage: (error as Error)?.message,
          })
        );
      }
    },
    [logInfo, logError]
  );

  /**
   * Execute the specified action
   */
  const executeAction = useCallback(
    (action: string) => {
      if (!person) {
        logError(
          "useCardActions",
          "No person data available for action",
          new Error("Person data is required"),
          ErrorType.SYSTEM,
          sanitizeUserData({ operation: "executeAction", action })
        );
        return;
      }

      switch (action) {
        case ECardActions.Chat:
          startTeamsChat(person);
          break;
        case ECardActions.Mail:
          sendEmail(person);
          break;
        case ECardActions.Call:
          callPerson(person);
          break;
        case ECardActions.Video:
          startVideoCall(person);
          break;
        case ECardActions.LinkedIn:
          openLinkedIn(person);
          break;
        default:
          logError(
            "useCardActions",
            "Unknown action requested",
            new Error(`Unknown action: ${action}`),
            ErrorType.SYSTEM,
            sanitizeUserData({
              operation: "executeAction",
              action,
              userId: person.id,
              displayName: person.displayName,
            })
          );
          break;
      }
    },
    [
      person,
      startTeamsChat,
      sendEmail,
      callPerson,
      startVideoCall,
      openLinkedIn,
      logError,
    ]
  );

  return {
    executeAction,
  };
};
