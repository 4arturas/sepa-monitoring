/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PBX_Monitoring_SEPA_Infrastructure_Enum_Direction } from './PBX_Monitoring_SEPA_Infrastructure_Enum_Direction';
import type { PBX_Monitoring_SEPA_Infrastructure_Enum_PaymentStatus } from './PBX_Monitoring_SEPA_Infrastructure_Enum_PaymentStatus';

export type Payment_Contracts_ReportResponse = {
    dateTime?: string;
    paymentId?: string | null;
    transactionId?: string | null;
    probanxId?: string;
    direction?: PBX_Monitoring_SEPA_Infrastructure_Enum_Direction;
    sepaStatus?: string | null;
    coreConnectStatus?: string | null;
    amount?: number;
    status?: PBX_Monitoring_SEPA_Infrastructure_Enum_PaymentStatus;
    rejectReasonCode?: string | null;
    rejectReasonDescription?: string | null;
    returnedAmount?: number | null;
    debtorAccount?: string | null;
    creditorAccount?: string | null;
};

