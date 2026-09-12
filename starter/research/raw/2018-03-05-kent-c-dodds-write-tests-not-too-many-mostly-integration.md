---
kind: youtube
title: "Kent C. Dodds – Write tests. Not too many. Mostly integration."
url: https://www.youtube.com/watch?v=Fha2bVoC8SE
author: Kent C. Dodds
publisher: Paul Dowman's tech events and interviews
published: 2018-03-05
collected: 2026-09-12
status: complete
---

## Description

Kent C. Dodds explains why automated tests should maximize confidence for the time spent writing, running, and maintaining them. He introduces the Testing Trophy and argues that integration tests often provide the best balance.

The recording is from AssertJS 2018. The publication date records the YouTube upload date.

## Transcript

[Automatically generated captions with rolling duplicates removed.
Technical terms and code identifiers may contain transcription errors.]

[00:00]
great so yes my name is Kent C Dodds I work at PayPal I'm from Utah a whole bunch of other stuff about me all of these things are linked so if you're curious what this thing is or whatever that that's so linked to my slides kcd - I am / right - test - slides so this talk is entitled write test not too many mostly integration and that comes from a

[00:30]
tweet from Jeremy Roush we'll look at that here in a second actually you saw it earlier today and yeah that's what the whole talk is about was dissecting that we're going to talk about high level principles of testing we're not really going to get into frameworks or specifics of testing tools and it is opinionated like every single talk at this conference it's actually really interesting the different opinions that the speakers have presented which is one of the things I like about testing there are so many different use cases

[01:00]
different ways to do things this talk is not going to be bashing on other methodologies or tools it is unfortunately not full of gifts and it's not a 750 there are 25 slides what I I can't even imagine how much he probably did write that program that he was talking about at the end that generated all those slides for him it's crazy stuff ok so let's go ahead and jump in so this is the more than famous tweet from guillermo rauch right test not too

[01:30]
many mostly integration when Gleb showed that the tweet had 180 something retweets so it's you know it's it's pretty popular I guess so let's let's dive into what this means we'll start with right tests I think most people here are cool with the idea of writing tests I don't think I really need to convince anybody that it's a good idea to write tests but I am gonna present kind of the two reasons that I think it's important to write tests the first one is it gives us enhanced workflows it

[02:00]
makes our like if you're using TDD or Brian showed me this like test-driven with Cypress thing yesterday is just like kind of blew my mind it really can enhance your workflow as you're developing your software it can make you more productive but what I want to talk about more in this talk is the confidence that your test can give you the confidence that your application is going to work and that it will work according to the specifications that you wrote it for in

[02:30]
the first place Jason this morning was talking about how he's using Pedro Duty PayPal also uses Pedro duty the last thing that you want is for it to wake you up at 4:00 a.m. or when you are wakeboarding oh shoot I've got to fix this bug guys oh well okay just like he totally gives up you could see it on his face he's like well I guess this laptop is right now so that that's why we write

[03:00]
tests this is for that confidence that it can give us so that we can rest easy we don't have to do really in difficult deploys when we're like - point of production that takes two weeks of an engineer's time it test can really help us build that confidence and so this bit not too many so let's talk about code coverage code coverage is the metric that we generally use to determine how many tests we have or how how well our

[03:30]
code is covered if you're not familiar with this it's a code coverage report by Istanbul and that's kind of the de facto standard for coverage in JavaScript and here's a specific file it's showing us hey you never your tests never ran this line of code and so you should maybe add a test and then you can cover that line of code or or you didn't cover the eltz case of this if statement and so that's that's what code coverage is so the question is well how much code coverage

[04:00]
do you need in your your project what percentage is a good one I hear this question a lot and it's a great one and just like every other answer that you hear in your business class that I heard in my business class was it depends it really does depend do you all remember this from earlier this was one of my favorite slides from from this conference because it actually because I was like sweet I can use this in my talk

[04:30]
so this is so true it's it's really easy to get good code coverage instantly you just like require the file and you have a whole bunch of code coverage especially if it's not too complicated but after a while it tends to like the return on your time doesn't give you the same amount of coverage and so what that sweet spot is that Aaron was talking about is there there's some level where it makes sense to focus on coverage or

[05:00]
versus like focusing on shipping features so if you're working for a company that where it's super super important nothing ever breaks then you'll probably be on the right side of that line a little bit if you're at a start-up that's just trying to turn out a product because you need to get funding then maybe on the left side a little bit if you're writing a library like Aaron said 100% code coverage is generally pretty simple especially if it's a small library so on I publish like over a hundred packages on NPM and

[05:30]
almost all of them have 100% code coverage because it's pretty easy generally to get that but for applications I I'm not even going to give you a number I've given numbers before and like it's there's no number one thing that I would or one reason that I am nervous about 100% code coverage in applications and I've seen teams that enforce to 100% code coverage in an application what inevitably will happen is you start

[06:00]
testing implementation details so that you can just cover that edge case that is like really weird and you have to do these really weird things and so you start exposing private functions or you start doing a bunch of weird things just to get this this 100% code coverage metric which winds up doing a couple of things and so you can tell whether you're testing implementation details if your test is doing something that the consumer of the code would never do like using a private function for example you

[06:30]
you just expose this just for the test well yeah that's that's an implementation detail of that module so it like yeah that can be a problem and the reason that it's a problem is when you're testing implementation details Chane refactoring the code making making the implementation the same but changing how that implementation works is going to break your tests and this is going to make people not like testing and I think we can all agree here that we're after this conference we're going to spread out into the world and we're going to be

[07:00]
like testing is the best and none of us wants people to not like testing we want we want testing to have a good reputation and by testing implementation details you're not helping so avoid that so that's why we we say not too many so then mostly integration so here's where things get a little bit opinionated so the testing pyramid I added this after today because I mean everybody's got to

[07:30]
have a testing period so this is the standard testing pyramid here's the gleb pyramid Thank You Kari for taking this photo thank you I hit a snag that from Twitter and here's the Aaron's Square saw this from today Kerry also and this is the testing Dorito so you probably can't read it so I'll read it for you it says tests I plan to write tests so I start writing tests I delete because I decide they are

[08:00]
stupid and take more time than they are worth and then tests this actually I really like this a lot it reflects reality of lots of developers really well so I am going to give you a whole new thing to learn about this is something that I was thinking about a lot recently and I created oh wait sorry I switched the order of my slides just

[08:30]
like right before my talk so we're gonna we're gonna get to that here in a second so so let's talk about the different forms of testing first static code analysis I think Gleb mentioned today that a static code analysis is a form of testing so if you're using a tool like es lense to catch simple bugs like there's no undef rule like that's that's a really really great way to catch a bunch of bugs that like entirely removes a whole suite of

[09:00]
tests that you never need to write because your your linting against those and the really cool thing about static testing tools or static analysis tools is you don't have to actually run your application or any of your code for them to be valuable one place where a tool like es lint is totally invaluable is linting against semicolons and like stylistic stuff just like jason said just install prettier and don't like break the build because somebody forgot a stinking semicolon okay so then we

[09:30]
have flow and flow actually does an even better job of eliminating a whole category of tests here we're passing in this three variable into the subtract function it's expecting a number and so flow is catching that for us you can also use typescript for this aesthetic type checking but yeah the idea of these static code analysis tools is that they can eliminate a whole category of tests that you never need to write I never need to

[10:00]
write a test for the subtract function to see what happens if I pass in a string instead of a number so that's pretty cool the problem with this is these tools can't really test any business logic so that's why where we move into unit tests so unit tests are pretty simple we've seen a lot of the these today I think we probably see I think Justin actually showed basically this I'm pretty sure he copied my slides just kidding but yeah they're pretty

[10:30]
simple and they can get a little bit more complex if you start and wanting to mock a bunch of things but yeah generally pretty simple then you have integration tests these generally take a little bit more setup here we're starting a server we're resetting a database we have to make sure we close the server so we don't like have a memory leak or something and then we can do our tests and we're like making actual requests and things like that to our API so integration tests are really great because they're definitely testing a whole lot of your business logic the

[11:00]
stuff that actually will break and can cause like serious problems and but as far as like the setup is concerned it's actually not a whole lot it's probably more generally than then a unit test would be but it's still not like our too arduous and then we have our end-to-end tests and this is using Cypress because it's the only end-to-end test tool you'll ever need for browser testing it is so good by the way so here

[11:30]
we're just we have this little fake user we're visiting our application we're typing in the form and then we're verifying that the your that the user was redirected when they registered and that their username is properly to Spain okay cool so here's the testing trophy so this if I could change one thing about the testing trophy it would be I'd probably make the end-to-end test a little bit bigger but it was really hard for me to make this so I didn't remake

[12:00]
it but this isn't intended to be like a hard fast like this is how you or like the ratios so don't try to figure out like geometrically what the ratios here are because that would be silly but this is the general idea so you have your static tests and those should just be natural and and they're pretty easy to set up especially eeeh sláinte you don't have to do a whole lot with with typing java scripts - with typescript or flow it takes a little bit more effort but then you have your unit tests and those are

[12:30]
really valuable don't do away with unit tests but integration tests take this big spot in the middle and I'll explain why here in a second then we have our end-to-end tests so with with the testing pyramid and with the testing trophy one of the the things about it is that as you move up the trophy you're going to go from tests that are really cheap to write and run all the way up to tests that are crazy expensive to write and run and Cypress is doing a great job of making it less expensive but it still is going to be more expensive than just

[13:00]
like adding some types of writing a unit test for for some simple function so that's one property of the testing trophy another is as you go from the bottom to the top your tests are going to get slower it's so much faster to just like run a node process than to pull up a full browser and run that hopefully that will get faster in with our our tools but still it's going to be faster to to have these lower level tasks so so far if you just

[13:30]
look at these you're gonna say well why don't I just do like static for everything because they're cheap and they're faster it makes a lot of sense but the one thing that we haven't talked about yet is what I call the confidence coefficient so as you move up the testing trophy your confidence coefficient also goes up and so the the things at the bottom are intended to solve really simple problems so like I passed a string instead of a number

[14:00]
that's that's a pretty simple problem and generally you'll catch that pretty quickly even if you didn't have the the test in place or the static analysis in place but the end-to-end tests are going to catch your big problems like oh the check out button doesn't work that's like an enormous problem because it would cost us millions of dollars a minute because nobody can check out so the reason that I say integration like mostly integration now or the reason I

[14:30]
agree with Guillermo is because they I feel like they provide the best balance of tests that are cheap they run quickly and they solve they can help you solve bigger problems they they can't help you solve all of the problems but definitely I feel like they have a really good balance of the three properties and our tools are getting better so that each one of these properties are improving as well so like I said you you don't do away with your unit tests keep those

[15:00]
those are really important really valuable what Justin was showing was like really cool as a way to to develop a well-designed system so I think those kinds of things are valuable still and definitely keep your end-to-end tests going those are really great for your happy path make sure that all of those things things still work and then your integration test just sit nicely in the middle so a big question that I get about like the unit two versus integration test is how do I do it like the difference is so fuzzy it's as

[15:30]
Justin said it's loosey-goosey so how do you write more integration tests and like not write quite as many unit tests or how do you change your unit test to an integration test the biggest thing is poke fewer holes in reality and that was something that Justin mentioned in his talk as well the the more holes that you poke in reality the instant you poke a hole in reality you have zero confidence around that hole unless you you fill that in with some other test

[16:00]
and so by this I mean using some mocking or if you're doing react the shell a rendering thing I really don't like shell rendering like a lot come and ask me about it later but we yeah I definitely avoid poking holes in reality unnecessarily and then the other is to test higher up your trees so instead of just like taking a snapshot of your button component that literally just renders a button I don't care about that test to be perfectly honest

[16:30]
why don't you render like your page like your settings page and then click around on us like you can simulate clicks around on that page and make some verifications like oh when the user user name input is incorrect or like when it's invalid then the submit button is disabled and you can test that integration a lot easier if you just test higher up than your tree and you can cover all of the same things that you would cover if you took snapshots of your button component and yeah not not

[17:00]
super useful and you can cover it with integration tests so just a big thank you to Guillermo for tweeting this back in December of 2016 I think it's awesome it made me kind of rethink some of the things that I decided about testing and I hope that was helpful to you as well thank you
