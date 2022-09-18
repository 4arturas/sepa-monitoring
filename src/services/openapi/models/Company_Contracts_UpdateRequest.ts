/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Company_Contracts_ConnectionUpdateRequest } from './Company_Contracts_ConnectionUpdateRequest';

export type Company_Contracts_UpdateRequest = {
    name?: string | null;
    connections?: Array<Company_Contracts_ConnectionUpdateRequest> | null;
};

