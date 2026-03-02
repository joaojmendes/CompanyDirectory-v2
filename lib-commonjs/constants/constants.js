"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SORTABLE_USER_PROPERTIES = exports.PAGE_SIZE = exports.AZURE_API_ENDPOINT = void 0;
exports.AZURE_API_ENDPOINT = "https://aiagent.spteckapps.com/api/aiassistant";
exports.PAGE_SIZE = 100;
// Microsoft Graph API supported sortable properties for User objects
// Based on: https://docs.microsoft.com/en-us/graph/query-parameters#orderby-parameter
// Note: Properties marked as "Advanced" require ConsistencyLevel: eventual header and $count=true
exports.SORTABLE_USER_PROPERTIES = [
    'displayName',
    'mail',
    'userPrincipalName',
    'givenName',
    'surname',
    'userType',
    'department' // Requires advanced query parameters
];
//# sourceMappingURL=constants.js.map