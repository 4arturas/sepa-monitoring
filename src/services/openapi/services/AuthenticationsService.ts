/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Authentication_Contracts_LogInRequest } from '../models/Authentication_Contracts_LogInRequest';
import type { Authentication_Contracts_LogInResponse } from '../models/Authentication_Contracts_LogInResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AuthenticationsService {

    /**
     * Generate QR code and token.
     * @param requestBody
     * @returns Authentication_Contracts_LogInResponse Success
     * @throws ApiError
     */
    public static postV1AuthenticationsAuthenticatorLogin(
        requestBody?: Authentication_Contracts_LogInRequest,
    ): CancelablePromise<Authentication_Contracts_LogInResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/authentications/authenticator/login',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                500: `Unexpected error`,
            },
        });
    }

}
