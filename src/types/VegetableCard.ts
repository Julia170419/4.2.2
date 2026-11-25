export type VegetableCard = {
    id: number | string,
    name: string,
    image: string,
    price: number,
    count: number
}

export type PopupState = 
| { type: 'closed'}
| { type: 'opened'}