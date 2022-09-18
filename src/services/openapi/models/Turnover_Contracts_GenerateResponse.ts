/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PBX_Monitoring_SEPA_Infrastructure_Contracts_Abstractions_MonitoringPaging } from './PBX_Monitoring_SEPA_Infrastructure_Contracts_Abstractions_MonitoringPaging';
import type { Turnover_Contracts_ReportResponse } from './Turnover_Contracts_ReportResponse';

export type Turnover_Contracts_GenerateResponse = {
    items?: Array<Turnover_Contracts_ReportResponse> | null;
    paging?: PBX_Monitoring_SEPA_Infrastructure_Contracts_Abstractions_MonitoringPaging;
};

