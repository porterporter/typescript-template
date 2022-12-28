import { container, StoreRegistry } from '@sapphire/pieces';
import { Client as DiscordClient, ClientOptions, GatewayIntentBits, Partials } from 'discord.js';
import { join } from 'path';
import { CommandStore } from './CommandStore';
import { ListenerStore } from './ListenerStore';
import { RestrictionStore } from './RestrictionStore';

export class Client extends DiscordClient {
	public stores: StoreRegistry;

	constructor(options?: ClientOptions) {
		super({ ...options,
			intents: [GatewayIntentBits.Guilds, GatewayIntentBits.DirectMessages ],
			partials: [Partials.Message, Partials.Channel, Partials.User],
		});
		container.client = this;
		this.stores = new StoreRegistry();
		container.stores = this.stores;

		this.stores
			.register(new CommandStore().registerPath(join(__dirname, '..', 'commands')))
			.register(new ListenerStore().registerPath(join(__dirname, '..', 'listeners')))
			.register(new RestrictionStore().registerPath(join(__dirname, '..', 'restrictions')));


		// register stores
	}

	public async login(token?: string) {
		await Promise.all([...this.stores.values()].map((store) => store.loadAll()));

		this.stores.get('events').forEach((event) => {
			event.once ? this.once(event.event, (...args) => event.run(...args)) : this.on(event.event, (...args) => event.run(...args));
		});

		// load all stores & events
		return super.login(token);
	}
}