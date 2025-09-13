interface IRole{
    User:string;
    Admin:string;
    HR:string;
    Supervisor:string;
    SuperAdmin:string;
    Trader:string
}
const role:IRole = {
    User:"user",
    Admin:"admin",
    HR:"hr",
    Supervisor:"supervisor",
    SuperAdmin:"superAdmin",
    Trader:"trader"
}

export const endPoints = {
    createProduct:[role.Admin,role.Trader],
    getProduct:[role.Admin,role.Trader,role.User],
    updateProduct:[role.Admin,role.Trader],
    deleteProduct:[role.Admin,role.Trader]
}

