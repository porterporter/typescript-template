import { Piece, PieceContext } from '@sapphire/pieces';
import type { Interaction } from 'discord.js';

export abstract class Restriction extends Piece {
	public readonly name: string;

	constructor(context: PieceContext, options: RestrictionOptions) {
		super(context);
		this.name = options.name;
	}

    public abstract run(interaction: Interaction): RestrictionResults;
}

export interface RestrictionOptions {
name: string;
}

interface RestrictionPass {
    success: true;
}
interface RestrictionFail {
    success: false;
    reason: string;
}

export type RestrictionResults = RestrictionPass | RestrictionFail;