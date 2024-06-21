// Generated by dojo-bindgen on Thu, 20 Jun 2024 18:54:53 +0000. Do not modify this file manually.
import { Account } from "starknet";
import {
    Clause,
    Client,
    ModelClause,
    createClient,
    valueToToriiValueAndOperator,
} from "@dojoengine/torii-client";
import {
    LOCAL_KATANA,
    LOCAL_RELAY,
    LOCAL_TORII,
    createManifestFromJson,
} from "@dojoengine/core";

// Type definition for `core::byte_array::ByteArray` struct
export interface ByteArray {
    data: string[];
    pending_word: string;
    pending_word_len: number;
}

// Type definition for `the_oruggin_trail::models::moves::Moves` struct
export interface Moves {
    player: string;
    remaining: number;
    last_direction: Direction;
}

// Type definition for `core::option::Option::<core::integer::u32>` enum
type Option<A> = { type: 'Some'; data: A; } | { type: 'None'; }
// Type definition for `the_oruggin_trail::models::moves::Direction` enum
type Direction = { type: 'None'; } | { type: 'Left'; } | { type: 'Right'; } | { type: 'Up'; } | { type: 'Down'; }

// Type definition for `the_oruggin_trail::models::position::Vec2` struct
export interface Vec2 {
    x: number;
    y: number;
}

// Type definition for `the_oruggin_trail::models::position::Position` struct
export interface Position {
    player: string;
    vec: Vec2;
}


class BaseCalls {
    contractAddress: string;
    account?: Account;

    constructor(contractAddress: string, account?: Account) {
        this.account = account;
        this.contractAddress = contractAddress;
    }

    async execute(entrypoint: string, calldata: any[] = []): Promise<void> {
        if (!this.account) {
            throw new Error("No account set to interact with dojo_starter");
        }

        await this.account.execute(
            {
                contractAddress: this.contractAddress,
                entrypoint,
                calldata,
            },
            undefined,
            {
                maxFee: 0,
            }
        );
    }
}

class ActionsCalls extends BaseCalls {
    constructor(contractAddress: string, account?: Account) {
        super(contractAddress, account);
    }

    async dojoResource(): Promise<void> {
        try {
            await this.execute("dojo_resource", [])
        } catch (error) {
            console.error("Error executing dojoResource:", error);
            throw error;
        }
    }

    async spawn(): Promise<void> {
        try {
            await this.execute("spawn", [])
        } catch (error) {
            console.error("Error executing spawn:", error);
            throw error;
        }
    }

    async move(direction: Direction): Promise<void> {
        try {
            await this.execute("move", [direction])
        } catch (error) {
            console.error("Error executing move:", error);
            throw error;
        }
    }

    async dojoInit(): Promise<void> {
        try {
            await this.execute("dojo_init", [])
        } catch (error) {
            console.error("Error executing dojoInit:", error);
            throw error;
        }
    }
}

type Query = Partial<{
    Moves: ModelClause<Moves>;
    Position: ModelClause<Position>;
}>;

type ResultMapping = {
    Moves: Moves;
    Position: Position;
};

type QueryResult<T extends Query> = {
    [K in keyof T]: K extends keyof ResultMapping ? ResultMapping[K] : never;
};

// Only supports a single model for now, since torii doesn't support multiple models
// And inside that single model, there's only support for a single query.
function convertQueryToToriiClause(query: Query): Clause | undefined {
    const [model, clause] = Object.entries(query)[0];

    if (Object.keys(clause).length === 0) {
        return undefined;
    }

    const clauses: Clause[] = Object.entries(clause).map(([key, value]) => {
        return {
            Member: {
                model,
                member: key,
                ...valueToToriiValueAndOperator(value),
            },
        } satisfies Clause;
    });

    return clauses[0];
}
type GeneralParams = {
    toriiUrl?: string;
    relayUrl?: string;
    account?: Account;
};

type InitialParams = GeneralParams &
    (
        | {
                rpcUrl?: string;
                worldAddress: string;
                actionsAddress: string;
            }
        | {
                manifest: any;
            }
    );

export class TheOrugginTrail {
    rpcUrl: string;
    toriiUrl: string;
    toriiPromise: Promise<Client>;
    relayUrl: string;
    worldAddress: string;
    private _account?: Account;
    actions: ActionsCalls;
    actionsAddress: string;

    constructor(params: InitialParams) {
        if ("manifest" in params) {
            const config = createManifestFromJson(params.manifest);
            this.rpcUrl = config.world.metadata.rpc_url;
            this.worldAddress = config.world.address;

            const actionsAddress = config.contracts.find(
                (contract) =>
                    contract.name === "dojo_starter::systems::actions::actions"
            )?.address;

            if (!actionsAddress) {
                throw new Error("No actions contract found in the manifest");
            }

            this.actionsAddress = actionsAddress;
        } else {
            this.rpcUrl = params.rpcUrl || LOCAL_KATANA;
            this.worldAddress = params.worldAddress;
            this.actionsAddress = params.actionsAddress;
        }
        this.toriiUrl = params.toriiUrl || LOCAL_TORII;
        this.relayUrl = params.relayUrl || LOCAL_RELAY;
        this._account = params.account;
        this.actions = new ActionsCalls(this.actionsAddress, this._account);

        this.toriiPromise = createClient([], {
            rpcUrl: this.rpcUrl,
            toriiUrl: this.toriiUrl,
            worldAddress: this.worldAddress,
            relayUrl: this.relayUrl,
        });
    }

    get account(): Account | undefined {
        return this._account;
    }

    set account(account: Account) {
        this._account = account;
        this.actions = new ActionsCalls(this.actionsAddress, this._account);
    }

    async query<T extends Query>(query: T, limit = 10, offset = 0) {
        const torii = await this.toriiPromise;

        return {
            torii,
            findEntities: async () => this.findEntities(query, limit, offset),
        };
    }

    async findEntities<T extends Query>(query: T, limit = 10, offset = 0) {
        const torii = await this.toriiPromise;

        // this is perhaps a bad hack especially as this is code gen?
        const clause = convertQueryToToriiClause(query) ?? null;

        const toriiResult = await torii.getEntities({
            limit,
            offset,
            clause,
        });

        return toriiResult as Record<string, QueryResult<T>>;
    }

    async findEntity<T extends Query>(query: T) {
        const result = await this.findEntities(query, 1);

        if (Object.values(result).length === 0) {
            return undefined;
        }

        return Object.values(result)[0] as QueryResult<T>;
    }
}
