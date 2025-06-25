// @ts-check
/// <reference types="@cloudflare/workers-types" />
import { WorkerEntrypoint } from "cloudflare:workers";
import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

/**
 * Built-in types for Cloudflare Workers environment variables.
 * @typedef {Object} EnvBuiltins
 * @property {Fetcher} ASSETS - The assets object for static files.
 * @property {"1"} CF_PAGES - Whether the request is from Cloudflare Pages or Workers.
 * @property {string} CF_PAGES_BRANCH - The branch name of the deployment.
 * @property {string} CF_PAGES_COMMIT_SHA - The commit SHA of the deployment.
 * @property {string} CF_PAGES_URL - The URL of the Cloudflare Pages deployment.
 */

/**
 * Put your custom environment variables you defined in the Dashboard here.
 * @typedef {Object} EnvCustom
 * @property {import('firebase-admin/app').ServiceAccount} FIREBASE_SAK The Firebase service account key.
 */

/** @typedef {EnvBuiltins & EnvCustom} Env */

/**
 * @type {WorkerEntrypoint<Env>}
 */
export default class FirebaseTokenGen extends WorkerEntrypoint {
    // /**
    //  * Firebase app instance.
    //  * @type {import('firebase-admin/app').App}
    //  */
    // #app;

    /**
     * Creates a new instance of FirebaseTokenGen.
     * @param {ExecutionContext} ctx The context for the Worker.
     * @param {Env} env The environment variables for the Worker.
     */
    constructor(ctx, env) {
        super(ctx, env);
        // this.#app = initializeApp({
        //     credential: cert(env.FIREBASE_SAK),
        // });
        console.log(env);
        this._ctx = ctx;
        this._env = env;
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
        const ctxRep = [''];
        const envRep = [''];
        for (const key in this._ctx) {
            ctxRep.push(`${key}: ${this._ctx[key]}`);
        }
        for (const key in this._env) {
            envRep.push(`${key}: ${this._env[key]}`);
        }
        return JSON.stringify({ ctx: ctxRep.join('\n'), env: envRep.join('\n') });
    }
};