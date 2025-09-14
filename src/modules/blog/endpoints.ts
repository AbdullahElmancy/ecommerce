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
    createBlog:[role.Admin],
    getBlogs:[role.Admin,role.User],
    updateBlog:[role.Admin],
    deleteBlog:[role.Admin]
}