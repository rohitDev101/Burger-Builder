import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary/Auxiliary';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component{
        state = {
            error: null
        }
        // constructor(props){
        //     super(props);
        //     axios.interceptors.request.use(req => {
        //         this.setState({error:null});
        //         return req;
        //     })
        //     axios.interceptors.response.use(res => res, error => {
        //         this.setState({error:error});
        //     })
        // }
        UNSAFE_componentWillMount(){
            this.requestInterceptor = axios.interceptors.request.use(req => {
                this.setState({error:null});
                return req;
            })
            this.responseInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error:error});
            })
        }

        componentWillUnmount(){
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.response.eject(this.responseInterceptor);
        }
        errorHandler = () =>{
            this.setState({error: null})
        }
        render(){
            return (
                <Aux>
                    <Modal show = {this.state.error} modelClosed = {this.errorHandler}>
                        {this.state.error?this.state.error.message:null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Aux>
            )
        }
    }
};


export default withErrorHandler;