import connection from '../helpers/conn';
import ValidationHelper from '../helpers/validationHelper';

const client = connection();
client.connect();

class ValidateTransaction {
  /**
   * validate Debit Account input
   * @param {Object} request
   * @param {Object} response
   * @callback {Function} next
   * @return {String} errors
   */

  static validateDebitAccount(request, response, next) {
    const {
      amount,
      type,
    } = request.body;

    const debitAccountErrors = ValidationHelper.validateDebitAccount({ Amount: amount, Type: type });

    let errors = {};

    errors = Object.assign(errors, debitAccountErrors);
    ValidationHelper.checkValidationErrors(response, errors, next);
  }

  /**
   * validate Credit Account input
   * @param {Object} request
   * @param {Object} response
   * @callback {Function} next
   * @return {String} errors
   */

  static validateCreditAccount(request, response, next) {
    const {
      amount,
      type,
    } = request.body;

    const debitAccountErrors = ValidationHelper.validateCreditAccount({ Amount: amount, Type: type });

    let errors = {};

    errors = Object.assign(errors, debitAccountErrors);
    ValidationHelper.checkValidationErrors(response, errors, next);
  }
}

export default ValidateTransaction;
