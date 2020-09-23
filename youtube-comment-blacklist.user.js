// ==UserScript==
// @name            YouTube Comment Blacklist
// @namespace       https://github.com/NatoBoram/youtube-comment-blacklist
// @version         0.0.2
// @license         GPL-3.0-or-later
// @description     Removes unoriginal YouTube comments.
// @author          NatoBoram
// @updateURL       https://github.com/NatoBoram/youtube-comment-blacklist/raw/master/youtube-comment-blacklist.user.js
// @downloadURL     https://github.com/NatoBoram/youtube-comment-blacklist/raw/master/youtube-comment-blacklist.user.js
// @supportURL      https://github.com/NatoBoram/youtube-comment-blacklist/issues
// @contributionURL https://paypal.me/NatoBoram/5
// @include         https://www.youtube.com/watch*
// @grant           none
// ==/UserScript==

(() => {
	"use strict";

	const bannedWords = [
		"always has been",
		"anyone ?",
		"anyone?",
		"can't hurt you",
		"for the likes",
		"funniest shit i've ever seen",
		"he turned himself into a",
		"i felt that",
		"let's be honest",
		"modern problems",
		"nobody's going to mention",
		"of likes",
		"require modern solutions",
		"simp",
		"speaking the language of gods",
		"thanks for the likes",
		"this blew up",
		"this comment blew up",
		"tik tok",
		"tiktok",
		"underrated comment",
		"who's watching this in",
	];

	const bannedRegexes = [
		/\d.? (likes|views)/i, // 3k likes / views
		/\n\n\n/, // More than 2 newlines
		/^(\w ?)+:(\n| )/im, // someone:
		/^\d+% (\w ?)+\n/im, // 3% useful
	];

	// Wait for the comment section to load.
	const interval = setInterval(() => {
		const comments = document.querySelector("ytd-comments");
		if (!comments) { return; }
		clearInterval(interval);

		new MutationObserver(() => {
			comments.querySelectorAll("ytd-comment-thread-renderer").forEach(thread => {
				thread.querySelectorAll("ytd-comment-renderer").forEach(comment => {
					const textContent = comment.querySelector("ytd-expander yt-formatted-string#content-text").textContent
						.toLowerCase()
						.replace("’", "'");

					const found = bannedWords.find(word =>
						textContent.includes(word)) || bannedRegexes.find(regex => textContent.match(regex)
					);

					if (found) {
						console.log(`Removing "${found}" : ${textContent}`);
						return comment.remove();
					}
				});
			});
		}).observe(comments, { childList: true, subtree: true });
	}, 1000);

})();
