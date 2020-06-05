
import { expensesModel } from '../models/expenses-model.js';
import { financialModel } from '../models/financial-model.js';
import { schoolModel } from '../models/school-model.js';
import { stateModel } from '../models/state-model.js';


/*
 * getQueryVariables - Check the url for queryString and interpret it into an object
 * full of key-value pairs.
 * @returns {Object} key-value pairs of the queryString
 */
function getQueryVariables() {
    const query = window.location.search.substring( 1 );
    const pairs = query.split( '&' );
    let queryVariables = {};
    pairs.forEach( elem => {
    	let pair = elem.split( '=' );
    	let key = decodeURIComponent( pair[0] );
    	let value = decodeURIComponent( pair[1] );
    	queryVariables[key] = value;
    } );

    return queryVariables;
}

/* 
 * _buildUrlQueryString - Retreieve values from the models and transform them into a 
 * querystring
 * @returns {String} a formatted query string based on model values
 */

function _buildUrlQueryString() {
	const expensesValues = expensesModel.values;
	const financialValues = financialModel.values;
	const schoolValues = schoolModel.values;
	const stateValues = stateModel.values;
	let query = '?';

	let variables = {
		iped: schoolValues.schoolID,
		pid: schoolValues.pid,
		oid: schoolValues.oid,

		houp: stateValues.programHousing,
		typp: stateValues.programType,
		lenp: stateValues.programLength,
		ratp: stateValues.programRate,
		depp: stateValues.programDependent,
		cobs: stateValues.stateCosts, // TODO: What is this value?
		regs: stateValues.stateRegion,

		tuit: financialValues.dirCost_tuition,
		hous: financialValues.dirCost_housing,
		diro: financialValues.dirCost_other,

		book: financialValues.indiCost_books,
		indo: financialValues.indiCost_other,
		nda: financialValues.indiCost_added,

		pelg: financialValues.grant_pell,
		seog: financialValues.grant_seog,
		fedg: financialValues.grant_federal,
		stag: financialValues.grant_state,
		schg: financialValues.grant_school,
		othg: financialValues.grant_other,

		mta: financialValues.mil_milTuitAssist,
		gi: financialValues.mil_GIBill,
		othm: financialValues.mil_other,

		stas: financialValues.scholarship_state,
		schs: financialValues.scholarship_school,
		oths: financialValues.scholarship_other,

		wkst: financialValues.workStudy_workStudy,

		fell: financialValues.fund_fellowship,
		asst: financialValues.fund_assistantship,

		subl: financialValues.fedLoan_directSub,
		unsl: financialValues.fedLoan_directUnsub,

		insl: financialValues.instiLoan_institutional,
		insr: financialValues.rate_institutionalLoan,
		insf: financialValues.fee_institutionalLoan,
		stal: financialValues.loan_stateLoan,
		star: financialValues.rate_stateLoan,
		staf: financialValues.fee_stateLoan,
		npol: financialValues.loan_nonprofitLoan,
		npor: financialValues.rate_nonprofitLoan,
		npof: financialValues.fee_nonprofitLoan,

		pers: financialValues.savings_personal,
		fams: financialValues.savings_family,
		'529p': financialValues.savings_529,

		offj: financialValues.income_jobOffCampus,
		onj: financialValues.income_jobOnCampus,
		eta: financialValues.income_employerAssist,
		othf: financialValues.income_other,

		pvl1: financialValues.privLoan_privLoan1,
		pvr1: financialValues.privloan_privLoanRate1,
		pvf1: financialValues.privloan_privLoanFee1,

		plus: financialValues.fedLoan_parentPlus,
	};

	let expensesVariables = {
		houx: expensesValues.item_housing,
		fdx: expensesValues.item_food,
		clhx: expensesValues.item_clothing,
		trnx: expensesValues.item_transportation,
		hltx: expensesValues.item_healthcare,
		entx: expensesValues.item_entertainment,
		retx: expensesValues.item_retirement,
		taxx: expensesValues.item_taxes,
		chcx: expensesValues.item_childcare,
		othx: expensesValues.item_other,
		dbtx: expensesValues.item_currentDebt
	}

	if ( stateValues.program_type === 'graduate' ) {
		variables.plus = financialValues.loan_gradPlus;
	}

	// TODO: Don't bother putting expenses in the URL if they equal the default
	// for ( let val in expensesVariables ) {
	// CHECK IF THE VALUE HAS CHANGED FROM THE DEFAULT
	// }


	for ( let key in variables ) {
		if ( typeof variables[key] !== 'undefined' && variables[key] !== 0 && variables[key] !== null ) {
			if ( query.length > 1 ) query += '&';
			query += key + '=' + variables[key];
		}
	}

	return query;

}

/*
 * setUrlQueryString - Replaces current state, adding the formatted querystring as the URL
 */

function setUrlQueryString() {
	window.history.replaceState( stateModel.values, null, _buildUrlQueryString() );
}

export {
	getQueryVariables,
	setUrlQueryString
}
