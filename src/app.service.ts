import { Injectable } from '@nestjs/common'
import * as zxcvbn from 'zxcvbn'

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!'
  }

  evaluate(password: string) {
    const result = zxcvbn(password)

    return result.score
  }
}
