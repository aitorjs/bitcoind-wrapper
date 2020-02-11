import {BitcoinRepository} from '../repositories';
import {get, getModelSchemaRef} from '@loopback/rest'
import {repository} from '@loopback/repository';
import {Blockcount} from '../models'
import {authenticate} from '@loopback/authentication'
import {OPERATION_SECURITY_SPEC} from '../utils/security-spec'

export class BitcoinController {
  constructor(
    @repository(BitcoinRepository)
    public bitcoinRepository: BitcoinRepository,
  ) {}

  @get('/bitcoin/getblockcount', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'Get chain length',
        content: {'application/json': {schema: getModelSchemaRef(Blockcount)}},
      },
    },
  })
  // @authenticate('jwt')
  getblockcount() {
    return this.bitcoinRepository.getblockcount()
  }
}
