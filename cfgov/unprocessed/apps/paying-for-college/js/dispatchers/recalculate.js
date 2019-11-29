/**
 * Recalculates the student debt totals, etc
 */

import studentDebtCalculator from 'student-debt-calc';
import { financialModel } from '../models/financial-model.js';
import { constantsModel } from '../models/constants-model.js';
import { getState } from '../dispatchers/get-state.js';
import { getFinancialValue } from '../dispatchers/get-model-values.js';


const recalculate = function( data ) {
  let values = {};
  const debtObj = {
    total_debtAtGrad: 0,
    total_debt10year: 0,
    total_debtMonthly10year: 0,
    total_interest10yr: 0
  };
  const modelToCalc = {
    total_costs: 'tuitionFees',
    total_grantsScholarships: 'scholarships',
    total_otherResources: 'savings',
    fedLoan_directSub: 'directSubsidized',
    fedLoan_directUnsub: 'directUnsubsidized',
    privloan_school: 'privateLoan',
    rate_schoolLoan: 'privateLoanRate'
  };

  values = Object.assign( constantsModel.values, data );

  for ( const key in values ) {
    values[key] = Number( values[key] );
  }
  for ( const key in modelToCalc ) {
    values[modelToCalc[key]] = getFinancialValue( key );
  }

  // 'directPlus' is to avoid a bug in studentDebtCalc
  values.directPlus = 0;

  // Add additional values
  values.programLength = getState( 'program' ).length;

  values = studentDebtCalculator( values );

  debtObj.total_debtAtGrad = values.totalDebt;
  debtObj.total_debt10year = values.tenYear.loanLifetime;
  debtObj.total_debtMonthly10year = values.tenYear.loanMonthly;
  debtObj.total_interest10yr = values.tenYear.loanLifetime - values.borrowingTotal;

};

export {
  recalculate
};
