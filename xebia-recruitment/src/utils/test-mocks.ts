import {Book} from '../entities/book';

export const BOOKS_MOCK: Book[] = [
  new Book('c8fabf68-8374-48fe-a7ea-a00ccd07afff', 'Henri Potier à l\'école des sorciers',
    35, 'http://henri-potier.xebia.fr/hp0.jpg', ['test', 'test1', 'test2']),
  new Book('a460afed-e5e7-4e39-a39d-c885c05db861', 'Henri Potier et la Chambre des secrets',
    30, 'http://henri-potier.xebia.fr/hp1.jpg', ['test11', 'test12', 'test13'])
];

export const OFFER_MOCK: any =
  {
    offers: [
      {
        type: "percentage",
        value: 5
      },
      {
        type: "minus",
        value: 15
      },
      {
        type: "slice",
        sliceValue: 100,
        value: 12
      }
    ]
  };
