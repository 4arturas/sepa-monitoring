/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Company_Contracts_ActivationResponse } from '../models/Company_Contracts_ActivationResponse';
import type { Company_Contracts_CompaniesResponse } from '../models/Company_Contracts_CompaniesResponse';
import type { Company_Contracts_CompanyResponse } from '../models/Company_Contracts_CompanyResponse';
import type { Company_Contracts_CreateRequest } from '../models/Company_Contracts_CreateRequest';
import type { Company_Contracts_CreateResponse } from '../models/Company_Contracts_CreateResponse';
import type { Company_Contracts_UpdateRequest } from '../models/Company_Contracts_UpdateRequest';
import type { Company_Contracts_UpdateResponse } from '../models/Company_Contracts_UpdateResponse';
import type { Microsoft_AspNetCore_Mvc_OkResult } from '../models/Microsoft_AspNetCore_Mvc_OkResult';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class CompaniesService {

    /**
     * Get companies list.
     * @returns Company_Contracts_CompaniesResponse Success
     * @throws ApiError
     */
    public static getV1Companies(): CancelablePromise<Company_Contracts_CompaniesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/companies',
            errors: {
                500: `Unexpected error`,
            },
        });
    }

    /**
     * Save company and its connections to database.
     * No more than three connections are allowed for each company.
     * @param requestBody
     * @returns Company_Contracts_CreateResponse Success
     * @throws ApiError
     */
    public static postV1Companies(
        requestBody?: Company_Contracts_CreateRequest,
    ): CancelablePromise<Company_Contracts_CreateResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/companies',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                500: `Unexpected error`,
            },
        });
    }

    /**
     * Get company details.
     * @param id
     * @returns Company_Contracts_CompanyResponse Success
     * @throws ApiError
     */
    public static getV1Companies1(
        id: number,
    ): CancelablePromise<Company_Contracts_CompanyResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/companies/{id}',
            path: {
                'id': id,
            },
            errors: {
                500: `Unexpected error`,
            },
        });
    }

    /**
     * Update company details or its connections. Also add new company's connection.
     * No more than three connections are allowed for each company.
     * @param id
     * @param requestBody
     * @returns Company_Contracts_UpdateResponse Success
     * @throws ApiError
     */
    public static putV1Companies(
        id: number,
        requestBody?: Company_Contracts_UpdateRequest,
    ): CancelablePromise<Company_Contracts_UpdateResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/v1/companies/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                500: `Unexpected error`,
            },
        });
    }

    /**
     * Delete company.
     * @param id
     * @returns Microsoft_AspNetCore_Mvc_OkResult Success
     * @throws ApiError
     */
    public static deleteV1Companies(
        id: number,
    ): CancelablePromise<Microsoft_AspNetCore_Mvc_OkResult> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/companies/{id}',
            path: {
                'id': id,
            },
            errors: {
                500: `Unexpected error`,
            },
        });
    }

    /**
     * Activate or deactivate company.
     * @param id
     * @returns Company_Contracts_ActivationResponse Success
     * @throws ApiError
     */
    public static patchV1CompaniesActivation(
        id: number,
    ): CancelablePromise<Company_Contracts_ActivationResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/companies/{id}/activation',
            path: {
                'id': id,
            },
            errors: {
                500: `Unexpected error`,
            },
        });
    }

}
