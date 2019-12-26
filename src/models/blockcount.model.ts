import {Model, model, property} from '@loopback/repository';

@model()
export class Blockcount extends Model {
  @property({
    type: 'number',
  })
  result?: number;

  @property({
    type: 'string',
  })
  error?: string;

  @property({
    type: 'string',
    id: true,
    generated: false,
  })
  id?: string;


  constructor(data?: Partial<Blockcount>) {
    super(data);
  }
}

export interface BlockcountRelations {
  // describe navigational properties here
}

export type BlockcountWithRelations = Blockcount & BlockcountRelations;
