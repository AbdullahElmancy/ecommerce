interface IRole{
    User:string;
    Admin:string;
    HR:string;
    Supervisor:string;
    SuperAdmin:string
}
const role:IRole = {
    User:"user",
    Admin:"admin",
    HR:"hr",
    Supervisor:"supervisor",
    SuperAdmin:"superAdmin"
}

export const endPoints = {
    getAUser:[role.User,role.Admin],
    all:[role.Admin,role.HR],
    updateUser:[role.Supervisor,role.Admin,role.User,role.HR],
    deleteUser:[role.Supervisor,role.Admin,role.User,role.HR],
    blockStatusUser:[role.Admin],
    changeRole:[role.SuperAdmin]
}

