// ==UserScript==
// @name         YouTube Comment Blacklist
// @namespace    https://github.com/NatoBoram/youtube-comment-blacklist
// @version      0.0.0
// @description  Removes unoriginal YouTube comments.
// @author       NatoBoram
// @match        https://www.youtube.com/watch*
// @grant        none
// ==/UserScript==

(() => {
	"use strict";

	const bannedwords = [
		"911 :",
		"911:",
		"always has been",
		"anyone ?",
		"anyone?",
		"can't hurt you",
		"everyone :",
		"everyone else :",
		"everyone else:",
		"everyone:",
		"everyone:",
		"for the likes",
		"funniest shit i've ever seen",
		"he turned himself into a",
		"i felt that",
		"let's be honest",
		"me :",
		"me:",
		"nobody :",
		"nobody:",
		"nobody's going to mention",
		"of likes",
		"speaking the language of gods",
		"underrated comment",
		"us :",
		"us:",
	];

	// Wait for the comment section to load.
	const interval = setInterval(() => {
		const comments = document.querySelector("ytd-comments");
		if (!comments) { return; }
		clearInterval(interval);

		new MutationObserver(() => {
			comments.querySelectorAll("ytd-comment-thread-renderer").forEach(thread => {
				thread.querySelectorAll("ytd-comment-renderer").forEach(comment => {
					const textContent = comment.querySelector("ytd-expander yt-formatted-string#content-text").textContent.toLowerCase();
					if (bannedwords.some(word => textContent.includes(word))) {
						console.log("Removing comment :", textContent);
						return comment.remove();
					}
				});
			});
		}).observe(comments, { childList: true, subtree: true });
	}, 1000);

})();
