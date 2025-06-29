//import React from 'react';
import Sidebar from '../Componentes/Barra';
import NavBar from '../Componentes/BarraNavegacion';

const UsersPage = () => {
  return (
    <div>
        <NavBar />
        <div className="d-flex" style={{ marginTop: "60px"}}>
            <Sidebar/>
            <main className="p-4 w-100">
                <h2>Usuarios</h2>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table align-middle">
                            <thead className="table-dark">
                                <tr>
                                    <th>Codigo</th>
                                    <th>Foto</th>
                                    <th>Alias</th>
                                    <th>Nombre</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* User 1 */}
                                <tr>
                                    <td>1</td>
                                    <td>
                                        <img
                                            src="/public/assets/pfp/Asa.png"
                                            alt="Foto de perfils"
                                            className="rounded-circle"
                                            style={{
                                            width: '40px',
                                            height: '40px',
                                            objectFit: 'cover',
                                            }}
                                        />
                                    </td>
                                    <td>Nando</td>
                                    <td>Fernando</td>
                                </tr>
                                {/* User 2 */}
                                <tr>
                                    <td>2</td>
                                    <td>
                                        <img
                                            src="/public/assets/pfp/SaulGoodman.jpg"
                                            alt="Foto de perfil"
                                            className="rounded-circle"
                                            style={{
                                            width: '40px',
                                            height: '40px',
                                            objectFit: 'cover',
                                            }}
                                        />
                                    </td>
                                    <td>juador1</td>
                                    <td>Juan</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    </div>

  );
};

export default UsersPage;