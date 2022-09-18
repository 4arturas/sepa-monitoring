/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PBX_Monitoring_SEPA_Infrastructure_Enum_Direction } from './PBX_Monitoring_SEPA_Infrastructure_Enum_Direction';

export type Turnover_Contracts_ReportResponse = {
    settlementDate?: string;
    direction?: PBX_Monitoring_SEPA_Infrastructure_Enum_Direction;
    amount?: number;
    transactionId?: string | null;
    debtorCode?: string | null;
    creditorCode?: string | null;
    transactionDateTime?: string | null;
    debtorAccount?: string | null;
    creditorAccount?: string | null;
};

