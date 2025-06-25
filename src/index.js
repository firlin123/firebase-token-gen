// @ts-check
/// <reference types="@cloudflare/workers-types" />

/**
 * Built-in types for Cloudflare Workers environment variables.
 * @typedef {Object} EnvBuiltins
 * @property {Fetcher} ASSETS The assets object for static files.
 * @property {"1"} CF_PAGES Whether the request is from Cloudflare Pages or Workers.
 * @property {string} CF_PAGES_BRANCH The branch name of the deployment.
 * @property {string} CF_PAGES_COMMIT_SHA The commit SHA of the deployment.
 * @property {string} CF_PAGES_URL The URL of the Cloudflare Pages deployment.
 */

/**
 * Put your custom environment variables you defined in the Dashboard here.
 * @typedef {Object} EnvCustom
 * 
 */

/** @typedef {EnvBuiltins & EnvCustom} Env */

/**
 * @type {ExportedHandler<Env, unknown, unknown>}
 */
export default {
    async fetch(request, env, ctx) {
        return new Response('Hello, World!', {
            headers: { 'Content-Type': 'text/plain' },
        });
    },
};