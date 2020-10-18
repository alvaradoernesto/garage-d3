import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import axios from 'axios';


interface IState {
    cars: any[];
}

export default class Home extends React.Component<RouteComponentProps, IState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = { cars: [] }
    }

    public componentDidMount(): void {
        axios.get(`http://localhost:5000/cars`).then(data => {
            this.setState({ cars: data.data })
        })
    }

    public deleteCar(id: number) {
        axios.delete(`http://localhost:5000/cars/${id}`).then(data => {
            const index = this.state.cars.findIndex(car => car.id === id);
            this.state.cars.splice(index, 1);
            this.props.history.push('/');
        })
    }

    public render() {
        const cars = this.state.cars;
        return (
            <div>
                {cars.length === 0 && (
                    <div className="text-center">
                        <h2>No se encuentra ningun auto por el momento</h2>
                    </div>
                )}

                <div className="container">
                    <div className="row">
                      <h1 > Lista de Autos </h1>
                        <table className="table table-bordered">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">Marca</th>
                                    <th scope="col">Modelo</th>
                                    <th scope="col">Color</th>
                                    <th scope="col">Patente</th>
                                    <th scope="col">Editar/Eliminar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cars && cars.map(car =>
                                    <tr key={car.id}>
                                        <td>{car.marca}</td>
                                        <td>{car.modelo}</td>
                                        <td>{car.color}</td>
                                        <td>{car.patente}</td>
                                        <td>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="btn-group" style={{ marginBottom: "20px" }}>
                                                    <Link to={`edit/${car.id}`} className="btn btn-sm btn-outline-secondary">Editar Auto </Link>
                                                    <button className="btn btn-sm btn-outline-secondary" onClick={() => this.deleteCar(car.id)}>Eliminar Auto</button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        )
    }
}
