export type TUser = {
    login: string,
    password: string,
};

export type TTree = {
    key: string;
    name: string;
    children?: TTree[];
};
