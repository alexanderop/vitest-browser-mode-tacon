---
kind: youtube
title: Vitest Simplified
url: https://www.youtube.com/watch?v=snCLQmINqCU
author: LearnVue
publisher: YouTube
published: 2022-02-14
collected: 2026-09-12
status: complete
---

# Vitest Simplified

Duration: 4 minutes 54 seconds.

Transcript source: automatically generated English captions. Rolling caption duplicates were removed. Technical terms were corrected only when the visual context made the intended identifier clear.

## Transcript

### 00:00

v test is a unit test framework powered by v similar to v it improves the developer experience by being incredibly fast with hot module reloads and also offers tons of unique optimizations if your project is built using v while v-test is framework agnostic we're going to take a look at how to use it to test the view 3 app so you may be asking is this better than just and while most front-end developers myself included have used jest extensively in the past the test offers some unique benefits first while it's possible to use just inside of a vit app it essentially means that we have two different pipelines to

### 00:30

configure and maintain one for the functionality of our app itself and one for our testing suite since vtest builds rv we can share the plugins and configuration that we define in our vconfig between both our apps and our tests meaning there's just one pipeline to maintain and if your app is already using just v-test is compatible with most of the just api and libraries meaning that it can be a simple drop in replacement that you can try for yourself but if we want to install v-test into our app we can say npm install d v test and while we can add a

### 01:00

ton of configurations for our testing environment itself in our example there's only one thing that we want to change and we can do that inside our vconfig file in our define config let's add a property called test and then set globals to true and this provides our v test api globally so we can use methods like test and expects without importing them just like we would in jest to actually run our tests let's create a script inside of our package.json called test that runs v-test and this automatically runs it in watch mode so whenever we make changes to our files

### 01:30

the affected tests will rerun and now let's make a source tests folder and create our first test file called simplexample.test.js like i've mentioned a few times v-test is framework agnostic so to start off let's just create a simple example for us to try out our first test and we're just going to use some plain javascript and create an object called user with a property of name and i'll set it to my name matt and age and we'll set it to 22. since we set global's to true we can just go ahead and say test give a name of our test and

### 02:00

we'll just say matt is 22 and then create a function that actually runs our test and this will look pretty similar to jest using expect first we want to get our user.name then we can check the value by saying 2b and then checking if it's a string equal to mat and we can do a similar thing with the age and check if it's 22. and if we go to our console and run npm run test we'll see that v-test automatically finds our.test file and our test passes so with a simple example out of the way let's see how to test a view component and to better test

### 02:30

view components let's install view test utils with npm install at view test utils and one change we want to make now is in our package.json file instead of just running v-test let's run v-test dash dash dom to allow v-test to mock our browser api with happy dom alright perfect so the view component we're going to be testing is the default veet hello world file where we have this message being passed in as a prop and when we click this button the count will update so let's make our helloworld.test.js file and get to work

### 03:00

and there are two things we want to import let's import mount from our test utils and then let's import our component itself our first test will mount our component passive props and then check what our props equal so let's create a test name it mount component and set it equal to an async function and in general whenever i work with components i always make the function asynchronous just to handle any sort of awaits we may want to add so first let's make sure that our hello world component exists by saying expect hello world dot to be truthy we'll create a const wrapper and set it equal to mount and

### 03:30

this takes two arguments the first is the component we want to mount and for our case that's hello world and the second is anything we want to pass to our component so we'll say props and then we want to pass a message that says hello from v test so if we want to see that our message is properly being passed to our component we can say expect wrapper.text and we can expect it to contain hello from vtest and if you run this we'll see that everything's working properly and then the second thing we want to test is we want to check our button click so let's copy and paste this first test and then change

### 04:00

the name of our test to button click then instead of checking our text we can say await wrapper dot get button and then trigger a click event with dot trigger click so now that it's clicked we would expect our count to say one so we can check expect wrapper.text and make sure that the text count is colon 1 to be in there and if we want to see that this is working again we can copy and paste this block but instead say count is 2. and as you can see as soon as we save our tests automatically run thanks to v-test hot reloads so that's

### 04:30

all for this v-test simplified video i just wanted to show off v-test because i think it's pretty cool and really helpful especially when working with veet apps i definitely want to make more videos on testing in vue whether that's more in depth with v-tests to view test utils or anything else just let me know in the comments down below and if you like this video and want to see more don't forget to hit that like button and subscribe for more content and as always happy coding

## Presentation observations

The video answers what Vitest is within its opening sentence. It immediately compares Vitest with the familiar Jest workflow, then spends most of its runtime in a real editor. Short title cards state one idea at a time. Brief reaction GIFs separate sections, but they do not carry technical information. The setup commands and Happy DOM example reflect Vitest in 2022 and are not current Browser Mode guidance.
