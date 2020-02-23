import {BitcoinRepository} from '../repositories';
import {get, getModelSchemaRef, param} from '@loopback/rest'
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
  @authenticate('jwt')
  getblockcount() {
    return this.bitcoinRepository.getblockcount()
  }

  @get('/bitcoin/newblock/{block}', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'Get new block',
        content: {'application/json': {schema: getModelSchemaRef(Blockcount)}},
      },
    },
  })
  // @authenticate('jwt')
  getnewblock(@param.path.string('block') block: any) {
    // return this.bitcoinRepository.getblockcount()

    // TODO: Hacer insert en la bbdd
    console.log('getblock', block)
  }
}
