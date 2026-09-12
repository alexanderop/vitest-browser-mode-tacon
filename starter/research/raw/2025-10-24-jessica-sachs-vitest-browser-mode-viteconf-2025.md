---
kind: youtube
title: "Jessica Sachs | Vitest Browser Mode | ViteConf 2025"
url: https://www.youtube.com/watch?v=VFYqwXPgJFw
author: Jessica Sachs
publisher: ViteConf
published: 2025-10-24
collected: 2026-09-11
status: complete
---

## Description

Jessica Sachs explains and demonstrates Vitest Browser Mode, which tests components in an actual browser instead of DOM emulation.

## Transcript

[Automatically generated captions with rolling duplicates removed.
Technical terms and code identifiers may contain transcription errors.]

[00:00]
So, let's do Vest browser mode in 2025. Bridging speed and reality. So, one of the biggest complaints people have when they're running their component tests is that they're doing it in their terminal and they can't really see what they're what they're doing, right? So, you're you're writing your test, you're building your component, and you're changing CSS styles, and you're like, "Yeah, I think this looks good." But most of the time, you're actually to get any confidence before you ship, you're looking in your browser, and you're like, "Yeah, that looks right. I can send that to users and you also have

[00:30]
tests to help you drive like your contract for your component. However, it doesn't give you full confidence. And so browser mode for those of you who don't use it, which is a surprisingly like I'm I'm surprised at the at the numbers here. I was I was going to go for uh go for B basic intro actually. Um so for those of you who don't know though, um browser mode lets you look at your components in the browser. So my name is Jessica Saxs. I'm a senior software engineer at Heroevs. Previously, I

[01:00]
worked at Cypress on the Cypress component test runner. Uh around V013, I saw a message from Evan in the Vuecore Slack team, uh in the Vuecore Discord. And I spiked out something that looks very similar to how Vest browser mode does today. And I used that as the base for Cypress component testing. And for about 16 months or something before Vest landed, that's how I tested my Vue applications was through cyber component testing. Um I'm around the Vue

[01:30]
ecosystem. I'm not a core member. Um and I'm a Vest contributor. I also work on the Faker.js team. So idea of browser mode, very simple. Uh we should be able to test the components that we're working on in the browser. That's where we're going to ship them. And today, unfortunately, the majority of the tests that we write for our UI components are actually not executed in a real browser. Many of you, God, all of you. I'm so proud of every single person here. I have all these exceptions that I usually

[02:00]
throw into talks and I don't have to do any of them for you guys. Um, today the majority of the tests that we write for UI component are headless and that's unfortunate. It doesn't give us a lot of confidence and then we have a lot of issues where we have to emulate uh click events and such and we just can't test certain things. Um, spoiler, we can now with Vest browser mode. But, um, Vest browser mode brings the real browser component testing to you on your laptop for all V developers. So, people have been asking for this

[02:30]
from the beginning. As soon as Vest launched, um, people were opening issues December 7th, 2021. I think that's days after maybe a month after Anthony released VEST. Um and in the response to this he said hey sorry we're not looking to have browser mode uh we only want to do node testing for vest try using cypress and comment to that was yeah we get it but cypress is kind of heavy and

[03:00]
when I was working at cypress on component testing uh that is the number one complaint is like we don't want to have too many fragmented test runners in our stack it's a pain and you have to keep downloading Chrome and your GitHub actions and it's expensive. So, Vest browser mode very conveniently uh lets you work with an existing playright install. This is what it looks like for component libraries. This is a Nux UI test suite. So, the NX UI suite was written against Happydom in Vest and

[03:30]
it mainly uses snapshotting. So, expect blank to match snapshot, right? And it's not very um granular. when there's a failure, you're looking at, you know, the diff of HTML. And now after I converted it, it took me 16 hours to convert 2400 tests to browser mode. It was not hard. Um, yeah, it took me 16 hours to convert all of the component tests for Nux UI for this

[04:00]
demo. Um, afterwards, you can see very clearly and you can interact with with the issues. So, Nux UI is a actually a Vue UI library. Um, it's probably the most modern and largest one we have right now. So, it was a very good sample if I was trying to stress test Vest browser Cool. So, one of the cool things we get in Vest 4, and I'm really stoked for this, is uh the ability to take photos

[04:30]
with, you know, the screenshot API of your provider. A provider in Vest Parlance is Playright or WebDriver.io And you can bring your own um have custom provider support that that Vladimir added this year. And for people who used to be uh automation test engineers, it's basically the web driver So you can test difficult things now. You can take photos of WebGL components. Uh the first photo you'll see on the vest documentation is that of a Tresjs,

[05:00]
which is 3JS for Vue. Um, and that was one of the initial goals when developing browser mode. I remember very early on how excited um, some of the two of the original authors of Vest browser mode were when they got 3JS, Tres.JS running in browser mode and able to take a screenshot and be like, I can play with it even though it's a weird component. I can I have confidence that my tests will run. Um, so I'm really excited that and

[05:30]
I'll show you in a second. Um, I'm really excited that you can now get screenshot diffing right in browser mode. Like it looks pretty cool. You'll see. Um, you can get screenshot diffing as well as um operating OS specific and other production-like qualities that you'll want very soon after being able to take a picture and diff it. Right? There's a lot of nuance into my laptop screen versus the Docker

[06:00]
image in CI. And the guide that Vladimir was talking about goes into all of that nuance. It's an entire talk, so I'm going to skim over that. But TLDDR like it productionized the ability to go from page screenshot, which they added in V test uh vest 2.0, it productionized that ability and made it so that you can actually rely on it as a vest for super stoked. So for component library authors or people

[06:30]
doing weird stuff that's all nice for application developers um it allows you to really easily test especially single page applications. Um the more nuxy the more nexty or speltkitty you get the more speltkitty is a good one. um uh the more the more server side you get, the more you want an end to-end test because your routing layer is doing a lot of work, right? Your routing layers is making decisions for you. You have server endpoints that you're trying

[07:00]
to hit when you're generating your component tree. However, for single page applications, presentational components or components where you're very sure how the data will arrive, you can get a lot of assurance out of just using browser mode. And so you can reduce the number. You still have nto end tests, right? But it's a scale depending on how servery your application is. So the best case or the simplest case is a single page application that has an in-memory router that you can mock out. Since all of you

[07:30]
are testers, you know what I'm talking about when I say in-memory router mocking. Um, never gotten to go on that as a default. Um, I like this audience. So, so, uh, so yeah. So, let's see. The thing that you've been watching on the screen was me noticing while making this demo that it was very nice to be able to tell AI to migrate the rest of the 85

[08:00]
next test files and then watch it watch it iterate with watch mode. So, I was watching the AI do its job with a very detailed prompt after doing a lot of it myself. So, I did like 10 files myself and then I launched the watch mode in V test browser mode and then I like watched the AI do its little loop and it did the rest of the files and I was able to very quickly be like, "Yeah, great. Stop." And then I I fixed the uh fixed the things I wasn't sure wasn't certain about and didn't review all the code. It

[08:30]
was a nice loop. Highly recommend. So, Vest can run anywhere. Uh Vest can run in Node, JSDOM, HappyDom, and Edge runtimes. And so it was kind of an absent um it was kind of an absent thing that you couldn't run the browser motor. It was experimental still because Vita is for web developers and it was a little silly, right? It's kind of a missing feature. So now I'm very very excited that we got it to be VE ready. And what that means

[09:00]
to me is that it has to be extensible. It has to be packed with features and of course fast. And people have attempted to use playwright in a pinch to uh to test and this has been true for about seven years pre prey. So pre um let's say pre- pandemic 2018 the way that you would component test is you would start a story book and you'll see Yan uh you'll see the the evolution of this after I'm done. Um the way you would test components at scale visually is you

[09:30]
would start a story book. You would build a single page application of all of your stories and take playright and point it at that. And so the cost speedwise of doing this is a two and a half minute startup because we're in Webpack era, right? Two and a half minute startup for storybook. And then you point end to end playright at your stories to get component testing. And so the feedback loop on that is very very high in CI. And so now uh the speed of running something like that for a single page application like medium-sized demo

[10:00]
let's see medium-sized demo is about well all of vest UI took about 25 that's 2400 specs or sorry 2400 tests and 99 specs took about 25 seconds on my MacBook Um, and it went down actually when I moved off of headless mode. When I did the migration, it went down by like 5

[10:30]
seconds. And then I added visual regression testing back in, which is like about 200 screenshots. One or one for each light and dark mode uh, per component. So, it ended up being 2400 tests in total. 200 of those are screenshot tests and 99 fi 99 files. But that took 27 seconds. So as far as speed goes, I am pretty impressed with that. My hacker news demo takes about 2 seconds to run 20 sorry 2 seconds to run

[11:00]
12 files and 54 tests and those include full state management. So pa store uh view router uh mock network request with mock service worker. So it took two seconds in a headed browser instance for that. If you turn headed off, Chrome doesn't have to render. It goes even faster. Um, the headless version of those tests with testing library end up taking about a second. So, Vest browser mode is really freaking fast. And so, if

[11:30]
you're thinking about home rolling it, I think Tanner, when I was showing Tanner my talk yesterday, Tanner was like, "But can I make this myself?" I was like, "Yes, you can, but it requires a little bit of orchestration." And that's what Vest mode does. So what it does in a nutshell, it runs vest in a real browser uh with playright similar to like a web driver style solution. Um and you use the vest dev server in your config. So you use the same API, same describe,

[12:00]
expect test. Uh we have improvements on that that are not in testing library and I highly recommend that you use the now documented um and available your framework of choice. Um because you get a lot of ease. You get expect element which is a shorthand for eventually please resolve this element from a locator. So if you call get by roll or whatever you end up actually resolving to the element and then

[12:30]
checking if it's visible there. There's performance benefits on top of what you might be doing in testing library. So I highly recommend you use the documented one. Um, let's see. It's not new framework, not for end to-end tests and it's not replacing your existing component tests. You can still use testing library. You can still cut everything over with mostly the same code. I wouldn't because I think the outputed code if you use it as documented is much prettier and easier to reason about. And there's also

[13:00]
some edge cases that by forking the um, we actually fork the playright logic, not the testing library logic for querying. Um, but by utilizing that you actually cover up some uh or catch some edge cases that you might have been letting slip in your testing library tests because of the staleness of locators. Um, we deal with it a little differently. So technically you call vest run uh it starts a vest uh instance of a vest project, right? So you can run this

[13:30]
alongside all of your nodebased tests. If you have SSR tests, you can just run them all and they all parallelize the way that you would expect. uh we call them workers when it comes to browsers. We have the term environments is overloaded in vit right you have jsdom you have happydom those are all environments browser mode is implemented a little differently so even while you're thinking of it as an environment like you might you might hear uh hear another word for it that's called a worker so spawns about head five headless chrome instances and then it

[14:00]
distributes the spec files across all of technically for because we're all experts gez um please stop me somebody yell if you're like I'm very lost but I'm going to say um technically what ends up happening is that you reuse the playright context across all five um workers right so if you were to implement this yourself with playright you would be managing and a lot of the flake and the life cycle of setting up and tearing down and making sure those uh those playright instances were available so that's that's what vest uh

[14:30]
vest browser mode does for you on the provider layer um there's a parallel implementation of course for web driver IO. So this is what it looks like. Um there's a change in vest 4 for browser mode where playright is now a function. This is the pact team asked us to reduce the number of dependencies because they're are good citizens and we obliged gladly and now you import playwright as a separate package. So if you're using bre uh if you were using vest browser mode previously, this is what you will

[15:00]
do in vest 4. Also better type safety. Yeah. So, now we're going to look at the hacker news demo I hinted at. Let's see. I'm going to show off the speed. And here we go. Let's go to All right. So, let's just do a full run.

[15:30]
There's a mode that I learned about today that I'd never really used. It's called standalone. Um, it's really helpful for demos if you don't want all your tests to run immediately. Show it off. So, you hit enter, it runs, it starts up, but nothing happens. So, what you can do is you can go to the file. So, let's go to let's say the comments test, comment browser test. You hit save, it launches the instance, and then you're like, "Oh, cool. There are

[16:00]
all my tests." Um, and it only runs what you have saved. So, if you're working on a particular thing and you really quickly want to get something up, you don't want to run your whole suite, maybe it's large, that's how you can quickly show something to somebody. Um, to run everything, you just hit run all and then let's see, it is done. There's a bug on the counter that sums up everything. So, it doesn't take into account parallelization and also appends. So, this is a incorrect number. It actually doesn't match the terminal um at all. So, the terminal

[16:30]
says 3.11 seconds. So, there is a big bug on that on beta. So, it lies. Um, it's about 140 seconds off. I don't know. Um, we'll get there. We'll get there. Um, but yeah, so that was all of our tests. It's slower because it's headed. Um, it's not that much slower, honestly. And that ran everything. It ran integration tests as much as you can integrate in a single page app. Uh, a lot of these would end up pushed into an endto-end app if you were doing this in your normal application.

[17:00]
um the comment tests and stuff like that would still be browser mode component tests if you wanted it to be. Um we're still working on the ergonomics of in particular large and scaling of the canvas. So this is the canvas pane browser UI and the dashboard. We don't really like how you have to go back and forth here. You can make it really nice unless you have a very uh very big monitor like we all do. Um and then you can go ahead and and easily debug. It's

[17:30]
terrible, terrible to do on stage. So imagine it with me. That is how a single page application would kind of work um in a hacker news demo. Back to plot. Let's see. Did I miss anything on that? No, we're going to look at the code in the next UI demo. So we're going to do the live code in the next UI demo. So the big news I hinted at is we will be marked stable later this month.

[18:00]
Um, that's the applause moment. It has the It has the Yeah. Thank you. Thanks, guys. Sorry. Um, so we'll be mark stable later this month uh version 4. Thank you so much to the uh the Vest Core team especially uh for really cranking on browser mode this last year. So, exciting new features, I hinted at them. Visual regression testing, we'll do that in a second. uh thorough guide hinted at that. Please

[18:30]
read the thorough guide and you can try it this month or today with for beta. Uh we also have the playright trace viewer if you can get it's behind the browser trace flag and we had one ecosystem expansion this last year quick added uh quick added itself for a quick start. Yeah, cool. Visual regression testing the curious case of the icon button. So, how many of you guys have written an icon button? Yeah. How many of you have been like,

[19:00]
I'm not testing the icon button because there's no way. Nested SVG selectors. You're like looking for a class. You're like, but it's not always going to be a class. Sometimes it's an SVG. I don't know. Why do I have to label it? Um, cool. So, you can do it easily if you just take a picture, right? That's kind of the that's kind of the the punchline of visual regression testing. It's like, h, I could do it correctly or I could just take a picture. And you're trading off, right, the the security of knowing

[19:30]
exactly why it failed and kind of being at risk of uh some async issues, right? If you have any loading spinners, which are disabled by by default, by the way, um or images is probably a a better use case if you have an image that kind of comes in slowly. So, that little guy um is kind of at risk for visual regression testing. We have lots of options to turn that off. We have the ability to inject CSS to be like don't render the images. Images should be display none or that's a bad one. Should be like opacity zero with a border of whatever.

[20:00]
>> Oh, you lost it. Want to There we go. >> Perfect. Thank you. Cool. So, quick demo. Back to the button. So, we're going to look at some code. We're going to look at the button spec for the icon button. So, here we have a render. Um, this is a wrapper for your very favorite. How big are we? We're doing that one was fine, right? Yep.

[20:30]
Cool. We have a wrapper for our vest uh package. This is a very advanced uh this is a very advanced UI library. It has its own vit extension actually. So this component test is testing the VT extension that NXUI actually publishes to get all those colors in. It's looking for a Tailwind config. It's generating CSS variables based on your primary theme. It's doing a lot and you don't see any of it here. And in that render,

[21:00]
the render is actually not terrible. I don't remember the state I left it in, so we're not going to look at it, but it was not that bad compared to uh not being able to do it at all. So let's fire this little guy up. Here is the full suite for the entirety of Next UI. Let's go to the ones that pass or fail and only the tests and let us try it out. It do only save. Run.

[21:30]
No dice There's one bug that I've told Vladimir about yesterday and uh he was like, "Oh, you have autosave turned on in your editor." I was like, "Of course I have autosave turned on in my editor." He's like, "I don't." And this is the bug. So, we'll fix that because I'm here and Vladimir has my computer now and he can reproduce the bug. But in the meantime,

[22:00]
we're going to restart the server. Cool. So, here's our vcon button. Boom. You can do some pretty cool things in here. You can actually edit directly in line. So, hello v test. V save Told you I'm not feeling lucky. Oh. Oh. Thank you. There we go.

[22:30]
Test. Boom. So, edits really fast. That's saving to my disc. Like that's that's going full round trip. Awesome stuff in the uh in the actual editor. So here we have the icon. Let's test that we can take a photo, break the icon, and that when we restore it, the uh the test passes again. So close the close the terminal. I don't like terminals. I mean, I do, but I don't like looking at them when I have the option of looking at the thing I'm shipping is I guess the the distinction.

[23:00]
So renders the icon within the button. Let's get access to the locator that is returned by the render method. Locator is going to be something that we can await on. So the render method is async and everything that you want all the handles get by whatever they are all available uh to be evaluated on demand when you want them. So let's await for the locator. Await expect element locator to be visible. Here we go. We're

[23:30]
very certain that it's on the page now. And now we can expect. And if I'm on a real monitor, I have this left and right. I'm typing. I'm looking, right? I'm not even uh it's it's really nice. Okay. So, wait. Expect element locator to match screenshot. Let's call it icon button And so now on my file system, uh I'm not going to open it because I have a very large set of things here. Um on my file

[24:00]
system there is a vest attachments folder that contains the state based on this key and we'll go over here. It says hey you have a reference screenshot. This is the annotations API that uh that Vladimir was demoing. We use it here. So we okay we have a reference screenshot. Let's break it. So button view button view here we have some nice slots and this is where the icons end up getting rendered. Let's kill them. save. And then we have a breakage.

[24:30]
Sorry, it flashes. I know. Um, as an epileptic, I know I'm I actually feel really bad about that um happening. So, here we go. We have our our bad photo right here. And we can tell very cleanly that this is not supposed to be there. And we can open up the debugger. We can put break points. We can do all sorts of things. And that's very nice. So, I'm going to go back. I'm going to save. I'm not going to tab over so I don't flash bang everybody. And then when it's safe, I'm gonna go back and it'll say it's

[25:00]
good. Yay. Yeah. Yeah. So, so um there's a lot of stuff in here that you might have seen demoed this this day. So, or this week, you'll see the module graph that Anthony talked about. There's a lot of stuff inside of Vest browser mode. It's kind of the culmination of a lot of the tools that the V ecosystem ends up building. Let's Anything else? There's quite a bit

[25:30]
Quite a bit. And I'm 30 seconds over. >> You want me to keep Okay. Um, so even though it's experimental, it's been adopted. It has over five and a half million downloads on Vest Browser React. It's actually only a slice of atest browser. And we were trying to figure out where the other downloads go. And so we think that there's a lot of people using testing library with Vest browser

[26:00]
mode. Hands testing library plus V test browser mode. How do you render your components browser mode people? Do you write them to the DOM directly? H yeah you render them to the DOM with like the native framework render. Okay. So um so each framework has its own rendering library. um view test utils, enzyme, other other kind of rendering libraries and then there's obviously testing library on top of

[26:30]
that. Um so however you're getting your components into the browser mode lots of browser mode users um you should be using these they are very nice they give you that that that sugary syntax and also the safer better locator pattern that we are building everything on top of. So special thanks to the Vest team, the community and you. One of the asks that I have for you is please use it. Um, please use it more. Please give us bug reports. So, I shouldn't be the one perhaps with the only autosave setting

[27:00]
on to complain to Vladimir uh the day before the demo in order to uh to get that one race condition fixed. We really, really want you to complain to us in Discord. We want you to complain to us on GitHub issues. Um, the more users we can have, the better. And that's all I have. Thank you so much.
