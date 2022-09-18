/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Balance_Contracts_ReportResponse } from './Balance_Contracts_ReportResponse';
import type { PBX_Monitoring_SEPA_Infrastructure_Contracts_Abstractions_MonitoringPaging } from './PBX_Monitoring_SEPA_Infrastructure_Contracts_Abstractions_MonitoringPaging';

export type Balance_Contracts_GenerateResponse = {
    items?: Array<Balance_Contracts_ReportResponse> | null;
    paging?: PBX_Monitoring_SEPA_Infrastructure_Contracts_Abstractions_MonitoringPaging;
};

