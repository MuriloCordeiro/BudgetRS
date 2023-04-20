interface ItemsTYPENonNull {
    general?: General;
    orders?: Order[];
}

export type ItemsTYPE = ItemsTYPENonNull | null;

export interface General {
    ordertype: string;
    orderId: string;
}

export interface Order {
    barcode: null | string;
    description: string;
    itemCode: string;
    qty: number;
    itemSequence: string;
    orderType: string;
    address1: null | string;
    address2: null | string;
    checked: number;
    city: string;
    UF: string;
    shippingCompany: string;
    remaining: boolean;
}
