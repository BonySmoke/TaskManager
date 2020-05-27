import React, { Fragment } from 'react';
import { withAlert } from 'react-alert';
import { connect } from 'react-redux';

class Alerts extends React.Component{

    componentDidUpdate(prevProps){
        const { err, alert } = this.props;
        if (err){
            console.log(err)
            if(err !== prevProps.err){
                if(err.msg.password){
                    alert.error(`Password: ${err.msg.password.join()}`);
                }else if(err.msg.non_field_errors){
                    alert.error(`${err.msg.non_field_errors.join()}`)
                }else if (err.msg.username){
                    alert.error(`Username: ${err.msg.user.join()}`)
                }else if (err.msg.email){
                    alert.error(`Email: ${err.msg.email.join()}`)
                }else if(err.msg.password1){
                    alert.error(`Password: ${err.msg.password1.join()}`)
                }else if(err.msg.password2){
                    alert.error(`Password: ${err.msg.password2.join()}`)
                }else if(err.msg.first_name){
                    alert.error(`First Name: ${err.msg.first_name.join()}`)
                }else if(err.msg.last_name){
                    alert.error(`Last Name: ${err.msg.last_name.join()}`)
                }
            }
            
        }
    }

    render(){
        return <Fragment />;
    }
}

const mapStateToProps = (state) => ({
    err: state.auth.error
})

export default connect(mapStateToProps)(withAlert()(Alerts));