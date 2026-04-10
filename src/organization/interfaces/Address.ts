export interface Address {
  id: number;
  province: {
    name: string;
    code: string;
  };
  commune: {
    name: string;
    code: string;
  };
  detailedAddress: string;
}
