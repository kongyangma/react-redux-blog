import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { fetchProfile, clearProfile, updateProfile } from '../../actions/index';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class Profile extends Component {

  componentDidMount() {
    if (!this.props.initialValues) {
      this.props.fetchProfile();  // fetch profile
    }
  }

  componentWillUnmount() {
    this.props.clearProfile();  // clear the redux state (userinfo) when this component will unmount
  }

  handleFormSubmit({ firstName, lastName, birthday, sex, phone, address, occupation, description }) {
    this.props.updateProfile({ firstName, lastName, birthday, sex, phone, address, occupation, description }, (path, state) => {  // callback: history replace
      this.props.history.replace(path, state);
    });
  }

  renderInput = (field) => (
    <fieldset className="form-group">
      <label>{field.label}</label>
      <input
        className="form-control"
        {...field.input}
        type={field.type}
        required={field.required? 'required' : ''}
        disabled={field.disabled? 'disabled' : ''}
      />
    </fieldset>
  );

  renderOptions = (field) => (
    <fieldset className="form-group">
      <label>{field.label}</label>
      <select className="form-control" {...field.input}>
        <option />
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
    </fieldset>
  );

  renderTextarea = (field) => (
    <fieldset className="form-group">
      <label>{field.label}</label>
      <textarea className="form-control" {...field.input} />
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

    if (!this.props.initialValues) {  // if the initialValues is null, render <div>Loading...</div>
      return <div>Loading...</div>
    }

    const { handleSubmit } = this.props;

    return (
      <div>
        { this.renderAlert() }
        <form className="form-profile" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <h3>Profile</h3>
          <hr />
          <Field name="email" component={this.renderInput} type="email" label="Email:" disabled={true} />
          <Field name="firstName" component={this.renderInput} type="text" label="First Name:" required={true} />
          <Field name="lastName" component={this.renderInput} type="text" label="Last Name:" required={true} />
          <Field name="birthday" component={this.renderInput} type="date" label="Birthday:" />
          <Field name="sex" component={this.renderOptions} label="Sex:" />
          <Field name="phone" component={this.renderInput} type="text" label="Phone:" />
          <Field name="address" component={this.renderInput} type="text" label="Address:" />
          <Field name="occupation" component={this.renderInput} type="text" label="Occupation:" />
          <Field name="description" component={this.renderTextarea} label="Description:" />
          <button action="submit" className="btn btn-primary">Update Profile</button>
        </form>
      </div>
    );
  }
}

Profile = reduxForm({
  form: 'profile', // name of the form
  // validate: validate,
})(Profile);

function mapStateToProps(state) {
  return {
    initialValues: state.profile.user // set initial values for the form
  };
}

export default connect(mapStateToProps, { fetchProfile, clearProfile, updateProfile })(Profile);



/*
<Container className="mt-5 pt-5">
        <Row className="justify-content-lg-center">
          <Form>
            <h3>Profile</h3>
            <hr />
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Gender</Form.Label>
              <Form.Control as="select">
                <option>Male</option>
                <option>Female</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Phone</Form.Label>
              <Form.Control type="text" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Occupation</Form.Label>
              <Form.Control type="text" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Description</Form.Label>
            </Form.Group>

            <Button variant="primary" type="submit">
              Update Profile
              </Button>
          </Form>
        </Row>
      </Container>
*/