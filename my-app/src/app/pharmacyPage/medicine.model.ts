// Define interface for Medicine
export interface Medicine {
  _id?: string;
  customMedicineId: string;
  name: string;
  totalPills: number;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
}
