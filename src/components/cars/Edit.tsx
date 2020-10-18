import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import axios from 'axios';

export interface IValues {
    [key: string]: any;
}

export interface IFormState {
    id: number,
    customer: any;
    values: IValues[];
    submitSuccess: boolean;
    loading: boolean;
}

class EditCar extends React.Component<RouteComponentProps<any>, IFormState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            customer: {},
            values: [],
            loading: false,
            submitSuccess: false,
        }
    }

    public componentDidMount(): void {
        axios.get(`http://localhost:5000/cars/${this.state.id}`).then(data => {
            this.setState({ customer: data.data });
        })
    }

    private processFormSubmission = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        this.setState({ loading: true });
        axios.patch(`http://localhost:5000/cars/${this.state.id}`, this.state.values).then(data => {
            this.setState({ submitSuccess: true, loading: false })
            setTimeout(() => {
                this.props.history.push('/');
            }, 1500)
        })
    }


    private setValues = (values: IValues) => {
        this.setState({ values: { ...this.state.values, ...values } });
    }

    private handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        this.setValues({ [e.currentTarget.id]: e.currentTarget.value })
    }

    public render() {
        const { submitSuccess, loading } = this.state;
        return (
            <div className="Cars">
                {this.state.customer &&
                    <div>
                        <div>
                            <div className={"col-md-12 form-wrapper"}>
                                <h2> Editar Auto </h2>

                                {submitSuccess && (
                                    <div className="alert alert-info" role="alert">
                                        Customer's details has been edited successfully </div>
                                )}

                                <form id={"create-car-form"} onSubmit={this.processFormSubmission} noValidate={true}>
                                    <div className="form-group col-md-12">
                                        <label htmlFor="marca"> Marca </label>
                                        <input type="text" id="marca" defaultValue={this.state.customer.marca} onChange={(e) => this.handleInputChanges(e)} name="marca" className="form-control" placeholder="Introducir marca" />
                                    </div>

                                    <div className="form-group col-md-12">
                                        <label htmlFor="modelo"> Modelo </label>
                                        <input type="text" id="modelo" defaultValue={this.state.customer.modelo} onChange={(e) => this.handleInputChanges(e)} name="modelo" className="form-control" placeholder="Introducir modelo" />
                                    </div>

                                    <div className="form-group col-md-12">
                                        <label htmlFor="color"> Color </label>
                                        <input type="text" id="color" defaultValue={this.state.customer.email} onChange={(e) => this.handleInputChanges(e)} name="color" className="form-control" placeholder="Introducir color" />
                                    </div>

                                    <div className="form-group col-md-12">
                                        <label htmlFor="patente"> Patente </label>
                                        <input type="text" id="patente" defaultValue={this.state.customer.patente} onChange={(e) => this.handleInputChanges(e)} name="patente" className="form-control" placeholder="Introducir patente" />
                                    </div>

                                    <div className="form-group col-md-4 pull-right">
                                        <button className="btn btn-success" type="submit">
                                            Editar Auto </button>
                                        {loading &&
                                            <span className="fa fa-circle-o-notch fa-spin" />
                                        }
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default withRouter(EditCar)
