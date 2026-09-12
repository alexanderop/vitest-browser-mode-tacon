---
kind: youtube
title: "Test Angular Components Like a Real User with Vitest \"Full\" Browser Mode"
url: https://www.youtube.com/watch?v=Pu22JQG6jdg
author: Younes
publisher: Younes - The Software Cook
published: 2026-02-12
collected: 2026-09-11
status: complete
caption-source: creator-provided English captions
---

## Description

Angular 21 made Vitest the official testing framework. Whether you're coming from Karma or Jest, Vitest Browser Mode is the feature you don't want to miss.

But not all browser modes are equal:
🌓 "Partial" browser mode — a quick win. Most existing tests just work.
🌕 "Full" browser mode — interactions go through Playwright's automation API, catching bugs your current tests might miss.
This video covers both, shows why "full" browser mode matters, and walks through a progressive migration strategy — no big bang rewrite needed.

⏱️ Timestamps
0:00 — RIP Karma, Jasmine & Jest
1:05 — Karma → Jest → Vitest: A Brief History
1:45 — Why Go Back to the Browser?
4:06 — Writing Tests without Browser Mode
9:40 — The Bad Timing Issue
15:32 — Enabling Browser Mode (Angular CLI & Nx)
19:24 — Debugging in the Browser
20:35 — CSS Bugs & False Negatives
22:19 — One Import to Fix It
23:16 — "Partial" vs. "Full" Browser Mode
26:36 — "Full" Browser Mode with the page API
30:28 — Precise Queries with Locators
32:28 — Playwright Traces for Debugging
37:45 — Key Takeaways & Migration Path

📖 Free Angular Testing Cookbook: https://cookbook.marmicode.io
🎓 Video Course: https://marmico.de/test.ng
🏋️ Workshops: https://marmicode.io/workshops
💻 Code: https://github.com/marmicode/cookbook-demos/tree/angular-testing

#Angular #Vitest #Testing #Playwright #WebDevelopment

## Transcript

This capture groups the creator-provided English captions into 30-second intervals. The caption wording is unchanged, apart from whitespace.

[00:00]
…We've gathered today to mourn the end of Jasmine, jest, and testacular. What? It's karma now. Sorry for the dead-naming. Karma, you did your best to make tests symmetric to production. But you've launched the browser and died waiting for it to connect back… Jasmine, without karma, life became meaningless.

[00:30]
We all need a browser to feel alive… Then came Jest. You promised us zero config. You prankster. Well, sorry for leaving you behind in the common JS desert. So, yes. We are here today to mourn — but also to celebrate. Celebrate the adoption of Vitest as the official Angular testing framework. Karma, Jasmine, Jest, rest in peace.

[01:00]
And may the new generation honor your legacy … …Fall twenty twenty five was an eventful period for Angular testing and web testing in general. First, Vitest version four was released and they made browser mode stable. It was experimental before and now it's stable. Then a few weeks later, Angular twenty one was released and the Angular team finally chose Vitest as its official and stable testing framework instead of Karma, Jest, or Web Test Runner.

[01:30]
Just between us, I personally think that the stabilization of the browser mode API helped the Angular team's decision to choose Vitest. But there are probably other factors. In this video, we will dive into Vitest Browser Mode, which allows you to run your Angular tests in the browser using Vitest. This raises an interesting question. Why go back to the browser after most of us moved to Jest to escape it? Well, Angular testing started with Karma and Jasmine, which were great tools at the time.

[02:00]
But Karma had some fundamental issues. For instance, Karma could lead to inconsistent browser versions across developers' machines and CI environments. You know that classic, um , it works on my machine, but it fails on that other person's machine or in the CI… In addition to that, Karma was not in full control of the browser, which presented some other challenges and quirks. Then, a big chunk of the community moved to Jest to escape that pain and get some other

[02:30]
advantages such as the dependency graph which allows Jest to only run the tests affected by a change when in watch mode for example. Uh, The problem is that in this deal, we traded a real browser for an emulated environment. It had some advantages but it came with a major drawback. It's not a browser. But our production code is running in a browser. That asymmetry between the testing and production environments is a breeding ground for bugs and headaches.

[03:00]
So how is Vitest browser mode any different? Well, you get all the Vitest benefits that I'll cover in my cookbook, but the key difference is how Vitest can control the browser. Unlike Jest, we have the option to use the browser or not and unlike Karma, which does not have much control over the browser, Vitest uses what are called browser providers to open browsers, control them and interact with them.

[03:30]
The most common Vitest browser provider is Playwright. Now, this is important to understand. Even though Playwright is a whole testing framework by itself, Vitest is not using the testing features of Playwright. It's only using Playwright's core automation APIs, the parts that allow Vitest to fully control the browser through Chrome DevTools protocol. This also gives us other advantages like debugging traces on the CI or parallelizing tests on different pages or avoiding browser version inconsistencies by using the browser versions provided by Playwright.

[04:00]
What? Enough talking? You wanna see it in action? Okay. Give me my coding apron, please. Thank you … Okay. So my goal here is to test this Cookbook Catalog app and more specifically the cookbook search component where you can search for, uh, food cookbooks or software, uh, cookbooks , and you can add these cookbooks to your cart to buy them later or read them later, then you

[04:30]
can filter the cookbooks like this… As you probably already have some tests running in Karma or Jest and that you'll be progressively migrating them to Vitest. I will start with the tests using an emulated environment, uh, and then progressively turn on the browser mode and use the browser mode, uh, API so that you can progressively get the full browser mode, uh, experience.

[05:00]
By the way, if you wanna migrate your Karma test to Vitest, there is an Angular CLI, uh, migration for that. And if you wanna migrate from Jest to Vitest, you can read more about this in my cookbook as there is a codemod that does something similar. Okay. Let's prepare our tests … I have a little live snippet here… and the component is Cookbook Search

[05:30]
… Let's just describe our tests for that implementing them … And another test when we click the add button …

[06:00]
That's it. Let's create the components. There are different ways but I'll just be using the TestBed here … There are different ways of querying and interacting with the DOM. One of them is using the TestBed, but it's pretty cumbersome and low level. And, uh, before the Vitest browser mode APIs, it was

[06:30]
common to use testing library, which is a third party library that allows this. Um, let me show you … This allows me to query the DOM in an accessible way and wait for the, uh,

[07:00]
inputs with the keywords label, uh, to appear. Note that this is asynchronous and will keep retrying and waiting for that element, uh, to appear, which is interesting because this way, I don't have to wait for Angular synchronization to happen or whether the app is stable or not. I'm just…polling and waiting. Now, in order to interact with this input and trigger the right events in the right order, I'll be using another testing library package called

[07:30]
UserEvents … And here I can just type inside this input … I want to only filter cookbooks where Marmicode is involved. For the sake of simplicity, the cookbooks are hardcoded in the app

[08:00]
and I know that there are three Marmicode, uh, cookbooks there. Uh, so I'll just make an assertion where I'm waiting for the cookbooks to appear and I'll check that there are only three of them … Here I'm using Find all by role because there are multiple cookbooks I'm looking for. And, uh, the heading is the element that contains just the label…of each cookbook.

[08:30]
And I want to make sure that there are, uh, three of them displayed … This looks good. So let's enable the test and run it… As I'm using Nx, I will call Nx test to run the test. And if you're using Angular CLI, you should use ng test.

[09:00]
And you should also give Nx a try because it has many features to offer beyond what Angular CLI has. By the way, it is worth mentioning that most of the time you will have a test script defined in your package.json, so you just have to call npm test. I will just add two other options, which are watch and UI. Watch so that it keeps watching the tests and running them. And UI mode, uh, which will show the reports live in the browser. But right now, the tests are running in Node.js in an emulated environment with JSDOM.

[09:30]
We're not in browser mode yet… Shoot. The test is failing, and it's displaying all the cookbooks and not filtering. Uh, and it's not running in the browser, so I cannot even, like, debug it in the browser and see what's happening easily. But if you remember how the app works, well, the cookbooks are grayed out while we're filtering the cookbooks.

[10:00]
This can happen if, I don't know, you have an effect in Angular under the hood that's scheduling some work or maybe some hard coded time out there because there's some debounce or something. So there are different ways of handling this and I don't want to deep dive into Angular and wait for the synchronization to finish or for the app to be stable or something like that. I wish I could just not keep polling only to find the elements, but I would like Vitest to

[10:30]
wait until there are exactly three cookbooks there or that the test times out. Well, Whether you're using Vitest in browser mode or not, Vitest has some APIs to do this polling logic or retry logic. Uh , we can do this by simply calling expect.poll… And here we have to pass a function… that can be

[11:00]
synchronous or asynchronous. And here it's asynchronous because it's returning a promise … And we have to await for it. We're telling Vitest to keep calling this find all by role until the length of it is three. Let's see how it goes… And the test is passing. Now given testing library is also doing some polling in find all by role, and we don't need

[11:30]
that, uh, because Vitest is doing it already, uh, we can just call query…all by role, which is the synchronous alternative that only tries once and returns an empty array if it finds nothing… And the test is passing. Now let's check the titles of these cookbooks …

[12:00]
And our test is passing. Now of course we could factorize the DOM interactions and utility functions or harnesses or what I call gloves, but this is out of scope.

[12:30]
Now, what if the previous state has three cookbooks to you? You'll want to retry this whole block. Well, Vitest has an API for that too. Uh, it's called wait for, and it's similar to wait for from testing library, for those who know it. And you just have to call it like this… Await… Wait for … And I'm waiting for the headings to be three

[13:00]
… And that's it … Let's implement the second test … We'll create a component … We will click on the first, uh, cookbook button …

[13:30]
And let's click on the first one … Now, uh, let's make sure that the cookbook is in the cart

[14:00]
… So here we injected the service… And now I can make sure that… the Angular Testing Cookbook, which is the first one in the list is in

[14:30]
the cart … So it should be an array…where the first item…has the title Angular Testing… Cookbook. The toMatchObject matcher is an asymmetric matcher that doesn't require you to provide all the fields. I just want to make sure that the first cookbook has this title. And…let's enable the tests

[15:00]
… And the test is passing. If for some reason, uh, there is some debounce or some effect or whatever that only updates the cart after some time, well, here again you can use expect.poll … And it will work … Now, let's enable Browser Mode.

[15:30]
Indeed, the default behavior today is that Angular CLI and Nx will set up Vitest within emulated environments using JSDOM. So if you're using the Angular CLI, you will have to fill the list of browsers you wanna use in the angular.json configuration file like this … Then, you can add the browser provider of your choice like,

[16:00]
uh, Playwright, uh, using ng add. Like this. Uh, we're using ng add because Angular CLI might uh, configure the typings or add the Playwright package if it's missing and do some additional stuff around the package installation. If you've made the great choice of using Nx, it will offer you two options when you set up Vitest. You can either use the Angular unit test builder, like if you were using the Angular CLI or you can use the Analog plugin approach which I highly recommend as it offers more features, more

[16:30]
flexibility and integration with other tools. Uh, but I'll be covering this in my cookbook and video course pretty soon. Uh, we also deep dive into this during my workshop that you can register to on marmicode.io. Let's get back to our workspace. If you're using the Analog plugin, whether you're using the Angular CLI or Nx and you want to enable the browser mode, well, you just have to follow

[17:00]
the Vitest docs and follow the setup instructions to enable browser mode. So let's try it out. I have a Vitest config and a Vitest config. They can be merged into Vitest config or they can be in two different files. In here, usually, you'll be using the JSDOM emulated environment. And if you wanna enable browser mode, you just have to change the configuration like this …

[17:30]
I just have to import playwright from the Vitest browser playwright, uh, package that I've already installed. Now that I've configured the playwright provider, I have to choose the browsers that I wanna use. For example, Chromium. So I'll add different instances … I can choose Chromium, WebKit, or Firefox

[18:00]
… And there can be different instances of the same, uh, browser with different options like different view ports, uh, for example. Let's just remove the JSDOM environment, which can be confusing here… And let's run the tests …

[18:30]
Good. Let me zoom in. We can see that our components are really, uh, running in the browser. Uh, we can see that the filtering is working, that the other test is passing. And I can even change my configuration… and use a different viewport … I think this is the most common one.

[19:00]
You can see that Vitest detects that the configuration has changed, so it reruns the test. And I can zoom in again. I can remove this. Great. We can see the filtering and the other test passed in here. How cool is this? And we can see here that we're running in Chromium… All good. As we're running in a browser, I can…use the DevTools to inspect the DOM

[19:30]
and inspect some button and see what's happening or go to the source code, find…my Cookbook Search component and, I don't know, add a breakpoint here… run my tests…and I can see that when the button is clicked, the cookbook here is the Angular Testing Cookbook. And that's it. There are other ways of debugging, but let's keep this for another time.

[20:00]
Note that Vitest Browser Mode brings some new matchers like to have text content that we use to add manually through third party libraries like here for example … In my Vitest config I have a setup file , test setup matchers, that imports testing library, uh, matchers. So from now on, I can simply get rid of it and my test will still work.

[20:30]
Let's now break the CSS of our, uh, Cookbook preview component here and make it smaller so that the buttons are not visible… Cookbook…preview… And here … let's set a fixed height like this … and clip whatever overflows.

[21:00]
We can see that…it's not usable… but our tests are passing … This is disappointing. It's a false negative. Our test is passing but the app is actually broken … This reminds me a little story back in two thousand thirteen, thirteen years ago. It was the beginning of, uh, Flexbox and CSS, and we started using that.

[21:30]
And Chrome did an update, and for some reason, our usage of the Flexbox was broken. So we have the similar catalog like this, and each card had a height of one pixel. So the app was totally broken just because of some CSS issue. What is happening here? In our test, we're using Testing Library User Event package to interact with the DOM. The problem is that this package does not make enough actionability checks. What does that mean? Well, before clicking on the element, Testing Library's event package

[22:00]
will make sure that the button is not disabled for example or it's not hidden explicitly. But it's not making sure that there's not another element on top of it or something like what's happening here. But Playwright has way more actionability checks. So what if Vitest could benefit from that and what if we only had to change one line in our test?

[22:30]
Well, instead of importing UserEvent from testing library, we just have to import it from Vitest Browser… And our test is failing. And if we look at the error message… we can see here in the browser report or in the terminal that under the hood of Vitest, Playwright is trying to click on the button. It's actually picking its coordinates and triggering the click event there.

[23:00]
And it notices that it's actually another element that's intercepting the event. So it's trying again, meaning that the button is covered or something. Then it keeps trying until the test times out. So until now…we were using what I call partial browser mode. But by using user event from Vitest browser, we're getting into full browser mode. So let me explain. In partial browser mode, Vitest

[23:30]
is mainly using the browser provider to spawn a browser. The browser then loads the test from the Vitest server and runs them. This is when we typically create the components then query the DOM, uh, which has some limitations because, for example, if we're using the shadow DOM we cannot pierce it because the browser rules apply to our tests too. And then we generally interact with the DOM uh, either directly by triggering

[24:00]
events or through a third party library like testing library user events. And that's where our problem comes from, uh , because we don't have the actionability checks from the browser provider. Finally, we make our assertions and the test results are sent to the Vitest server. To leverage the true power of the browser provider, which is Playwright here, we have to switch to what I call the full browser mode. To do so, instead of interacting with the DOM directly,

[24:30]
like we did before, we have to use the APIs provided by Vitest. One of these APIs is the user events adapter, uh, that has the same interface as user event from testing library, but with a different behavior. When we call something like userEvent.click, um, Vitest will actually figure out the path to that element, send it to the Vitest server that transforms that into an instruction to the, uh, browser provider.

[25:00]
Uh, so it kind of looks like if we called Playwright's page dot get by role the button dot click. This way, the browser provider, Playwright, can then do what it's really good at, meaning interacting with the browser through Chrome DevTools protocol or… other means in the future, and then perform all the actionability checks like whether the element is really, uh, visible and not, uh, hidden or overlaid by something else.

[25:30]
And once the action is performed successfully, we let the test continue and that's where the assertions happen and we send the report back to the Vitest server. We've seen that switching from Vitest emulated environment to partial browser mode is mostly a matter of Vitest configuration. So if you've migrated your test from Karma and Jasmine to Vitest using the Angular CLI

[26:00]
migration schematic or if you've migrated from Jest to Vitest by following my recipe from my cookbook with codemod that does the work automatically, then you will just have to turn on browser mode and get partial browser mode. The next step is to progressively switch to full browser mode. So if by chance you've attended one of my workshops or my video course, uh, well, you must have seen that I recommend using the user event package from

[26:30]
testing library, which makes things easier as you've seen. But there are also other APIs that are way more convenient than user events and that I'll show you right away… First, there is a page API similar to the one from Playwright, and we can use it like this …

[27:00]
The main difference with testing library and other alternatives is that the querying methods from page, uh, are not imperative. They're not querying the DOM right away. They're actually, uh, returning a locator that acts as a recipe that will allow us later to find the elements to interact with it or to make assertions on it. For instance, I can now call a fill method to fill the input…

[27:30]
Now, this method is asynchronous because it is actually querying the DOM and using the locator to find the right element and put the text in there. And I just have to wait for it. As you can see, it's more convenient as we need less asynchronous calls and intermediate variables like the keywords element here… And the test is passing.

[28:00]
The other cool thing about these locators is that, uh, we can put them in a variable and, uh , reuse them with different actions assertions. Let me show you. So now…I can grab all the headings … like this …but the query has not been performed yet. And then I can make an assertion… But instead of using expect, I'm going to use expect.element,

[28:30]
which is a special, uh, matching system for, uh, locators and elements … And I can give it the locator and say, okay, this should have three elements. And it is asynchronous, so I will have to wait for it… And then I can check the contents of the each heading … But here headings is not an array

[29:00]
because we did not query the DOM yet. Uh, it's again just a recipe. So we'll use a similar API that we have in Playwright. It's grabbing the nth element. So I will ask for the…zero index, which is like the first one, and I will use to have text content Angular Testing Cookbook. As you can see, this is also asynchronous because it's actually the matcher to have text

[29:30]
content when used with expect.element that will keep, uh, retrying until the assertion succeeds. Then I can do the same thing for the other… uh, elements …

[30:00]
And I can get rid of the old code… So here I do not need any explicit, uh, polling like, uh, wait for or expect.poll. It's actually expect.element matchers that do the querying and polling, uh, for us. And, um, I mean, we're using the same, uh, locator variable and it just, uh, works. Let's move to the next test. So…previously, I

[30:30]
took the shortcuts of just picking the first element and add it to the cart. Here, I will use the page API to not only do the same thing, but even query more precisely without much effort. So, find all the articles… And pick only the one that has the following text …

[31:00]
Then inside this one or these articles that are filtered, I want you to find the add to cart button … Once you find this button, click on it … This is asynchronous. I have to wait… Now I can get rid of these two lines

[31:30]
… And my test is passing. As this is using Playwright under the hood, we get all the benefits of Playwright. So for example, if there's more than one button matching … then the test will fail … Also, I can use some playwright specific APIs because I'm using the playwright provider, so it's extending my types.

[32:00]
And I am…able to use a delay here and say my click is slow … You can see that it clicked for a longer time. Let's run it again. You can see the click is slower. Back to our imports, we can see that we're not using anything from testing library anymore. And tada. If you're still wondering if going for Vitest's full browser mode is

[32:30]
worth the effort… or simply if you're just curious about all the other benefits, Let me show you another Playwright feature that Vitest will benefit from. So a common pain point with testing is flakiness, especially, uh, with your CI workflow. So your test is working locally, uh, because your machine is powerful and your cache is populated and everything. But, uh, when it comes to your remote CI workers, well, the story is different and

[33:00]
tests tend to fail a bit randomly. And, uh, this can be really hard to debug. But, if we're using Vitest's full browser mode, well, we can ask Playwright to keep a trace of what's happening on the browser so that we can debug it afterwards. So let's watch this in action. First, let's make both our tests, uh, tests, uh, fail.

[33:30]
So here instead of looking for the Marmicode cookbooks, let's look for Bocuse, uh, cookbooks. And, uh, here instead of adding the Angular Testing Cookbook, let's add the Nx cookbook. Then let's ask Vitest to trace the tests when they fail… So here … in the configuration, I will ask it to enable the trace, but not all the time because, uh, it can, um, slow down the whole, uh,

[34:00]
workflow, but only on the first retry. And we'll ask Vitest to retry the tests once when they fail. Another important observation is that if you want proper traces, uh, you have to enable headless mode… Um, by default, this is enabled on the CI. But if you want proper traces locally for some reason, you will have to turn this on, uh,

[34:30]
through the configuration or through the CLI. And…um, note that parallelization also only works if, uh, headless is turned on. Otherwise, uh, your tests are not parallelized. It is worth mentioning that I'm using the Analog plugin approach here, uh, but this is, uh, still possible if you're using the Angular CLI, uh, unit test builder, which allows you to have a Vitest base config that it will extend.

[35:00]
So you can control the retry and the trace options , uh, like this, uh, even if you're using the other approach. Let's add an HTML reporter so that the CI produces an HTML report we can download and analyze locally. And let's run the failing tests…as if we were on the CI worker … Now, let's open the HTML report.

[35:30]
npm Vitest preview… Here we go … We can see that…our tests are failing, we can see that this one failed because uh, it didn't find the right cookbook. We can see that it tried twice. This is the first try, this is the second try. And interestingly, we have a Playwright trace as a test annotation that we can download. And, uh, here for the other tests, it's not receiving, uh, the exact number of recipes it's

[36:00]
expecting, so there must be something wrong with the filtering. And we can download the playwright trace here. You can also find the traces on your file system in the traces folder , uh, with a folder for each test file and the traces here. So I can pick this one, the one that adds the cookbook to the cart. And, uh, let's just copy the path…in here. If you're using NPM, just call npx. I use PNPM, so I'm calling PNPM.

[36:30]
Playwright… show trace and then just paste the file name here. Let me just zoom in… And we can see the Playwright trace of this test. We can see that the click interaction happened that's because we're using the full browser mode and we're really calling the Playwright API to trigger the click and we can see that the the cookbook that received the click is the Nx cookbook, but we wanted to click the Angular

[37:00]
cookbook so that's where the, uh, problem, uh, comes from. And of course, you have everything you have in a Playwright test. So you have the network traces, you have the console, the errors and everything. Let's have a look at the other trace … This time we can see that we've been typing, uh, book using the keywords instead of Marmicode and we can see that a few milliseconds later, uh, we're filtering the wrong, um, cookbooks.

[37:30]
Uh, there's this other thing which is that Vitest takes a screenshot when the test fails, so it makes it also easier to debug without opening the the trace. And, um, that's it. Let's wrap it up. Vitest browser mode runs your test and the exercise code, which is your production code, in the browser. So there's less asymmetry issues because your testing environment and your production environment are similar. It's just a browser. The only thing is that browser mode, as of today, is not enabled by default.

[38:00]
So, for Karma users, even though the Angular documentation mentions that enabling browser mode is an optional step, well, I highly recommend it, uh, because your Karma tests are running in the browser, so you better switch directly to Vitest browser mode. If you go through the emulated environment, you might meet some trouble there. Now for Jest users, now you enable Vitest browser mode, you will not need polyfills and

[38:30]
mocks or stubs for browser APIs because you will be running in a browser. But, uh , if some of your tests are using Node.js APIs or something for some reason, these APIs will not be available in the browser, so they might require some additional, uh, attention. In that case, you can configure Vitest to run some tests with browser mode and some tests with the emulated environments, so that you can migrate progressively. We've also seen that enabling browser mode, uh, just enables what I call partial browser mode

[39:00]
, which is indeed a quick win, but the goal should be full browser mode, So that we can get, uh, better developer experience, the actionability checks from Playwright or any other provider, and we can get, uh, traces and other features such as those. For the lucky ones who've been using user events from testing library, well you can get the full browser mode experience by simply using the user events

[39:30]
adapter from Vitest, by simply changing the import path. Then if you're writing a new test or fixing some tests, whether you've been using user events or not, I would highly recommend using the page API as it provides better DX and locators similar to the ones from Playwright, uh , so it makes tests, uh, more readable, more robust, and you will not need that much manual polling effort and things like that. It is important to know that we're not using Playwright as a test runner here.

[40:00]
We're using Vitest as a test runner that orchestrates tests and runs them, uh, but it's using Playwright as a browser provider under the hood to control, uh, the browser. One final note is that you do not have to migrate to Vitest and, uh, full browser mode in a big bang. Even though the Angular migrations and AI agents can help with that, I would highly recommend to, uh, migrate progressively.

[40:30]
You can migrate few tests to Vitest, then you can enable browser mode only in few tests, and then you can start using the page API to get really the full browser mode experience only on the new tests you're writing or fixing, for example. From here and from the challenges you will meet, you can define a nice progressive migration strategy. And if you want to dive deeper into Angular testing or the tooling or the testing strategy,

[41:00]
which is often the hardest part, uh , check out my cookbook, which is free and my video course, which is not. The links are in the description of course and thank you for watching. You can go back to your kitchen now.
