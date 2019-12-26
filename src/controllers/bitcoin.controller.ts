import {BitcoinRepository} from '../repositories';
import {get, getModelSchemaRef} from '@loopback/rest'
import {repository} from '@loopback/repository';
import {Blockcount} from '../models'

export class BitcoinController {
  constructor(
    @repository(BitcoinRepository)
    public bitcoinRepository: BitcoinRepository,
  ) {}

  @get('/bitcoin/getblockcount', {
    responses: {
      '200': {
        description: 'Get chain length',
        content: {'application/json': {schema: getModelSchemaRef(Blockcount)}},
      },
    },
  })
  getblockcount() {
    return this.bitcoinRepository.getblockcount()
  }
}

