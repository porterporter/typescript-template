import { Store } from '@sapphire/pieces';
import { Restriction } from './Restriction';

export class RestrictionStore extends Store<Restriction> {
	public constructor() {
		super(Restriction, { name: 'restrictions' });
	}
}