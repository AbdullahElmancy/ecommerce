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
    getAUser:[role.User,role.Admin],
    all:[role.Admin,role.HR],
    updateUser:[role.Supervisor,role.Admin,role.User,role.HR,role.Trader],
    deleteUser:[role.Supervisor,role.Admin,role.User,role.HR,role.Trader],
    blockStatusUser:[role.Admin],
    changeRole:[role.SuperAdmin],
    updatePassword:[role.User,role.Admin,role.HR,role.Supervisor,role.Trader],
    wishUser:[role.User],
    avatar:[role.User,role.Admin,role.HR,role.Supervisor,role.Trader]
}

