import { Piece, PieceContext } from '@sapphire/pieces';
import type { Awaitable, CommandInteraction, SlashCommandBuilder } from 'discord.js';

export abstract class Command extends Piece {
	public readonly name: string;
	public readonly description: string;
	public readonly cooldown: number;
	private data: SlashCommandBuilder;
	public readonly restrictions: string[];

	constructor(context: PieceContext, options: CommandOptions) {
		super(context);
		const { name, description } = options.data;
		this.data = options.data;
		this.name = name;
		this.description = description;
		this.cooldown = options.cooldown ?? 3000;
		this.restrictions = options.restrictions ?? [];
	}

    public abstract run(interaction: CommandInteraction): Awaitable<unknown>;
}

export interface CommandOptions {
    data: SlashCommandBuilder,
    cooldown?: number,
    restrictions?: string[]
}