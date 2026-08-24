export interface Copoun {
    id: number;
    code: string;
    discountType: number;
    discountTypeName: string;
    discountValue: number;
    minOrderValue?: number;
    usageLimit: number;
    startDate: Date;
    endDate: Date;
    note: string;
}