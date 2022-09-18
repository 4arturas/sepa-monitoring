/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Payment_Contracts_GenerateResponse } from '../models/Payment_Contracts_GenerateResponse';
import type { Payment_Contracts_StatusResponse } from '../models/Payment_Contracts_StatusResponse';
import type { PBX_Monitoring_SEPA_Infrastructure_Enum_BusinessArea } from '../models/PBX_Monitoring_SEPA_Infrastructure_Enum_BusinessArea';
import type { PBX_Monitoring_SEPA_Infrastructure_Enum_CoreConnectStatus } from '../models/PBX_Monitoring_SEPA_Infrastructure_Enum_CoreConnectStatus';
import type { PBX_Monitoring_SEPA_Infrastructure_Enum_Direction } from '../models/PBX_Monitoring_SEPA_Infrastructure_Enum_Direction';
import type { PBX_Monitoring_SEPA_Infrastructure_Enum_OrderBy } from '../models/PBX_Monitoring_SEPA_Infrastructure_Enum_OrderBy';
import type { PBX_Monitoring_SEPA_Infrastructure_Enum_PaymentStatus } from '../models/PBX_Monitoring_SEPA_Infrastructure_Enum_PaymentStatus';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PaymentsService {

    /**
     * Get payments under business area.
     * @param companyId Required query for search by active company id.
     * @param businessArea Required query for search by business area.
     * @param direction Query for search in direction.
     * @param coreConnectStatuses Query for search in coreconnect status.
     * @param sepaStatuses Query for search in sepa status.
     * @param paymentId Query for search in payment id.
     * @param transactionId Query for search in transaction id.
     * @param probanxId Query for search in probanx id.
     * @param statuses Query for search in status.
     * @param rejectReasons Query for search in reject reason.
     * @param debtorAccount Query for search in debtor IBAN.
     * @param creditorAccount Query for search in creditor IBAN.
     * @param dateFrom Starting date (inclusive the date dateFrom) of the payments list.
     * @param dateTo End date (inclusive the data dateTo) of the payments list.
     * @param amountFrom Starting amount (inclusive the amount amountFrom) of the payments list.
     * @param amountTo End amount (inclusive the amount amountTo) of the payments list.
     * @param pageSize Number of payments to return.
     * @param page Number of page.
     * @param orderBy Query for ordering search data.
     * @returns Payment_Contracts_GenerateResponse Success
     * @throws ApiError
     */
    public static getV1Payments(
        companyId: number,
        businessArea: PBX_Monitoring_SEPA_Infrastructure_Enum_BusinessArea,
        direction?: PBX_Monitoring_SEPA_Infrastructure_Enum_Direction,
        coreConnectStatuses?: Array<PBX_Monitoring_SEPA_Infrastructure_Enum_CoreConnectStatus>,
        sepaStatuses?: Array<string>,
        paymentId?: string,
        transactionId?: string,
        probanxId?: string,
        statuses?: Array<PBX_Monitoring_SEPA_Infrastructure_Enum_PaymentStatus>,
        rejectReasons?: Array<string>,
        debtorAccount?: string,
        creditorAccount?: string,
        dateFrom?: string,
        dateTo?: string,
        amountFrom?: number,
        amountTo?: number,
        pageSize?: number,
        page?: number,
        orderBy?: Array<PBX_Monitoring_SEPA_Infrastructure_Enum_OrderBy>,
    ): CancelablePromise<Payment_Contracts_GenerateResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/payments',
            query: {
                'companyId': companyId,
                'businessArea': businessArea,
                'direction': direction,
                'coreConnectStatuses': coreConnectStatuses,
                'sepaStatuses': sepaStatuses,
                'paymentId': paymentId,
                'transactionId': transactionId,
                'probanxId': probanxId,
                'statuses': statuses,
                'rejectReasons': rejectReasons,
                'debtorAccount': debtorAccount,
                'creditorAccount': creditorAccount,
                'dateFrom': dateFrom,
                'dateTo': dateTo,
                'amountFrom': amountFrom,
                'amountTo': amountTo,
                'pageSize': pageSize,
                'page': page,
                'orderBy': orderBy,
            },
            errors: {
                500: `Unexpected error`,
            },
        });
    }

    /**
     * Get payment's statuses.
     * @param id
     * @param companyId Required query for search by active company id.
     * @param businessArea Required query for search by business area.
     * @returns Payment_Contracts_StatusResponse Success
     * @throws ApiError
     */
    public static getV1PaymentsStatuses(
        id: string,
        companyId: number,
        businessArea: PBX_Monitoring_SEPA_Infrastructure_Enum_BusinessArea,
    ): CancelablePromise<Payment_Contracts_StatusResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/payments/{id}/statuses',
            path: {
                'id': id,
            },
            query: {
                'companyId': companyId,
                'businessArea': businessArea,
            },
            errors: {
                500: `Unexpected error`,
            },
        });
    }

}
