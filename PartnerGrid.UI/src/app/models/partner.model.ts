export interface Partner {

  partnerId: number;
  firstName: string;
  lastName: string;
  fullName?: string;
  address: string;
  partnerNumber: string;
  croatianPin: string | null;
  partnerTypeId: number;
  createdAtUtc: string;
  createByUser: string;
  isForeign: boolean;
  externalCode: string | null;
  gender: 'M' | 'F' | 'N';
  policyCount: number;
  totalPolicyAmount: number;

}
