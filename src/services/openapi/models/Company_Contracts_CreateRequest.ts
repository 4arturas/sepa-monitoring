/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Company_Contracts_ConnectionCreateRequest } from './Company_Contracts_ConnectionCreateRequest';

export type Company_Contracts_CreateRequest = {
    name?: string | null;
    connections?: Array<Company_Contracts_ConnectionCreateRequest> | null;
};

