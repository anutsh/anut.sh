(function (root) {
    var ask = {
        first: [
            "how does this look?",
            "we know just what you want",
			"like this nut?",
			"that looks delicious",
        ],
        multiple: [
            "can i ever satisfy you?",
            "let's be serious now, nuts are nuts.",
            "why can't you just be happy with what you have?",
            "my ex-squirrel was just like you",
			"here are some different nuts for you",
			"what do you think of these?",
			"last nut was just as delicious",
			"why, you didn't like the last nut?",
			"nom nom nom I like this nut",
			"my ex-squirrel used to like that one",
			"this one looks expecially delicious",
			"my friend chipmunk recommemded this one",
			"I'm running out of nuts to give to you",
			"you're nuts",
			"you're seriously asking for more nuts?",
			"did you know that squirrels are born naked, toothless, and blind?",
			"flying squirrels can be nocturnal",
        ];
    };

    var tag = [
        "hey, i like your nuts.",
        "squirrels use this, why don't you?",
        "bitly ain't got nothing on this",
    ];

    var random = function (n) {
        return Math.floor(Math.random() * n);
    };

    root.nutshell = {};

    root.nutshell.ask = function (n) {
        var x = random();


    };

    root.nutshell.tag = function (n) {
    };
}(window));
