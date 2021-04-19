export enum ProductActionsTypes{
    GET_ALL_PRODUCTS="[Product] Get All Products",
    GET_SELECTED_PRODUCTS="[Product] Get Selected Products",
    GET_AVAILABLE_PRODUCTS="[Product] Get available Products",
    SEARCH_PRODUCTS="[Product] Get Search Products",
    New_PRODUCTS="[Product] Get New Product",
    SELECT_PRODUCTS="[Product] Get Select Product",
    EDIT_PRODUCTS="[Product] Get Edit Product",
    DELETE_PRODUCTS="[Product] Get Delete Product",
    PRODUCT_ADDED="[Product] product added",
    PRODUCT_UPDATED="[Product] product updated"
}

export interface ActionEvent{
    type:ProductActionsTypes,
    payload?:any
}

export enum DataStateEnum{
    LOADING,
    LOADED,
    ERROR
}

export interface  AppDataState<T>{
    dataState?: DataStateEnum,
    data?:T, 
    errorMessage?:string
}