/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Balance_Contracts_GenerateResponse } from '../models/Balance_Contracts_GenerateResponse';
import type { PBX_Monitoring_SEPA_Infrastructure_Enum_BusinessArea } from '../models/PBX_Monitoring_SEPA_Infrastructure_Enum_BusinessArea';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class BalancesService {

    /**
     * Get balances under business area.
     * @param companyId Required query for search by active company id.
     * @param businessArea Required query for search by business area.
     * @param dateFrom Starting date (inclusive the date dateFrom) of the balances list.
     * @param dateTo End date (inclusive the data dateTo) of the balances list.
     * @param account Query for search in IBAN.
     * @param pageSize Number of balances to return.
     * @param page Number of page.
     * @returns Balance_Contracts_GenerateResponse Success
     * @throws ApiError
     */
    public static getV1Balances(
        companyId: number,
        businessArea: PBX_Monitoring_SEPA_Infrastructure_Enum_BusinessArea,
        dateFrom?: string,
        dateTo?: string,
        account?: string,
        pageSize?: number,
        page?: number,
    ): CancelablePromise<Balance_Contracts_GenerateResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/balances',
            query: {
                'companyId': companyId,
                'businessArea': businessArea,
                'dateFrom': dateFrom,
                'dateTo': dateTo,
                'account': account,
                'pageSize': pageSize,
                'page': page,
            },
            errors: {
                500: `Unexpected error`,
            },
        });
    }

}
