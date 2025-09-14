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
    createCoupon:[role.Admin],
    GetCoupons:[role.User],
    updateAndDeleteCoupon:[role.Admin]
}

