/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Payment_Contracts_ReportResponse } from './Payment_Contracts_ReportResponse';
import type { PBX_Monitoring_SEPA_Infrastructure_Contracts_Abstractions_MonitoringPaging } from './PBX_Monitoring_SEPA_Infrastructure_Contracts_Abstractions_MonitoringPaging';

export type Payment_Contracts_GenerateResponse = {
    items?: Array<Payment_Contracts_ReportResponse> | null;
    paging?: PBX_Monitoring_SEPA_Infrastructure_Contracts_Abstractions_MonitoringPaging;
};

