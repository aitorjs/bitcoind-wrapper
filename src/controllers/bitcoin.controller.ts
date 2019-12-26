import {BitcoinRepository} from '../repositories';
import {get, param} from '@loopback/rest'
import {repository} from '@loopback/repository';

export class BitcoinController {
  constructor(
    @repository(BitcoinRepository)
    public bitcoinRepository: BitcoinRepository,
  ) {}

  @get('/bitcoin/getblockcount')
  getblockcount() {
    return this.bitcoinRepository.getblockcount()
  }
}

