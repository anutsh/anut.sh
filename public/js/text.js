(function (root) {
    var ask = {
        first: [
            "how does this look?",
            "we know just what you want.",
			"like this nut?",
			"that looks delicious.",
			"doesn't this look good?",
			"i like it, don't you.",
			"pretty nuts, right?",
        ],
        multiple: [
            "can i ever satisfy you?",
			"you don't seem particularly satisfied...",
            "let's be serious now, nuts are nuts.",
            "why can't you just be happy with what you have?",
            "my ex-squirrel was just like you.",
			"here are some different nuts for you.",
			"what do you think of these?",
			"last nut was just as delicious.",
			"why, you didn't like the last nut?",
			"nom nom nom I like this nut.",
			"my ex-squirrel used to like that one.",
			"this one looks expecially delicious.",
			"my friend chipmunk recommemded this one.",
			"I'm running out of nuts to give to you.",
			"you're nuts.",
			"you're seriously asking for more nuts?",
			"squirrels are born naked, toothless, and blind?",
			"flying squirrels can be nocturnal.",
			"did you know that ducks also eat acorns?",
			"pigs and bears also eat nuts.",
			"flying squirrels can be nocturnal.",
        ],
    };

    var tag = [
        "hey, i like your nuts.",
        "squirrels use this, why don't you?",
		"have you ever tried these nuts?",
		"would you like some nuts?",
		"come here I have some good nuts for you.",
		"let me suggest you some delicious nuts.",
		"here, I'll share some of my nuts with you.",
		"you should try some of these nuts.",
		"\"try me.\"",
        "bit.ly ain't got nothing on these nuts",
        "how do you like them apple nuts?",
		"nutify your URL.",
    ];

	var err = [
		"that is not a valid url.",
		"give me something better.",
		"do you want my nut or not?",
		"hey, that is not what I expected.",
		"i know my urls, that isn't a url.",
		"is this a joke? that's not a url.",
		"i'll keep my nuts to myself.",
	];

	var nopage = [
		"are you sure you buried that there?",
		"we couldn't find your page...",
		"sorry, I just don't have any nuts for you.",
		"I can't seem to find my nuts.",
		"where could my nuts be....",
		"I think you are asking for something ridiculous.",
        "hahahah... wait, you were serious?"
        "talk to the tail, because the nut doesn't want to."
        "i seem to have lost my tree.",
        "that's a crazy place for a web page.",
	];
    var random = function (n) {
        return Math.floor(Math.random() * n);
    };

    root.nutshell = {};

    root.nutshell.ask = function (n) {
        var tagline;

        if (n === 0) {
            tagline = ask.first[random(ask.first.length)];
        } else {
            tagline = ask.multiple[random(ask.multiple.length)];
        }

        return tagline;
    };

    root.nutshell.tag = function () {
        return tag[random(tag.length)];
    };

    root.nutshell.error = function () {
        return err[random(err.length)];
    }
	root.nutshell.nopage = function () {
		return nopage[random(nopage.length)];
	}
}(window));
