/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Company_Contracts_ConnectionCreateResponse } from './Company_Contracts_ConnectionCreateResponse';

export type Company_Contracts_UpdateResponse = {
    id?: number;
    createdAt?: string;
    guid?: string;
    name?: string | null;
    connections?: Array<Company_Contracts_ConnectionCreateResponse> | null;
};

