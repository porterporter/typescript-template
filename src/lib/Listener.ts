import { Piece, PieceContext } from '@sapphire/pieces';
import type { Awaitable } from 'discord.js';

export abstract class Listener extends Piece {
	public readonly name: string;
	public readonly event: string;
	public readonly once: boolean;

	constructor(context: PieceContext, options: ListenerOptions) {
		super(context);
		const { name, event, once } = options;
		this.name = name;
		this.event = event;
		this.once = once ?? false;
	}

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public abstract run(...args: any[]): any;
}

export interface ListenerOptions {
name: string;
event: string;
once?: boolean;
}