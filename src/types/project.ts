export type ProjectInfo = {
  id: number | undefined;
  name: string;
  description: string;
  imageUrl: string;
  contractTypeId: number | undefined;
  contractSignedOn: SignedOn;
  budget: number;
  isActive: boolean;
};

export type SignedOn = Date | string;
