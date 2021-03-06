import React, { Component } from 'react';
import { AddDebtorInput } from './AddDebtorInput';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { firestoreConnect } from 'react-redux-firebase';

class AddDebtor extends Component {
  state = {
    debtorName: '',
    loanType: '',
    monthlyPmt: '',
    balance: '',
    collateral: '',
    maturityDate: '',
    originalPrincipal: '',
    loanNumber: ''
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();

    // The state is what we'll be adding to firestore
    const newDebtor = this.state;
    // We used firestoreConnect at the bottom so now we have access to this.props.firestore which has a lot of method attached to it indcluding add. We will be doing this to add to firestore.
    const { firestore } = this.props;

    if (newDebtor.balance === '') {
      newDebtor.balance = 0;
    }

    if (newDebtor.monthlyPmt === '') {
      newDebtor.monthlyPmt = 0;
    }

    if (newDebtor.originalPrincipal === '') {
      newDebtor.originalPrincipal = 0;
    }

    // First paramenter is the collection that we want to add to. Second parament is the actual data that we want to add. In this case is the state.
    // Returns a promise
    firestore
      .add({ collection: 'debtors' }, newDebtor)
      .then(() => this.props.history.push('/'));
  };

  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-md-6">
            <Link to="/" className="btn btn-link">
              <i className="fas fa-arrow-circle-left" /> Back To Dashboard
            </Link>
          </div>
        </div>

        <div className="card mb-5">
          <div className="card-header bg-secondary text-white">
            <h4>Add New Debt Information</h4>
          </div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="debtorName">
                  Debtor Name<span className="text-danger">*</span>
                </label>
                <AddDebtorInput
                  name="debtorName"
                  minLength="2"
                  required
                  onChange={this.onChange}
                  value={this.state.debtorName}
                />
              </div>

              <div className="form-group">
                <label htmlFor="loanType">Loan Type</label>
                <AddDebtorInput
                  name="loanType"
                  onChange={this.onChange}
                  value={this.state.loanType}
                />
              </div>

              <div className="form-group">
                <label htmlFor="monthlyPmt">
                  Monthly Payment<span className="text-danger">*</span>
                </label>
                <AddDebtorInput
                  name="monthlyPmt"
                  required
                  onChange={this.onChange}
                  value={this.state.monthlyPmt}
                />
              </div>

              <div className="form-group">
                <label htmlFor="balance">
                  Current Balance<span className="text-danger">*</span>
                </label>
                <AddDebtorInput
                  name="balance"
                  required
                  onChange={this.onChange}
                  value={this.state.balance}
                />
              </div>

              <div className="form-group">
                <label htmlFor="collateral">Collateral</label>
                <AddDebtorInput
                  name="collateral"
                  onChange={this.onChange}
                  value={this.state.collateral}
                />
              </div>

              <div className="form-group">
                <label htmlFor="maturityDate">Maturity Date</label>
                <AddDebtorInput
                  name="maturityDate"
                  onChange={this.onChange}
                  value={this.state.maturityDate}
                />
              </div>

              <div className="form-group">
                <label htmlFor="originalPrincipal">
                  Original Principal Amount
                </label>
                <AddDebtorInput
                  name="originalPrincipal"
                  onChange={this.onChange}
                  value={this.state.originalPrincipal}
                />
              </div>

              <div className="form-group">
                <label htmlFor="loanNumber">Loan Number</label>
                <AddDebtorInput
                  name="loanNumber"
                  onChange={this.onChange}
                  value={this.state.loanNumber}
                />
              </div>
              <small>
                <span className="text-danger">*</span> indicates required fields
              </small>
              <input type="submit" className="btn btn-secondary btn-block" />
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

AddDebtor.propTypes = {
  firestore: PropTypes.object.isRequired
};

export default firestoreConnect()(AddDebtor);
