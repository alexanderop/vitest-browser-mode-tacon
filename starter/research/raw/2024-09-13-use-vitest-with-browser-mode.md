---
kind: youtube
title: "LWJ: Use Vitest with Browser Mode with Vladimir Sheremet"
url: https://www.youtube.com/watch?v=p2cCpG2FeLU
author: Jason Lengstorf and Vladimir Sheremet
publisher: CodeTV
published: 2024-09-13
collected: 2026-09-11
status: complete
caption-source: creator-provided English captions
requested-timestamp: "00:13:59"
---

# Transcript

The video credits White Coat Captioning for the live transcript. This capture groups the creator-provided English captions into 30-second intervals. Caption errors remain unchanged.

[00:00]
JASON LENGSTORF: Hello, everyone. And welcome to another episode of Learn With Jason. Today, on the show, we're going to dig into something that I think a lot of us are resist but we shouldn't be testing. Testing, in the browser, is something that has been thoroughly explored. It can be a little overwhelming a little bit tricky, but there are a lot of great libraries out there, especially some of the newer libraries that are coming out, that make this less painful.

[00:30]
Today, we are bringing one of the maintainers of Vitest, Vladimir Sheremet. Vladimir, thank you so much for being here. VLADIMIR SHEREMET: Thank you so much for inviting me. JASON LENGSTORF: I'm really excited to have you on the show. Testing is one of those things that every time I have a project that is well tested, I'm so happy and every time I create a new project, I talk myself out of writing tests and I don't know why that happens.

[01:00]
[Laughter]. I'm hoping maybe today, you're the one who's going to fix me. [Laughter]. VLADIMIR SHEREMET: I don't know if I can. [Laughter]. Well, like building things, we like building and them go build more and more and more. We don't want to spend time to just make sure cement is good, that the foundation is working. We just build, build, build. [Laughter]. JASON LENGSTORF: Before I take off running, let's take a quick second and let people know who you are. Can you give us a bit of a background?

[01:30]
VLADIMIR SHEREMET: Well, I'm a developer. [Laughter]. I started with Vue, maybe 2021. 4 5 years ago. Now� [Laughter]. � we are jumping, now, to Vitest. And I joined Vitest...well, actually, I joined Vitest in 2021, December. I was working at my company. We were started to use Vite and had problems

[02:00]
with Jest. There was a lot of incompatibility, APIs, didn't just work in� in Jest at all. I wanted to make sure that I can test my� our components and the company I was working for, we can test our components properly. There's enough APIs that we don't really need to rewrite

[02:30]
everything. We don't like write testing again and again and again. So, this was my main goal and� [Laughter]. I was very active at the time. Anthony, I think he was here last year, Anthony invited me to the time, alongside other contributors. So, yeah, now I'm a core maintainer. I work, every day, on Vitest.

[03:00]
JASON LENGSTORF: Very, very cool. And so folks who aren't familiar with Vitest, itself, can you give us a high level overview of what it is? VLADIMIR SHEREMET: Vitest is a testing framework. So, what is a testing framework? [Laughter]. So, you write your code for your application, then you want to make sure this code works after you change the color of

[03:30]
a button and all excited doing that, you broke one interface. To not break other interfaces, while making the small changes or big changes or refactors, if something is deprecated, you usually write tests to make sure your execution stays consistent. Vitest helps you with that. It's a tool to run, to write those tests and to run them whenever you want, locally, any time you want.

[04:00]
JASON LENGSTORF: And so this is� you know, it's similar than if, for those of us who have worked with other testing frameworks, if you've worked with Mocha, if you've worked with� like, what are the other ones? Gest? >> Jasmine, Ape. Node Test. JASON LENGSTORF: So each of these tools has a somewhat familiar� I think some of them

[04:30]
are a little different than others, but a lot of them have sort of adopted the pattern of, it does a thing and then it runs a function and that function executes your code to make sure you compare the output of your code and that's how you know it continues to work, even as it evolves over time. This is fine when we're testing business logic. I want to make sure the math I'm doing is still correct, even as I'm changing

[05:00]
utility. Where it gets really tricky and I where think I� and a lot of other folks� have kind of fallen off, when it comes to testing behavior, which is the most important part of testing, in my opinion, on the web. What we care about is that the button isn't exactly where the button was last time we ran the code. What we care about is when they click the button,

[05:30]
they can log in or buy something from the store. In order to do that, we have to have, like, a browser. So, the way that I remember doing this� back when I was at IBM, we had a manual QA team and every time we made a change, they would open up a browser and run through the list and do all of the things on that list to make sure it worked. It was tedious, it was super error prone. They would get bored and wouldn't see something was broken,

[06:00]
skip something. So then we started looking at new solutions and I can't even remember what all of them were, but there were� there were, like, automated, Selenium, now what's the one today, Playwright. Cypress has a thing that does this. The goal of these

[06:30]
is that they actually open a browser and run the code automatically and then give you a report based on whether or not they were able to do the things that were supposed to be done. And if I understand correctly, Vitest just introduced a way to make this even easier? VLADIMIR SHEREMET: I don't know about making it even easier. [Laughter]. So, we� we are� so� [Laughter].

[07:00]
There is this thing called component testing, which was basically introduced a few years ago, as a concept of testing your components. Previously, you would run your end to end test, they are called. You would start a browser, you open the page. You� everything is loaded. You go one by one. You still need to do is for some cases, but people started to see, maybe I could be faster if we do it in smaller chunks. More unit like, more integration

[07:30]
test like. In a nutshell, Playwright has component testing, Driver has component testing. The main reason why I was passionate about Browser Mode is because I got tired of DOM issues.

[08:00]
They introduce APIs and restrict other APIs. DOM stays the same throughout the years. There's not a lot of contributions going on. There is an alternative that is active, but it's not complete like JS DOM. If we can make it faster, easy to run in an actual browser, we should give it a try. This is our take on component testing, basically, yes.

[08:30]
JASON LENGSTORF: You just said, make it run in an actual browser. Can you talk a little bit about how that works? VLADIMIR SHEREMET: So, by default...we just start a Vite server. And then we open the browser, your browser, your actual browser. You don't need to install anything. You don't need to have anything prepared. You open your browser and tests are running. It's kind of hard to do NCI. We are having an option to provide your own provider. So,

[09:00]
if you already have tests for Playwright or WebDriver, you can reuse them with Vitest. I'm always testing with Playwright, my personal choice.

[09:30]
So, yeah, by default, it's very� it's also supported in Stack Blitz. You can open production and run it and everything's in one tab. Very convenient. JASON LENGSTORF: Very cool. Okay. So, um, you talked about component testing and the idea behind that is that I am taking my, um� I'm taking my� my components that� like, the UI behavior, but I'm breaking it down into the smallest piece of UI I can test as opposed

[10:00]
to opening up a whole browser, a whole website and that seems like the sort of thing that is actually really powerful for a lot of reasons. Like, for example, if I'm doing something that relies on data, but the data gets pasted into the component, I don't need my test to have database access and user access and all of the things I would need. I can just give it data.

[10:30]
Right. And I can drop that in as prop and then I can make sure that my component continues to work. That feels very good and then I can still have, you know, my end to end test to run the most critical flows in my app. But I can test all of the things throughout all of my components without having to wait an hour and a half for my full integration unit, end to end suite unit to run. VLADIMIR SHEREMET: I like to have this critical path, for an end to end test and then you test edge cases, or different paths for component tests. You can pass down the data,

[11:00]
which is nice, which is a good� a good thing, but for performance, also, it's very nice. In the time it would take you to run one end to end test, you can run hundreds in the browser, just for a single component. You can run 100 tests in one file instead of 100 tests in end to end tests, which will take you some time, quite some time.

[11:30]
JASON LENGSTORF: I have a million other questions, but I think it'll be easier to show them in code. So, why don't I take us over into the pair programming mode. Before we get started, let me turn on the banners. We've got this show, like every show, being closed captioned. We have Vanessa here, from White Coat Captioning. Thank you, Vanessa. That is made possible

[12:00]
through the support of our sponsor, Netlify. We are also, today, user Tuple and it will allow Vladimir and I to pair program. All the things that we want to make pair programming a little bit easier and I've been enjoying it. We are talking to...Vladimir,

[12:30]
here on the internet. And I don't know why I wasn't following you. I'm following you now. So you should go and give a follow. I like the, um� the Vite maintainers with cats as profile photos. It's good. [Laughter]. VLADIMIR SHEREMET: It's a requirement. [Laughter]. JASON LENGSTORF: So here is a link to Vitest, if you want to check this. This will end up in the show notes, as well. There we go. There's the link there. We're talking about Browser Mode,

[13:00]
specifically, today. So I'll drop a direct link to Browser Mode. VLADIMIR SHEREMET: Yes. Just a note, a few hours ago, we released 2.1, so changes to how Browser Mode works and how the APIs work. JASON LENGSTORF: Excellent. I'm super excited. Okay. So, if I am...I want to learn, right, I want to get better at testing,

[13:30]
we're going to see if we can fix me today, what should I do first? Where should I start? VLADIMIR SHEREMET: You should have a project, first, to test. Right. JASON LENGSTORF: Okay. So, why don't I switch over here and I'm going to jump into my GitHub folder and let's do, uh, "npm create." You're a Vue� Vue dev, right?

[14:00]
VLADIMIR SHEREMET: Yes. JASON LENGSTORF: Is it "npm create Vue"? VLADIMIR SHEREMET: If I only knew. JASON LENGSTORF: Vite and then we can use Vue? We're going to call this "Vitest Browser Mode" and then we'll choose "view" from the list, there it is. TypeScript. Okay. Actually, let me just open this...all right. So now we have this project and I'm going

[14:30]
to get init so that it's not hidden. We'll npm install...then we can "npm run dev." We have a new Vue site, it's running in Vite. We have a counter. And it looks like it's all

[15:00]
simple. So, here's our general setup and then we've got our "hello world" in here so if we open up the "hello world," we can see our bits. Here's the count. Cool. Okay. I'm ready.

[15:30]
VLADIMIR SHEREMET: Okay. Now we have a project. Nice. Now, what we need to do is install Vitest, I guess. Vitest doesn't have "create" commands, but it has its own command. We made one in Vitest 2. Previously, it wasn't a very nice experience to add to browser tests. JASON LENGSTORF: Is it "npm install Vitest." VLADIMIR SHEREMET: "@Vitest/browser." JASON LENGSTORF: Okay. All right. So,

[16:00]
I have� let's look in the package JSON. I have Vitest, I have Vitest Browser. VLADIMIR SHEREMET: Now, let me remember� [Laughter]. I think it's� so, "Vitest init browser."

[16:30]
JASON LENGSTORF: Like that? VLADIMIR SHEREMET: Yeah. JASON LENGSTORF: Okay. TypeScript. And you said Playwright? VLADIMIR SHEREMET: We can try with Playwright. We can use Preview. That's the default. For Playwright, we need to install it. We can install it to see how it works, also. JASON LENGSTORF: Got it. Let's see�

[17:00]
VLADIMIR SHEREMET: It doesn't matter for the preview because you can choose any browser at any time. JASON LENGSTORF: Okay. We're using Vue. Nice. Okay. All right. I'm following. So, now, we can� VLADIMIR SHEREMET: It should have added your test browser script, I think. Package JSON. By default, it installed you, also, an example, with another "hello world" example.

[17:30]
[Laughter]. To run your test� JASON LENGSTORF: Okay, okay. VLADIMIR SHEREMET: With... JASON LENGSTORF: Got it. Okay. So, in our example, when I run...the test browser, the Vitest Workspace is set up here. How does it know� VLADIMIR SHEREMET: By default, it creates� so, it checks, from known number of config. So if

[18:00]
you didn't have any config, it would create your Vitest config. But since we cannot assume that you reuse the same config, we create a workspace that has� so you can run your Node.js tests at the same time as your browser tests because we cannot assume you're looking for only Browser Mode. So, to run it, I think you need to test browser, or something?

[18:30]
JASON LENGSTORF: "Npm run test browser." VLADIMIR SHEREMET: I saw some errors. JASON LENGSTORF: "Await can only be used inside..." VLADIMIR SHEREMET: The example isn't very correct. [Laughter]. It's not� yeah, yeah. The generated� JASON LENGSTORF: This... VLADIMIR SHEREMET: Test should be� no, no, no.

[19:00]
JASON LENGSTORF: The callback. VLADIMIR SHEREMET: Yeah, the callback. Our QA didn't caught it. JASON LENGSTORF: So, the requested module does not provide an export in page. VLADIMIR SHEREMET: This is the first time I'm trying with 2.1, so we're going through this together. [Laughter]. We both see these errors for the first time.

[19:30]
JASON LENGSTORF: Okay. So, let's see, this one is saying "property element doesn't exist on property type static." VLADIMIR SHEREMET: Yes. When you ran init, I think it also printed you a helpful message. JASON LENGSTORF: Oh, and then I totally didn't read it. [Laughter]. VLADIMIR SHEREMET: Since it's possible for TS Config to have references, we thought it would be fine to ask you to add types and there is Vitest Browser.

[20:00]
JASON LENGSTORF: Where do I put those? Do I have to install that? VLADIMIR SHEREMET: No, you don't need to install it. It should be in the TS Config that covers test. JASON LENGSTORF: TS Config. VLADIMIR SHEREMET: We can just add, also, I guess, all tests here.

[20:30]
JASON LENGSTORF: Okay. Um...where do I put that? VLADIMIR SHEREMET: Let me try� try this functionality. [Laughter]. JASON LENGSTORF: Yeah, yeah, go ahead. Keyboard input is the same. Oh, it works. VLADIMIR SHEREMET: At least this works. [Laughter].

[21:00]
JASON LENGSTORF: Okay. Okay. VLADIMIR SHEREMET: And let's add Types here...so, if you use any providers, you would add� oh. You would add something like, Vitest� this is all in documentation, the installation steps, this is all described very well. By default, I think it's this. I save it...yes, now it sees an element.

[21:30]
JASON LENGSTORF: Got it. Let me run this again...and it says, this time...it doesn't like...Vitest browser context does not provide an export named Page. But we're not using an export named Page. Let me just stop and restart it. VLADIMIR SHEREMET: Debugging in realtime. Interesting.

[22:00]
JASON LENGSTORF: So, one of them worked. One of them failed. I can... VLADIMIR SHEREMET: Oh, yeah. So, what worked� 1 didn't one. The first one is your Node test because default, we're like� since we're still Node based, we decided not to remove your ability

[22:30]
to run tests in Node. So in the Vitest Workspace file, you can go back and comment out the first line. So, in the comment, it says if you have existing tests, this will keep running them. JASON LENGSTORF: Oooh. I get it. VLADIMIR SHEREMET: But since you don't have an existing test, you don't really need it. We need to run again, I guess. JASON LENGSTORF: There we go. Now we're running our one set of tests. Good. Good. Good. Okay.

[23:00]
VLADIMIR SHEREMET: Whew! JASON LENGSTORF: We did it. [Laughter]. That's on me for immediately clearing the output of that� that set up when we ran it and then it got eaten by� when I started the test. Okay, so now we've got basic tests running and what we're expecting here is that we have...we're looking for the� the "get by text." We're

[23:30]
rendering the "hello world" component and we make sure it has "hello Vitest" in it, which is great. So, this makes sense. I can define the props. I can choose the component I'm rendering. This� I get this. This makes sense to me. VLADIMIR SHEREMET: Yes. This is based on testing library, which is a library made by [Indiscernible], I think. I really like the approach of the� I think it's Testing Trophy. You have unit tests, you have so on and so on so we decided to adopt the new approach,

[24:00]
which is inspired� it's forked from Playwright. It works in the preview and it works in [Indiscernible]. So whatever you use, this still works between all the different providers.

[24:30]
Uses the same mechanism under the hood. JASON LENGSTORF: Got it. So, there's a question. You just mentioned the React Testing Lib, why would you reach for this over the testing library or I guess, what are the trade offs between the two? VLADIMIR SHEREMET: So one of the things that we really wanted to have is built in retriabilities. Inspect element, synchronous matchers. "Get by text" will retry so it has an element�

[25:00]
let me show. So, it has an element method. It will call this element method until there's an element, an existing element. If there's no element, it'll throw an error. We really wanted to have this easy and� yeah, easy� easy built in. I wasn't able to achieve the same with testing library.

[25:30]
Another thing that I wanted to solve is shadow dome access. There is a requirement and testing library doesn't support. So I was looking for solutions and I liked how Playwright resolved this. So, in the end, we ended up with this one. There was a big discussion, with the team, how we want to approach this and this looked like the best outcome.

[26:00]
JASON LENGSTORF: Very cool. VLADIMIR SHEREMET: As you can see here, so we saved the file and the test took 129 milliseconds, so running your tests� 15 milliseconds. It is actually fast had when the browser is open. JASON LENGSTORF: Yes, I'm leaving it open in the background here. We've got our tests running. Actually, why don't I put these side by side. VLADIMIR SHEREMET: You can actually edit files inside of the UI.

[26:30]
JASON LENGSTORF: Oh, for real? VLADIMIR SHEREMET: If you can expand it for a bit...I'll click� so, if you hover, so it doesn't� it doesn't� [Laughter]. So, there is this button "show details," and there's a report for the test. You can see the graph of your files. You can see the contents and how it's actually rendered,

[27:00]
this is your source code and this is what the browser sees. And, so, again, there is consoles and there is a code. So, we can� I think we should be able to use this...yes. JASON LENGSTORF: Ooh, interesting. Is that saving back? VLADIMIR SHEREMET: It's saving back, yes, to your source code. This also works with Node.js. We decided to reuse the API. It was used when Vitest started. It improved

[27:30]
the performance of UI. When I decided to reuse the UI for Browser Mode, I made some questionable choices. [Laughter]. How it was structured. And so, they came in and helped me fix this. In 2.1, where just wanted to show, the main thing that comes with 2.1 is resizable window. In 2.0,

[28:00]
this UI would be one to one. If your screen was small but you had a big viewport in your test, you would see only part of it. But, now we are� we are resizing it. JASON LENGSTORF: Oh, interesting. VLADIMIR SHEREMET: So you can see all the content in your test. JASON LENGSTORF: Yeah. That's really cool. I like that. So, this is slick. So, I mean,

[28:30]
this� already, I'm really excited about this idea that if I'm working on something, I can fix my test here. If I'd broken it� VLADIMIR SHEREMET: It's interesting, actually, yeah. JASON LENGSTORF: Because this one is failing because it doesn't have the right info. I can see that and get in here and figure out what I did wrong and now I'm passing. That rapid feedback is so important when� when you end up� like, whenever I'm

[29:00]
building something, what makes me not want to do tests is if I know that writing tests means that I'm going to try it and then I have to run a 45 second test suite and if it fails, I have to remember. Having this instant feedback of if I'm wrong, I get that feedback in a second and I

[29:30]
can go and look and go, okay, what did I do wrong? It needs to be the right props. That feedback loop will keep me in the zone as opposed to waiting for results, getting up and getting a snack, checking Twitter. This is like HMR for tests. [Laughter]. VLADIMIR SHEREMET: Yes. This is how it started, how� so, Anthony came up with how it works. This

[30:00]
is how we are promoted it. It's basically HMR for tests. We do really like how yeah. So, just by default, for example, runs tests and then finishing the output, right. So� but Vitest, by default, follows what Vite does as a dev environment. It starts the dev environment, your testing environment and you work inside of it so everything is always ready, which makes it very fast, when you work with it.

[30:30]
JASON LENGSTORF: Very cool. VLADIMIR SHEREMET: Startup time can be not up to standards, especially in Browser Mode. JASON LENGSTORF: We chose Vue. Does this work with Angular? [Laughter]. VLADIMIR SHEREMET: I saw, today, Angular� there is a project that works with Angular,

[31:00]
but I haven't tried it personally. JASON LENGSTORF: Okay. VLADIMIR SHEREMET: So I cannot� I've never written an Angular test so I cannot vouch for it. But I'm sure it's possible to make. JASON LENGSTORF: It looked like there were...um, a bunch of different� where was it? There was� somewhere there was a list, if I remember correctly. There was Vitest Vue, Vitest React. VLADIMIR SHEREMET: Yes. Let me try to overtake.

[31:30]
JASON LENGSTORF: Yeah, go ahead. VLADIMIR SHEREMET: I think...it should be� other examples. So, if we go here, for Vue, Svelte, there are built in ones. We can expand for Preact, such like that, later, or Angular. And here are...very lucky for me. [Laughter].

[32:00]
There are some examples for actually how to use events, you know, to fill the input type� type data into the input and there are examples with testing libraries. One of the reasons why we decided to move to our own package is because we had to� we had our own user event implementation through, like, protocol, [Indiscernible] protocol, which actually fires an actual event so emulating them, how it works with cypress, for example. The

[32:30]
documentation was, here is your testing library to render stuff and here's a testing library event, it's actually different user and it was kind of� kind of a chaos. Having it all under one umbrella helps explain stuff and makes it easier for the end user to actually use it. JASON LENGSTORF: Got it. Okay. Yeah, that makes sense. So,

[33:00]
let me...get back over here. I'm going to pull this down and then, um...let's get� let's� let's do it. Yeah. All right. So, question, um...when I first heard about Browser Mode, I recall being mentioned that it can help with end to end, similar to Playwright, does it run Playwright tests? I think I know the answer to this. It does. VLADIMIR SHEREMET: You can answer.

[33:30]
Kind of, yes and kind of, no. [Laughter]. It used Playwright so you can actually any Playwright API from the page, browser or frame, but it doesn't actually run Playwright tests. You need to rerun Playwright to run end to end tests. It defines tests inside of a Node.js environment. But what we did in Vitest, we run the file,

[34:00]
itself, in the browser, so it makes it faster to start up sometimes. Sometimes� [Laughter]. Yeah. It makes it easier to migrate. Say, for example, if you have a JS DOM test, you can say, run in the browser, and it will work� or it should work, unless you use some very [Indiscernible] APIs.

[34:30]
JASON LENGSTORF: So I feel like I get how this works and now I want to just run through some of the� the basics of how things function. Right. So, we have our� our basic app here. And, it has things like, a button that we can click here, that has a count on it. Right. So, if I want to make a test that says whenever I click this button, the count should go up by one,

[35:00]
how� how would I go about doing that? I have a hunch that I start by making a test file like this. So, I'm going to create one. "Helloworld.test.ts." VLADIMIR SHEREMET: Almost. JASON LENGSTORF: Almost? Oh, oops. [Laughter]. Okay. There we go. So now I have a failing test in here because there's no actual code in it. Right.

[35:30]
VLADIMIR SHEREMET: By the way, you see the zero here, it's because it's a workspace project and by default, they use IDs if you don't define it in a file or a folder. You can say "test.name" and give it a different name so it will look better. [Laughter]. It's just a note. JASON LENGSTORF: Okay. Okay. So, then to actually do this, let's see,

[36:00]
we've got� we've got some bits that we need so I know I'm going to need the, uh� I'm going to start with "test." And we're going to import that from Vitest and you said that gets a name? VLADIMIR SHEREMET: No, no, no. I was saying about the project� in the Vitest Workspace file, if you go there, if you add a name there, in the test object�

[36:30]
JASON LENGSTORF: Um, let's call this� VLADIMIR SHEREMET: Name it anyway you want. Yep. JASON LENGSTORF: Got it. VLADIMIR SHEREMET: I think you need to rerun the CLI because the updating of the config doesn't work. JASON LENGSTORF: Oh, okay. Right, right, right. VLADIMIR SHEREMET: Now it uses� JASON LENGSTORF: Oh, look at that! Now I actually have names! Slick. Okay. Okay. I get it. Here,

[37:00]
I want to say, I want to describe it. So, test counter button increments on click. All right. So that's the way that I would want that to work. I get a test, this is probably going to need to be async, is my guess? VLADIMIR SHEREMET: Yes. [Laughter]. JASON LENGSTORF: Okay. VLADIMIR SHEREMET: We decided to go in the route of Playwright inside of going into the

[37:30]
Cypress route that is not very understandable to newcomers. I still don't understand how Cypress works. [Laughter]. JASON LENGSTORF: Okay. And so for this... VLADIMIR SHEREMET: It's a default export. JASON LENGSTORF: It is a default export. Okay. So now I've got my "hello world" component and then I would� I need to render this component.

[38:00]
VLADIMIR SHEREMET: Yes. So, one thing. JASON LENGSTORF: Okay. VLADIMIR SHEREMET: In the previous test, we import render from the package� Browser View, but...you can also call render on the page if� yeah. JASON LENGSTORF: Interesting. So, I want to render the component. I want to click the button and then I want to...check the current count. Right. These are my� these are my steps that I want.

[38:30]
VLADIMIR SHEREMET: Sounds reasonable. JASON LENGSTORF: So, do we want to, in this case, render the page or render the component? VLADIMIR SHEREMET: Render the component by running the variable. I think if you say "page," it'll import it. JASON LENGSTORF: I want Page from the context? VLADIMIR SHEREMET: Should have a "render," I hope. And then we

[39:00]
pass down the component. It's the same function, it's just easier to access. JASON LENGSTORF: Nice. This� VLADIMIR SHEREMET: I don't think you need to use props, but I'm not sure, yeah, actually. JASON LENGSTORF: There's a message. We don't really need the message for this one because we're testing the button, so... VLADIMIR SHEREMET: It is required. JASON LENGSTORF: It is required. So if I do a message, give it a test.

[39:30]
VLADIMIR SHEREMET: It's also typed you saw the TypeScript didn't allow you. JASON LENGSTORF: Oh, I did see that. Yeah, yeah, yeah. That was great. So, without this, if I try to just do an empty, it'll, "you need message." Okay, so there's our message. Then, I want to� does this return� like, am I getting this into a variable? VLADIMIR SHEREMET: Yes. I'm recording this screen, but you can call it anything.

[40:00]
JASON LENGSTORF: And so this gives me back my screen and then what I want to do is find the button, right? VLADIMIR SHEREMET: Yes. JASON LENGSTORF: Okay. And to do that, I would...do I go into the container? VLADIMIR SHEREMET: So, I would follow what testing library suggests, is to use "get by role." JASON LENGSTORF: Get by role. And then this one's

[40:30]
going to be a button. And then I can click it. Okay. All right. VLADIMIR SHEREMET: The click returns� is asynchronous operation. JASON LENGSTORF: So we await the click and now I want to expect, I think, um...I want to expect "screen get by role" button.

[41:00]
VLADIMIR SHEREMET: Element. JASON LENGSTORF: Element...wait. How do we actually check this? Hold on. Let's look back in the component... and it says "count is" and so we could expect this to say "count is 2," or "count is 1." VLADIMIR SHEREMET: How is the default?

[41:30]
JASON LENGSTORF: It starts at zero, I believe. Yeah, so here's� it's starting at zero so we click once so it should say "count is 1." And click twice, it should say," count is 2." So we're looking for� VLADIMIR SHEREMET: There's a method. You need to call it. On expect, you would use to� to have text content, I think.

[42:00]
JASON LENGSTORF: To have text content. VLADIMIR SHEREMET: We bundle test library and [Indiscernible] DOM. JASON LENGSTORF: Do I need to await this one? VLADIMIR SHEREMET: This is an interesting one. You wrote an assertion that only fires once and it will fail or not so it can be [Indiscernible] depending on the machine, your CI environment. To make it retryable, you would need to� first of all� await it,

[42:30]
right. Then you would need to call "expect.element." JASON LENGSTORF: And then do I get rid of the element here? VLADIMIR SHEREMET: Yes. This will call Element again and again and again. JASON LENGSTORF: Okay. So I've broken something, let's go find out what it is. So, it says� let

[43:00]
me make this bigger. Counter button increments on click, which is should. And, we don't have our UI. VLADIMIR SHEREMET: There's a report button. Like, a report tab. JASON LENGSTORF: Here. "Page.render" is not a function. Okay. So I'm breaking something. VLADIMIR SHEREMET: This is broken because by default,

[43:30]
we don't inject render unless you specify it in a set of files. JASON LENGSTORF: In the setup files. VLADIMIR SHEREMET: It's in Config. In the Workspace Config. Yeah, Vitest Config. I need to write it down, like, what's making it harder so I can remove� [Laughter]. � remove extra steps. JASON LENGSTORF: Vitest Workspace. Got it. VLADIMIR SHEREMET: Add setup files. JASON LENGSTORF: Add setup files here?

[44:00]
VLADIMIR SHEREMET: Yep. JASON LENGSTORF: Setup files. VLADIMIR SHEREMET: And add, here, Vitest Browser View. I think it's called Browser View. JASON LENGSTORF: Browser View, like that? VLADIMIR SHEREMET: And then it should work. I'm writing down all the bugs that I'm seeing. [Laughter].

[44:30]
JASON LENGSTORF: Hey, passed that time. All right. VLADIMIR SHEREMET: Nice. JASON LENGSTORF: So here we go. Now we've got a passing test, right. If we were to, for example, run this again...this one...um, then we could� let's say, we take our to dos out and then let's run this one more time. And this time, it should be two, right? So, this is� we're

[45:00]
going to� get this bigger here. We're going to render this component. Inside the component, there's a button so we're going to grab that button. Then, we click it. Then, we� we make sure that the� the count is right. Then we click on it again and then we make sure that the count updated so that's, I think, a reasonable way to check the output of these buttons and make sure that they're rendering properly. So then, let me come back out here. It's doing

[45:30]
the thing and we can see, here, there's our count, it's working, right. I also� VLADIMIR SHEREMET: You can even click it yourself. JASON LENGSTORF: It's really nice that that just works. VLADIMIR SHEREMET: And this is another thing why we're using our library. Testing library removes everything after every test but we need to keep the state, you know. So, there's additional logic to remove the DOM only before the test starts so your last test is visible always.

[46:00]
JASON LENGSTORF: This is� yeah. This is definitely great. There is a question� VLADIMIR SHEREMET: And you didn't install any Playwright, just your browser that you chose, it just opens. JASON LENGSTORF: I mean, this is this is excellent because it also� it cuts down on one of the other barriers of entry to me, which is I don't necessarily want to spend hours� or even� you know what, I say "hours," I don't want to even spend 30 minutes,

[46:30]
like, actually configuring my test. If I can just write them, I'm happy to do it. And for a project that's just me, maybe I don't care if I have CI. Maybe I want to run it on my local browser and make sure I didn't break anything before I make the changes. VLADIMIR SHEREMET: It's also nice to experiment. You have your own component, you can start it up and view the changes without breaking the app, just in isolation.

[47:00]
You can call "page.viewport" and open a different viewport. JASON LENGSTORF: Yeah. I mean this is� this is great. We got another question: Can we organize tests in suites, like other frameworks have a "describe" block? Is there a similar concept here, where I can wrap these in a group?

[47:30]
VLADIMIR SHEREMET: Yes, it's called "describe." [Laughter]. JASON LENGSTORF: Let me do it here. Let's call it our "hello world" tests. And then this one� does this one need to be async? VLADIMIR SHEREMET: No. JASON LENGSTORF: Okay. So, we wrap everything up and what that means out here is we end up with...

[48:00]
VLADIMIR SHEREMET: I don't see any changes. JASON LENGSTORF: Did it change anything? That's actually a good question, does it render out here? VLADIMIR SHEREMET: It should. [Laughter]. JASON LENGSTORF: What happened? VLADIMIR SHEREMET: Something broke.

[48:30]
This is the error on Vitest side. Interesting. JASON LENGSTORF: Let me check. Maybe it's just, like, I changed things and it's doing weird stuff now. Our "hello world" test and the test, itself. You can see the whole collection passed. VLADIMIR SHEREMET: Does it still show errors? Interesting. JASON LENGSTORF: Properties of undefined reading has, but that is not�

[49:00]
VLADIMIR SHEREMET: I'll just keep it for myself. [Laughter]. JASON LENGSTORF: Yeah. Okay. Okay. VLADIMIR SHEREMET: The tests, themselves, run fine. There's a part on the Vitest server side. It's a bug. JASON LENGSTORF: Somehow, in here, because it all goes away when we take this out, I think. VLADIMIR SHEREMET: Did you run?

[49:30]
JASON LENGSTORF: I thought so. VLADIMIR SHEREMET: I guess it also breaks the running. [Laughter]. JASON LENGSTORF: Yeah. Interesting. VLADIMIR SHEREMET: Collecting bugs. Life. JASON LENGSTORF: This is� this is my superpower. I can find the weirdest bugs. I have� I also have, like� you know, um, how there's� there's, like, that person who just kind of attracts chaos. So, because I do this show every Thursday, I have everything

[50:00]
installed on this computer. Like, this computer is� is, like, the� it has got to be the sickest computer on the internet because it just has everything all smashed in here. Let me make sure� yeah, we did import the "describe." But it looks like something I'm doing� or some interaction between the Describe blocks and something in here is causing an error that I don't think is my code. We can leave this in, for now. It's possible. Or it might

[50:30]
be possible when the bug is fixed. [Laughter]. VLADIMIR SHEREMET: This was released a few hours ago so there will be 2.1.1. [Laughter]. Every time you release a feature version. JASON LENGSTORF: Right. If you don't have the patch version out within an hours, you aren't pushing hard enough, right? [Laughter]. VLADIMIR SHEREMET: Exactly. Exactly. [Laughter].

[51:00]
JASON LENGSTORF: No, this is� this is great. Okay. So, we� we have built out the� kind of the basics here. We grabbed a button. This is great, too. Like, this� you helped me with the name of the function, but now that I know what the name of the function is, I kind of got through this on autocomplete and intuition, knew what was coming next. I

[51:30]
haven't opened the docs. It's nice to be able to vibe your way through an API. I think that's a sign of good API design. What are some features we should cover here? What are some other things we could do now, that are worth exploring? VLADIMIR SHEREMET: Um� [Laughter]. Such an interesting question. One of the things we added, in 2.1, is uploading files. So, we can upload a file, maybe?

[52:00]
JASON LENGSTORF: Ooooh. Okay. Yeah, let's do it. Let me open up the app here� let's add a new component and we'll call this one "fileupload.Vue." And I'm going to copy paste to go fast. VLADIMIR SHEREMET: I think we need an input with Type file or� JASON LENGSTORF: Yeah. So I'm just going to get all of this in here and we'll do a

[52:30]
form...and...then we'll do...keep it semantic, you know. Then, we'll say, "upload a file and input type file." That would have a name of "upload," if I can spell it right, and an ID of "upload."

[53:00]
And I believe that is� believe that's an accessible file input and then we'll give this one a button "type submit." And, the name of Upload. So that's our basic setup there. We don't need any of this so I'm going to drop it out. And, then in our app, why don't we...let's just

[53:30]
stick it at the bottom, that'll be fine. So, "import file upload from." Okay. So, then, let me open another terminal, here, so that we can also npm run dev.

[54:00]
VLADIMIR SHEREMET: I wonder how this will work. JASON LENGSTORF: 5174, failed to resolve� what did I do wrong? VLADIMIR SHEREMET: You need to�.Vue, by default, and not use an extension. JASON LENGSTORF: There we go. So now, down here, we have our file extension and go into our downloads and grab something. Here's a picture of Michael Chan. And then we could...upload. Why didn't that work?

[54:30]
VLADIMIR SHEREMET: Because there is no� wait, it should still. JASON LENGSTORF: It should still let me click it. So I broke something in here, which is interesting. Or maybe it's just because I didn't set anything? VLADIMIR SHEREMET: Yeah, there's no action, there's no type. Just a post by default.

[55:00]
JASON LENGSTORF: It should� it should do a� wouldn't it be a "get" by default. We need to be able to click that button, right? VLADIMIR SHEREMET: Um... JASON LENGSTORF: Oh. [Laughter]. I figured out what went wrong. [Laughter]. Where were you on that one, chat? [Laughter]. Oh, they were so� they were so ahead of me. [Laughter]. VLADIMIR SHEREMET:

[55:30]
Don't touch that button! [Laughter]. JASON LENGSTORF: All right. All right. All right. So, now, there's our button and when we click something...there we go. Do one of these. Click one of those and, there we go. It does the thing. Right. So, we have a file upload. VLADIMIR SHEREMET: This is interesting� [Laughter]. Yeah. When the page is reloaded, there is a special behavior, which is not decided yet, but it happens. [Laughter].

[56:00]
So, we didn't decide what should happen when the page reloads because, you know, this is a [Indiscernible] frame. By default, it runs every test again and we will� yeah, and we will probably go into infinite loop here. Let's try it. [Laughter]. JASON LENGSTORF: I'm ready. Infinite loops are one of my favorite ways to break things. We'll do the test. Say "handles files uploads." And that's going to be async. All right.

[56:30]
And so the first thing I need to do is "get page" and we're going to render and we need that component...so, we'll import "file upload from componentsfileupload.Vue." Okay. And I need� actually, I don't need props

[57:00]
on this one. Do I need to supply an empty object or I can just leave it? VLADIMIR SHEREMET: No, you can just leave it like this. JASON LENGSTORF: Okay. So the next thing I would want to do is I want screen� no, I want to save this as "screen." VLADIMIR SHEREMET: You can still use Page, it has all the properties. It is scoped to this specific element. JASON LENGSTORF: Got it. So, we're going to "get by label

[57:30]
text" and that would be� what did I call that? "Upload a file." VLADIMIR SHEREMET: Upload a file, yep. JASON LENGSTORF: Another reason to write semantic HTML is this wouldn't work if I hadn't labeled my� VLADIMIR SHEREMET: Exactly. It forces you to write semantic HTML because it's easier to use. JASON LENGSTORF: Oh, there's an "upload" right on it.

[58:00]
VLADIMIR SHEREMET: You can either pass down a path to the file, on the file system. Even if you don't use any providers. By default, you can pass down a path to the file system or you can create your own, new file, something, you know. JASON LENGSTORF: Got it. Okay. That's cool. So, I guess if I wanted to do that, I could take this� let's go here, get the� um�

[58:30]
VLADIMIR SHEREMET: Lost the photo. I uploaded it. JASON LENGSTORF: Here. And, maybe I'll just drop it in there, for now. That's a terrible place for it, but we'll keep it anyways and then we'll just grab that photo. Okay. VLADIMIR SHEREMET: Await. JASON LENGSTORF: So, we'll await this and now that this is� so,

[59:00]
this will put it into the component, but it doesn't submit the page. VLADIMIR SHEREMET: Yes, it doesn't submit the page yet but we can see it in the title. You know, when you upload, you'll see the� the name of it on the input. JASON LENGSTORF: Yeah. Actually, yeah. And we don't really need to test browser behavior, right. It's an upload. If we hit the upload, we know that works. The browsers write plenty of tests for that. We want to make sure it shows up in the format we need it and that

[59:30]
would be� right. I guess, like, I'm leading without actually knowing where we're going. [Laughter]. VLADIMIR SHEREMET: We probably need to display the file itself. If you upload it, you display it right away or you save it. JASON LENGSTORF: That's a good point. So what we'll do, if the file is uploaded, we get it in the query string so then we would need to, what, just drop that into an image?

[60:00]
VLADIMIR SHEREMET: Um... [Laughter]. We can� so, we can store the file you upload it, you can store� you can listen for a change event to store in the component and display the file. But I think to display it, you need to transform to 64 or something so it's a bit tedious.

[60:30]
JASON LENGSTORF: Little bit going on there. Can we take the path name and stick that on the page, as a shortcut for now? VLADIMIR SHEREMET: We can, yes. JASON LENGSTORF: Do you remember how to do that? VLADIMIR SHEREMET: So, by default, Vue doesn't have anything to help with this. You can access Location and query� query params. JASON LENGSTORF: Yeah. So, what is� remind me how to define a� like,

[61:00]
a submit handler. Because what we can do, I think, is just update a ref. VLADIMIR SHEREMET: Oh, yeah. JASON LENGSTORF: And then we can have an input. We'll� oh, you got it? Go ahead. VLADIMIR SHEREMET: Let me try...submit event. I think we can just pass it down here... we prevent [Indiscernible] so it doesn't go into an infinite loop.

[61:30]
JASON LENGSTORF: And then if we get the� if we get the form data, then that should allow us� that'll actually give us a readout we can spit into a pre tag or something? VLADIMIR SHEREMET: It'll give us a file. JASON LENGSTORF: Yeah. VLADIMIR SHEREMET: But to display a file, you need to convert it to [Indiscernible] 64.

[62:00]
JASON LENGSTORF: We don't need to display the file so we can do "data equals..." VLADIMIR SHEREMET: We can display the name of the file, you know. JASON LENGSTORF: The name of the file will be "data.getupload." I need to update it. It would be "file equals." And I need a ref. We'll leave it null. Come on...is it just from Vue, straight up?

[62:30]
VLADIMIR SHEREMET: Yeah, yeah. JASON LENGSTORF: Okay. Then, down here, we would do a, uh, like, a pre tag and I want to set its content and to� remind me how to do that in Vue?

[63:00]
VLADIMIR SHEREMET: Ummmmmm, you can just close it and then "file." JASON LENGSTORF: Perfect. That was� that was all I wanted. Okay. Perfect. So, this, then, theoretically speaking, when we get back out here, we should see...something happen...and,

[63:30]
we missed a piece. Oh, we didn't actually update the� VLADIMIR SHEREMET: Oh, yeah, we didn't save that. JASON LENGSTORF: So let's dump it and we also want to set� oh, I did this� VLADIMIR SHEREMET: Name collision. JASON LENGSTORF: We'll call this one "input." And I probably need this to be above, declared before its used. Can we just set it to equal?

[64:00]
VLADIMIR SHEREMET: Failure.equals. JASON LENGSTORF: Theoretically speaking, we get� VLADIMIR SHEREMET: Anything. JASON LENGSTORF: There's our object file. If want a JSON string, can I just do that in here? VLADIMIR SHEREMET: You can. I wonder what it will show you. JASON LENGSTORF: Let's find out. That's closer to what I want.

[64:30]
VLADIMIR SHEREMET: Do "..name." JASON LENGSTORF: We get nothing. We're going to do "file.name," good call. So, it shows up empty... VLADIMIR SHEREMET: Because it's null, by default. Yep.

[65:00]
JASON LENGSTORF: Now you're not yelling at me. We do one of these. We do one of these. We do one of these and we get our file name. All right. Cool. So that's good because that means now, when we're in here, we can write our test and what we're looking for� VLADIMIR SHEREMET: I just want to say that we could have done this with Vite as a Browser Mode, without running the Vite server. [Laughter]. You know. [Laughter].

[65:30]
JASON LENGSTORF: I forgot. I forgot. Yeah, because we could have been in� we could have been in here, just doing the thing. VLADIMIR SHEREMET: Exactly. JASON LENGSTORF: Assuming� did I let this die? VLADIMIR SHEREMET: Something broke. JASON LENGSTORF: Yeah, I think I� I think I� go...all right. So, then we got these. We got our file upload. Handles file uploads. Currently, it's not doing anything.

[66:00]
VLADIMIR SHEREMET: Since this is the first test that runs, it doesn't keep the state. If you run it again, it'll show you the state. JASON LENGSTORF: Got it. So, there we go. So, we are rendering and let me actually save this and then let's head back out here. What you're saying is we can do this here. So, we will upload� shrink this down a little bit...okay. So, now that we've got this part,

[66:30]
here, we...run it. It says "uploads chan" and then what we could expect is we would want to "awaitscreen.getbyrole," if I want to do the button? VLADIMIR SHEREMET: The button, yeah. By role button.

[67:00]
JASON LENGSTORF: And then we could click that. And then, we would...well, actually, let's just see how that goes...okay. So that's not showing us� VLADIMIR SHEREMET: Are there any console logs?

[67:30]
JASON LENGSTORF: It's not finding this particular file, do I need to give it a� VLADIMIR SHEREMET: By default, it's relative to the test file. JASON LENGSTORF: Okay. VLADIMIR SHEREMET: So it should be correct here. But what's in the console log, itself, like, the Dev Tools log? Does it have anything? JASON LENGSTORF: 431, request header fields too large.

[68:00]
VLADIMIR SHEREMET: I don't know what it is, but what's the file? JASON LENGSTORF: It's a tiny file. It shouldn't be that. Um, let's� let's find this in Finder. It's 35 kilobytes, it shouldn't be too big, right? VLADIMIR SHEREMET: Uh huh. JASON LENGSTORF: Ummmmm, let's see...

[68:30]
VLADIMIR SHEREMET: What does it show in the [Indiscernible] again? JASON LENGSTORF: Let's see, nothing here. Um...let me run this one... VLADIMIR SHEREMET: It shows empty name, so it's maybe not very� oh. JASON LENGSTORF: Request header fields too large. VLADIMIR SHEREMET: It fetches. Yeah. That's what happens. Uh huh. So, I think to do this,

[69:00]
we use Fetch. Maybe there's some limitations or something? Like, locally or if you don't run it in the preview� JASON LENGSTORF: Maybe what I can do instead is do a test.txt and we'll just make it something super small and that way, when we run the test...even if it does do something, you know, it should still work...

[69:30]
VLADIMIR SHEREMET: I hope. No? JASON LENGSTORF: Well, it's not too big. Is it� so, quickly, when I'm� when I'm running this�.upload, is that attaching the file to the input? VLADIMIR SHEREMET: Yes. JASON LENGSTORF: Okay. VLADIMIR SHEREMET: Yes. It uses the� so, here, specifically, it uses testing library user event

[70:00]
so whatever it does, it's down here. But maybe� but there is a code that fetches it from the� from the file system. This is what Vitest does. This library doesn't support this by default, the path, the file path. We have a channel where we can take the file and feed it to the browser. But maybe there is a bug there, also. Interesting.

[70:30]
JASON LENGSTORF: Okay. Um... VLADIMIR SHEREMET: Instead, we can just do new file, I guess. New file should work everywhere. JASON LENGSTORF: New file� sorry, when you say, "new file"? VLADIMIR SHEREMET: New file. JASON LENGSTORF: Oh, straight up give it a new file? VLADIMIR SHEREMET: Yeah. JASON LENGSTORF: What goes in a new file? Do I just give it a name?

[71:00]
VLADIMIR SHEREMET: Um, it's an empty array. JASON LENGSTORF: It's an empty array? VLADIMIR SHEREMET: It's a buffer. JASON LENGSTORF: Do I give it a name? VLADIMIR SHEREMET: Then it's a name. The second argument� JASON LENGSTORF: I should probably look this up. [Laughter]. VLADIMIR SHEREMET: I remember this just because I was working on this upload. JASON LENGSTORF: Where's the constructer,

[71:30]
file name and then options. We shouldn't care about any of the options. We just want� VLADIMIR SHEREMET: Yeah. This is what people usually do with upload, in testing library. JASON LENGSTORF: New file, test.text. Then when we run that, what should end up happening� VLADIMIR SHEREMET: Yeah, it should display.

[72:00]
[Laughter]. Still? JASON LENGSTORF: Still...got our file. VLADIMIR SHEREMET: The name is not correct. JASON LENGSTORF: The size is zero, which is what we wanted. VLADIMIR SHEREMET: Yeah. Maybe� hmm. Maybe if it's in an array? Array of files. Yeah.

[72:30]
JASON LENGSTORF: Oh. VLADIMIR SHEREMET: Oh. JASON LENGSTORF: I was expecting the wrapper to work. VLADIMIR SHEREMET: Yeah, I was also expecting it. [Laughter]. JASON LENGSTORF: Okay. So then we get here...still no name. Okay. VLADIMIR SHEREMET: Weird. JASON LENGSTORF: That's all right. Maybe� VLADIMIR SHEREMET: Yeah. JASON LENGSTORF: Maybe try� try something else. Am I missing User Event? Good question.

[73:00]
VLADIMIR SHEREMET: No, User Event is installed. I'm not sure what's happening here, to be honest. I will need to look up for this. There is quite a few tests for this. Maybe this needs to be tested in production. JASON LENGSTORF: Is there an example to look at, in here, to see if maybe I missed something. VLADIMIR SHEREMET: It's very hard to miss something here, there is an example. [Laughter]. Especially the one line. There's an example in the documentation. If you go to the documentation, you go to Browser Mode

[73:30]
and then you go to� on the left, API, and there should be Upload somewhere. JASON LENGSTORF: Oh! VLADIMIR SHEREMET: There are two ways to do this, yes. You can do it on the input or call User Event, which is also imported from the context. JASON LENGSTORF: Okay. VLADIMIR SHEREMET: In the Preview Provider, we use the testing library

[74:00]
one. In Playwright and WebDriver, we use native APIs to do this instead. JASON LENGSTORF: Got it. Okay. And so...whoops. VLADIMIR SHEREMET: Seems to be a bug. Or maybe there's something in the HTML. It worked in the Dev Server. JASON LENGSTORF: It worked in the Dev Server, I think it's working in the� I think it'll even

[74:30]
work in here if we do it manually so if I pick one of these and I hit "upload, yeah, everything works. Something I'm doing here isn't quite lining up do I have to "awaitthepage.render"? VLADIMIR SHEREMET: No. This seems like a bug. JASON LENGSTORF: Okay, cool. We can keep trucking forward. What else should we look at?

[75:00]
VLADIMIR SHEREMET: There is one thing I want to look at. We don't need to write any code for this. It's the extension. Do you think we can showcase it? JASON LENGSTORF: I think so, yeah. I just got a suggestion to actually put the type in. So I'm going to try it. VLADIMIR SHEREMET: Actually, yeah. Maybe this will help...

[75:30]
JASON LENGSTORF: Okay. Let's run it again...oh, it blew away my change. VLADIMIR SHEREMET: It didn't save your change, maybe. JASON LENGSTORF: Type. Text plain. Okay. VLADIMIR SHEREMET: It should rerun the test. It seems like the connection is broken or something. JASON LENGSTORF: Oh, yeah, it's hanging. Let me stop it again...and, this time,

[76:00]
we got "handles files uploads." Yeah, it looks like� I'm not sure what's going on, but it� VLADIMIR SHEREMET: Uh huh. Something's broken. JASON LENGSTORF: Something's up. Don't know what it is. VLADIMIR SHEREMET: [Indiscernible] will look

[76:30]
into this. [Laughter]. Don't worry. [Laughter]. JASON LENGSTORF: Okay. All right. Cool. So that's� that's good. You said, an extension? VLADIMIR SHEREMET: Yes, VS Code Extension. You can install it. It's called Vitest, it's an official one. In Vitest 1.4, I think, we started it. I rewrote every part of extension to

[77:00]
work with Vitest API directly instead of [Indiscernible] Vitest for every click, basically. So, what I want to showcase here is that, you can go to Test Explorer. JASON LENGSTORF: Go ahead. VLADIMIR SHEREMET: Here it is. It's like a [Indiscernible]. You can see, here,

[77:30]
there are different tests here. You can go� you can go here. This is our default example. By default, so, this test runs in the browser. JASON LENGSTORF: Uh huh. VLADIMIR SHEREMET: Haven't tested if you have a CLI open and you try this. I wonder what will happen...it opens a new browser and then it goes back. I don't know how to go back to the VS Code Extension. Okay. Okay. And it works. You can run it again...and it's finished,

[78:00]
again, in 97 milliseconds. So, it's similar to how CLI works. JASON LENGSTORF: Uh huh. Uh huh. VLADIMIR SHEREMET: The cool thing you can do here is, you can press this little button called "continuous run" and change...change the content here and then it should rerun it...theoretically.

[78:30]
JASON LENGSTORF: I think it might have been on, but you toggled it off, actually. VLADIMIR SHEREMET: Oh. Okay. I'll give you the� [Laughter]. JASON LENGSTORF: When we were hovered here, turn off continuous run. Turn on continuous run. Okay, continuous run should be on and then when we save� VLADIMIR SHEREMET: Try to save it again. JASON LENGSTORF: I think this might be because we've got the� VLADIMIR SHEREMET: Several open.

[79:00]
JASON LENGSTORF: Yeah, let me open up the terminal again. Let's quit this one. And then, let's come back over here. And let's run. Okay. VLADIMIR SHEREMET: Great. That's correct. Yeah. JASON LENGSTORF: Good, good, good. And then... VLADIMIR SHEREMET: Doesn't do anything? JASON LENGSTORF: So, this is one of those things where this is almost certainly my VS Code environment. Because I have installed and uninstalled and tweaked settings and

[79:30]
so many things are broken in my VS Code that I really should just burn it down and start over again. [Laughter]. VLADIMIR SHEREMET: That's what I like to hear. JASON LENGSTORF: Prettier doesn't work on this install. So many things are weird. This is almost not certainly the extension. VLADIMIR SHEREMET: Okay, what was supposed to happen is it will rerun it on your file change and show a giant error and show the error in line. You can go through every error. Cool thing is you

[80:00]
can turn this mode only for certain tests, not for every file. You're working on a certain test, you want to see if it works, you just edited it, this will run on every change you make. You can also run coverage, but I'm not sure how coverage here, at the moment. Because we need to install the package. We need to install Vitest V8 actually works with Browser Mode.

[80:30]
And then we can run tests with coverage, it will show the coverage in your IDE. JASON LENGSTORF: Nice. We're missing the coverage, that's pretty cool. VLADIMIR SHEREMET: It will show right in the IDE, all the, like, red, yellow, green colors.

[81:00]
JASON LENGSTORF: So if I want to do that� because we do� we have enough time. Is it Vitest Coverage V8? VLADIMIR SHEREMET: Yes. I tested it yesterday. So, it did work. So if doesn't work, it's not my fault. [Laughter]. JASON LENGSTORF: Okay. Run now...coverage is always a little bit slower.

[81:30]
VLADIMIR SHEREMET: Yes, technically, it can be. But I don't know if this is because of the coverage� oh, right. So, this is interesting. I need to write this down because if you run it in preview, it will not work. It only works with Preview� with Playwright provider, at the moment. JASON LENGSTORF: Oh, okay. VLADIMIR SHEREMET: So, we can also install, um...okay. I will write it down,

[82:00]
if this doesn't work...I don't know why it doesn't cancel it. Why doesn't it work? [Laughter]. JASON LENGSTORF: This is the only way I know how to solve problems

[82:30]
these days. [Laughter]. VLADIMIR SHEREMET: That's a good solution. JASON LENGSTORF: Okay. So now it's sitting and if I run these regular, it runs through all the tests. We get all of our tests going. And then, when I come back here, we can see that all of our tests ran and I can choose one individually to run, which is great. I really like that. This is awesome. We can also see here, the most recent run passed. So if I save this and rerun this test...now I can see that it failed and

[83:00]
so I can see, at a glance, where my failing tests are, and that's really, really cool. VLADIMIR SHEREMET: And you have other suggestions, that you don't have UI, you know. JASON LENGSTORF: Yeah. Yeah, yeah. This is� this is super cool. Like, I love that it kind of jumps in and says what's happening.

[83:30]
So, this is great. And then I can run again and now it passed. Ta da. VLADIMIR SHEREMET: And it was really fast. Let's try to install Playwright Writer. Do we have time for this? JASON LENGSTORF: We have about five minutes. [Laughter]. VLADIMIR SHEREMET: I just wanted to show the coverage, how it looks. JASON LENGSTORF: Yeah, is it just Playwright? VLADIMIR SHEREMET: Yes. That's it. You'll need to use Playwright Install,

[84:00]
whatever it is for browsers. JASON LENGSTORF: Like, Playwright Install? VLADIMIR SHEREMET: I think? I think, I'm not sure. JASON LENGSTORF: We'll see what I got. VLADIMIR SHEREMET: Why it's installing, we can specify provider, Playwright, in the config file. Yes, preview, we can say Playwright. Instead of Chrome,

[84:30]
we can say Chromium, because Playwright has specific names. JASON LENGSTORF: Okay. VLADIMIR SHEREMET: Then we should be able to go back to the File Explorer and run coverage. Test Explorer, sorry. And let's pray that it works... JASON LENGSTORF: Here comes Chromium. It's doing the things...oh,

[85:00]
we don't actually resolve this� this file� VLADIMIR SHEREMET: Oh. JASON LENGSTORF: That actually� so that's the whole reason this has been causing problems is we never actually finished this. Oh, it timed out though. That's good. VLADIMIR SHEREMET: What does it show? Does it show any coverage? JASON LENGSTORF: Doesn't show any coverage. VLADIMIR SHEREMET: No, it doesn't show any coverage. JASON LENGSTORF: Would I file the coverage in the files themselves?

[85:30]
VLADIMIR SHEREMET: No, the coverage should have been shown in the file preview. Test results, it should say the coverage and you would see coverage down there, at the bottom. JASON LENGSTORF: Oh, I gotcha. VLADIMIR SHEREMET: Not sure why. JASON LENGSTORF: Well...I did� [Laughter]. Let me just� let me just get rid of this� this test because we didn't finish it and then let's try one more time.

[86:00]
VLADIMIR SHEREMET: I can� I can give you the link for how it looks. JASON LENGSTORF: Yeah, why don't you do that. VLADIMIR SHEREMET: Maybe. JASON LENGSTORF: Oh, test skip, not just comment out. That's the right call because it was yelling at me because things were not working. So, let's try that one more time. I'm just going to force a reload here.

[86:30]
[Laughter]. Then we're going to hop back into here and we're going to run one of these...it's going to get through everything, skip the file uploads. Still no coverage. Do we� we probably need to, like, add� VLADIMIR SHEREMET: It may be because of the� because of the Vue. Because Vue has some issues with coverage.

[87:00]
JASON LENGSTORF: Definitely could be. VLADIMIR SHEREMET: I will just open the link. JASON LENGSTORF: Yeah, send me the link. VLADIMIR SHEREMET: Okay. Yes, so, this is how it would have looked like. [Laughter]. JASON LENGSTORF: Ah, cool. Okay. Well, this is great. So, you know, I� I definitely would say that I challenge this� [Laughter]. � with my chaos setup. So, a good reminder to me that every once in a while, I should wipe VS Code and reinstall because I keep doing terrible things to it. Overall,

[87:30]
it's nice to have an API that feels good to work with. So, for people who want to continue on here and learn more, where should they go for more information? VLADIMIR SHEREMET: Documentation, I guess? JASON LENGSTORF: All right. So let me send another link to the docs. And� VLADIMIR SHEREMET: GitHub, maybe. GitHub has Releases page that you can see every release, every change that we made.

[88:00]
JASON LENGSTORF: To a specific repo. VLADIMIR SHEREMET: In Vitest. In Vitest. JASON LENGSTORF: In Vitest, got it. VLADIMIR SHEREMET: This is the way to know what has changed in Vitest. Last commit. JASON LENGSTORF: Oh, nice, nice. And then, let's see, I'm going to remind everybody to go give you a follow. Anywhere else I should throw in here?

[88:30]
VLADIMIR SHEREMET: Anthony, every team member, [Indiscernible]. [Laughter]. JASON LENGSTORF: Let me do this, down here, go� go check out the folks who work on this. Anthony's been on the show before. We can actually� VLADIMIR SHEREMET: Anthony has a lot of projects. JASON LENGSTORF: This is the original Intro to Vitest,

[89:00]
very cool stuff. So you can go check that one out. I'm going to do a shout out, we're going to go over here. Oh, my goodness, I keep hitting bottomless pages. How about this one? This one's shorter? Yeah. Yeah. Good. All right. We got a lot of good things coming up on the show, make sure you subscribe to the newsletter, hit the button on the YouTube. Make sure you

[89:30]
know when something's coming up and that� this show, like every show, has been live captioned. We've had Vanessa here, from White Coat Captioning. That is from Netlify. We have been pair programming from Tuple. Vladimir, thanks so much for taking time with us

[90:00]
today. This was a lot of fun. Any way that we can make testing a little less painful to get going with, to run quickly is a great thing. So, thank you very much for the work you do. You can, in fact, sponsor these projects on GitHub that you rely on. Go kick him a few bucks every month. It is very, very much appreciated. Any parting words for anybody? VLADIMIR SHEREMET: Thank you, this was very fun. I have notes for bugs I need

[90:30]
to fix now. [Laughter]. After this talk. This was great fun. Thank you for inviting me. JASON LENGSTORF: Yeah, this was� this was super fun and y'all, remember, there is an Astro workshop coming up next week. I'm going to send you a quick link to this Astro workshop, it's going to be all day on Tuesday and Thursday, I've got Ben from the Astro team, coming on to talk about the new features so next week is basically going to be Astro

[91:00]
Week. Make sure you get in here, let's learn some Astro, let's go build some good websites. Vladimir, thank you for spending some time. We will see you all, next time.
