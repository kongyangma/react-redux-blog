import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { changePassword } from '../../actions/index';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


class Settings extends Component {

  handleFormSubmit({ oldPassword, newPassword }) {
    this.props.changePassword({ oldPassword, newPassword }, (path, state) => {  // callback: history replace
      this.props.history.replace(path, state);
    });
  }

  renderField = ({ label, input, type, meta: { touched, error, warning } }) => (
    <fieldset className="form-group">
      <input className="form-control" placeholder={label} {...input} type={type} required='required' />
      { touched && error && <span className="text-danger">{error}</span> }
    </fieldset>
  );

  renderAlert() {

    const { state } = this.props.history.location;
    const { action } = this.props.history;

    if (state && action === 'REPLACE') {

      return (
        <div className={`alert ${state.status === 'success' ? 'alert-success' : 'alert-danger'}`} role="alert">
          {`[${state.time}] --- `} <strong>{state.status === 'success' ? 'Congratulations!' : 'Oops!'}</strong> {state.message}
        </div>
      );
    }
  }

  render() {

    // these properties comes from ReduxForm
    const { handleSubmit } = this.props;

    return (
      <Container className="mt-5 pt-5">
        {this.renderAlert()}
        <Row className="justify-content-lg-center">
          <Form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            <h3>Change Password</h3>
            <hr />
            <Form.Group controlId="formBasicPassword" component={this.renderField}>
              <Form.Label>Old Password</Form.Label>
              <Form.Control type="password" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" component={this.renderField}>
              <Form.Label>New Password</Form.Label>
              <Form.Control type="password" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" component={this.renderField}>
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control type="password" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Change Password
            </Button>
          </Form>
        </Row>
      </Container>
    );
  }
}

function validate(formProps) {

  // console.log(formProps);

  const errors = {};

  if (formProps.newPassword !== formProps.newPasswordConfirm) {
    errors.newPasswordConfirm = 'New password must match!';
  }

  return errors;
}

Settings = reduxForm({
  form: 'settings',  // name of the form
  validate: validate,
})(Settings);

export default connect(null, { changePassword })(Settings);
