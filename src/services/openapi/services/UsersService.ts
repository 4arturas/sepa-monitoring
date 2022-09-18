/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Microsoft_AspNetCore_Mvc_OkResult } from '../models/Microsoft_AspNetCore_Mvc_OkResult';
import type { User_Contracts_ActivationResponse } from '../models/User_Contracts_ActivationResponse';
import type { User_Contracts_CompaniesRequest } from '../models/User_Contracts_CompaniesRequest';
import type { User_Contracts_CompaniesResponse } from '../models/User_Contracts_CompaniesResponse';
import type { User_Contracts_CompanyResponse } from '../models/User_Contracts_CompanyResponse';
import type { User_Contracts_CreateRequest } from '../models/User_Contracts_CreateRequest';
import type { User_Contracts_CreateResponse } from '../models/User_Contracts_CreateResponse';
import type { User_Contracts_UpdateRequest } from '../models/User_Contracts_UpdateRequest';
import type { User_Contracts_UpdateResponse } from '../models/User_Contracts_UpdateResponse';
import type { User_Contracts_UserResponse } from '../models/User_Contracts_UserResponse';
import type { User_Contracts_UsersResponse } from '../models/User_Contracts_UsersResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UsersService {

    /**
     * Get users list.
     * @returns User_Contracts_UsersResponse Success
     * @throws ApiError
     */
    public static getV1Users(): CancelablePromise<User_Contracts_UsersResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/users',
            errors: {
                500: `Unexpected error`,
            },
        });
    }

    /**
     * Save user to database.
     * @param requestBody
     * @returns User_Contracts_CreateResponse Success
     * @throws ApiError
     */
    public static postV1Users(
        requestBody?: User_Contracts_CreateRequest,
    ): CancelablePromise<User_Contracts_CreateResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/users',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                500: `Unexpected error`,
            },
        });
    }

    /**
     * Get user details.
     * @param id
     * @returns User_Contracts_UserResponse Success
     * @throws ApiError
     */
    public static getV1Users1(
        id: number,
    ): CancelablePromise<User_Contracts_UserResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/users/{id}',
            path: {
                'id': id,
            },
            errors: {
                500: `Unexpected error`,
            },
        });
    }

    /**
     * Update user details.
     * @param id
     * @param requestBody
     * @returns User_Contracts_UpdateResponse Success
     * @throws ApiError
     */
    public static putV1Users(
        id: number,
        requestBody?: User_Contracts_UpdateRequest,
    ): CancelablePromise<User_Contracts_UpdateResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/v1/users/{id}',
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
     * Delete user.
     * @param id
     * @returns Microsoft_AspNetCore_Mvc_OkResult Success
     * @throws ApiError
     */
    public static deleteV1Users(
        id: number,
    ): CancelablePromise<Microsoft_AspNetCore_Mvc_OkResult> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/users/{id}',
            path: {
                'id': id,
            },
            errors: {
                500: `Unexpected error`,
            },
        });
    }

    /**
     * Activate or deactivate user.
     * @param id
     * @returns User_Contracts_ActivationResponse Success
     * @throws ApiError
     */
    public static patchV1UsersActivation(
        id: number,
    ): CancelablePromise<User_Contracts_ActivationResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/users/{id}/activation',
            path: {
                'id': id,
            },
            errors: {
                500: `Unexpected error`,
            },
        });
    }

    /**
     * Reset user authentication.
     * @param id
     * @returns Microsoft_AspNetCore_Mvc_OkResult Success
     * @throws ApiError
     */
    public static deleteV1UsersAuthentication(
        id: number,
    ): CancelablePromise<Microsoft_AspNetCore_Mvc_OkResult> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/users/{id}/authentication',
            path: {
                'id': id,
            },
            errors: {
                500: `Unexpected error`,
            },
        });
    }

    /**
     * Get assigned to user active companies list.
     * @param id
     * @returns User_Contracts_CompaniesResponse Success
     * @throws ApiError
     */
    public static getV1UsersCompanies(
        id: number,
    ): CancelablePromise<User_Contracts_CompaniesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/users/{id}/companies',
            path: {
                'id': id,
            },
            errors: {
                500: `Unexpected error`,
            },
        });
    }

    /**
     * Assign to user company/companies.
     * @param id
     * @param requestBody
     * @returns Microsoft_AspNetCore_Mvc_OkResult Success
     * @throws ApiError
     */
    public static postV1UsersCompanies(
        id: number,
        requestBody?: User_Contracts_CompaniesRequest,
    ): CancelablePromise<Microsoft_AspNetCore_Mvc_OkResult> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/users/{id}/companies',
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
     * Delete assigned company/companies to user.
     * @param id
     * @param requestBody
     * @returns Microsoft_AspNetCore_Mvc_OkResult Success
     * @throws ApiError
     */
    public static deleteV1UsersCompanies(
        id: number,
        requestBody?: User_Contracts_CompaniesRequest,
    ): CancelablePromise<Microsoft_AspNetCore_Mvc_OkResult> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/users/{id}/companies',
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
     * Get assigned to user company details.
     * @param uid
     * @param cid
     * @returns User_Contracts_CompanyResponse Success
     * @throws ApiError
     */
    public static getV1UsersCompanies1(
        uid: number,
        cid: number,
    ): CancelablePromise<User_Contracts_CompanyResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/users/{uid}/companies/{cid}',
            path: {
                'uid': uid,
                'cid': cid,
            },
            errors: {
                500: `Unexpected error`,
            },
        });
    }

}
