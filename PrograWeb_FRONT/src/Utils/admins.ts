export type User = {
  id: number;
  correo: string;
  password: string;
  nombre: string;
  token: string;
  estado: boolean;
};

export const ListaAdmins: User[] = [ 
    {id: 2,
  correo: "prueba@gmail.com",
  password: "admin",
  nombre: "Admin",
  token: "token",
  estado: true}

]

export function revisarAdmin (email: string, password : string) : boolean {
    for (const administrador of ListaAdmins){
        if (administrador.correo == email && administrador.password == password){
            return true;
        }
    }
    return false;
}