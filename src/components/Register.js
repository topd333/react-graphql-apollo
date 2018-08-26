import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Alert } from 'reactstrap'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

import { AUTH_TOKEN } from '../constants'

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $username: String!) {
    signup(email: $email, password: $password, username: $username) {
      token
    }
  }
`

class Register extends Component {
  state = {
    email: '',
    password: '',
    confirm_password: '',
    username: '',
  }

  render() {
    const { email, password, confirm_password, username } = this.state
    return (
      <Container>
        <Row>
          <Col md={{ size: 8, offset: 2 }} lg={{ size: 6, offset: 3 }} >
            <Card>
              <CardBody>
                <h3 className="mb-4">Register</h3>
                <Mutation
                  mutation={SIGNUP_MUTATION}
                  variables={{ email, password, username }}
                  onCompleted={data => this._confirm(data)}
                >
                  {(mutation, { loading, error }) => (
                  <Form onSubmit={e => {
                      e.preventDefault()
                      if(this.state.password !== this.state.confirm_password) {
                        document.getElementById('confirm_password').setCustomValidity("Password doesn't match.")
                        return false
                      }
                      mutation()
                    }}>
                    <FormGroup>
                      <Label for="username">Username</Label>
                      <Input type="text" name="username" id="username" placeholder="Username"
                             value={username} onChange={e => this.setState({ username: e.target.value })} required />
                    </FormGroup>
                    <FormGroup>
                      <Label for="email">Email</Label>
                      <Input type="email" name="email" id="email" placeholder="Email"
                             value={email} onChange={e => this.setState({ email: e.target.value })} required />
                    </FormGroup>
                    <FormGroup>
                      <Label for="password">Password</Label>
                      <Input type="password" name="password" id="password" placeholder="Password"
                             value={password} onChange={e => this.setState({ password: e.target.value })} required />
                    </FormGroup>
                    <FormGroup>
                      <Label for="confirm_password">Confirm Password</Label>
                      <Input type="password" name="confirm_password" id="confirm_password" placeholder="Confirm Password"
                             value={confirm_password} onChange={e => this.setState({ confirm_password: e.target.value })} required />
                    </FormGroup>
                    <Button type="submit">Register</Button>
                    <Link to="/login" className="btn ml-2">Login</Link>
                    {loading && <p>Loading...</p>}
                    {error && <Alert color="danger">{error.toString()}</Alert>}
                  </Form>
                  )}
                </Mutation>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  }

  _confirm = async data => {
    const { token } = data.signup
    this._saveUserData(token)
    this.props.history.push(`/`)
  }

  _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token)
  }
}

export default Register
