/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PBX_Monitoring_SEPA_Infrastructure_Enum_CancellationStatus } from './PBX_Monitoring_SEPA_Infrastructure_Enum_CancellationStatus';
import type { PBX_Monitoring_SEPA_Infrastructure_Enum_PaymentStatus } from './PBX_Monitoring_SEPA_Infrastructure_Enum_PaymentStatus';

export type Payment_Contracts_PaymentStatusResponse = {
    statusDateTime?: string;
    CoreConnectStatus?: string | null;
    sepaStatus?: string | null;
    description?: string | null;
    status?: PBX_Monitoring_SEPA_Infrastructure_Enum_PaymentStatus;
    cancellationStatus?: PBX_Monitoring_SEPA_Infrastructure_Enum_CancellationStatus;
};

