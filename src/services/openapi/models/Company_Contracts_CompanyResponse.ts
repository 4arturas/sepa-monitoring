/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Company_Contracts_ConnectionResponse } from './Company_Contracts_ConnectionResponse';

export type Company_Contracts_CompanyResponse = {
    id?: number;
    createdAt?: string;
    guid?: string;
    name?: string | null;
    isActive?: boolean;
    insertedBy?: string | null;
    deletedBy?: string | null;
    deletedAt?: string | null;
    isDeleted?: boolean;
    connections?: Array<Company_Contracts_ConnectionResponse> | null;
};

