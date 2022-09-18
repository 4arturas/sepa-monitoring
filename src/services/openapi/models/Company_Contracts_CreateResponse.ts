/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Company_Contracts_ConnectionCreateResponse } from './Company_Contracts_ConnectionCreateResponse';

export type Company_Contracts_CreateResponse = {
    id?: number;
    createdAt?: string;
    guid?: string;
    name?: string | null;
    isActive?: boolean;
    connections?: Array<Company_Contracts_ConnectionCreateResponse> | null;
};

