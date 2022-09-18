/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PBX_Monitoring_SEPA_Infrastructure_Enum_BusinessArea } from './PBX_Monitoring_SEPA_Infrastructure_Enum_BusinessArea';

export type Company_Contracts_ConnectionCreateRequest = {
    businessArea?: PBX_Monitoring_SEPA_Infrastructure_Enum_BusinessArea;
    host?: string | null;
    database?: string | null;
    username?: string | null;
    password?: string | null;
};

