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

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`

class Login extends Component {
  state = {
    email: '',
    password: ''
  }

  render() {
    const { email, password } = this.state
    return (
      <Container>
        <Row>
          <Col md={{ size: 8, offset: 2 }} lg={{ size: 6, offset: 3 }} >
            <Card>
              <CardBody>
                <h3 className="mb-4">Login</h3>
                <Mutation
                  mutation={LOGIN_MUTATION}
                  variables={{ email, password }}
                  onCompleted={data => this._confirm(data)}
                >
                  {(mutation, { loading, error }) => (
                  <Form onSubmit={e => {
                      e.preventDefault()
                      mutation()
                    }}>
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
                    <Button type="submit" disabled={loading}>Login</Button>
                    <Link to="/register" className="btn ml-2">Register</Link>
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
    const { token } =  data.login
    this._saveUserData(token)
    this.props.history.push(`/`)
  }

  _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token)
  }
}

export default Login
