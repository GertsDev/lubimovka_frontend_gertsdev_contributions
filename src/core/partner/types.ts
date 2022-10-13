import type { Url } from 'shared/types';

import { PartnerType } from './constants';

export type Partner = {
  name: string,
  logo: Url,
  type: keyof typeof PartnerType,
  url?: Url,
}
