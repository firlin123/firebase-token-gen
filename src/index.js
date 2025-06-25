// @ts-check
/// <reference types="@cloudflare/workers-types" />
import { WorkerEntrypoint } from "cloudflare:workers";
import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';


/**
 * Put your custom environment variables and bindings you defined in the Dashboard/wrangler.toml here.
 * @typedef {Object} Env
 * @property {string} FIREBASE_SAK_JSON The Firebase service account key.
 */

/**
 * @type {WorkerEntrypoint<Env>}
 */
export default class FirebaseTokenGen extends WorkerEntrypoint {
    /**
     * Firebase app instance.
     * @type {import('firebase-admin/app').App}
     */
    #app;

    /**
     * Creates a new instance of FirebaseTokenGen.
     * @param {ExecutionContext} ctx The context for the Worker.
     * @param {Env} env The environment variables for the Worker.
     */
    constructor(ctx, env) {
        super(ctx, env);
        this.#app = initializeApp({
            credential: cert(JSON.parse(env.FIREBASE_SAK_JSON)),
        });
    }

    /**
     * Default fetch handler for the Worker.
     * @param {Request} request The incoming request.
     */
    async fetch(request) { return new Response('Hello'); }

    /**
     * Generates a Firebase custom token for a given user ID.
     * @param {string} uid The user ID for which to generate the token.
     * @return {Promise<string>} The generated custom token.
     */
    async generateToken(uid) {
        return await getAuth(this.#app).createCustomToken(uid);
    }
};