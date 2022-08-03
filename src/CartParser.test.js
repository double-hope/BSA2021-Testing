import CartParser from './CartParser';

let parser;

beforeEach(() => {
	parser = new CartParser();
	console.error = jest.fn();
});

describe('CartParser - unit tests', () => {

	test('should throw header error', () => {
		expect(parser.validate(parser.readFile('D:\\Courses\\Academy 2022\\Lessons\\BSA2021-Testing\\samples.test\\cart-header-error.csv')))
			.toEqual([{"column": 0, "message": "Expected header to be named \"Product name\" but received Product nam.", "row": 0, "type": "header"}]);
	});

	test('should throw row error', () => {
		expect(parser.validate(parser.readFile('D:\\Courses\\Academy 2022\\Lessons\\BSA2021-Testing\\samples.test\\cart-row-error.csv')))
			.toEqual([{"column": -1, "message": "Expected row to have 3 cells but received 2.", "row": 1, "type": "row"}]);
	});

	test('should throw empty string error', () => {
		expect(parser.validate(parser.readFile('D:\\Courses\\Academy 2022\\Lessons\\BSA2021-Testing\\samples.test\\cart-cell-string-error.csv')))
			.toEqual([{"column": 0, "message": "Expected cell to be a nonempty string but received \"\".", "row": 1, "type": "cell"}]);
	});

	test('should throw positive number error', () => {
		expect(parser.validate(parser.readFile('D:\\Courses\\Academy 2022\\Lessons\\BSA2021-Testing\\samples.test\\cart-cell-number-error.csv')))
			.toEqual([{"column": 1, "message": "Expected cell to be a positive number but received \"nine\".", "row": 1, "type": "cell"}]);
	});

	test('should throw validation failed error', () => {
		expect(() => parser.parse('D:\\Courses\\Academy 2022\\Lessons\\BSA2021-Testing\\samples.test\\cart-error.csv'))
			.toThrow('Validation failed!');
	});

	test('should return object', () => {
		const expected = {
			"name": "Mollis consequat",
			"price": 9,
			"quantity": 2,
		}

		const result = parser.parseLine('Mollis consequat,9.00,2');
		expect(result).toMatchObject(expected);

	});

	test('should return total price', () => {
		const obj = [{
			price: 2,
			quantity: 1,
			},
			{
				price: 3,
				quantity: 2,
			}]
		expect(parser.calcTotal(obj)).toEqual(8);
	});

	test('should return right parsed object', () => {
		const res = require('../samples.test/cart-test.json');

		expect(parser.parse('D:\\Courses\\Academy 2022\\Lessons\\BSA2021-Testing\\samples.test\\cart-test.csv'))
			.toMatchObject(res);
	});

	test('should return ColumnType from constructor', () => {
		const parse = new CartParser();
		expect(parse.ColumnType).toEqual({
			STRING: 'string',
			NUMBER_POSITIVE: 'numberPositive'
		});
	});
});

describe('CartParser - integration test', () => {
	// Add your integration test here.
});