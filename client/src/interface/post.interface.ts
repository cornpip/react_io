export interface Iimage {
    id: number,
    imageName: string,
}

export interface IPost {
    id: number,
    featureTitle: string,
    mdName: string,
    created: string,
    updated: string,
    images: Array<Iimage>,
}