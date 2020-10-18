import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import axios from 'axios';

export interface IValues {
    marca: string,
    modelo: string,
    color: string,
    patente: string
}

export interface IFormState {
    [key: string]: any;
    values: IValues[];
    submitSuccess: boolean;
    loading: boolean;
}

class Create extends React.Component<RouteComponentProps, IFormState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            marca: '',
            modelo: '',
            color: '',
            patente: '',
            values: [],
            loading: false,
            submitSuccess: false,
        }
    }

    private processFormSubmission = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        this.setState({ loading: true });

        const formData = {
            marca: this.state.marca,
            modelo: this.state.modelo,
            color: this.state.color,
            patente: this.state.patente,
        }

        this.setState({ submitSuccess: true, values: [...this.state.values, formData], loading: false });

        axios.post(`http://localhost:5000/cars`, formData).then(data => [
            setTimeout(() => {
                this.props.history.push('/');
            }, 1500)
        ]);
    }

    private handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value,
        })
    }

    public render() {
        const { submitSuccess, loading } = this.state;
        return (
            <div>
                <div className={"col-md-12 form-wrapper"}>
                    <h2> Crear Auto </h2>
                    {!submitSuccess && (
                        <div className="alert alert-info" role="alert">
                            Complete los datos a continuacion
                    </div>
                    )}

                    {submitSuccess && (
                        <div className="alert alert-info" role="alert">
                            El auto fue correctamente creado!
                            </div>
                    )}

                    <form id={"create-car-form"} onSubmit={this.processFormSubmission} noValidate={true}>
                        <div className="form-group col-md-12">
                            <label htmlFor="marca"> Marca </label>
                            <input type="text" id="marca" onChange={(e) => this.handleInputChanges(e)} name="marca" className="form-control" placeholder="Introducir marca" />
                        </div>

                        <div className="form-group col-md-12">
                            <label htmlFor="modelo"> Modelo </label>
                            <input type="text" id="modelo" onChange={(e) => this.handleInputChanges(e)} name="modelo" className="form-control" placeholder="Introducir modelo" />
                        </div>

                        <div className="form-group col-md-12">
                            <label htmlFor="color"> Color </label>
                            <input type="text" id="color" onChange={(e) => this.handleInputChanges(e)} name="color" className="form-control" placeholder="introducir color" />
                        </div>

                        <div className="form-group col-md-12">
                            <label htmlFor="patente"> Patente </label>
                            <input type="text" id="patente" onChange={(e) => this.handleInputChanges(e)} name="patente" className="form-control" placeholder="Introducir patente" />
                        </div>

                        <div className="form-group col-md-4 pull-right">
                            <button className="btn btn-success" type="submit">
                                Crear Auto
              </button>
                            {loading &&
                                <span className="fa fa-circle-o-notch fa-spin" />
                            }
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default withRouter(Create)
