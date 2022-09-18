/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PBX_Monitoring_SEPA_Infrastructure_Enum_BusinessArea } from '../models/PBX_Monitoring_SEPA_Infrastructure_Enum_BusinessArea';
import type { PBX_Monitoring_SEPA_Infrastructure_Enum_Direction } from '../models/PBX_Monitoring_SEPA_Infrastructure_Enum_Direction';
import type { Turnover_Contracts_GenerateResponse } from '../models/Turnover_Contracts_GenerateResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class TurnoversService {

    /**
     * Get turnovers under business area.
     * @param companyId Required query for search by active company id.
     * @param businessArea Required query for search by business area.
     * @param direction Query for search in direction.
     * @param transactionId Query for search in transaction id.
     * @param debtorCode Query for search in debtor IBAN.
     * @param creditorCode Query for search in creditor IBAN.
     * @param debtorAccount Query for search in debtor IBAN.
     * @param creditorAccount Query for search in creditor IBAN.
     * @param dateFrom Starting date (inclusive the date dateFrom) of the turnovers list.
     * @param dateTo End date (inclusive the data dateTo) of the turnovers list.
     * @param amountFrom Starting amount (inclusive the amount amountFrom) of the turnovers list.
     * @param amountTo End amount (inclusive the amount amountTo) of the turnovers list.
     * @param pageSize Number of turnovers to return.
     * @param page Number of page.
     * @returns Turnover_Contracts_GenerateResponse Success
     * @throws ApiError
     */
    public static getV1Turnovers(
        companyId: number,
        businessArea: PBX_Monitoring_SEPA_Infrastructure_Enum_BusinessArea,
        direction?: PBX_Monitoring_SEPA_Infrastructure_Enum_Direction,
        transactionId?: string,
        debtorCode?: string,
        creditorCode?: string,
        debtorAccount?: string,
        creditorAccount?: string,
        dateFrom?: string,
        dateTo?: string,
        amountFrom?: number,
        amountTo?: number,
        pageSize?: number,
        page?: number,
    ): CancelablePromise<Turnover_Contracts_GenerateResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/turnovers',
            query: {
                'companyId': companyId,
                'businessArea': businessArea,
                'direction': direction,
                'transactionId': transactionId,
                'debtorCode': debtorCode,
                'creditorCode': creditorCode,
                'debtorAccount': debtorAccount,
                'creditorAccount': creditorAccount,
                'dateFrom': dateFrom,
                'dateTo': dateTo,
                'amountFrom': amountFrom,
                'amountTo': amountTo,
                'pageSize': pageSize,
                'page': page,
            },
            errors: {
                500: `Unexpected error`,
            },
        });
    }

}
