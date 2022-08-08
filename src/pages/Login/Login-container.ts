import { connect } from 'react-redux';
import { AnyAction, Dispatch } from 'redux';
import { IRootReducer } from '../../store/reducers-types';
import { Login } from './Login';
import { ILoginStateProps } from './Login-types';


function mapStateToProps(state: IRootReducer): ILoginStateProps {
    return {
        username: state.auth.username,
    }
}

function mapDispatchToProps(_dispatch: Dispatch<AnyAction>) {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
